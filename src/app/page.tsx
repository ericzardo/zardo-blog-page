"use client";

import { useEffect, useState } from "react";
import { NotFoundScreen, LoadingScreen } from "@zardo/ui-kit/feedback";

export default function Home() {
  const [isClient, setIsClient ] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <LoadingScreen />

  return <NotFoundScreen backHref="https://zardo.dev" />;
}
