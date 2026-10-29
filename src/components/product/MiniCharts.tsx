/** Лёгкие SVG-графики для демо-панелей вместо тяжёлой библиотеки графиков. */

export const TrendChart = ({ data }: { data: { m: string; v: number; d: number }[] }) => {
  const W = 320;
  const H = 150;
  const pad = { l: 28, r: 8, t: 8, b: 20 };
  const max = Math.ceil(Math.max(...data.map((p) => p.v)) / 60) * 60;
  const x = (i: number) => pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r);
  const yV = (v: number) => pad.t + (1 - v / max) * (H - pad.t - pad.b);
  const yD = (d: number) => pad.t + (1 - d / 60) * (H - pad.t - pad.b);
  const line = data.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${yV(p.v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(data.length - 1)},${H - pad.b} L${x(0)},${H - pad.b} Z`;
  const direct = data.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${yD(p.d).toFixed(1)}`).join(" ");
  const ticks = [0, max / 2, max];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Выручка по месяцам и доля прямых бронирований">
      <defs>
        <linearGradient id="trend-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={yV(t)} y2={yV(t)} stroke="hsl(var(--border))" strokeDasharray="2 4" />
          <text x={pad.l - 6} y={yV(t) + 3} textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))">{t}</text>
        </g>
      ))}
      <path d={area} fill="url(#trend-area)" />
      <path d={line} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
      <path d={direct} fill="none" stroke="hsl(var(--violet))" strokeWidth="1.5" strokeDasharray="4 4" />
      {data.map((p, i) => (
        <text key={p.m} x={x(i)} y={H - 5} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">{p.m}</text>
      ))}
    </svg>
  );
};

export const DonutChart = ({ data }: { data: { label: string; value: number; color: string }[] }) => {
  const r = 46;
  const c = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" role="img" aria-label="Выручка по направлениям">
      {data.map((d) => {
        const len = (d.value / total) * c;
        const seg = <circle key={d.label} cx="60" cy="60" r={r} fill="none" stroke={d.color} strokeWidth="16" strokeDasharray={`${Math.max(len - 3, 0)} ${c}`} strokeDashoffset={-offset} />;
        offset += len;
        return seg;
      })}
    </svg>
  );
};

export const BarList = ({ data }: { data: { label: string; value: number; color: string }[] }) => {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <ul className="space-y-2.5 text-xs" aria-label="Каналы бронирований">
      {data.map((d) => (
        <li key={d.label} className="grid grid-cols-[64px_1fr_32px] items-center gap-2">
          <span className="text-muted-foreground">{d.label}</span>
          <span className="h-3 overflow-hidden rounded-r-md bg-background-alt"><span className="block h-full rounded-r-md" style={{ width: `${(d.value / max) * 100}%`, background: d.color }} /></span>
          <span className="num text-right font-medium">{d.value}%</span>
        </li>
      ))}
    </ul>
  );
};
