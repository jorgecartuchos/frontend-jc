"use client";

import { InicioProvider } from "@/src/context/InicioProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <InicioProvider>{children}</InicioProvider>;
}
