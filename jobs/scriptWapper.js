const data = require("../constant/data");
const tablesName = require("../constant/tablesName");
const sleep = require("../utils/sleep");
const scriptBdd = require("./scriptBdd");

const scriptWapper = async ({
  params,
  name,
  database,
  email,
  iduser,
  password,
  phone_number,
  username,
  age,
  first_name,
  city,
  last_name,
  idrole,
  table,
  idscooter,
  status,
  subscription,
}) => {
  switch (params) {
    case "createDatabase":
      await scriptBdd({
        sql: `CREATE DATABASE IF NOT EXISTS ${name}`,
        tableName: name,
        requestName: "Database",
        database: "",
      });
      break;
    case "createTable":
      if (name === "all") {
        for (let index = 0; index < tablesName.length; index++) {
          sleep(1000);
          const tableName = tablesName[index];
          await scriptBdd({
            sql: data[tableName].createTable.sql,
            tableName: data[tableName].tableName,
            requestName: "Table",
            database,
          });
        }
        break;
      } else {
        await scriptBdd({
          sql: data[name].createTable.sql,
          tableName: data[name].tableName,
          requestName: "Table",
          database,
        });
        break;
      }
    case "seed":
      if (name === "all") {
        for (let index = 0; index < tablesName.length; index++) {
          sleep(1000);
          const tableName = tablesName[index];
          await scriptBdd({
            sql: data[tableName].seed.sql,
            tableName: data[tableName].tableName,
            requestName: "Seed",
            database,
          });
        }
        break;
      } else if (name === "scooter" && city !== undefined) {
        await scriptBdd({
          sql: `INSERT INTO scooter(location, battery, availability, status, number_of_uses, km_traveled) VALUES ('${city}', 100, 1, '${status}', 0, 0)`,
          tableName: "scooter",
          requestName: "seed",
          database,
        });
        break;
      } else {
        await scriptBdd({
          sql: data[name].seed.sql,
          tableName: data[name].tableName,
          requestName: "Seed",
          database,
        });
        break;
      }
    case "dropDatabase":
      await scriptBdd({
        sql: `DROP DATABASE IF EXISTS ${name}`,
        tableName: name,
        requestName: "DropDatabase",
        database: "",
      });
      break;
    case "request":
      if (table === "bill" && name === "rentalCost") {
        await scriptBdd({
          sql: `select price from bill where rental = 1 AND iduser = ${iduser}`,
          tableName: "Bill",
          requestName: "Request",
          database,
          description: "Total rental cost by user",
          setting: "price",
          unit: "€",
        });
        break;
      } else if (table === "scooter" && name === "brokenScooter") {
        await scriptBdd({
          sql: `SELECT COUNT(idscooter) FROM scooter WHERE location LIKE '${city}' AND status LIKE '${status}'`,
          tableName: "Scooter",
          requestName: "Request",
          database,
          description: "Number of scooter available",
          setting: "COUNT(idscooter)",
          unit: "scooter",
        });
        break;
      } else if (table === "warehouse" && name === "warehouseScooterStatus") {
        await scriptBdd({
          sql: `SELECT amount_scooter, amount_repair FROM warehouse WHERE location LIKE '${city}'`,
          tableName: "Scooter",
          requestName: "Request",
          database,
          description: "Number of scooter available and in repair",
          setting: "amount_scooter",
          unit: "scooters available",
          setting2: "amount_repair",
          unit2: "scooters repair",
        });
        break;
      } else if (table === "scooter" && name === "distancePeopleTravelPlace") {
        await scriptBdd({
          sql: `SELECT ROUND(AVG(km_traveled)), ROUND(AVG(number_of_uses)) FROM scooter WHERE location LIKE '${city}'`,
          tableName: "Scooter",
          requestName: "Request",
          database,
          description:
            "Know the distances that people travel according to the places : ",
          setting: "ROUND(AVG(km_traveled))",
          unit: "km",
          setting2: "ROUND(AVG(number_of_uses))",
          unit2: "number of uses",
        });
        break;
      } else if (table === "scooter" && name === "averageRentalTime") {
        await scriptBdd({
          sql: `SELECT ROUND(AVG(time_spent)) FROM bill where rental = 1 AND iduser = ${iduser}`,
          tableName: "Scooter",
          requestName: "Request",
          database,
          description: "Know the average rental time : ",
          setting: "ROUND(AVG(time_spent))",
          unit: "minutes",
        });
        break;
      } else {
        await scriptBdd({
          sql: data[table].request[name].sql,
          description: data[table].request[name].description,
          tableName: data[table].tableName,
          setting: data[table].request[name].setting,
          unit: data[table].request[name].unit,
          requestName: "Request",
          database,
        });
        break;
      }
    case "updateData":
      if (name === "user") {
        await scriptBdd({
          sql: `UPDATE user SET ${
            email ? `email = '${email}'` : "undefined"
          }, ${password ? `password = '${password}'` : "undefined"}, ${
            age ? `age = '${age}'` : "undefined"
          }, ${
            phone_number ? `phone_number = '${phone_number}'` : "undefined"
          }, ${username ? `username = '${username}'` : "undefined"}, ${
            idrole ? `age = '${idrole}'` : "undefined"
          }, ${first_name ? `first_name = '${first_name}'` : "undefined"}, ${
            last_name ? `last_name = '${last_name}'` : "undefined"
          }, ${city ? `location = '${city}'` : "undefined"}, ${
            subscription ? `subscription = '${subscription}'` : "undefined"
          } WHERE iduser = ${iduser}`,
          tableName: "user",
          requestName: "Request",
          database,
        });
        break;
      } else if (name === "scooter") {
        await scriptBdd({
          sql: `UPDATE scooter SET status = 'repair' WHERE idscooter = ${idscooter}`,
          tableName: "user",
          requestName: "Update",
          database,
        });
        break;
      }
    case "deleteOutOfService":
      await scriptBdd({
        sql: data[name].deleteOutOfService.sql,
        tableName: data[name].tableName,
        requestName: "DeleteTable",
        database,
      });
  }
};

module.exports = scriptWapper;
