/** Local-only UI checks. Auth is mocked at the HTTP boundary; app protection stays enabled. */
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { once } from "node:events";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = process.cwd();
const output = path.join(root, "artifacts/iq-elevon-semantics");
await mkdir(output, { recursive: true });
const results = [];
const pass = (name) => {
  results.push({ name, result: "PASS" });
  console.log(`PASS ${name}`);
};

// Exercise actual domain functions, including exact display boundaries and timezone filtering.
const source = await readFile("src/features/iq-elevon/format.ts", "utf8");
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const domain = await import(
  `data:text/javascript;base64,${Buffer.from(js).toString("base64")}`
);
for (const [seconds, expected] of [
  [8, "READY"],
  [7, "CLOSING"],
  [4, "CLOSING"],
  [3, "CLOSING"],
  [1, "CLOSING"],
  [0, "EXPIRED"],
  [-1, "EXPIRED"],
])
  assert.equal(domain.windowState(seconds), expected);
assert.equal(domain.secondsRemaining("invalid", Date.now()), 0);
assert.equal(
  domain.secondsRemaining(
    "2026-10-29T12:00:00Z",
    Date.parse("2026-10-29T12:00:01Z"),
  ),
  0,
);
const now = Date.parse("2026-10-29T03:01:00Z");
const records = [
  { occurredAt: "2026-10-29T02:59:00Z" },
  { occurredAt: "2026-10-29T03:00:00Z" },
];
assert.equal(domain.historyInPeriod(records, 1, now).length, 1);
assert.equal(domain.historyInPeriod(records, 7, now).length, 2);
assert.equal(domain.clockTime("2026-10-29T03:00:00Z"), "00:00:00");
pass("domain thresholds, absolute countdown, São Paulo calendar boundaries");

const fixtureSource = await readFile(
  "src/features/iq-elevon/fixtures.ts",
  "utf8",
);
const fixtureJs = ts.transpileModule(fixtureSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { createDemoSnapshot } = await import(
  `data:text/javascript;base64,${Buffer.from(fixtureJs).toString("base64")}`
);
// Explicit anchors exercise fresh fixtures across midnight/month/year boundaries.
for (const demoNow of [
  Date.now(),
  Date.parse("2026-10-29T23:59:58Z"),
  Date.parse("2026-12-31T23:59:59.999Z"),
]) {
  const data = createDemoSnapshot(demoNow);
  const timestamp = (value) => Date.parse(value);
  assert.equal(timestamp(data.generatedAt), demoNow);
  for (const pre of data.preAlerts) {
    assert.match(pre.strategy, /M1/);
    const lead =
      (timestamp(pre.candleClosesAt) - timestamp(pre.generatedAt)) / 1000;
    assert.ok(lead >= 8 && lead <= 12);
    assert.equal(pre.secondsToClose, lead);
    assert.equal(domain.secondsRemaining(pre.candleClosesAt, demoNow), 12);
    assert.ok(timestamp(pre.generatedAt) <= demoNow);
    assert.equal("entryAt" in pre, false);
    assert.equal("entryDeadline" in pre, false);
  }
  for (const confirmed of data.confirmedSignals) {
    const entry = timestamp(confirmed.entryAt);
    const deadline = timestamp(confirmed.entryDeadline);
    assert.equal(deadline - entry, 15_000);
    assert.equal(timestamp(confirmed.expiryAt) - entry, 300_000);
    assert.ok(entry <= timestamp(confirmed.generatedAt));
    assert.ok(timestamp(confirmed.generatedAt) <= demoNow);
    assert.ok(demoNow < deadline);
    assert.equal(domain.secondsRemaining(confirmed.entryDeadline, demoNow), 9);
    assert.equal(domain.secondsRemaining(confirmed.entryDeadline, deadline), 0);
    assert.equal(
      domain.windowState(
        domain.secondsRemaining(confirmed.entryDeadline, deadline + 1000),
      ),
      "EXPIRED",
    );
  }
  for (const trade of data.activeTrades) {
    assert.equal(timestamp(trade.expiryAt) - timestamp(trade.entryAt), 300_000);
    assert.ok(timestamp(trade.generatedAt) <= demoNow);
    assert.ok(
      timestamp(trade.entryAt) < demoNow && demoNow < timestamp(trade.expiryAt),
    );
  }
  for (const shadow of data.shadowOpportunities) {
    const entry = timestamp(shadow.entryAt);
    const generated = timestamp(shadow.generatedAt);
    const deadline = timestamp(shadow.entryDeadline);
    assert.ok(
      shadow.decisionLatencySeconds >= 9.1 &&
        shadow.decisionLatencySeconds <= 10.4,
    );
    assert.equal(generated - entry, shadow.decisionLatencySeconds * 1000);
    assert.equal(deadline - entry, 15_000);
    assert.equal(timestamp(shadow.expiryAt) - entry, 300_000);
    assert.ok(generated <= demoNow && generated <= deadline);
    assert.equal("decisionLatencyMs" in shadow, false);
  }
  assert.equal(
    data.engines.find((engine) => engine.mode === "SHADOW").latencySeconds,
    9.1,
  );
}
pass(
  "M1 pre-alert ≤12s; entry deadline = entry +15s; expiry = entry +5m; V2 seconds and coherent timestamps",
);
if (process.argv.includes("--domain-only")) {
  await writeFile(
    path.join(output, "domain-checks.json"),
    JSON.stringify({ results }, null, 2),
  );
  process.exit(0);
}
const { chromium } = require(process.env.IQ_PLAYWRIGHT_PATH || "playwright");

const production = process.argv.includes("--production");
const appPort = production ? 3102 : 3101;
const authPort = production ? 4412 : 4411;
const base = `http://127.0.0.1:${appPort}`;
const viewHeadings = {
  operacao: "Visão de operação",
  historico: "Histórico",
  motores: "Motores",
  evidencias: "Evidências",
  sistema: "System Health",
};
const exp = Math.floor(Date.now() / 1000) + 3600;
const encode = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
const token = `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ sub: "00000000-0000-4000-8000-000000000001", exp, aud: "authenticated" })}.local-ui-fixture`;
const user = {
  id: "00000000-0000-4000-8000-000000000001",
  aud: "authenticated",
  role: "authenticated",
  email: "local-ui@example.test",
  created_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {},
};
const auth = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (
    req.url === "/auth/v1/user" &&
    req.headers.authorization === `Bearer ${token}`
  )
    res.end(JSON.stringify(user));
  else {
    res.writeHead(401);
    res.end(
      JSON.stringify({
        message: "Invalid local test session",
        code: "bad_jwt",
      }),
    );
  }
});
auth.listen(authPort, "127.0.0.1");
await once(auth, "listening");
const app = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    production ? "start" : "dev",
    "--hostname",
    "127.0.0.1",
    "--port",
    String(appPort),
  ],
  {
    cwd: root,
    windowsHide: true,
    env: {
      ...process.env,
      CLOUDFLARE_DEV_CONTEXT: "off",
      NEXT_TELEMETRY_DISABLED: "1",
      NEXT_PUBLIC_SUPABASE_URL: `http://127.0.0.1:${authPort}`,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "local-ui-test-public-key",
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let log = "";
app.stdout.on("data", (d) => {
  log += d;
});
app.stderr.on("data", (d) => {
  log += d;
});
let browser;
try {
  let ready = false;
  for (let i = 0; i < 90; i++) {
    try {
      const response = await fetch(`${base}/admin/iq-elevon`, {
        redirect: "manual",
      });
      if (response.status === 307) {
        ready = true;
        break;
      }
    } catch {}
    if (app.exitCode !== null) throw new Error(log);
    await new Promise((r) => setTimeout(r, 1000));
  }
  assert.ok(ready, `Server did not become ready: ${log}`);
  for (const view of [
    "operacao",
    "historico",
    "motores",
    "evidencias",
    "sistema",
  ]) {
    const response = await fetch(`${base}/admin/iq-elevon?view=${view}`, {
      redirect: "manual",
    });
    assert.equal(response.status, 307);
    assert.ok(response.headers.get("location").includes("/admin/login"));
  }
  const invalid = await fetch(`${base}/admin/iq-elevon`, {
    redirect: "manual",
    headers: { cookie: "sb-127-auth-token=invalid" },
  });
  assert.equal(invalid.status, 307);
  pass(
    `${production ? "production" : "development"} auth: all five views reject missing/invalid sessions`,
  );
  browser = await chromium.launch({
    headless: true,
    ...(process.env.IQ_BROWSER_CHANNEL
      ? { channel: process.env.IQ_BROWSER_CHANNEL }
      : {}),
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await context.addCookies([
    {
      name: "sb-127-auth-token",
      value: `base64-${encode({ access_token: token, refresh_token: "local-ui-refresh", token_type: "bearer", expires_in: 3600, expires_at: exp, user })}`,
      url: base,
    },
  ]);
  await page.goto(`${base}/admin/iq-elevon`);
  await page.getByRole("heading", { name: "IQ ELEVON", exact: true }).waitFor();
  if (production) {
    await page.getByText("SEM INTEGRAÇÃO", { exact: true }).waitFor();
    assert.equal(await page.getByText("DEMO DATA", { exact: true }).count(), 0);
    assert.equal(
      await page
        .getByRole("article", { name: /Sinal confirmado|Pré-alerta|V2 Shadow/ })
        .count(),
      0,
    );
    for (const name of ["Histórico", "Motores", "Evidências", "Sistema"]) {
      await page
        .getByRole("navigation", { name: "IQ Elevon", exact: true })
        .getByRole("link", { name, exact: true })
        .click();
      await page
        .getByRole("heading", {
          name: name === "Sistema" ? "System Health" : name,
          exact: true,
        })
        .waitFor();
      await page.getByText("SEM INTEGRAÇÃO", { exact: true }).waitFor();
      assert.equal(
        await page.getByText("DEMO DATA", { exact: true }).count(),
        0,
      );
    }
    await page.screenshot({
      path: path.join(output, "production-disconnected.png"),
      fullPage: true,
    });
    pass("production data guard: no fixtures in any view");
  } else {
    await page.getByText("DEMO DATA", { exact: true }).waitFor();
    const pre = page.getByRole("article", {
      name: "Pré-alerta EUR/USD",
      exact: true,
    });
    assert.match(await pre.innerText(), /PREPARE O ATIVO/);
    assert.match(await pre.innerText(), /AGUARDE CONFIRMAÇÃO/);
    assert.match(await pre.innerText(), /NÃO ENTRE AINDA/);
    const preSeconds = Number(
      (await pre.getByRole("timer").innerText()).replace("s", ""),
    );
    assert.ok(preSeconds >= 0 && preSeconds <= 12);
    assert.doesNotMatch(await pre.innerText(), /ENTRAR|EXECUTAR|CONFIRMADO/);
    const signal = page.getByRole("article", {
      name: "Sinal confirmado GBP/JPY",
      exact: true,
    });
    assert.match(await signal.innerText(), /CALL\s*↑/);
    for (const label of [
      "Entrada",
      "Executar até",
      "Expiração",
      "Payout",
      "MERCADO OPEN",
    ])
      assert.match(await signal.innerText(), new RegExp(label, "i"));
    const shadow = page.getByRole("article", {
      name: "V2 Shadow EUR/GBP",
      exact: true,
    });
    assert.match(await shadow.innerText(), /PUT\s*↓/);
    assert.match(await shadow.innerText(), /SHADOW • NÃO EXECUTA ORDENS/);
    assert.match(await shadow.innerText(), /9\.1 s/);
    assert.match(
      await shadow.innerText(),
      /teria sido operacionalmente executável em Shadow/i,
    );
    assert.doesNotMatch(await shadow.innerText(), /\d+ ms/);
    assert.doesNotMatch(
      await shadow.innerText(),
      /sinal|entrada recomendada|probabilidade/i,
    );
    await page.screenshot({
      path: path.join(output, "desktop-1440.png"),
      fullPage: true,
      style: "nextjs-portal { visibility: hidden !important; }",
    });
    pass(
      "desktop, pre-alert semantics, confirmed CALL, Shadow PUT and separation",
    );

    for (const width of [375, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      for (const [view, name] of [
        ["operacao", "Operação"],
        ["historico", "Histórico"],
        ["motores", "Motores"],
        ["evidencias", "Evidências"],
        ["sistema", "Sistema"],
      ]) {
        if (view === "operacao") await page.goto(`${base}/admin/iq-elevon`);
        else
          await page
            .getByRole("navigation", { name: "IQ Elevon", exact: true })
            .getByRole("link", { name, exact: true })
            .click();
        await page.getByText("DEMO DATA", { exact: true }).waitFor();
        await page
          .getByRole("heading", { name: viewHeadings[view], exact: true })
          .waitFor();
        await page.waitForTimeout(150);
        const sizes = await page.evaluate(() => ({
          viewport: innerWidth,
          width: document.documentElement.scrollWidth,
        }));
        assert.ok(
          sizes.width <= sizes.viewport,
          `Overflow at ${width}/${view}: ${JSON.stringify(sizes)}`,
        );
        if (width === 390)
          await page.screenshot({
            path: path.join(output, `mobile-390-${view}.png`),
            fullPage: true,
            style: "nextjs-portal { visibility: hidden !important; }",
          });
        if (view === "motores") {
          assert.match(
            await page.getByText("9.1 s", { exact: true }).innerText(),
            /9\.1 s/,
          );
          assert.equal(await page.getByText(/\d+ ms/).count(), 0);
        }
      }
      await page
        .getByRole("button", { name: "Abrir menu", exact: true })
        .click();
      await page
        .getByRole("link", { name: "IQ Elevon", exact: true })
        .last()
        .click();
      await page
        .getByRole("article", { name: "Sinal confirmado GBP/JPY", exact: true })
        .waitFor();
      assert.equal(
        await page
          .getByRole("button", { name: "Fechar menu", exact: true })
          .count(),
        0,
      );
    }
    pass(
      "375/390/430: five views without horizontal page overflow, sidebar navigation",
    );
    await page
      .getByRole("navigation", { name: "IQ Elevon", exact: true })
      .getByRole("link", { name: "Histórico", exact: true })
      .click();
    const legacy = page.getByRole("region", {
      name: "Histórico Legacy",
      exact: true,
    });
    const rowCount = await legacy.locator("article").count();
    await page.getByRole("button", { name: "7 dias", exact: true }).click();
    assert.ok((await legacy.locator("article").count()) > rowCount);
    const week = await legacy.locator("article").count();
    await page.getByRole("button", { name: "30 dias", exact: true }).click();
    assert.ok((await legacy.locator("article").count()) > week);
    pass("history filters change records, summaries separated by engine");

    await page.goto(`${base}/admin/iq-elevon`);
    await page
      .getByRole("article", { name: "Sinal confirmado GBP/JPY", exact: true })
      .waitFor();
    const window = page.locator("[data-state]");
    const deadline = Date.parse(await window.getAttribute("data-deadline"));
    await page.clock.install({ time: new Date(deadline - 9000) });
    await page.clock.pauseAt(new Date(deadline - 9000));
    await page.clock.runFor(250);
    assert.equal(await window.getAttribute("data-state"), "READY");
    assert.ok(
      Number((await signal.getByRole("timer").innerText()).replace("s", "")) <=
        15,
    );
    await page.clock.runFor(2000);
    await page.locator('[data-state="CLOSING"]').waitFor();
    assert.equal(await window.getAttribute("data-state"), "CLOSING");
    assert.match(await window.innerText(), /ATENÇÃO/);
    await page.clock.runFor(4000);
    await page.locator('[data-urgent="true"]').waitFor();
    assert.equal(await window.getAttribute("data-urgent"), "true");
    assert.match(await window.innerText(), /URGENTE/);
    await page.clock.runFor(4000);
    await page.locator('[data-state="EXPIRED"]').waitFor();
    assert.equal(await window.getAttribute("data-state"), "EXPIRED");
    assert.match(await window.innerText(), /JANELA ENCERRADA/);
    await page.clock.runFor(60_000);
    assert.equal(await window.getAttribute("data-state"), "EXPIRED");
    await page.screenshot({
      path: path.join(output, "mobile-expired.png"),
      fullPage: true,
      style: "nextjs-portal { visibility: hidden !important; }",
    });
    pass("countdown READY → CLOSING → urgent ≤3s → EXPIRED, remains expired");
    const nav = page.getByRole("navigation", {
      name: "IQ Elevon",
      exact: true,
    });
    await nav.getByRole("link", { name: "Operação", exact: true }).focus();
    assert.ok(
      await page.evaluate(
        () => getComputedStyle(document.activeElement).outlineStyle !== "none",
      ),
    );
    pass("keyboard focus is visible");
  }
  assert.deepEqual(errors, []);
  pass("no browser runtime/hydration errors");
} finally {
  await browser?.close();
  app.kill();
  auth.close();
  await writeFile(
    path.join(output, production ? "production-checks.json" : "ui-checks.json"),
    JSON.stringify({ results, serverLog: log }, null, 2),
  );
}
