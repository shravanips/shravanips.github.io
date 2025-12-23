import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// project root (Portfolio_1/)
export const ROOT_DIR = path.join(__dirname, "..", "..");

// src/
export const SRC_DIR = path.join(ROOT_DIR, "src");

// src/views
export const VIEWS_DIR = path.join(SRC_DIR, "views");

// src/public
export const PUBLIC_DIR = path.join(SRC_DIR, "public");
