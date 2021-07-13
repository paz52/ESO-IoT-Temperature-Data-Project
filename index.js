const express = require('express')
const app = express()
const port = 3000;
const Sequelize = require('sequelize')
const dbOptions = {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "mapa",
    password: "password",
    database: "core",
  };
  
const sequelize = new Sequelize(dbOptions);

app.use(express.json());

const pageRoutes = require("./routes/pagesRoutes.js")(app, sequelize)
const cameraRoutes = require("./routes/cameraRoutes.js")(app, sequelize)
const temperatureDataRoutes = require("./routes/temperatureDataRoutes.js")(app, sequelize)
const dailyDataRoutes = require("./routes/dailyDataRoutes.js")(app, sequelize)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))