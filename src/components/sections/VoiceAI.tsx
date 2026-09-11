import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { VoiceCallDemo } from "@/components/product/VoiceCallDemo";
import { useDemoModal } from "@/components/layout/DemoModal";

export const VoiceAI = () => {
  const { open } = useDemoModal();
  return (
    <section id="voice" className="section bg-background-alt">
      <div className="container-wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Voice AI"
            title="Каждый звонок становится лидом. Даже когда менеджер занят."
            lede="Voice AI отвечает на входящие звонки через вашу АТС, уточняет даты и состав гостей, а итог разговора сразу попадает в CRM со следующим действием."
          />
          <Reveal delay={0.1}>
            <Button className="h-11 rounded-full px-6" onClick={() => open("voice")}>
              Автоматизировать звонки
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-12">
          <VoiceCallDemo />
        </Reveal>
      </div>
    </section>
  );
};
