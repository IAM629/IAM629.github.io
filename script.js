
document.addEventListener("DOMContentLoaded", function() {
    var clickableArea = document.getElementById("clickableArea");
    var clickableImage = document.getElementById("clickableImage");

    clickableArea.addEventListener("mousedown", function() {
        // Toggle between two images
        if (clickableImage.src.endsWith("chan.png")) {
            clickableImage.src = "chanlaugh.png"; // Replace with the path to your new image
        } else {
            clickableImage.src = "chan.png"; // Replace with the path to your original image
        }
    });

    clickableArea.addEventListener("mouseup", function() {
        // Toggle between two images
        if (clickableImage.src.endsWith("chanlaugh.png")) {
            clickableImage.src = "chan.png"; // Replace with the path to your new image
        } else {
            clickableImage.src = "chanlaugh.png"; // Replace with the path to your original image
        }
    });
});

