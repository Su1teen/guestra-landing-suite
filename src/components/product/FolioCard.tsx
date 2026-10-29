import { Window } from "./Window";

const lines = [
  { date: "18 окт", item: "Проживание · Forest House", sum: "74 000" },
  { date: "19 окт", item: "Проживание · Forest House", sum: "74 000" },
  { date: "19 окт", item: "SPA для двоих · 15:00", sum: "24 000" },
  { date: "19 окт", item: "Ужин в ресторане", sum: "18 500" },
  { date: "16 окт", item: "Предоплата · ссылка на оплату", sum: "−74 000", credit: true },
];

/** Фрагмент фолио брони: начисления и оплаты рядом с проживанием. */
export const FolioCard = ({ className }: { className?: string }) => (
  <Window title="Фолио · Анна Иванова" className={className} bodyClassName="p-4">
    <table className="w-full text-xs">
      <tbody className="divide-y divide-border/70">
        {lines.map((l) => (
          <tr key={l.item + l.date}>
            <td className="num w-12 py-1.5 text-muted-foreground">{l.date}</td>
            <td className="py-1.5 pr-2">{l.item}</td>
            <td className={l.credit ? "num whitespace-nowrap py-1.5 text-right font-medium text-emerald" : "num whitespace-nowrap py-1.5 text-right font-medium"}>{l.sum} ₸</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mt-3 flex items-center justify-between rounded-lg bg-background-alt px-3 py-2 text-xs">
      <span className="text-muted-foreground">К оплате при выезде</span>
      <span className="num text-sm font-semibold">116 500 ₸</span>
    </div>
  </Window>
);
