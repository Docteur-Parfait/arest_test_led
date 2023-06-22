const config = {
  db: {
    host: process.env.DB_HOST || "localhost",
    name: process.env.DB_NAME || "arest",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    port: process.env.DB_PORT || "3306",
    dialect: process.env.DB_DIALECT || "mysql",
  },
  app: {
    port: process.env.port || "3000",
    clientHost: process.env.CLIENT_HOST || "http://localhost:3000",
  },
};

module.exports = config;
