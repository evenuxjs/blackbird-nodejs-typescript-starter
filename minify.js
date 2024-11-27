import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { minify } from "uglify-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, "dist");

async function minifyFiles(dirPath) {
  const files = await fs.promises.readdir(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = await fs.promises.lstat(filePath);

    if (stat.isDirectory()) {
      await minifyFiles(filePath);
    } else if (path.extname(file) === ".js") {
      const code = await fs.promises.readFile(filePath, "utf8");
      const result = minify(code);
      if (result.error) {
        console.log("Error minifying " + filePath + ": ", result.error);
      } else {
        await fs.promises.writeFile(filePath, result.code, "utf8");
        console.log("Minified " + filePath);
      }
    }
  }
}

minifyFiles(directoryPath).catch((err) => console.error(err));
