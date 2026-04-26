const { execFile } = require("child_process");
const { promisify } = require("util");
const { getDbConfig } = require("../config/db.config");

const execFileAsync = promisify(execFile);

async function runMysqlQuery(query) {
  const dbConfig = getDbConfig();
  const { stdout } = await execFileAsync(
    "mysql",
    [
      "-h",
      dbConfig.host,
      "-P",
      String(dbConfig.port),
      "-u",
      dbConfig.user,
      "-D",
      dbConfig.database,
      "--batch",
      "--raw",
      "--silent",
      "--skip-column-names",
      "-e",
      query,
    ],
    {
      env: {
        ...process.env,
        MYSQL_PWD: dbConfig.password,
      },
      maxBuffer: 10 * 1024 * 1024,
    }
  );

  return stdout.trim();
}

module.exports = {
  runMysqlQuery,
};