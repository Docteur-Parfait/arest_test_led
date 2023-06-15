$(document).ready(function() {
   
    // setInterval(checkDeviceStatus(2,8), 2000);

     $("#btn1").click(function() {
       var pinValue = ($("#img1").attr("src") === "down.png") ? 1 : 0;
       var imgSrc = (pinValue === 1) ? "r.png" : "down.png";
       $("#img1").attr("src", imgSrc);
       sendPinValue(2, 13, pinValue);

     });

     $("#btn2").click(function() {
        var pinValue = ($("#img2").attr("src") === "down.png") ? 1 : 0;
        var imgSrc = (pinValue === 1) ? "g.png" : "down.png";
        $("#img2").attr("src", imgSrc);
        sendPinValue(2, 11, pinValue);
      });

      $("#btn3").click(function() {
        var pinValue = ($("#img3").attr("src") === "down.png") ? 1 : 0;
        var imgSrc = (pinValue === 1) ? "y.png" : "down.png";
        $("#img3").attr("src", imgSrc);
        sendPinValue(2, 12, pinValue);
      });

     
   });

   function checkDeviceStatus(device,pin) {
     $.get("http://localhost:3000/"+device+"/digital/"+pin, function(data) {
        var returnVal = data.return_value;
       console.log(data.return_value);

       var imgSrc = (returnVal === 1) ? "r.png" : "down.png";
       $("#img1").attr("src", imgSrc);
     });
   }

 

   function sendPinValue(device, pin, value) {
     var url = "http://localhost:3000/"+device+"/digital/" + pin + "/" + value;
     $.get(url, function(data) {
    //    console.log(data);
     });
   }

   