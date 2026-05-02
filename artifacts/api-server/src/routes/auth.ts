import { Router } from "express";
import type { Request, Response } from "express";
import { db, adminUsersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET environment variable is required");
  return secret;
}

function getAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET environment variable is required");
  return secret;
}

router.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) return res.status(400).json({ error: "Missing credentials" });
  try {
    const [user] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.email, email));
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, email: user.email, role: "admin" }, getJwtSecret(), { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/auth/register", async (req: Request, res: Response) => {
  const { email, password, secret } = req.body as { email?: string; password?: string; secret?: string };
  try {
    if (secret !== getAdminSecret()) {
      return res.status(403).json({ error: "Invalid admin secret" });
    }
  } catch {
    return res.status(503).json({ error: "Admin registration is not configured on this server" });
  }
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  try {
    const existing = await db.select().from(adminUsersTable).where(eq(adminUsersTable.email, email));
    if (existing.length > 0) return res.status(409).json({ error: "User already exists" });
    const passwordHash = await bcrypt.hash(password, 12);
    const [user] = await db.insert(adminUsersTable).values({ id: crypto.randomUUID(), email, passwordHash }).returning();
    const token = jwt.sign({ id: user.id, email: user.email, role: "admin" }, getJwtSecret(), { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/auth/me", (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Not authenticated" });
  try {
    const payload = jwt.verify(auth.slice(7), getJwtSecret()) as { id: string; email: string; role: string };
    res.json({ user: { id: payload.id, email: payload.email, role: payload.role } });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
