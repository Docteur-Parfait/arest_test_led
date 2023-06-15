const express = require("express");
const app = express();
const port = 3000;

const type = "serial"; // Type de connexion
const path = "COM3"; // Port de connexion de l'Arduino au PC
const speed = 9600; // Vitesse en bits/seconde définie dans le code (Serial.begin)

app.use(express.static(__dirname + "/public"));

// Rest
var rest = require("arest")(app); // Appel à aRest et assignation de l'application Express
rest.addDevice(type, path, speed); // Ajout du device à aREST


app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
