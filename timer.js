$(document).ready(function() {
    var startWorkMinute = 0;
    var startWorkSeconds = 3;
    if (startWorkMinute <= 9) {
        $("#minutes-display").html('0' + startWorkMinute);
    } else {
        $("#minutes-display").html(startWorkMinute);
    }
    if (startWorkSeconds <= 9) {
        $("#seconds-display").html('0' + startWorkSeconds);
    } else {
        $("#seconds-display").html(startWorkSeconds);
    }

    function workCountDown() {
        if (startWorkSeconds - 1 >= 0) {
            if (startWorkSeconds - 1 <= 9) {
                startWorkSeconds -= 1;
                $("#seconds-display").html('0' + startWorkSeconds);
            } else {
                startWorkSeconds -= 1;
                $("#seconds-display").html(startWorkSeconds);
            }
        } else if (startWorkMinute === 0 && startWorkSeconds === 0) {
            //alert("done");
            clearInterval(timer);
        } else {
            startWorkSeconds = 59;
            $("#seconds-display").html(startWorkSeconds);
            if (startWorkMinute - 1 <= 9) {
                startWorkMinute -= 1;
                $("#minutes-display").html('0' + startWorkMinute);

            } else {
                startWorkMinute -= 1;
                $("#minutes-display").html(startWorkMinute);
            }
        }
    }

    var timer = setInterval(workCountDown, 1000);

});
