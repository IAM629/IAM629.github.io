document.addEventListener("DOMContentLoaded", function() {
    var clickableArea = document.getElementById("clickableArea");
    var clickableImage = document.getElementById("clickableImage");

    clickableArea.addEventListener("mousedown", function() {
        if (clickableImage.src = "chan.png") {
            clickableImage.src = "chanlaugh.png";
        } else {
            clickableImage.src = "chan.png"; 
        }
    });

    clickableArea.addEventListener("mouseup", function() {
        if (clickableImage.src = "chanlaugh.png") {
            clickableImage.src = "chan.png"; 
        } else {
            clickableImage.src = "chanlaugh.png"; 
        }
    });
});
