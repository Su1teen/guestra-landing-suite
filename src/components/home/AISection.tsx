import { useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/shared/Reveal";
import { ChatWindow, useChatScript } from "@/components/product/ConversationDemo";
import { SystemEventList } from "@/components/product/SystemEvent";
import { allSystemEvents, salesProgress, salesScript } from "@/data/demo";

const facts = [
  { title: "WhatsApp, Telegram и телефон", text: "Все разговоры в одних входящих, рядом с профилем гостя." },
  { title: "Цены и наличие только из PMS", text: "AI не предложит номер, которого нет, и цену, которой нет в тарифе." },
  { title: "Последнее слово за командой", text: "Администратор видит каждый шаг и забирает диалог одной кнопкой." },
];

/** Витрина AI-администратора: живой сценарий в WhatsApp и действия системы рядом. */
export const AISection = ({ id = "ai" }: { id?: string }) => {
  const [playback, setPlayback] = useState({ running: false, key: 0 });
  const state = useChatScript(salesScript, playback.running, { loop: false, initialComplete: true, playbackKey: playback.key });
  const playing = playback.running && state.done < salesScript.length;
  const progress = salesProgress(state.done);

  return (
    <section id={id} className="home-ai ink section relative overflow-hidden">
      <div className="container-wide relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">AI-администратор</p>
            <h2 className="headline mt-5 max-w-xl">Не просто отвечает. Бронирует.</h2>
            <p className="lede mt-5 max-w-xl">
              Каждое действие агента проходит через те же правила, что и действие сотрудника: наличие, цена, условия отмены, предоплата. Если разговор выходит за рамки сценария, его забирает человек.
            </p>

            <div className="ai-facts mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.title}>
                  <h3 className="mt-3 text-sm font-semibold text-white">{fact.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{fact.text}</p>
                </div>
              ))}
            </div>

            <details className="mt-9 rounded-xl border border-white/20 p-4">
              <summary className="cursor-pointer text-sm text-white/80">Что происходит в системе · {progress} из {allSystemEvents.length}</summary>
              <div className="mt-4">
              <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-white/55">
                <span>Что происходит в системе</span>
                <span className="num">{progress} из {allSystemEvents.length}</span>
              </div>
              <SystemEventList events={allSystemEvents} progress={progress} dark />
              </div>
            </details>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <Link to="/ai" className="inline-flex items-center gap-2 text-white hover:underline">Подробнее об AI-администраторе <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/ai#voice" className="inline-flex items-center gap-2 text-white/70 hover:text-white">Голосовой агент <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>

          <Reveal delay={0.1} className="ai-demo-stage lg:sticky lg:top-24">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs text-white/75"><span>Переписка → оплаченная бронь</span><button type="button" onClick={() => setPlayback((p) => playing ? { ...p, running: false } : { running: true, key: p.key + 1 })} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/25 px-3">{playing ? <><Pause className="h-3 w-3" />Пауза</> : <><Play className="h-3 w-3" />Показать разговор</>}</button></div>
            <ChatWindow script={salesScript} state={state} guestName="Анна Иванова" playing={playing} className="mx-auto max-w-[440px]" />
            <p className="mt-4 text-[10px] text-white/60">Демонстрация на условных данных. Разговор показан текстом.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
