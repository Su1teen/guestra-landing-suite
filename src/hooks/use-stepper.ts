import { useEffect, useState } from "react";

/**
 * Cycles 0..total (inclusive) while active. Each step waits `intervals[i]` ms
 * (or `interval` when a single number is given), then pauses `loopPause` ms and restarts.
 */
export const useStepper = (
  total: number,
  active: boolean,
  { interval = 900, intervals, loopPause = 3500, loop = true }: { interval?: number; intervals?: number[]; loopPause?: number; loop?: boolean } = {},
) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const run = (i: number) => {
      if (cancelled) return;
      setStep(i);
      if (i >= total) {
        if (!loop) return;
        timer = setTimeout(() => run(0), loopPause);
        return;
      }
      timer = setTimeout(() => run(i + 1), intervals?.[i] ?? interval);
    };
    run(0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active, total, interval, intervals, loopPause, loop]);

  return step;
};
