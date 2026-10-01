import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = path.resolve(root, "../../Site_Truckbem");
const aurora = path.resolve(root, "../Apresentação Aurora");
const out = path.join(root, "public", "media");
const brand = path.join(root, "public", "brand");

await mkdir(out, { recursive: true });
await mkdir(brand, { recursive: true });
await mkdir(path.join(root, "src", "data"), { recursive: true });

async function jpeg(src, dest, width, quality = 74) {
  await sharp(src)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(path.join(out, dest));
  console.log(dest);
}

const frota = path.join(site, "images", "frota");
const gallery = path.join(site, "images", "gallery");

await jpeg(path.join(frota, "caminhao_1.jpg"), "hero.jpg", 1920, 76);
await jpeg(path.join(frota, "caminhao_1.jpg"), "truck.jpg", 1200, 74);
await jpeg(path.join(frota, "Fiorino_4.jpg"), "fiorino.jpg", 1000, 74);
await jpeg(path.join(frota, "Van_3.jpg"), "van.jpg", 1000, 74);
await jpeg(path.join(frota, "Tres_quarto_caminhao_2.jpg"), "tres-quartos.jpg", 1000, 74);
await jpeg(path.join(gallery, "Galpao_1_galeria.jpeg"), "galpao.jpg", 1600, 72);
await jpeg(path.join(gallery, "Galpao_3_galeria.jpeg"), "galpao-racks.jpg", 1400, 72);
await jpeg(path.join(gallery, "Escritorio_4_galeria.png"), "escritorio.jpg", 1400, 74);
await jpeg(path.join(gallery, "Galpao_2_galeria.jpeg"), "operacao.jpg", 1400, 72);

const vuc = path.join(root, "Modelo VUC.jpeg");
const meta = await sharp(vuc).metadata();
const cropWidth = Math.min(850, meta.width ?? 850);
await sharp(vuc)
  .extract({ left: 0, top: 0, width: cropWidth, height: meta.height ?? 800 })
  .resize({ width: 1100, withoutEnlargement: true })
  .jpeg({ quality: 76, mozjpeg: true })
  .toFile(path.join(out, "vuc.jpg"));
console.log("vuc.jpg");

await copyFile(path.join(aurora, "assets", "logo-white.svg"), path.join(brand, "logo-white.svg"));
await copyFile(path.join(aurora, "assets", "logo-navy.svg"), path.join(brand, "logo-navy.svg"));
await copyFile(path.join(aurora, "assets", "clients", "aurora.png"), path.join(out, "aurora.png"));
await copyFile(path.join(site, "favicon.png"), path.join(root, "public", "favicon.png"));
await copyFile(
  path.join(aurora, "assets", "br-states.json"),
  path.join(root, "src", "data", "br-states.json"),
);
console.log("assets copied");
