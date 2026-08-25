import "dotenv/config";
import { db } from "../src/db/db.js";
import { admin } from "../src/db/schema.js";
import bcrypt from "bcrypt";

async function createAdmin() {
  const name = process.argv[2];
  const email = process.argv[3];
  const password = process.argv[4];

  if (!name || !email || !password) {
    console.error("Usage: node scripts/create-admin.js <name> <email> <password>");
    process.exit(1);
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const [created] = await db
      .insert(admin)
      .values({ name, email, passwordHash })
      .returning({ id: admin.id, name: admin.name, email: admin.email });

    console.log("Admin created:", created);
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error);
    process.exit(1);
  }
}

createAdmin();