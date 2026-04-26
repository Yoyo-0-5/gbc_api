const { readPenghuPeopleFile } = require("../services/penghuPeople.service");
const { readDatabaseTables } = require("../services/databaseTables.service");
const { getDbConfig } = require("../config/db.config");

function getHealth() {
  return {
    statusCode: 200,
    body: {
      status: "ok",
      message: "API is running",
      endpoints: ["/api/penghu-people", "/api/db-tables"],
    },
  };
}

async function getPenghuPeople() {
  const payload = await readPenghuPeopleFile();

  return {
    statusCode: 200,
    body: payload,
  };
}

async function getDatabaseTables() {
  const tables = await readDatabaseTables();

  return {
    statusCode: 200,
    body: {
      status: "success",
      database: getDbConfig().database,
      tables,
    },
  };
}

module.exports = {
  getHealth,
  getPenghuPeople,
  getDatabaseTables,
};