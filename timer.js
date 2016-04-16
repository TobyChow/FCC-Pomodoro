//TODO: ALLOW USERS TO CHOOSE ALARM LENGTH, ADD OPTION FOR USER IF RESET = 25/5 OR CUSTOM

$(document).ready(function() {

    // Initial work minutes / seconds

    var startWorkMinute = 0;
    var startWorkSeconds = 4;

    // Initial break minutes / seconds

    var startBreakMinute = 0;
    var startBreakSeconds = 4;

    // PAUSE
    var isPaused = true;

    // STORE ALARM DOM

    var alarm = $('#alarm')[0];

    // PLAY ALARM AUDIO FUNCTION

    function playAlarm() {
        alarm.currentTime = 0;
        alarm.play();
        setTimeout(function() { alarm.pause(); }, 3000);
    }

    // ENABLE ADDING/SUBTRACTING SESSION LENGTHS

    function bindClick() {
        $("#add-work-min").on("click", function() {
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
    }
    bindClick();


    // REMOVES ADD/MINUS FUNCTIONS (ARROWS DONT WORK)
    function unbindClick() {
        $(".start-time").find('span').off();
    }

    // START / PAUSE FUNCTIONS, PAUSECOUNT TO PREVENT BINDING CLICK FUNCTION MORE THAN ONCE
    var pauseCount = 0;
    $('#pause').click(
        function() {
            isPaused = true;
            if (pauseCount >= 1) {
                bindClick();
            }
            pauseCount = 0;
        });

    $('#start').click(
        function() {
            isPaused = false;
            unbindClick();
            pauseCount += 1;
        });

    // RESET BUTTON 

    $("#reset").click(function() {
        alarm.pause();
        $("#status").html('Work Time!');
        startWorkMinute = 25;
        startWorkSeconds = 0;
        startBreakMinute = 5;
        startBreakSeconds = 0;
        isPaused = true;
        bindClick();
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

    // COUNT TO STOP LOOP AFTER BREAK TIMER ENDS
    var count = 1;

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
                    playAlarm();
                } else {
                    $("#status").html('Break Time!');
                    startWorkSeconds = startBreakSeconds;
                    startWorkMinute = startBreakMinute;
                    playAlarm();
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



});
