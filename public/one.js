$(document).ready(function () {
  // setInterval(checkDeviceStatus(2,13), 1000);

  checkDeviceStatus("digital", 8);

  // Ecouter le click sur un bouton
  $("#btn").click(function () {
    sendPinValue(2, 8);
    checkDeviceStatus("digital", 8);
  });

  // Modifier l'etat viseul
  function changeImageStatus(id, etat) {
    var imgSrc = etat === 1 ? "r.png" : "down.png";
    $("#img" + id).attr("src", imgSrc);
  }

  // Voir l'etat d'un pin et modifier l'etat visuel
  function checkDeviceStatus(type, pin) {
    $.ajax({
      url: "/pin?numero=" + pin + "&type=digital",
      method: "POST",
      success: function (data) {
        changeImageStatus(1, data.etat);
      },
      error: function (error) {
        console.error("Erreur lors de la récupération du pin :", error);
      },
    });
  }

  // Envoyer un sgnal vers un pin
  function sendPinValue(device, pin) {
    $.ajax({
      url: "/pin?numero=" + pin + "&type=digital",
      method: "POST",

      success: function (data) {
        console.log(data);
        // Récupérer le pin modifié
        var pin = data;

        // Inverser la valeur du type
        if (data.etat === 0) {
          pin.etat = 1;
        } else {
          pin.etat = 0;
        }

        console.log(pin);

        // Effectuer une autre requête POST pour mettre à jour le pin avec le nouveau type
        $.ajax({
          url:
            "/pin-update?id=" +
            pin.id +
            "&etat=" +
            pin.etat +
            "&numero=" +
            pin.numero,
          method: "POST",
          //   data: { id: pin.id, etat: pin.etat },
          success: function (data) {
            console.log("Pin modifié avec succès :", data);
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

    function getPins() {}
  }
});
