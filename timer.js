$(document).ready(function() {

    // Initial work minutes / seconds

    var startWorkMinute = 25;
    var startWorkSeconds = 0;

    // Initial break minutes / seconds

    var startBreakMinute = 5;
    var startBreakSeconds = 0;

    // COUNT TO STOP LOOP AFTER BREAK TIMER ENDS
    var count = 1;

    // PAUSE
    var isPaused = true;


    // ADD / MINUS INITIAL WORK/BREAK SESSION LENGTHS

    $("#add-work-min").click(function() {
        startWorkMinute += 1;
        display();
    });

    $("#minus-work-min").click(function() {
        if ($(".start-work-display").html() <= 1) {
            startWorkMinute -= 0;
        } else {
            startWorkMinute -= 1;
            display();
        }
    });

    $("#add-break-min").click(function() {
        startBreakMinute += 1;
        display();
    });

    $("#minus-break-min").click(function() {
        if ($(".start-break-display").html() <= 1) {
            startBreakMinute -= 0;
        } else {
            startBreakMinute -= 1;
            display();
        }
    });

    // RESET BUTTON 

    $("#reset").click(function() {
        $("#status").html('Work Time!');
        startWorkMinute = 25;
        startWorkSeconds = 0;
        startBreakMinute = 5;
        startBreakSeconds = 0;
        isPaused = true;
        display();
    });


    // DISPLAYS INITIAL WORK/BREAK SESSION AND INITIAL START TIME FOR COUNTDOWN TIMER
    function display() {
        if (startWorkMinute <= 9) {
            $("#work-minutes-display").html('0' + startWorkMinute);
            $(".start-work-display").html('0' + startWorkMinute);
        } else {
            $("#work-minutes-display").html(startWorkMinute);
            $(".start-work-display").html(startWorkMinute);
        }
        if (startWorkSeconds <= 9) {
            $("#work-seconds-display").html('0' + startWorkSeconds);
        } else {
            $("#work-seconds-display").html(startWorkSeconds);
        }
        if (startBreakMinute <= 9) {
            $(".start-break-display").html('0' + startBreakMinute);
        } else {
            $(".start-break-display").html(startBreakMinute);
        }
    }
    display();


    //COUNTDOWN TIMER FUNCTION

    function timer() {
        if (!isPaused) {
            if (startWorkSeconds - 1 >= 0) {
                if (startWorkSeconds - 1 <= 9) {
                    startWorkSeconds -= 1;
                    $("#work-seconds-display").html('0' + startWorkSeconds);
                } else {
                    startWorkSeconds -= 1;
                    $("#work-seconds-display").html(startWorkSeconds);
                }
            } else if (startWorkMinute === 0 && startWorkSeconds === 0) {
                if (count === 0) {
                    clearInterval(workTimer);
                } else {
                    $("#status").html('Break Time!');
                    startWorkSeconds = startBreakSeconds;
                    startWorkMinute = startBreakMinute;
                    //DISPLAY INITIAL BREAK TIME
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
                    count -= 1;
                }
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
    }

    var workTimer = setInterval(timer, 1000);

    $('#pause').click(
        function() {
            isPaused = true;
        });

    $('#start').click(
        function() {
            isPaused = false;
        });
});
