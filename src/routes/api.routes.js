const { getHealth, getPenghuPeople, getDatabaseTables } = require("../controllers/api.controller");

async function routeRequest(req) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/" || url.pathname === "/health") {
    return getHealth();
  }

  if (url.pathname === "/api/penghu-people") {
    return getPenghuPeople();
  }

  if (url.pathname === "/api/db-tables") {
    return getDatabaseTables();
  }

  return null;
}

module.exports = {
  routeRequest,
};