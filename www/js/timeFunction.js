$("#stop").hide();

function formatTime(ms) {
    let sec = Math.floor(ms / 100);
    let milli = ms % 100;
    return `${String(sec).padStart(
      2,
      "0"
    )}.${String(milli).padStart(2, "0")}`;
}

function updateDisplay() {
    $("#time").text(formatTime(milliseconds));
}

$("#start").click(function() {
    if (!running && !notAgain) {
        $(this).hide();
        $("#stop").show();
        running = true;
        timer = setInterval(() => {
            milliseconds++;
            updateDisplay();
        }, 10); // Runs every 10ms
    } else {
        alert("pls click reset to start new record");
    }
});

$("#stop").click(function() {
    $(this).hide();
    $("#start").show();
    running = false;
    console.log(milliseconds / 100);
    clearInterval(timer);
    notAgain = true;
});

$("#reset").click(function() {
    notAgain = false;
    $("#start").show();
    $("#stop").hide();
    clearInterval(timer);
    running = false;
    milliseconds = 0;
    updateDisplay();
});

updateDisplay();