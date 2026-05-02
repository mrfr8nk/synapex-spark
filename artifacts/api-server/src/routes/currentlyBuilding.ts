import { Router } from "express";
import { db, currentlyBuildingTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { randomUUID } from "crypto";

const router = Router();

router.get("/currently-building", async (req, res) => {
  try {
    const rows = await db.select().from(currentlyBuildingTable).orderBy(asc(currentlyBuildingTable.sortOrder));
    res.json(rows);
  } catch (err) {
    req.log.error(err, "Failed to fetch currently building");
    res.status(500).json({ error: "Failed to fetch currently building" });
  }
});

router.post("/currently-building", async (req, res) => {
  try {
    const [row] = await db.insert(currentlyBuildingTable).values({ ...req.body, id: randomUUID() }).returning();
    res.json(row);
  } catch (err) {
    req.log.error(err, "Failed to create currently building");
    res.status(500).json({ error: "Failed to create currently building" });
  }
});

router.patch("/currently-building/:id", async (req, res) => {
  try {
    const [row] = await db.update(currentlyBuildingTable).set({ ...req.body, updatedAt: new Date() }).where(eq(currentlyBuildingTable.id, req.params.id)).returning();
    res.json(row);
  } catch (err) {
    req.log.error(err, "Failed to update currently building");
    res.status(500).json({ error: "Failed to update currently building" });
  }
});

router.delete("/currently-building/:id", async (req, res) => {
  try {
    await db.delete(currentlyBuildingTable).where(eq(currentlyBuildingTable.id, req.params.id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err, "Failed to delete currently building");
    res.status(500).json({ error: "Failed to delete currently building" });
  }
});

export default router;
