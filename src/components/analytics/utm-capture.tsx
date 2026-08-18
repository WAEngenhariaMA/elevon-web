"use client";

import { useEffect } from "react";
import { storeUtmFromLocation } from "@/lib/utm";

export function UtmCapture() {
  useEffect(() => {
    storeUtmFromLocation();
  }, []);

  return null;
}
