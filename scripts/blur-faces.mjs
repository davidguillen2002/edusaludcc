/**
 * One-off image privatiser.
 *
 * Reads the original group photo (Nosotros / trayectoria) and writes
 * a face-anonymised version with a strong gaussian blur. Faces are
 * spread across the frame, so a uniform blur is the safest privacy
 * approach — the composition and warmth of the group photo remain
 * legible, individuals do not.
 *
 * Run with:  node scripts/blur-faces.mjs
 *
 * Output:    public/img/edusaludcc/about-grupo-diplomas-private.jpg
 */

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const SRC = path.join(root, "public/img/edusaludcc/about-grupo-diplomas.jpg");
const OUT = path.join(root, "public/img/edusaludcc/about-grupo-diplomas-private.jpg");

const SIGMA = 14;      // gaussian sigma — high enough to anonymise faces
const QUALITY = 86;    // jpeg quality of output (keeps it sharp visually post-blur)

await sharp(SRC)
  .blur(SIGMA)
  .modulate({ saturation: 0.92, brightness: 1.02 })
  .jpeg({ quality: QUALITY, mozjpeg: true })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(
  `[blur-faces] wrote ${OUT}\n  ${meta.width}x${meta.height} · ${(meta.size ?? 0) / 1024} kB`
);
