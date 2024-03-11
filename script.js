document.addEventListener("DOMContentLoaded", async function () {
    var clickCounterContainer = document.querySelector(".click_counter");
    var clickableArea = document.getElementById("clickableArea");
    var clickableImage = document.getElementById("clickableImage");

    // Retrieve the previous values
    var clickCount = localStorage.getItem("localclickcount") || 0;
    var hiddenClickCount = localStorage.getItem("hiddenLocalClickCount") || 0;

    clickCounterContainer.innerHTML = clickCount;

    clickableArea.addEventListener("mousedown", handleMouseDown);
    clickableArea.addEventListener("mouseup", handleMouseUp);
    clickableArea.addEventListener("touchstart", handleTouchStart);
    clickableArea.addEventListener("touchend", handleTouchEnd);


    async function updateServerClickCount() {
        try {
            var response = await fetch('https://76cztzsamic5yd6icr7uhwil340ncfze.lambda-url.eu-north-1.on.aws/');
            var data = await response.json();
            document.getElementById('server_click_counter').innerText = data["count"];
        } catch (error) {
            console.error('Error fetching visitor count:', error);
        }
    }

    async function updateVisitorCount() {
        try {
            var response = await fetch('https://swbce2nntivq53s6pypbx5jlcm0rxykr.lambda-url.eu-north-1.on.aws/');
            var data = await response.json();
            document.getElementById('visitorCount').innerText = data["count"];
        } catch (error) {
            console.error('Error fetching visitor count:', error);
        }
    }

    async function updateHiddenVisitorCount(){
        try {
            await fetch('https://6sgej564zybhk2den2zqtdhxmi0zssli.lambda-url.eu-north-1.on.aws/', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hidden_click_count: hiddenClickCount }),
            });
            localStorage.setItem("hiddenLocalClickCount",0)
            hiddenClickCount=0;
        } catch (error) {
            console.error('Error sending hiddenClickCount:', error);
        }
        
    }

    function handleMouseDown() {
        
        clickableImage.src = "chan.png";
        clickCount++;
        hiddenClickCount++;
        localStorage.setItem("localclickcount", clickCount);
        localStorage.setItem("hiddenLocalClickCount", hiddenClickCount);
        clickCounterContainer.innerHTML = clickCount;
        
    }

    function handleMouseUp() {
        clickableImage.src = "chanlaugh.png";
    }

    function handleTouchStart() {
        clickableImage.src = "chan.png";
    }

    function handleTouchEnd() {
        clickableImage.src = "chanlaugh.png";
    }

    // Update visitor count on page
    await updateServerClickCount();
    await updateVisitorCount();
    setInterval(updateHiddenVisitorCount, 30000);
});
