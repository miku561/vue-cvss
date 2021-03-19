const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("examples"))
      .set("{vue-cvss}/packages", resolve("packages"))
      .set("{vue-cvss}/lib", resolve("lib"));
  },
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  css: { extract: false }
};