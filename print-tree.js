const fs = require("fs");
const path = require("path");

const IGNORE_DIRS = ["node_modules", "dist", ".git"];
const MAX_DEPTH = 3;

function printTree(dir, depth = 0) {
  if (depth > MAX_DEPTH) return;
  const files = fs.readdirSync(dir);
  files.forEach((file, index) => {
    if (IGNORE_DIRS.includes(file)) return;
    const filePath = path.join(dir, file);
    const isLast = index === files.length - 1;
    const stats = fs.statSync(filePath);
    const prefix =
      depth > 0 ? "│  ".repeat(depth - 1) + (isLast ? "└─ " : "├─ ") : "";

    console.log(prefix + file);
    if (stats.isDirectory()) {
      printTree(filePath, depth + 1);
    }
  });
}

console.log("项目结构：\n");
printTree(process.cwd());
