import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App";
import { notFoundMeta, siteRoutes, SITE_URL } from "./routes";

export { notFoundMeta, siteRoutes, SITE_URL };

/** Рендер страницы в HTML для пререндера (scripts/prerender.mjs). */
export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );

import { homeFaq } from "./data/faq";
import { faqJsonLd } from "./components/shared/FaqList";

export const homeFaqJsonLd = faqJsonLd(homeFaq);
