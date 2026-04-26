const { runMysqlQuery } = require("../utils/mysql-client");
const { escapeIdentifier, escapeSqlString } = require("../utils/sql-escape");
const { getDbConfig } = require("../config/db.config");

async function getDatabaseTableNames() {
  const dbConfig = getDbConfig();
  const query = [
    "SELECT TABLE_NAME",
    "FROM INFORMATION_SCHEMA.TABLES",
    `WHERE TABLE_SCHEMA = ${escapeSqlString(dbConfig.database)}`,
    "AND TABLE_TYPE = 'BASE TABLE'",
    "ORDER BY TABLE_NAME",
  ].join(" ");

  const output = await runMysqlQuery(query);

  if (!output) {
    return [];
  }

  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

async function getTableColumns(tableName) {
  const dbConfig = getDbConfig();
  const query = [
    "SELECT COLUMN_NAME",
    "FROM INFORMATION_SCHEMA.COLUMNS",
    `WHERE TABLE_SCHEMA = ${escapeSqlString(dbConfig.database)}`,
    `AND TABLE_NAME = ${escapeSqlString(tableName)}`,
    "ORDER BY ORDINAL_POSITION",
  ].join(" ");

  const output = await runMysqlQuery(query);

  if (!output) {
    return [];
  }

  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

async function readTable(tableName) {
  const columns = await getTableColumns(tableName);

  if (columns.length === 0) {
    return [];
  }

  const jsonObjectParts = columns
    .map((columnName) => `${escapeSqlString(columnName)}, ${escapeIdentifier(columnName)}`)
    .join(", ");

  const query = `SELECT COALESCE(JSON_ARRAYAGG(JSON_OBJECT(${jsonObjectParts})), JSON_ARRAY()) AS payload FROM ${escapeIdentifier(tableName)};`;
  const output = await runMysqlQuery(query);

  if (!output) {
    return [];
  }

  return JSON.parse(output);
}

async function readDatabaseTables() {
  const tableNames = await getDatabaseTableNames();
  const entries = await Promise.all(
    tableNames.map(async (tableName) => [tableName, await readTable(tableName)])
  );

  return Object.fromEntries(entries);
}

module.exports = {
  readDatabaseTables,
};