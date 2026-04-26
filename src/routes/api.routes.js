const {
  getHealth,
  getBusPassengerTransportOperation,
  getFlightSchedule,
  getLocalPopulation,
  getTouristStatistics,
  getHighway,
  getPort,
  getSheet3,
} = require("../controllers/api.controller");

async function routeRequest(req) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/" || url.pathname === "/health") {
    return getHealth();
  }

  if (url.pathname === "/api/highway") {
    return getHighway();
  }

  if (url.pathname === "/api/port") {
    return getPort();
  }

  if (url.pathname === "/api/sheet3") {
    return getSheet3();
  }

  if (url.pathname === "/api/bus-passenger-transport-operation") {
    return getBusPassengerTransportOperation();
  }

  if (url.pathname === "/api/flight-schedule") {
    return getFlightSchedule();
  }

  if (url.pathname === "/api/local-population") {
    return getLocalPopulation();
  }

  if (url.pathname === "/api/tourist-statistics") {
    return getTouristStatistics();
  }

  return null;
}

module.exports = {
  routeRequest,
};