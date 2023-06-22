const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("arest", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Création des tables

// Table Pin
const Pin = sequelize.define("pin", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  etat: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Table Devices
const Device = sequelize.define("device", {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Pin.hasMany(Device);
Device.belongsTo(Pin);

// Synchronisez le modèle avec la base de données pour créer la table correspondante

Pin.sync()
  .then(() => {
    console.log("La table pin a été créée avec succès");
  })
  .catch((error) => {
    console.error("Erreur lors de la création de la table pin:", error);
  });

Device.sync()
  .then(() => {
    console.log("La table device a été créée avec succès");
  })
  .catch((error) => {
    console.error("Erreur lors de la création de la table device:", error);
  });
