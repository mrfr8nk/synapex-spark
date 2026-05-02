import { Router } from "express";
import { db } from "@workspace/db";
import { siteSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/site-settings", async (req, res) => {
  try {
    const rows = await db.select().from(siteSettingsTable);
    const map: Record<string, string> = {};
    rows.forEach((r) => { map[r.key] = r.value; });
    res.json(map);
  } catch (err) {
    req.log.error(err, "Failed to fetch site settings");
    res.status(500).json({ error: "Failed to fetch site settings" });
  }
});

router.post("/site-settings", async (req, res) => {
  try {
    const updates = req.body as Record<string, string>;
    for (const [key, value] of Object.entries(updates)) {
      await db.insert(siteSettingsTable).values({ key, value }).onConflictDoUpdate({
        target: siteSettingsTable.key,
        set: { value, updatedAt: new Date() },
      });
    }
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err, "Failed to update site settings");
    res.status(500).json({ error: "Failed to update site settings" });
  }
});

export default router;
