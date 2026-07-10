import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// A custom Vite plugin to run serverless functions in local development!
const localApiPlugin = () => {
  return {
    name: "local-api-plugin",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === "/api/book-demo" && req.method === "POST") {
          try {
            // Read raw body from stream
            const buffers = [];
            for await (const chunk of req) {
              buffers.push(chunk);
            }
            const body = JSON.parse(Buffer.concat(buffers).toString());

            // Mock express-like request and response
            const mockReq = {
              method: "POST",
              body: body,
              headers: req.headers,
            };

            const mockRes = {
              statusCode: 200,
              setHeader(name: string, value: string) {
                res.setHeader(name, value);
              },
              status(code: number) {
                this.statusCode = code;
                res.statusCode = code;
                return this;
              },
              json(data: any) {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
              },
              end(msg?: string) {
                res.end(msg);
              },
            };

            // Dynamically load the TypeScript API handler in Node
            const module = await server.ssrLoadModule("/api/book-demo.ts");
            const handler = module.default || module;
            await handler(mockReq, mockRes);
          } catch (error: any) {
            console.error("Vite local API dev error:", error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: error.message }));
          }
          return;
        }
        next();
      });
    },
  };
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env to process.env for local API testing
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [
      TanStackRouterVite({
        routesDirectory: "./src/routes",
        generatedRouteTree: "./src/routeTree.gen.ts",
      }),
      react(),
      tailwindcss(),
      tsconfigPaths(),
      localApiPlugin(),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
