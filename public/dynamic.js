$(document).ready(function () {
  getDevices();
  setInterval(getDevices, 1000);
  // Recupéré et afficher les devices avec ajax
  function getDevices() {
    $.ajax({
      url: "/get-devices",
      method: "GET",
      success: function (data) {
        var $devicesDiv = $(".devices");
        $devicesDiv.empty(); // Vider le contenu du div avant d'ajouter le nouveau contenu

        $.each(data, function (indexInArray, device) {
          // Créer les éléments pour chaque dispositif
          var $div = $("<div>").addClass(
            "col-4 mt-3 d-flex justify-content-center"
          );
          var $button = $("<button>")
            .attr("type", "button")
            .attr("class", "button")
            .attr("data-id", device.id);

          var $img = $("<img>")
            .attr("src", device.icon)
            .attr("class", device.pin.etat == 0 ? "black" : "")
            .attr("width", "100px")
            .attr("alt", "Down");

          // Ajouter les éléments au bouton et à la div
          $button.append($img);
          $div.append($button);

          // Ajouter la div au div de classe "devices"
          $devicesDiv.append($div);
        });

        console.log(data);
      },
      error: function (error) {
        console.error("Erreur lors de la récupération des devices :", error);
      },
    });
  }

  $(".devices").on("click", ".button", function () {
    // Récupérer la valeur de l'attribut "data-id" du bouton cliqué
    var dataId = $(this).attr("data-id");

    // Utiliser la valeur récupérée (par exemple, l'afficher dans la console)
    sendPinValue(dataId);
  });

  // Envoyer un signal vers un pin
  function sendPinValue(device) {
    $.ajax({
      url: "/one-device?id=" + device,
      method: "POST",

      success: function (data) {
        console.log(data);
        // Récupérer le pin modifié
        var newEtat = 0;

        // Inverser la valeur du type
        if (data.pin.etat === 0) {
          newEtat = 1;
        } else {
          newEtat = 0;
        }

        // console.log("Voir le pin : " + device.pin.id);

        // Effectuer une autre requête POST pour mettre à jour le pin avec le nouveau type
        $.ajax({
          url:
            "/pin-update?id=" +
            data.pin.id +
            "&etat=" +
            newEtat +
            "&numero=" +
            data.pin.numero,
          method: "POST",
          //   data: { id: pin.id, etat: pin.etat },
          success: function (value) {
            // Changement d'image du led
            console.log("Pin modifié avec succès :", value);
          },
          error: function (error) {
            console.error("Erreur lors de la modification du pin :", error);
          },
        });
      },
      error: function (error) {
        console.error("Erreur lors de la récupération du pin :", error);
      },
    });
  }
});
