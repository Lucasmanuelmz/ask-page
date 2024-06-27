const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("Questions", "root", "4026.Test@Lucas#Manuel", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    return "Conectado com sucesso!";
  })
  .catch((err) => {
    return err;
  });

module.exports = sequelize;
