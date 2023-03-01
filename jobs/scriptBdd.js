const chalk = require("chalk");
const fs = require("fs");
const db = require("../utils/db");
const sleep = require("../utils/sleep");

const scriptBdd = async ({
  sql,
  tableName,
  requestName,
  database,
  description,
  setting,
  unit,
  setting2,
  unit2,
}) => {
  const path = `sql/${database}/${requestName}s/${tableName}${requestName}.sql`;
  const dir = `sql/${database}/${requestName}s`;

  const formatSql = sql.replace(/, undefined/g, "");
  const format2Sql = formatSql.replace(/undefined,/g, "");
  const newSqls = format2Sql.replace(/undefined/g, "");
  const newSql = newSqls.replace(/  /g, " ");
  await sleep(1000);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(
      chalk.black(
        "----------------------------------------------------------------"
      )
    );
    fs.writeFile(path, newSql, function (err) {
      if (err) throw err;
      console.log(chalk.green(`File ${tableName}${requestName}.sql created!`));
    });
  } else {
    fs.writeFile(path, newSql, function (err) {
      if (err) throw err;
      console.log(chalk.green(`File ${tableName}${requestName}.sql created!`));
    });
  }

  await sleep(1000);

  db({ path, database, description, setting, unit, setting2, unit2 });
};

module.exports = scriptBdd;
