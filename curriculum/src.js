// Curriculum source: merges per-course part files. Build with `node tools/build-curriculum.js`.
const fs = require("fs"), path = require("path");
const dir = path.join(__dirname, "parts"), out = {};
for (const f of fs.readdirSync(dir).sort()) if (f.endsWith(".js")) Object.assign(out, require(path.join(dir, f)));
module.exports = out;
