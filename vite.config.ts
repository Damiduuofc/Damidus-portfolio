import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { workData } from "./src/util/Data";

const SITE_URL = "https://damidus-portfolio.vercel.app";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type PageHead = { title: string; description: string; path: string };

// Swaps the home page's head values for a route's own, so crawlers and link
// previews see the right title/description/canonical before any JS runs
const withHead = (html: string, { title, description, path }: PageHead) => {
  const url = `${SITE_URL}${path}`;
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`);
};

const withNoscript = (html: string, body: string) =>
  html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n${body}\n    </noscript>`);

// Writes static HTML for each non-home route (projects.html, served at
// /projects via cleanUrls) and a 404.html that Vercel returns with a real 404
const staticRoutes = (): Plugin => ({
  name: "static-routes",
  apply: "build",
  enforce: "post",
  generateBundle(_options, bundle) {
    const entry = bundle["index.html"];
    if (entry?.type !== "asset") return;
    const home = String(entry.source);

    const projectsHead: PageHead = {
      title: "All Projects | Damidu Abeysinghe",
      description:
        "Web applications, websites and UI/UX case studies by Damidu Abeysinghe, built with React, Next.js, Node.js, Express and MongoDB.",
      path: "/projects",
    };
    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
      ],
    };
    const projectList = workData
      .map(
        (p) =>
          `          <li>${p.link ? `<a href="${escapeHtml(p.link)}">${escapeHtml(p.title)}</a>` : escapeHtml(p.title)} — ${escapeHtml(p.category)}. ${escapeHtml(p.tools)}.</li>`
      )
      .join("\n");
    let projects = withHead(home, projectsHead);
    projects = withNoscript(
      projects,
      `      <main style="max-width: 720px; margin: 60px auto; padding: 0 20px; color: #eae5ec; font-family: sans-serif">
        <p><a href="/">Home</a> › Projects</p>
        <h1>All Projects</h1>
        <ul>
${projectList}
        </ul>
      </main>`
    );
    projects = projects.replace(
      "</head>",
      `  <script type="application/ld+json">${JSON.stringify(breadcrumbs)}</script>\n  </head>`
    );
    this.emitFile({ type: "asset", fileName: "projects.html", source: projects });

    let notFound = withHead(home, {
      title: "Page not found | Damidu Abeysinghe",
      description: "This page doesn't exist. Head back to Damidu Abeysinghe's portfolio.",
      path: "/",
    });
    notFound = notFound
      .replace(/(<meta\s+name="robots"\s+content=")[^"]*(")/, "$1noindex$2")
      .replace(/\s*<link\s+rel="canonical"[^>]*>/, "")
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, "");
    notFound = withNoscript(
      notFound,
      `      <main style="max-width: 720px; margin: 60px auto; padding: 0 20px; color: #eae5ec; font-family: sans-serif">
        <h1>Page not found</h1>
        <p><a href="/">Back to Damidu Abeysinghe's portfolio</a></p>
      </main>`
    );
    this.emitFile({ type: "asset", fileName: "404.html", source: notFound });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), staticRoutes()],
});
