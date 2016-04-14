// DRY

$(document).ready(function() {

    // Initial work minute / seconds

    var startWorkMinute = 0;
    var startWorkSeconds = 3;
    // Display initial time

    if (startWorkMinute <= 9) {
        $("#work-minutes-display").html('0' + startWorkMinute);
    } else {
        $("#work-minutes-display").html(startWorkMinute);
    }
    if (startWorkSeconds <= 9) {
        $("#work-seconds-display").html('0' + startWorkSeconds);
    } else {
        $("#work-seconds-display").html(startWorkSeconds);
    }

    //work timer function

    function workCountDown() {
        if (startWorkSeconds - 1 >= 0) {
            if (startWorkSeconds - 1 <= 9) {
                startWorkSeconds -= 1;
                $("#work-seconds-display").html('0' + startWorkSeconds);
            } else {
                startWorkSeconds -= 1;
                $("#work-seconds-display").html(startWorkSeconds);
            }
        } else if (startWorkMinute === 0 && startWorkSeconds === 0) {
            //alert("done");
            breakCountDown();

        } else {
            startWorkSeconds = 59;
            $("#work-seconds-display").html(startWorkSeconds);
            if (startWorkMinute - 1 <= 9) {
                startWorkMinute -= 1;
                $("#work-minutes-display").html('0' + startWorkMinute);

            } else {
                startWorkMinute -= 1;
                $("#work-minutes-display").html(startWorkMinute);
            }
        }
    }

    var workTimer = setInterval(workCountDown, 1000);

    // Initial break minute / seconds

    var startBreakMinute = 1;
    var startBreakSeconds = 3;
    // Display initial time

    if (startBreakMinute <= 9) {
        $("#break-minutes-display").html('0' + startBreakMinute);
    } else {
        $("#break-minutes-display").html(startBreakMinute);
    }
    if (startBreakSeconds <= 9) {
        $("#break-seconds-display").html('0' + startBreakSeconds);
    } else {
        $("#break-seconds-display").html(startBreakSeconds);
    }


    // break timer function

    function breakCountDown() {
        if (startBreakSeconds - 1 >= 0) {
            if (startBreakSeconds - 1 <= 9) {
                startBreakSeconds -= 1;
                $("#break-seconds-display").html('0' + startBreakSeconds);
            } else {
                startBreakSeconds -= 1;
                $("#break-seconds-display").html(startBreakSeconds);
            }
        } else if (startBreakMinute === 0 && startBreakSeconds === 0) {
            //alert("done");
            clearInterval(workTimer);
        } else {
            startBreakSeconds = 59;
            $("#break-seconds-display").html(startBreakSeconds);
            if (startBreakMinute - 1 <= 9) {
                startBreakMinute -= 1;
                $("#break-minutes-display").html('0' + startBreakMinute);

            } else {
                startBreakMinute -= 1;
                $("#break-minutes-display").html(startBreakMinute);
            }
        }
    }
});

/*Hi! I have an issue with my pomdoro clock, where the there is a slightly longer delay between when the work timer reaches 00:00 and when the break timer begins. (countdown is delayed with 1 second intervals otherwise). Any help would be grealty appreciated!
http://codepen.io/Toe125/pen/pyLJyJ
*/
