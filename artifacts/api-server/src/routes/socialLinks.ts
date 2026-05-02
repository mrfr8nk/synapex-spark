import { Router } from "express";
import { db, socialLinksTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { randomUUID } from "crypto";

const router = Router();

router.get("/social-links", async (req, res) => {
  try {
    const rows = await db.select().from(socialLinksTable).orderBy(asc(socialLinksTable.sortOrder));
    res.json(rows);
  } catch (err) {
    req.log.error(err, "Failed to fetch social links");
    res.status(500).json({ error: "Failed to fetch social links" });
  }
});

router.post("/social-links", async (req, res) => {
  try {
    const [row] = await db.insert(socialLinksTable).values({ ...req.body, id: randomUUID() }).returning();
    res.json(row);
  } catch (err) {
    req.log.error(err, "Failed to create social link");
    res.status(500).json({ error: "Failed to create social link" });
  }
});

router.patch("/social-links/:id", async (req, res) => {
  try {
    const [row] = await db.update(socialLinksTable).set({ ...req.body, updatedAt: new Date() }).where(eq(socialLinksTable.id, req.params.id)).returning();
    res.json(row);
  } catch (err) {
    req.log.error(err, "Failed to update social link");
    res.status(500).json({ error: "Failed to update social link" });
  }
});

router.delete("/social-links/:id", async (req, res) => {
  try {
    await db.delete(socialLinksTable).where(eq(socialLinksTable.id, req.params.id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err, "Failed to delete social link");
    res.status(500).json({ error: "Failed to delete social link" });
  }
});

export default router;
