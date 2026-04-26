const {
  readDatabaseTableByName,
} = require("../services/databaseTables.service");
const { getDbConfig } = require("../config/db.config");

function getHealth() {
  return {
    statusCode: 200,
    body: {
      status: "ok",
      message: "API is running",
      endpoints: [
        "/api/bus-passenger-transport-operation",
        "/api/flight-schedule",
        "/api/local-population",
        "/api/tourist-statistics",
        "/api/highway",
        "/api/port",
        "/api/sheet3",
      ],
    },
  };
}

async function getDatabaseTableByName(tableName) {
  const table = await readDatabaseTableByName(tableName);

  if (table === null) {
    return {
      statusCode: 404,
      body: {
        status: "error",
        message: `Table '${tableName}' not found`,
      },
    };
  }

  return {
    statusCode: 200,
    body: {
      status: "success",
      database: getDbConfig().database,
      tableName,
      rows: table,
    },
  };
}

async function getHighway() {
  return getDatabaseTableByName("highway");
}

async function getPort() {
  return getDatabaseTableByName("port");
}

async function getSheet3() {
  return getDatabaseTableByName("sheet3");
}

async function getBusPassengerTransportOperation() {
  return getDatabaseTableByName("Bus_passenger_transport_operation");
}

async function getFlightSchedule() {
  return getDatabaseTableByName("Flight_schedule");
}

async function getLocalPopulation() {
  return getDatabaseTableByName("Local_population");
}

async function getTouristStatistics() {
  return getDatabaseTableByName("Tourist_statistics");
}

module.exports = {
  getHealth,
  getDatabaseTableByName,
  getBusPassengerTransportOperation,
  getFlightSchedule,
  getLocalPopulation,
  getTouristStatistics,
  getHighway,
  getPort,
  getSheet3,
};