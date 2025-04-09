"use client";

import { useState, useEffect } from "react";
import { NotFoundScreen, LoadingScreen } from "@zardo/ui-kit/components";

export default function NotFoundPage() {
    const [isClient, setIsClient ] = useState<boolean>(false);
  
    useEffect(() => {
      setIsClient(true)
    }, [])
  
    if (!isClient) return <LoadingScreen />

  return <NotFoundScreen backHref="https://zardo.dev" />;
}