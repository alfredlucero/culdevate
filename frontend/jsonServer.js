const jsonServer = require("json-server");
const jsonServerDb = require("./jsonServerDb.js");
const jsonServerDbData = jsonServerDb();
const server = jsonServer.create();
const router = jsonServer.router(jsonServerDbData);
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.get("/recaps", function(req, res, next) {
  const mock = req.query.mock || "";

  switch (mock) {
    case "404_error":
      res.status(404).jsonp({ message: "404 Not Found" });
      break;
    case "500_error":
      res.status(500).jsonp({ message: "500 Internal Server Error" });
      break;
    case "none":
      res.status(200).jsonp([]);
      break;
    case "few":
      const { recaps } = jsonServerDbData;
      res.status(200).jsonp(recaps.slice(0, 2));
      break;
    default:
      // Default router.render will handle returning of recaps data
      next();
  }
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Use default router and start up json-server on port 3000
server.use(router);
const mockApiPort = 4567;
server.listen(mockApiPort, () => {
  console.log(`Culdevate Mock API JSON Server is running on port ${mockApiPort}!`);
});
