import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, PhoneCall, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/shared/Reveal";
import { ChatWindow, useChatScript } from "@/components/product/ConversationDemo";
import { SystemEventList } from "@/components/product/SystemEvent";
import { allSystemEvents, salesProgress, salesScript } from "@/data/demo";

const facts = [
  { icon: PhoneCall, title: "WhatsApp, Telegram и телефон", text: "Все разговоры в одних входящих, рядом с профилем гостя." },
  { icon: ShieldCheck, title: "Цены и наличие только из PMS", text: "AI не предложит номер, которого нет, и цену, которой нет в тарифе." },
  { icon: UserRoundCheck, title: "Последнее слово за командой", text: "Администратор видит каждый шаг и забирает диалог одной кнопкой." },
];

/** Витрина AI-администратора: живой сценарий в WhatsApp и действия системы рядом. */
export const AISection = ({ id = "ai" }: { id?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const state = useChatScript(salesScript, inView);
  const progress = salesProgress(state.done);

  return (
    <section id={id} className="ink section relative overflow-hidden">
      <div className="container-wide relative">
        <div ref={ref} className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">AI-администратор</p>
            <h2 className="headline mt-5 max-w-xl">Не просто отвечает. Бронирует.</h2>
            <p className="lede mt-5 max-w-xl">
              Каждое действие агента проходит через те же правила, что и действие сотрудника: наличие, цена, условия отмены, предоплата. Если разговор выходит за рамки сценария, его забирает человек.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.title}>
                  <fact.icon className="h-4 w-4 text-[hsl(222_100%_76%)]" aria-hidden />
                  <h3 className="mt-3 text-sm font-semibold text-white">{fact.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{fact.text}</p>
                </div>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-9 hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:block">
              <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-white/55">
                <span>Что происходит в системе</span>
                <span className="num">{progress} из {allSystemEvents.length}</span>
              </div>
              <SystemEventList events={allSystemEvents} progress={progress} dark />
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <Link to="/ai" className="inline-flex items-center gap-2 text-white hover:underline">Подробнее об AI-администраторе <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/ai#voice" className="inline-flex items-center gap-2 text-white/70 hover:text-white">Голосовой агент <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <ChatWindow script={salesScript} state={state} guestName="Анна Иванова" className="mx-auto max-w-[440px]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
