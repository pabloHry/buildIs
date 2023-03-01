const chalk = require("chalk");
const Runner = require("run-my-sql-file");

const db = ({
  path,
  database,
  description,
  setting,
  unit,
  setting2,
  unit2,
}) => {
  Runner.connectionOptions({
    host: "localhost",
    database,
    user: "root",
    password: "password",
    multipleStatements: true,
    connectionLimit: 10,
  });

  Runner.runFile(path, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      if (results["fieldCount"] !== 0) {
        console.log(
          chalk.black(
            "----------------------------------------------------------------"
          )
        );
        if (results.length === 0) {
          console.log(
            chalk.yellow(description + " : " + chalk.white("0 " + unit))
          );
        }
        for (let index = 0; index < results.length; index++) {
          const element = results[index];
          if (setting2 === undefined) {
            console.log(
              chalk.yellow(
                description + " : " + chalk.white(element[setting] + " " + unit)
              )
            );
          } else {
            console.log(
              chalk.yellow(
                description +
                  " : " +
                  chalk.white(
                    element[setting] +
                      " " +
                      unit +
                      " " +
                      element[setting2] +
                      " " +
                      unit2
                  )
              )
            );
          }
        }
      }

      console.log(
        chalk.black(
          "----------------------------------------------------------------"
        )
      );
      console.log(chalk.blue("Script executed successfully!"));
      console.log(
        chalk.black(
          "----------------------------------------------------------------"
        )
      );
    }
  });
};

module.exports = db;
