import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/shared/Reveal";
import { useDemoModal } from "@/components/layout/DemoModal";

export const CTASection = () => {
  const { open } = useDemoModal();
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="section relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary via-[hsl(238_95%_60%)] to-violet p-8 text-white sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/15 blur-[100px]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-30" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <Reveal>
              <h2 className="headline text-white">Покажем, как Guestra будет работать в вашем отеле.</h2>
              <p className="mt-5 max-w-lg text-lg text-white/80">
                На демо разберём ваш текущий стек, путь гостя и покажем сценарии на примере вашего объекта — от WhatsApp до аналитики собственника.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="h-12 rounded-full bg-white px-6 text-ink hover:bg-white/90" onClick={() => open("demo")}>
                  Запросить демо <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 rounded-full border-white/40 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white" onClick={() => open("integration")}>
                  Обсудить интеграцию
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <form
                className="rounded-2xl bg-white p-6 text-foreground shadow-2xl"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                aria-label="Заявка на демо"
              >
                {sent ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                      <Check className="h-6 w-6" />
                    </span>
                    <div className="mt-4 font-semibold">Заявка отправлена</div>
                    <p className="mt-1 text-sm text-muted-foreground">Свяжемся с вами в течение рабочего дня.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="cta-name">Имя</Label>
                      <Input id="cta-name" name="name" required placeholder="Как к вам обращаться" autoComplete="name" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="cta-company">Компания / объект</Label>
                      <Input id="cta-company" name="company" required placeholder="Название отеля или сети" autoComplete="organization" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-1.5">
                        <Label htmlFor="cta-phone">Телефон</Label>
                        <Input id="cta-phone" name="phone" type="tel" required placeholder="+7" autoComplete="tel" />
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="cta-count">Количество объектов</Label>
                        <select id="cta-count" name="count" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>1</option>
                          <option>2–3</option>
                          <option>4–10</option>
                          <option>10+</option>
                        </select>
                      </div>
                    </div>
                    <Button type="submit" className="h-11 rounded-full">
                      Отправить заявку
                    </Button>
                    <p className="text-center text-[11px] text-muted-foreground">Нажимая кнопку, вы соглашаетесь на обработку контактных данных для связи по заявке.</p>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
