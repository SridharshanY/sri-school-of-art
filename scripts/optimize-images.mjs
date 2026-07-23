import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageDir = path.join(process.cwd(), "public", "images");
const files = (await readdir(imageDir)).filter((file) => file.endsWith(".png"));

for (const file of files) {
  const input = path.join(imageDir, file);
  const output = path.join(imageDir, file.replace(/\.png$/i, ".webp"));
  await sharp(input)
    .resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true
    })
    .webp({ quality: 84, effort: 5 })
    .toFile(output);
  const inputSize = (await stat(input)).size;
  const outputSize = (await stat(output)).size;
  console.log(
    `${file}: ${(inputSize / 1024).toFixed(0)} KB → ${(outputSize / 1024).toFixed(0)} KB`
  );
}
