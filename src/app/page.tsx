"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@zardo/ui-kit/feedback";

export default function Home() {
  const [isClient, setIsClient ] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <LoadingScreen />

  return notFound();
}
