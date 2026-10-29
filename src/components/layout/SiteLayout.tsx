import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { captureUtm } from "@/lib/lead";
import { notFoundMeta, SITE_URL, siteRoutes } from "@/routes";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileCTA } from "./MobileCTA";

const setMeta = (selector: string, attr: string, value: string) => document.querySelector(selector)?.setAttribute(attr, value);

export const SiteLayout = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => captureUtm(), []);

  useEffect(() => {
    const route = siteRoutes.find((r) => r.path === pathname);
    const meta = route ?? notFoundMeta;
    const url = `${SITE_URL}${pathname}`;
    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", meta.title);
    setMeta('meta[name="twitter:description"]', "content", meta.description);
    setMeta('link[rel="canonical"]', "href", url);
    if (hash) {
      window.requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, hash]);

  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg">К содержанию</a>
      <Navbar />
      <div id="content" data-page={pathname}><Outlet /></div>
      <Footer />
      <MobileCTA />
    </>
  );
};
