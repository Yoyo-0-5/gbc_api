const http = require("http");
const { handleRequest } = require("./src/app");

const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Penghu People API is running at http://localhost:${PORT}`);
});
