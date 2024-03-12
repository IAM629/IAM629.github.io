document.addEventListener("DOMContentLoaded", async function () {
    var clickCounterContainer = document.getElementById("click_counter");  //queryselector by class
    var clickableArea = document.getElementById("clickableArea");
    var clickableImage = document.getElementById("clickableImage");
    var targetDate = new Date("2018-02-17T00:00:00Z").getTime();
    var punchaudio = new Audio("punch.mp3");

    // Retrieve the previous values
    var clickCount = localStorage.getItem("localclickcount") || 0;
    var hiddenClickCount = localStorage.getItem("hiddenLocalClickCount") || 0;

    clickCounterContainer.innerHTML = clickCount;

    clickableArea.addEventListener("mousedown", handleMouseDown);
    clickableArea.addEventListener("mouseup", handleMouseUp);
    clickableArea.addEventListener("touchstart", handleTouchStart);
    clickableArea.addEventListener("touchend", handleTouchEnd);

    function playSoundEffect() {
        punchaudio.currentTime = 0; 
        punchaudio.play();
    }

    function daysPassed() {
        var currentDate = new Date().getTime();
        var timeDifference = currentDate - targetDate;

        var daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        var yearsPassed = Math.floor(daysPassed / 365);
        var monthsPassed = Math.floor((daysPassed % 365) / 30);
        var remainingDays = daysPassed % 30;

        var daysPassedText = yearsPassed + "年" + monthsPassed + "月" + remainingDays + "日";

        document.getElementById("daysPassed").innerText = daysPassedText;
    }

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
            document.getElementById('visitor_counter').innerText = data["count"];
        } catch (error) {
            console.error('Error fetching visitor count:', error);
        }
    }

    async function updateHiddenVisitorCount(){
        if(hiddenClickCount!=0){
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
        
    }

    function handleMouseDown() {
        clickableImage.src = "chan.png";
        clickCount++;
        hiddenClickCount++;
        localStorage.setItem("localclickcount", clickCount);
        localStorage.setItem("hiddenLocalClickCount", hiddenClickCount);
        clickCounterContainer.innerHTML = clickCount;
        playSoundEffect();
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

    // Update visitor count on page load
    await daysPassed();
    await updateServerClickCount();
    await updateVisitorCount();
    setInterval(updateHiddenVisitorCount, 30000);
});
