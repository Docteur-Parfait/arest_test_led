
# Documentation du package aRest

Version : 0.4.0

Le package aRest permet de communiquer avec le module aREST d'Arduino pour envoyer des requêtes vers Arduino.

## Installation

Pour installer le package, exécutez la commande suivante :


`npm i https://github.com/tidd-africa/node-aREST.git` 

## Utilisation

Pour utiliser le package aRest, suivez les étapes ci-dessous :



    const express = require("express");
    const app = express();
    const port = 3000;
    
    const type = "serial"; // Type de connexion
    const path = "COM3"; // Port de connexion de l'Arduino au PC
    const speed = 9600; // Vitesse en bits/seconde définie dans le code (Serial.begin)
    
    // Rest
    var rest = require("arest")(app); // Appel à aRest et assignation de l'application Express
    rest.addDevice(type, path, speed); // Ajout du device à aREST
    
    app.get("/", (req, res) => res.send("Hello World!"));
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));

## Routes disponibles

<br>
<br>

> ### Récupérer tous les devices

**URL :** `http://localhost:3000/devices`

Cette route permet de récupérer la liste de tous les devices connectés.

Exemple de requête :

`GET /devices` 

<br>
<br>

> ### Commande

**URL :** `http://localhost:3000/:device/:command`

Cette route permet d'envoyer une commande spécifique à un device.

-   `:device` : Nom du device auquel envoyer la commande.
-   `:command` : Commande à envoyer.

Exemple de requête :

`GET /device1/command1` 

<br>
<br>

> ### Écriture digitale

**URL :** `http://localhost:3000/:device/digital/:pin/:value`

Cette route permet d'écrire une valeur digitale sur une broche spécifique d'un device.

-   `:device` : Nom du device sur lequel effectuer l'écriture digitale.
-   `:pin` : Numéro de la broche à contrôler.
-   `:value` : Valeur à écrire (0 ou 1).

Exemple de requête :

`GET /device1/digital/3/1` 

<br>
<br>

> ### Lecture analogique

**URL :** `http://localhost:3000/:device/analog/:pin`

Cette route permet de lire la valeur analogique d'une broche spécifique d'un device.

-   `:device` : Nom du device sur lequel effectuer la lecture analogique.
-   `:pin` : Numéro de la broche à lire.

Exemple de requête :

`GET /device1/analog/0` 

<br>
<br>

> ### Écriture analogique

**URL :** `http://localhost:3000/:device/analog/:pin/:value`

Cette route permet d'écrire une valeur analogique sur une broche spécifique d'un device.

-   `:device` : Nom du device sur lequel effectuer l'écriture analogique.
-   `:pin` : Numéro de la broche à contrôler.
-   `:value` : Valeur à écrire (entre 0 et 255).

Exemple de requête :

`GET /device1/analog/5/120` 

<br>
<br>

> ### Lecture digitale

**URL :** `http://localhost:3000/:device/digital/:pin`

Cette route permet de lire la valeur digitale d'une broche spécifique d'un device.

-   `:device` : Nom du device sur lequel effectuer la lecture digitale.
-   `:pin` : Numéro de la broche à lire.

Exemple de requête :

`GET /device1/digital/2` 

<br>
<br>

> ### Mode

**URL :** `http://localhost:3000/:device/mode/:pin/:value`

Cette route permet de définir le mode d'une broche spécifique d'un device.

-   `:device` : Nom du device sur lequel définir le mode.
-   `:pin` : Numéro de la broche à configurer.
-   `:value` : Mode de la broche (INPUT, OUTPUT ou INPUT_PULLUP).

Exemple de requête :

`GET /device1/mode/4/OUTPUT` 

<br>
<br>

> ### Capture d'image (pour RPi)

**URL :** `http://localhost:3000/:device/camera/snapshot`

Cette route permet de capturer une image à partir d'un appareil photo (pour Raspberry Pi).

-   `:device` : Nom du device sur lequel effectuer la capture d'image.

Exemple de requête :

    enter code here
    GET /device1/camera/snapshot

 

Ceci conclut la documentation du package aRest. Utilisez les différentes routes pour interagir avec les devices connectés à Arduino
| D |O  |
|--|--|
| C |  P|

