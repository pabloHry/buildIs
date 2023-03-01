const { program } = require("commander");
const scriptWapper = require("./jobs/scriptWapper");
const sleep = require("./utils/sleep");

(async () => {
  program.option("-c, --createTable <type>", "Create tables");
  program.option("-u, --updateData <type>", "Update data");
  program.option("-d, --createDatabase <type>", "Create database");
  program.option("-drop, --dropDatabase <type>", "Drop database");
  program.option("-s, --seed <type>", "Seed tables");
  program.option("-r, --request <type>", "Request");
  program.option("-db, --database <type>", "database name");
  program.option("-e, --email <type>", "email");
  program.option("-pass, --password <type>", "password");
  program.option("-id, --iduser <type>", "iduser");
  program.option("-last, --lastName <type>", "name");
  program.option("-first, --firstName <type>", "name");
  program.option("-age, --age <type>", "age");
  program.option("-idrole, --idrole <type>", "idrole");
  program.option("-idscooter, --idscooter <type>", "idscooter");
  program.option("-phone, --phone <type>", "phone");
  program.option("-username, --username <type>", "username");
  program.option("-subscription, --subscription <type>", "subscription");
  program.option("-table, --table <type>", "table name");
  program.option("-city, --city <type>", "city name");
  program.option("-status, --status <type>", "status name");
  program.option(
    "-deleteOutOfService, --deleteOutOfService <type>",
    "deleteOutOfService"
  );
  program.option("-repair, --repair", "repair");
  program.parse();

  for (const [params, name] of Object.entries(program.opts())) {
    scriptWapper({
      params,
      name,
      database: program.opts().database,
      email: program.opts()?.email,
      password: program.opts()?.password,
      idrole: program.opts()?.idrole,
      idscooter: program.opts()?.idscooter,
      phone_number: program.opts()?.phone,
      username: program.opts()?.username,
      age: program.opts()?.age,
      first_name: program.opts()?.firstName,
      last_name: program.opts()?.lastName,
      iduser: program.opts()?.iduser,
      subscription: program.opts()?.subscription,
      table: program.opts()?.table,
      city: program.opts()?.city,
      status: program.opts()?.status,
    });
  }
})();
