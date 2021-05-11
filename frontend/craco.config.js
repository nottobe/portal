const { DefinePlugin } = require("webpack");
const fs = require("fs");

const configFiles = [
  process.env.CONFIG_FILE,
  process.env.NODE_ENV === "production"
    ? "src/config.prod.json"
    : "src/config.dev.json",
  "src/config.json",
].filter((x) => x && fs.existsSync(x));

const config = JSON.parse(fs.readFileSync(configFiles[0], "utf8"));

module.exports = {
  webpack: {
    plugins: [
      new DefinePlugin({
        "process.env.CONFIG": JSON.stringify(config),
      }),
    ],
  },
  plugins: [{ plugin: require("@semantic-ui-react/craco-less") }],
};
