import { useRef } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { ChatWindow, useChatScript, type ChatState } from "@/components/product/ConversationDemo";
import { SystemEventList } from "@/components/product/SystemEvent";
import { allSystemEvents, salesScript } from "@/data/demo";
import { useDemoModal } from "@/components/layout/DemoModal";

/** Maps scripted progress to the global "actions performed" checklist. */
const progressFromState = (s: ChatState) => {
  if (s.done >= salesScript.length) return 7;
  if (s.done >= 8) return 7;
  if (s.done >= 7) return 6;
  if (s.done >= 6) return 4;
  if (s.done >= 3) return 3;
  if (s.done === 2) return Math.min(3, s.sysProgress);
  return 0;
};

export const AISales = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const state = useChatScript(salesScript, inView);
  const { open } = useDemoModal();

  const progress = progressFromState(state);

  return (
    <section id="ai" className="ink section relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[140px]" aria-hidden />
      <div className="container-wide relative">
        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="AI-агент продаж"
              title={
                <>
                  Это не чат-бот. <span className="text-white/45">Это AI-агент, который умеет продавать и бронировать.</span>
                </>
              }
              lede="AI отвечает, проверяет наличие в PMS, находит актуальную цену, создаёт бронь и отправляет ссылку на предоплату. Менеджер подключается только там, где нужен человек."
            />

            <Reveal delay={0.15} className="mt-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-white/45">
                  <span>Действия системы</span>
                  <span className="num">
                    {progress}/{allSystemEvents.length}
                  </span>
                </div>
                <SystemEventList events={allSystemEvents} progress={progress} dark />
              </div>
            </Reveal>

            <Reveal delay={0.25} className="mt-8 flex flex-wrap gap-3">
              <Button className="h-11 rounded-full px-6" onClick={() => open("demo")}>
                Посмотреть AI в действии
              </Button>
              <Button variant="outline" className="h-11 rounded-full border-white/15 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white" asChild>
                <a href="#voice">Voice AI для звонков</a>
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,hsl(var(--whatsapp)/0.18),transparent_65%)]" aria-hidden />
            <ChatWindow script={salesScript} state={state} guestName="Анна Иванова" className="mx-auto max-w-[420px]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
