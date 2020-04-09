const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const history = require("connect-history-api-fallback");
// const favicon = require("serve-favicon");
const cors = require("cors");

const configs = require("../../webpack.dev.config");
const db = require("./database");
const { userRoute, postRoute } = require("./routes");
const { authMiddleware } = require("./middlewares");

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.info("database connected");
});

const server = express();
const compiler = webpack(configs);
const { env } = process;

const PORT = env.PORT || 3000;
const STATIC_PATH = env.STATIC_PATH || "/public";
// const HTML_DIR = join(compiler.outputPath, "index.html");

// server.use(favicon(resolve(__dirname, "../public/favicon.ico")));
server.use(express.static(STATIC_PATH));
server.use(history());
server.use(
  webpackDevMiddleware(compiler, {
    publicPath: "/",
    stats: {
      colors: true,
      children: false,
      entrypoints: false,
      modules: false,
    },
  })
);
server.use(cors());
server.use(express.json());

// server.get("/", (_, res, next) => {
//   compiler.outputFileSystem.readFile(HTML_DIR, (err, result) => {
//     if (!!err === false) {
//       res.set("content-type", "text/html");
//       res.send(result);
//       res.end();
//     }

//     return next(err);
//   });
// });
server.use("/users", userRoute);
server.use("/posts", authMiddleware, postRoute);

server.listen(PORT, () => {
  console.info(`Server started on http://localhost:${PORT}`);
});
