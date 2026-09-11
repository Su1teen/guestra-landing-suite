import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Check, Phone, Sparkles, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatStep } from "@/data/demo";
import { SystemEventList } from "./SystemEvent";

export interface ChatState {
  done: number;
  partial: string | null;
  typing: boolean;
  sysProgress: number;
  cycle: number;
}

const initial: ChatState = { done: 0, partial: null, typing: false, sysProgress: 0, cycle: 0 };

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export const useChatScript = (script: ChatStep[], active: boolean, { loop = true, speed = 1 } = {}) => {
  const [state, setState] = useState<ChatState>(initial);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const wait = (ms: number) => sleep(ms / speed);

    (async () => {
      let cycle = 0;
      while (!cancelled) {
        setState({ ...initial, cycle });
        for (let i = 0; i < script.length && !cancelled; i++) {
          const step = script[i];
          if (step.kind === "guest") {
            await wait(i === 0 ? 500 : 1100);
          } else if (step.kind === "ai") {
            setState((s) => ({ ...s, typing: true }));
            await wait(1000);
            const words = step.text.split(" ");
            let acc = "";
            for (const w of words) {
              if (cancelled) return;
              acc = acc ? `${acc} ${w}` : w;
              setState((s) => ({ ...s, typing: false, partial: acc }));
              await wait(45);
            }
            await wait(350);
          } else if (step.kind === "system") {
            for (let e = 0; e <= step.events.length && !cancelled; e++) {
              setState((s) => ({ ...s, sysProgress: e }));
              await wait(520);
            }
          } else {
            await wait(900);
          }
          if (cancelled) return;
          setState((s) => ({ ...s, done: i + 1, partial: null, typing: false, sysProgress: 0 }));
        }
        await wait(loop ? 4200 : 1e9);
        cycle += 1;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [script, active, loop, speed]);

  return state;
};

const Bubble = ({ side, children, dark, meta }: { side: "guest" | "ai"; children: React.ReactNode; dark?: boolean; meta?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3 }}
    className={cn("flex", side === "ai" ? "justify-end" : "justify-start")}
  >
    <div
      className={cn(
        "max-w-[86%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-sm",
        side === "guest" && (dark ? "rounded-bl-md bg-white/10 text-white" : "rounded-bl-md bg-white text-foreground"),
        side === "ai" && "rounded-br-md bg-[#d9fdd3] text-[#111b21]",
      )}
    >
      {children}
      {meta && (
        <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-black/45">
          {meta}
          {side === "ai" && <Check className="h-3 w-3 text-[#53bdeb]" strokeWidth={3} />}
        </span>
      )}
    </div>
  </motion.div>
);

const Typing = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-end">
    <div className="flex items-center gap-1 rounded-2xl rounded-br-md bg-[#d9fdd3] px-3 py-2.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#111b21]/50"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
        />
      ))}
    </div>
  </motion.div>
);

interface ChatWindowProps {
  script: ChatStep[];
  state: ChatState;
  guestName: string;
  className?: string;
  compact?: boolean;
}

export const ChatWindow = ({ script, state, guestName, className, compact }: ChatWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [state.done, state.partial, state.typing, state.sysProgress]);

  const current = script[state.done];
  const times = ["10:41", "10:41", "10:42", "10:42", "10:43", "10:43", "10:44", "10:44", "10:47"];

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-2xl border border-border bg-[#efeae2] shadow-[0_24px_60px_-24px_rgba(16,24,40,0.3)]", className)}>
      <div className="flex items-center gap-3 bg-[#075e54] px-3.5 py-2.5 text-white">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">
          {guestName
            .split(" ")
            .map((p) => p[0])
            .join("")}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{guestName}</div>
          <div className="flex items-center gap-1 text-[11px] text-white/70">
            <Sparkles className="h-3 w-3" /> AI-агент Guestra отвечает
          </div>
        </div>
        <Video className="h-4 w-4 text-white/70" />
        <Phone className="h-4 w-4 text-white/70" />
      </div>

      <div
        ref={scrollRef}
        className={cn("scrollbar-none flex flex-col gap-2 overflow-y-auto px-3 py-3", compact ? "h-[300px]" : "h-[380px] sm:h-[420px]")}
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.035) 1px, transparent 0)",
          backgroundSize: "14px 14px",
        }}
      >
        <div className="mx-auto mb-1 rounded-md bg-white/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-black/50">
          Сегодня
        </div>
        <AnimatePresence initial={false}>
          {script.slice(0, state.done).map((step, i) => {
            if (step.kind === "guest" || step.kind === "ai") {
              return (
                <Bubble key={`${state.cycle}-${i}`} side={step.kind} meta={times[i]}>
                  {step.text}
                </Bubble>
              );
            }
            if (step.kind === "system") {
              return (
                <motion.div key={`${state.cycle}-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="my-0.5 px-1">
                  <SystemEventList events={step.events} progress={step.events.length} className="mx-auto max-w-[260px]" />
                </motion.div>
              );
            }
            return (
              <motion.div
                key={`${state.cycle}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto"
              >
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold",
                    step.tone === "success" ? "bg-emerald text-white" : "bg-amber/90 text-white",
                  )}
                >
                  {step.tone === "success" && <Check className="h-3 w-3" strokeWidth={3} />}
                  {step.text}
                </span>
              </motion.div>
            );
          })}

          {current?.kind === "ai" && state.partial !== null && (
            <Bubble key={`${state.cycle}-partial`} side="ai">
              <span className="caret">{state.partial}</span>
            </Bubble>
          )}
          {state.typing && <Typing key={`${state.cycle}-typing`} />}
          {current?.kind === "system" && state.sysProgress > 0 && (
            <motion.div key={`${state.cycle}-sys`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="my-0.5 px-1">
              <SystemEventList events={current.events} progress={state.sysProgress} className="mx-auto max-w-[260px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 border-t border-black/5 bg-[#f0f2f5] px-3 py-2">
        <div className="flex-1 rounded-full bg-white px-3 py-1.5 text-xs text-black/40">Сообщение</div>
        <div className="h-7 w-7 rounded-full bg-[#00a884]" aria-hidden />
      </div>
    </div>
  );
};

interface ConversationDemoProps {
  script: ChatStep[];
  guestName: string;
  className?: string;
  compact?: boolean;
  onStateChange?: (s: ChatState) => void;
}

export const ConversationDemo = ({ script, guestName, className, compact, onStateChange }: ConversationDemoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const state = useChatScript(script, inView);

  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  return (
    <div ref={ref} className={className}>
      <ChatWindow script={script} state={state} guestName={guestName} compact={compact} />
    </div>
  );
};
