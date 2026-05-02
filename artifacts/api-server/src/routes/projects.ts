import { Router } from "express";
import { db, projectsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { randomUUID } from "crypto";

const router = Router();

router.get("/projects", async (req, res) => {
  try {
    const onlyVisible = req.query.onlyVisible === "true";
    let rows = await db.select().from(projectsTable).orderBy(asc(projectsTable.sortOrder));
    if (onlyVisible) rows = rows.filter(r => r.isVisible);
    res.json(rows);
  } catch (err) {
    req.log.error(err, "Failed to fetch projects");
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

router.post("/projects", async (req, res) => {
  try {
    const [row] = await db.insert(projectsTable).values({ ...req.body, id: randomUUID() }).returning();
    res.json(row);
  } catch (err) {
    req.log.error(err, "Failed to create project");
    res.status(500).json({ error: "Failed to create project" });
  }
});

router.patch("/projects/:id", async (req, res) => {
  try {
    const [row] = await db.update(projectsTable).set({ ...req.body, updatedAt: new Date() }).where(eq(projectsTable.id, req.params.id)).returning();
    res.json(row);
  } catch (err) {
    req.log.error(err, "Failed to update project");
    res.status(500).json({ error: "Failed to update project" });
  }
});

router.delete("/projects/:id", async (req, res) => {
  try {
    await db.delete(projectsTable).where(eq(projectsTable.id, req.params.id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err, "Failed to delete project");
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
