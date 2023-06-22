const express = require("express");
const http = require("http");
const { Sequelize, Model, DataTypes } = require("sequelize");
const app = express();
const port = 3000;
const ip_adress = "192.168.0.134";

const type = "serial"; // Type de connexion
const path = "COM5"; // Port de connexion de l'Arduino au PC
const speed = 9600; // Vitesse en bits/seconde définie dans le code (Serial.begin)

app.use(express.static(__dirname + "/public"));

// Rest
var rest = require("arest")(app); // Appel à aRest et assignation de l'application Express
rest.addDevice(type, path, speed); // Ajout du device à aREST

// Connexion mysql avec sequelize
const sequelize = new Sequelize("arest", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Definiton des models
class Pin extends Model {}
class Device extends Model {}

Pin.init(
  {
    type: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    etat: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "pin",
  }
);

Device.init(
  {
    nom: DataTypes.STRING,
    icon: DataTypes.INTEGER,
    pinId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "device",
  }
);

Pin.hasMany(Device);
Device.belongsTo(Pin);

// CRUD operations
// AJouter un pin
app.post("/add-pin", (req, res) => {
  console.log(req.query);
  const { type, numero, etat } = req.query; // Récupérer les données depuis le corps de la requête

  Pin.create({
    type,
    numero,
    etat,
  })
    .then((pin) => {
      console.log("Pin créé avec succès:", pin);
      res.json({ success: true, message: "Pin ajouté avec succès" });
    })
    .catch((error) => {
      console.error("Erreur lors de la création du pin:", error);
      res
        .status(500)
        .json({ success: false, message: "Erreur lors de la création du pin" });
    });
});

// Recuperer les pins
// Définissez la route pour récupérer les pins
app.get("/pins", (req, res) => {
  Pin.findAll()
    .then((pins) => {
      res.json(pins);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des pins:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des pins" });
    });
});

// Recuperer un pin
app.post("/pin", (req, res) => {
  //    console.log(req);
  const { numero, type } = req.query;

  Pin.findOne({ where: { numero: numero, type: type } })
    .then((pin) => {
      if (pin) {
        res.json(pin);
      } else {
        res.status(404).json({ message: "Pin non trouvé" });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du pin :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du pin" });
    });
});

app.post("/pin-update", function (req, res) {
  const { id, etat, numero } = req.query;
  console.log(req.query);
  Pin.update({ etat: etat }, { where: { id: id } })
    .then((result) => {
      const url = "http://" + ip_adress + ":3000/my-endpoint";
      // Envoi à la carte arduino
      http
        .get(
          "http://" + ip_adress + ":3000/2/digital/" + numero + "/" + etat,
          (res) => {
            let data = "";

            res.on("data", (chunk) => {
              data += chunk;
            });

            res.on("end", () => {
              // Traitez les données de réponse ici
              console.log(data);
            });
          }
        )
        .on("error", (error) => {
          console.error("Erreur lors de la requête :", error);
        });
      console.log("Pin mis à jour avec succès:", result);
      res.json(result);
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour du Pin:", error);
    });
});

// Ajouter des devices

app.post("/add-device", (req, res) => {
  console.log(req.query);
  const { nom, icon, pinId } = req.query; // Récupérer les données depuis le corps de la requête

  Device.create({
    nom,
    icon,
    pinId,
  })
    .then((pin) => {
      console.log("Device créé avec succès:", pin);
      res.json({ success: true, message: "Device ajouté avec succès" });
    })
    .catch((error) => {
      console.error("Erreur lors de la création du device:", error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création du device",
      });
    });
});

// Recuperer la liste des devices de la base de données
app.get("/get-devices", (req, res) => {
  Device.findAll({
    include: {
      model: Pin, // Modèle de la broche
    },
  })
    .then((devices) => {
      res.json(devices);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des devices:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des devices" });
    });
});

// Recuperer un device de la base de données
app.post("/one-device", (req, res) => {
  //    console.log(req);
  const { id } = req.query;

  Device.findByPk(id, {
    include: Pin, // Inclure le modèle Pin
  })
    .then((device) => {
      if (device) {
        res.json(device);
      } else {
        res.status(404).json({ message: "Device non trouvé" });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du device :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du device" });
    });
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, ip_adress, () =>
  console.log(`Example app listening on port ${port}!`)
);
