import { useEffect } from "react";

const SITE_URL = "https://damidus-portfolio.vercel.app";

const setMeta = (selector: string, attr: string, value: string) => {
  document.head.querySelector(selector)?.setAttribute(attr, value);
};

// Keeps <title>, description, canonical and social URLs in sync with the
// current route, since index.html only carries the home page's values
export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[name="twitter:title"]', "content", title);
  }, [title, description, path]);
}
