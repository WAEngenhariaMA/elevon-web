import type { Metadata } from "next";
import { getIqElevonDataSource } from "@/features/iq-elevon/data-source";
import type { IqView } from "@/features/iq-elevon/types";
import { IqShell } from "@/components/iq-elevon/iq-shell";
import { OperationView } from "@/components/iq-elevon/operation-view";
import { HistoryView } from "@/components/iq-elevon/history-view";
import { EnginesView } from "@/components/iq-elevon/engines-view";
import { EvidenceView } from "@/components/iq-elevon/evidence-view";
import { SystemView } from "@/components/iq-elevon/system-view";

export const metadata: Metadata = {
  title: "IQ ELEVON — Trading Intelligence",
  robots: { index: false, follow: false },
};

export default async function IqElevonPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const allowed: IqView[] = [
    "operacao",
    "historico",
    "motores",
    "evidencias",
    "sistema",
  ];
  const view: IqView =
    typeof query.view === "string" && allowed.includes(query.view as IqView)
      ? (query.view as IqView)
      : "operacao";
  const source = await getIqElevonDataSource();
  const data = await source.getSnapshot();
  return (
    <IqShell snapshot={data} view={view}>
      {view === "historico" ? (
        <HistoryView data={data} />
      ) : view === "motores" ? (
        <EnginesView data={data} />
      ) : view === "evidencias" ? (
        <EvidenceView data={data} />
      ) : view === "sistema" ? (
        <SystemView data={data} />
      ) : (
        <OperationView data={data} />
      )}
    </IqShell>
  );
}
