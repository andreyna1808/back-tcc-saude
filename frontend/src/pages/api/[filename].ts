import fs from "fs";
import path from "path";

export default function handler(req: any, res: any) {
  const { filename } = req.query;

  const filePath = path.join(
    process.cwd(),
    "..",
    "backend",
    "uploads",
    filename
  );

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    const partes = filePath.split(".");
    const extensao = partes[partes.length - 1];

    res.setHeader("Content-Type", `image/${extensao}`);
    res.send(fileBuffer);
  } else {
    res.status(404).send("Image not found");
  }
}
