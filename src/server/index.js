const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const history = require("connect-history-api-fallback");
// const favicon = require("serve-favicon");
const cors = require("cors");

const configs = require("../../webpack.dev.config");
const db = require("./database");
// const schema = require("./data/schema").default;

const { userController } = require("./controllers");
const { postController } = require("./controllers");

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.info("database connected");
});

const server = express();

const compiler = webpack(configs);
const PORT = process.env.PORT || 3000;
const STATIC_PATH = process.env.STATIC_PATH || "/public";
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
server.post("/users/authenticate", userController.getUserByCredentials);
server.post("/users/register", userController.createUser);
server.get("/users/:id?", userController.getUserById);
server.get("/posts/:id?", postController.getPostById);

server.listen(PORT, () => {
  console.info(`Server started on http://localhost:${PORT}`);
});
