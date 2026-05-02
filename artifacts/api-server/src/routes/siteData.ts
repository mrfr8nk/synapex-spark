import { Router } from "express";
import { db, siteSettingsTable, projectsTable, milestonesTable, currentlyBuildingTable, socialLinksTable, whatIBuildTable, footerLinksTable, blogPostsTable, skillsTable, testimonialsTable, certificationsTable, educationTable, contactMessagesTable } from "@workspace/db";
import { eq, asc, desc } from "drizzle-orm";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// ── Secrets: hard defaults only used in non-production ──────────────────────
const JWT_SECRET = process.env.JWT_SECRET ?? (() => {
  if (process.env.NODE_ENV === "production") throw new Error("JWT_SECRET env var is required in production");
  return "darrell-portfolio-secret-2025";
})();

// ── Key-case helpers ─────────────────────────────────────────────────────────

function toSnake(s: string) {
  return s.replace(/([A-Z])/g, m => `_${m.toLowerCase()}`);
}

function toCamel(s: string) {
  return s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function snakify(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(snakify);
  if (obj && typeof obj === "object" && !(obj instanceof Date)) {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [toSnake(k), snakify(v)])
    );
  }
  return obj;
}

function camelify(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(camelify);
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [toCamel(k), camelify(v)])
    );
  }
  return obj;
}

// ── Auth middleware ───────────────────────────────────────────────────────────

function requireAuth(req: any, res: any, next: any) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
  try {
    const payload = jwt.verify(auth.slice(7), JWT_SECRET) as any;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ── File upload ───────────────────────────────────────────────────────────────

const upload = multer({
  dest: "/tmp/uploads/",
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/upload", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  const ext = path.extname(req.file.originalname);
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const uploadDir = "/tmp/media";
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const dest = path.join(uploadDir, filename);
  fs.renameSync(req.file.path, dest);
  const proto = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host || "localhost";
  res.json({ url: `${proto}://${host}/api/media/${filename}` });
});

router.get("/media/:filename", (req, res) => {
  const file = path.join("/tmp/media", req.params.filename);
  if (!fs.existsSync(file)) return res.status(404).json({ error: "Not found" });
  res.sendFile(file);
});

// ── Site Settings ─────────────────────────────────────────────────────────────

router.get("/site-settings", async (_req, res) => {
  const rows = await db.select().from(siteSettingsTable);
  const map: Record<string, string> = {};
  rows.forEach(r => { map[r.key] = r.value; });
  res.json(map);
});

router.put("/site-settings", requireAuth, async (req, res) => {
  const body = req.body as Record<string, string>;
  for (const [key, value] of Object.entries(body)) {
    await db.insert(siteSettingsTable).values({ key, value })
      .onConflictDoUpdate({ target: siteSettingsTable.key, set: { value, updatedAt: new Date() } });
  }
  res.json({ ok: true });
});

// ── Projects ──────────────────────────────────────────────────────────────────

router.get("/projects", async (_req, res) => {
  const rows = await db.select().from(projectsTable).orderBy(asc(projectsTable.sortOrder));
  res.json(snakify(rows));
});

router.post("/projects", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.insert(projectsTable).values({ ...body, id: crypto.randomUUID() }).returning();
  res.json(snakify(row));
});

router.put("/projects/:id", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.update(projectsTable).set({ ...body, updatedAt: new Date() })
    .where(eq(projectsTable.id, req.params.id)).returning();
  res.json(snakify(row));
});

router.delete("/projects/:id", requireAuth, async (req, res) => {
  await db.delete(projectsTable).where(eq(projectsTable.id, req.params.id));
  res.json({ ok: true });
});

// ── Milestones ────────────────────────────────────────────────────────────────

router.get("/milestones", async (_req, res) => {
  const rows = await db.select().from(milestonesTable).orderBy(asc(milestonesTable.sortOrder));
  res.json(snakify(rows));
});

router.post("/milestones", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.insert(milestonesTable).values({ ...body, id: crypto.randomUUID() }).returning();
  res.json(snakify(row));
});

router.put("/milestones/:id", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.update(milestonesTable).set({ ...body, updatedAt: new Date() })
    .where(eq(milestonesTable.id, req.params.id)).returning();
  res.json(snakify(row));
});

router.delete("/milestones/:id", requireAuth, async (req, res) => {
  await db.delete(milestonesTable).where(eq(milestonesTable.id, req.params.id));
  res.json({ ok: true });
});

// ── Currently Building ────────────────────────────────────────────────────────

router.get("/currently-building", async (_req, res) => {
  const rows = await db.select().from(currentlyBuildingTable).orderBy(asc(currentlyBuildingTable.sortOrder));
  res.json(snakify(rows));
});

router.post("/currently-building", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.insert(currentlyBuildingTable).values({ ...body, id: crypto.randomUUID() }).returning();
  res.json(snakify(row));
});

router.put("/currently-building/:id", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.update(currentlyBuildingTable).set({ ...body, updatedAt: new Date() })
    .where(eq(currentlyBuildingTable.id, req.params.id)).returning();
  res.json(snakify(row));
});

router.delete("/currently-building/:id", requireAuth, async (req, res) => {
  await db.delete(currentlyBuildingTable).where(eq(currentlyBuildingTable.id, req.params.id));
  res.json({ ok: true });
});

// ── Social Links ──────────────────────────────────────────────────────────────

router.get("/social-links", async (_req, res) => {
  const rows = await db.select().from(socialLinksTable).orderBy(asc(socialLinksTable.sortOrder));
  res.json(snakify(rows));
});

router.post("/social-links", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.insert(socialLinksTable).values({ ...body, id: crypto.randomUUID() }).returning();
  res.json(snakify(row));
});

router.put("/social-links/:id", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.update(socialLinksTable).set({ ...body, updatedAt: new Date() })
    .where(eq(socialLinksTable.id, req.params.id)).returning();
  res.json(snakify(row));
});

router.delete("/social-links/:id", requireAuth, async (req, res) => {
  await db.delete(socialLinksTable).where(eq(socialLinksTable.id, req.params.id));
  res.json({ ok: true });
});

// ── What I Build ──────────────────────────────────────────────────────────────

router.get("/what-i-build", async (_req, res) => {
  const rows = await db.select().from(whatIBuildTable).orderBy(asc(whatIBuildTable.sortOrder));
  res.json(snakify(rows));
});

router.post("/what-i-build", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.insert(whatIBuildTable).values({ ...body, id: crypto.randomUUID() }).returning();
  res.json(snakify(row));
});

router.put("/what-i-build/:id", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.update(whatIBuildTable).set({ ...body, updatedAt: new Date() })
    .where(eq(whatIBuildTable.id, req.params.id)).returning();
  res.json(snakify(row));
});

router.delete("/what-i-build/:id", requireAuth, async (req, res) => {
  await db.delete(whatIBuildTable).where(eq(whatIBuildTable.id, req.params.id));
  res.json({ ok: true });
});

// ── Footer Links ──────────────────────────────────────────────────────────────

router.get("/footer-links", async (_req, res) => {
  const rows = await db.select().from(footerLinksTable).orderBy(asc(footerLinksTable.sortOrder));
  res.json(snakify(rows));
});

router.post("/footer-links", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.insert(footerLinksTable).values({ ...body, id: crypto.randomUUID() }).returning();
  res.json(snakify(row));
});

router.put("/footer-links/:id", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.update(footerLinksTable).set({ ...body, updatedAt: new Date() })
    .where(eq(footerLinksTable.id, req.params.id)).returning();
  res.json(snakify(row));
});

router.delete("/footer-links/:id", requireAuth, async (req, res) => {
  await db.delete(footerLinksTable).where(eq(footerLinksTable.id, req.params.id));
  res.json({ ok: true });
});

// ── Blog Posts ────────────────────────────────────────────────────────────────

router.get("/blog-posts", async (req, res) => {
  const onlyPublished = req.query.published === "true";
  let rows = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.publishedAt));
  if (onlyPublished) rows = rows.filter(r => r.isPublished);
  res.json(snakify(rows));
});

router.get("/blog-posts/:slug", async (req, res) => {
  const [row] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.slug, req.params.slug));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(snakify(row));
});

router.post("/blog-posts", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.insert(blogPostsTable).values({ ...body, id: crypto.randomUUID() }).returning();
  res.json(snakify(row));
});

router.put("/blog-posts/:id", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.update(blogPostsTable).set({ ...body, updatedAt: new Date() })
    .where(eq(blogPostsTable.id, req.params.id)).returning();
  res.json(snakify(row));
});

router.delete("/blog-posts/:id", requireAuth, async (req, res) => {
  await db.delete(blogPostsTable).where(eq(blogPostsTable.id, req.params.id));
  res.json({ ok: true });
});

// ── Skills ────────────────────────────────────────────────────────────────────

router.get("/skills", async (_req, res) => {
  const rows = await db.select().from(skillsTable)
    .orderBy(asc(skillsTable.category), asc(skillsTable.sortOrder));
  res.json(snakify(rows));
});

router.post("/skills", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.insert(skillsTable).values({ ...body, id: crypto.randomUUID() }).returning();
  res.json(snakify(row));
});

router.put("/skills/:id", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.update(skillsTable).set({ ...body, updatedAt: new Date() })
    .where(eq(skillsTable.id, req.params.id)).returning();
  res.json(snakify(row));
});

router.delete("/skills/:id", requireAuth, async (req, res) => {
  await db.delete(skillsTable).where(eq(skillsTable.id, req.params.id));
  res.json({ ok: true });
});

// ── Testimonials ──────────────────────────────────────────────────────────────

router.get("/testimonials", async (_req, res) => {
  const rows = await db.select().from(testimonialsTable).orderBy(asc(testimonialsTable.sortOrder));
  res.json(snakify(rows));
});

router.post("/testimonials", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.insert(testimonialsTable).values({ ...body, id: crypto.randomUUID() }).returning();
  res.json(snakify(row));
});

router.put("/testimonials/:id", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.update(testimonialsTable).set({ ...body, updatedAt: new Date() })
    .where(eq(testimonialsTable.id, req.params.id)).returning();
  res.json(snakify(row));
});

router.delete("/testimonials/:id", requireAuth, async (req, res) => {
  await db.delete(testimonialsTable).where(eq(testimonialsTable.id, req.params.id));
  res.json({ ok: true });
});

// ── Certifications ────────────────────────────────────────────────────────────

router.get("/certifications", async (_req, res) => {
  const rows = await db.select().from(certificationsTable).orderBy(asc(certificationsTable.sortOrder));
  res.json(snakify(rows));
});

router.post("/certifications", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.insert(certificationsTable).values({ ...body, id: crypto.randomUUID() }).returning();
  res.json(snakify(row));
});

router.put("/certifications/:id", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.update(certificationsTable).set({ ...body, updatedAt: new Date() })
    .where(eq(certificationsTable.id, req.params.id)).returning();
  res.json(snakify(row));
});

router.delete("/certifications/:id", requireAuth, async (req, res) => {
  await db.delete(certificationsTable).where(eq(certificationsTable.id, req.params.id));
  res.json({ ok: true });
});

// ── Education ─────────────────────────────────────────────────────────────────

router.get("/education", async (_req, res) => {
  const rows = await db.select().from(educationTable).orderBy(asc(educationTable.sortOrder));
  res.json(snakify(rows));
});

router.post("/education", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.insert(educationTable).values({ ...body, id: crypto.randomUUID() }).returning();
  res.json(snakify(row));
});

router.put("/education/:id", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.update(educationTable).set({ ...body, updatedAt: new Date() })
    .where(eq(educationTable.id, req.params.id)).returning();
  res.json(snakify(row));
});

router.delete("/education/:id", requireAuth, async (req, res) => {
  await db.delete(educationTable).where(eq(educationTable.id, req.params.id));
  res.json({ ok: true });
});

// ── Contact Messages ──────────────────────────────────────────────────────────

router.get("/contact-messages", requireAuth, async (_req, res) => {
  const rows = await db.select().from(contactMessagesTable)
    .orderBy(desc(contactMessagesTable.createdAt));
  res.json(snakify(rows));
});

router.post("/contact-messages", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: "Missing fields" });
  const [row] = await db.insert(contactMessagesTable)
    .values({ id: crypto.randomUUID(), name, email, message }).returning();
  res.json(snakify(row));
});

router.put("/contact-messages/:id", requireAuth, async (req, res) => {
  const body = camelify(req.body) as any;
  const [row] = await db.update(contactMessagesTable).set(body)
    .where(eq(contactMessagesTable.id, req.params.id)).returning();
  res.json(snakify(row));
});

router.delete("/contact-messages/:id", requireAuth, async (req, res) => {
  await db.delete(contactMessagesTable).where(eq(contactMessagesTable.id, req.params.id));
  res.json({ ok: true });
});

export default router;
