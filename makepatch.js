const fs = require("fs-extra");
const { zip } = require("compressing");

(async () => {
  console.log("Making patch file!");
  await fs.ensureDir("./dist/LibearXL/release");
  await fs.ensureDir("./out");
  await fs.copy("./dist/release", "./dist/LibearXL/release/", { mode: "0777" });
  console.log("Compressing!");
  await zip.compressDir("./dist/LibearXL", "./out/patch.zip");
  await fs.remove("./dist/LibearXL");
  console.log("Patch built to output folder.");
})();
