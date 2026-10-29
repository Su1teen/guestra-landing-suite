// Пререндер: после `vite build` и SSR-сборки entry-server превращает каждый маршрут в статический HTML.
// Результат: dist/index.html, dist/<route>.html, dist/404.html и dist/sitemap.xml.
// Cloudflare отдаёт /crm из crm.html (html_handling = "auto-trailing-slash"), а неизвестные адреса — 404.html с кодом 404.
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, siteRoutes, notFoundMeta, SITE_URL } = await import(pathToFileURL(ssrEntry).href);
const template = await readFile(path.join(dist, "index.html"), "utf8");

const escape = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Guestra",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  email: "sales@guestra.org",
};

const software = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Guestra",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "PMS, CRM и AI-администратор для отелей, загородных комплексов и сетей.",
  url: SITE_URL,
  inLanguage: "ru",
};

const page = ({ url, title, description, og, html, jsonLd = [] }) => {
  let out = template;
  const replaceMeta = (pattern, value) => {
    out = out.replace(pattern, (match, before, _old, after) => `${before}${escape(value)}${after}`);
  };
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`);
  replaceMeta(/(<meta name="description" content=")([^"]*)(")/, description);
  replaceMeta(/(<meta property="og:title" content=")([^"]*)(")/, title);
  replaceMeta(/(<meta property="og:description" content=")([^"]*)(")/, description);
  replaceMeta(/(<meta property="og:url" content=")([^"]*)(")/, url);
  replaceMeta(/(<meta property="og:image" content=")([^"]*)(")/, og);
  replaceMeta(/(<meta name="twitter:title" content=")([^"]*)(")/, title);
  replaceMeta(/(<meta name="twitter:description" content=")([^"]*)(")/, description);
  replaceMeta(/(<meta name="twitter:image" content=")([^"]*)(")/, og);
  replaceMeta(/(<link rel="canonical" href=")([^"]*)(")/, url);
  const scripts = jsonLd.map((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`).join("\n    ");
  out = out.replace("<!--head-extra-->", scripts);
  return out.replace("<!--app-html-->", html);
};

const homeFaq = (await import(pathToFileURL(ssrEntry).href)).homeFaqJsonLd;

for (const route of siteRoutes) {
  const url = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const slug = route.path === "/" ? "home" : route.path.slice(1);
  const jsonLd = route.path === "/" ? [organization, software, ...(homeFaq ? [homeFaq] : [])] : [organization];
  const html = page({ url, title: route.title, description: route.description, og: `${SITE_URL}/og/${slug}.png`, html: render(route.path), jsonLd });
  const file = route.path === "/" ? "index.html" : `${slug}.html`;
  await writeFile(path.join(dist, file), html);
  console.log(`prerendered ${route.path} → ${file}`);
}

const notFound = page({
  url: `${SITE_URL}/404`,
  title: notFoundMeta.title,
  description: notFoundMeta.description,
  og: `${SITE_URL}/og/home.png`,
  html: render("/404"),
}).replace('<meta name="viewport"', '<meta name="robots" content="noindex" />\n    <meta name="viewport"');
await writeFile(path.join(dist, "404.html"), notFound);
console.log("prerendered 404.html");

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${siteRoutes
  .map((r) => `  <url><loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`)
  .join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
console.log("wrote sitemap.xml");

await rm(path.join(root, "dist-ssr"), { recursive: true, force: true });
