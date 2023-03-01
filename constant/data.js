const { faker } = require("@faker-js/faker");

const command = {
  right: {
    createTable: {
      sql: `CREATE TABLE rights(idright INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(idright), can_repair TINYINT, can_ret TINYINT, can_manage TINYINT)`,
    },
    seed: {
      sql: `INSERT INTO rights (can_repair, can_ret, can_manage) VALUES (1, 1, 1)`,
    },
    tableName: "rights",
  },
  role: {
    createTable: {
      sql: `CREATE TABLE role(idrole INT NOT NULL AUTO_INCREMENT, client TINYINT NOT NULL, admin TINYINT NOT NULL, technician TINYINT NOT NULL, idright INT NOT NULL, PRIMARY KEY (idrole), INDEX (idright), FOREIGN KEY (idright) REFERENCES rights(idright))`,
    },
    seed: {
      sql: `INSERT INTO role (client, admin, technician, idright) VALUES (1, 0, 0, 1)`,
    },
    tableName: "role",
  },
  scooter: {
    createTable: {
      sql: `CREATE TABLE scooter(idscooter INT NOT NULL AUTO_INCREMENT, location VARCHAR(255) NOT NULL, battery INT NOT NULL, availability INT NOT NULL, status VARCHAR(255) NOT NULL, number_of_uses INT NOT NULL, km_traveled INT NOT NULL, PRIMARY KEY (idscooter))`,
    },
    seed: {
      sql: `INSERT INTO scooter (location, battery, availability, status, number_of_uses, km_traveled) VALUES ('saint-denis', '100', '1', 'available', '0', '0')`,
    },
    deleteOutOfService: {
      sql: `DELETE FROM scooter WHERE status = 'outOfService'`,
    },
    request: {
      intervention: {
        sql: `SELECT * FROM scooter WHERE status LIKE 'broken'`,
        description: "scooter in intervention",
        setting: "idscooter",
        unit: "idscooter",
      },
      location: {
        sql: `select * from scooter where location in (select location from user) AND status LIKE 'available'`,
        description: "user in the same location as a scooter",
        setting: "idscooter",
        unit: "idscooter",
      },
      oldScooter: {
        sql: `SELECT status LIKE 'available' FROM scooter WHERE km_traveled > 1000`,
        description: "scooter with more than 1000km",
        setting: "idscooter",
        unit: "idscooter",
      },
    },
    tableName: "scooter",
  },
  user: {
    createTable: {
      sql: `CREATE TABLE user(iduser INT NOT NULL AUTO_INCREMENT, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, location VARCHAR(255) NOT NULL, subscription VARCHAR(255) NOT NULL, age INT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, idrole INT NOT NULL, PRIMARY KEY (iduser), INDEX (idrole), FOREIGN KEY (idrole) REFERENCES role(idrole))`,
    },
    seed: {
      sql: `INSERT INTO user (email, password, phone_number, username, age, first_name, last_name, idrole, location, subscription) VALUES ('${faker.internet.email()}', '${faker.internet.password()}', '${faker.phone.imei()}', '${faker.internet.userName()}', '${faker.datatype.number(
        { max: 100 }
      )}', '${faker.name.firstName()}', '${faker.name.lastName()}', '1', "saint-denis", "Gold")`,
    },
    request: {
      update: {
        sql: `UPDATE user SET email = ?, password = ?, phone_number = ?, username = ?, age = ?, first_name = ?, last_name = ?, idrole = ?, idscooter = ? WHERE iduser = ?`,
      },
      oldPeople: {
        sql: `SELECT COUNT(iduser) FROM user WHERE age > 60`,
        description: "number of old people",
        setting: "COUNT(iduser)",
        unit: "olds peoples",
      },
    },
    tableName: "user",
  },
  bill: {
    createTable: {
      sql: `CREATE TABLE bill(idbill INT NOT NULL AUTO_INCREMENT, creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, price INT NOT NULL, time_spent INT NOT NULL, rental INT NOT NULL, PRIMARY KEY (idbill), iduser INT NOT NULL, INDEX (iduser), FOREIGN KEY (iduser) REFERENCES user(iduser))`,
    },
    seed: {
      sql: `INSERT INTO bill(price, iduser, rental, time_spent) VALUES('200', '1', '0', '60')`,
    },
    request: {
      rentalMonthTotalCost: {
        sql: `select SUM(price) from bill where rental = 1 AND creation_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)`,
        description: "Total cost of all rentals in the last month",
        setting: "SUM(price)",
        unit: "€",
      },
      monthTotalCost: {
        sql: `select SUM(price) from bill where creation_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)`,
        description:
          "Total cost of all rentals and interventions for the last month",
        setting: "SUM(price)",
        unit: "€",
      },
      totalRentalTimeSpent: {
        sql: `SELECT SUM(time_spent) FROM bill WHERE rental = 1 in (select rental from bill)`,
        description: "Total rental time spent",
        setting: "SUM(time_spent)",
        unit: "minutes",
      },
    },
    tableName: "bill",
  },
  warehouse: {
    createTable: {
      sql: `CREATE TABLE warehouse(idwarehouse INT NOT NULL AUTO_INCREMENT, amount_scooter INT NOT NULL, amount_repair INT NOT NULL, location VARCHAR(255) NOT NULL, idscooter INT NOT NULL, PRIMARY KEY (idwarehouse), INDEX (idscooter), FOREIGN KEY (idscooter) REFERENCES scooter(idscooter))`,
    },
    seed: {
      sql: `INSERT INTO warehouse(amount_scooter, amount_repair, location, idscooter) VALUES('10', '30', 'saint-denis', '1')`,
    },
    tableName: "warehouse",
  },
};

module.exports = command;
