import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";
import { createServer, type Plugin } from "vite";

// Writes dist/<path>.html shells with route-specific head tags for every indexable /services URL.
function routeShells(): Plugin {
  return {
    name: "route-shells",
    apply: "build",
    async closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      const indexPath = path.join(dist, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const server = await createServer({
        configFile: false,
        logLevel: "silent",
        appType: "custom",
        server: { middlewareMode: true, hmr: false, ws: false },
        resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
      });
      try {
        const { servicesRouteMeta } = await server.ssrLoadModule("/src/data/routeMeta.ts");
        const { renderShell } = await server.ssrLoadModule("/src/lib/routeShells.ts");
        const indexHtml = fs.readFileSync(indexPath, "utf8");
        let count = 0;
        for (const [pathname, meta] of Object.entries(servicesRouteMeta)) {
          const rel = pathname.replace(/^\/+/, "");
          const html = renderShell(indexHtml, pathname, meta);
          for (const out of [path.join(dist, `${rel}.html`), path.join(dist, rel, "index.html")]) {
            fs.mkdirSync(path.dirname(out), { recursive: true });
            fs.writeFileSync(out, html);
            count++;
          }
        }
        console.log(`[route-shells] wrote ${count} route shell files (.html + /index.html)`);
      } finally {
        await server.close();
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), routeShells()].filter(Boolean),
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
