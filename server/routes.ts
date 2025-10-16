import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve resume PDF
  app.get("/api/resume", (req, res) => {
    const resumePath = path.join(__dirname, "../attached_assets/Bhuvaneshwaran_Resume _1760559845947.pdf");
    res.download(resumePath, "Bhuvaneshwaran_Resume.pdf", (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).send("Error downloading resume");
      }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}