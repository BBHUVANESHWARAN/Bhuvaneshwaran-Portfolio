import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple request/response logging (optional)
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJson: any;

  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    capturedJson = body;
    return originalJson(body);
  };

  res.on("finish", () => {
    const ms = Date.now() - start;
    try {
      log(`${req.method} ${path} → ${res.statusCode} (${ms}ms) ${capturedJson ? JSON.stringify(capturedJson).slice(0, 200) : ""}`);
    } catch {}
  });
  next();
});

(async () => {
  // Attach routes and create http server (as your routes.ts expects)
  const httpServer = await registerRoutes(app);

  // Dev = Vite middleware; Prod = static files from Vite build
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, httpServer);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT || 5000);
  httpServer.listen(port, () => {
    log(`✅ Server listening on http://localhost:${port}`, "server");
  });
})().catch((err) => {
  console.error("Fatal boot error:", err);
  process.exit(1);
});

// Export app for tests/serverless (keeps compatibility)
export default app;
