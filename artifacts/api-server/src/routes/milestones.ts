import { Router } from "express";
import { db, milestonesTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { randomUUID } from "crypto";

const router = Router();

router.get("/milestones", async (req, res) => {
  try {
    const rows = await db.select().from(milestonesTable).orderBy(asc(milestonesTable.sortOrder));
    res.json(rows);
  } catch (err) {
    req.log.error(err, "Failed to fetch milestones");
    res.status(500).json({ error: "Failed to fetch milestones" });
  }
});

router.post("/milestones", async (req, res) => {
  try {
    const [row] = await db.insert(milestonesTable).values({ ...req.body, id: randomUUID() }).returning();
    res.json(row);
  } catch (err) {
    req.log.error(err, "Failed to create milestone");
    res.status(500).json({ error: "Failed to create milestone" });
  }
});

router.patch("/milestones/:id", async (req, res) => {
  try {
    const [row] = await db.update(milestonesTable).set({ ...req.body, updatedAt: new Date() }).where(eq(milestonesTable.id, req.params.id)).returning();
    res.json(row);
  } catch (err) {
    req.log.error(err, "Failed to update milestone");
    res.status(500).json({ error: "Failed to update milestone" });
  }
});

router.delete("/milestones/:id", async (req, res) => {
  try {
    await db.delete(milestonesTable).where(eq(milestonesTable.id, req.params.id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err, "Failed to delete milestone");
    res.status(500).json({ error: "Failed to delete milestone" });
  }
});

export default router;
