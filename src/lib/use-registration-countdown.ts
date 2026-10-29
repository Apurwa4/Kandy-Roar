"use client";

import { useEffect, useState } from "react";
import { getRegistrationCountdown } from "./registration-schedule";

export function useRegistrationCountdown() {
  const [countdown, setCountdown] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false,
  });
  useEffect(() => {
    const update = () => setCountdown(getRegistrationCountdown());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return countdown;
}
