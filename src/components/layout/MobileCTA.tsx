import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { mailtoHref } from "@/lib/lead";
import { useDemoModal } from "./DemoModal";

/** Нижняя панель на телефоне: появляется после первого экрана и прячется у формы заявки. */
export const MobileCTA = () => {
  const { open } = useDemoModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const contact = document.getElementById("contact");
      const nearForm = contact ? contact.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(window.scrollY > window.innerHeight * 0.8 && !nearForm);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <div className="flex gap-2">
        <a href={mailtoHref()} tabIndex={visible ? 0 : -1} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-foreground" aria-label="Написать на почту">
          <Mail className="h-4 w-4" />
        </a>
        <button type="button" tabIndex={visible ? 0 : -1} onClick={() => open("demo")} className="h-11 flex-1 rounded-xl bg-primary text-sm font-semibold text-white">
          Запросить демо
        </button>
      </div>
    </div>
  );
};
