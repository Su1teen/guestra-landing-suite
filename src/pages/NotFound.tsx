import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { productNav } from "@/data/navigation";

const NotFound = () => (
  <main className="bg-background px-5 pb-24 pt-32 sm:px-8 md:pt-40">
    <div className="container-tight max-w-3xl">
      <p className="eyebrow">Ошибка 404</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Такой страницы нет</h1>
      <p className="lede mt-5">Возможно, ссылка устарела. Начните с главной или выберите раздел платформы.</p>
      <Link to="/" className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:underline">На главную <ArrowRight className="h-4 w-4" /></Link>
      <ul className="mt-12 grid gap-2 sm:grid-cols-2">
        {productNav.map((item) => (
          <li key={item.href}>
            <Link to={item.href} className="block rounded-xl border border-border p-4 transition hover:border-primary/30">
              <span className="font-semibold">{item.label}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </main>
);

export default NotFound;
