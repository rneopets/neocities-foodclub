const fs = require("fs");
const path = require("path");
const terser = require("terser");
const csso = require("csso");

const distDir = path.join(__dirname, "public");
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

const minifyJS = (inp, out) => {
  const content = fs.readFileSync(inp, "utf8");
  const result = terser.minify_sync(content, {
    compress: { drop_console: false, passes: 2 },
    format: { comments: false },
  });
  fs.writeFileSync(out, result.code);
  console.log(`✓ ${inp}`);
};

const minifyCSS = (inp, out) => {
  const content = fs.readFileSync(inp, "utf8");
  const result = csso.minify(content, { restructure: true, comments: false });
  fs.writeFileSync(out, result.css);
  console.log(`✓ ${inp}`);
};

const minifyHTML = (inp, out) => {
  const content = fs.readFileSync(inp, "utf8");
  const result = content
    .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
    .replace(/>\s+</g, "><") // Remove whitespace between tags
    .replace(/^\s+|\s+$/gm, ""); // Remove leading/trailing whitespace
  fs.writeFileSync(out, result);
  console.log(`✓ ${inp}`);
};

console.log("Building...\n");
const srcDir = path.join(__dirname, "src");

const files = [
  { src: "neofoodclub.js", out: "neofoodclub.min.js" },
  { src: "scripts.js", out: "scripts.js" },
  { src: "style.css", out: "style.css" },
  { src: "index.html", out: "index.html" },
];

for (const file of files) {
  const srcPath = path.join(srcDir, typeof file === "string" ? file : file.src);
  const outName = typeof file === "string" ? path.basename(file) : file.out;
  if (fs.existsSync(srcPath)) {
    const outPath = path.join(distDir, outName);
    if (outName.endsWith(".js")) {
      minifyJS(srcPath, outPath);
    } else if (outName.endsWith(".css")) {
      minifyCSS(srcPath, outPath);
    } else if (outName.endsWith(".html")) {
      minifyHTML(srcPath, outPath);
    }
  }
}

console.log("\n✓ Done!");
