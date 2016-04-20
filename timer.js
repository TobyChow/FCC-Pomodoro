//FEATURES: USER INPUTS ONLY BETWEEN 1-60, ALARM SOUND, START / PAUSE / RESET, 
//TODO: PREVENT INPUTS <1, ONLY ALLOW NUMERICAL INPUTS, SCROLLING START NUMBERS RESULT IN INCORRECT TIME DISPLAY, ALLOW USERS TO SET ALARM LENGTH

$(document).ready(function() {

    // Initial work minutes / seconds

    var startWorkMinute = 25;
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
        setTimeout(function() { alarm.pause(); }, 4000);
    }


    // ENABLE ADDING/SUBTRACTING SESSION LENGTHS WITH ARROW KEYS

    function bindClick() {
        $("#add-work-min").on("click", function() {
            startWorkMinute += 1;
            startWorkSeconds = 0;
            display();
        });

        $("#minus-work-min").click(function() {
            if ($(".start-work-display").val() <= 1) {
                // Prevents timer from going below 1
                startWorkMinute -= 0;
            } else {
                startWorkMinute -= 1;
                startWorkSeconds = 0;
                display();
            }
        });

        $("#add-break-min").click(function() {
            startBreakMinute += 1;
            display();
        });

        $("#minus-break-min").click(function() {
            if ($(".start-break-display").val() <= 1) {
                startBreakMinute -= 0;
            } else {
                startBreakMinute -= 1;
                startBreakSeconds = 0;
                display();
            }
        });
    }
    bindClick();

    // REMOVES ADD/MINUS FUNCTIONS (ARROWS DONT WORK)
    function unbindClick() {
        $(".start-time").find('span').off();
    }

    // START / PAUSE FUNCTIONS, PAUSECOUNT TO PREVENT BINDING CLICK FUNCTION MORE THAN ONCE (0 = PAUSED, 1 = UNPAUSED)
    var pauseCount = 1;
    $('#pause').click(
        function() {
            isPaused = true;
            if (pauseCount > 1) {
                bindClick();
                pauseCount = 0;
                $("input").attr("disabled", false);
            }
        });

    $('#start').click(
        function() {
            isPaused = false;
            unbindClick();
            // Will always allow bind click on reset or pause click
            pauseCount += 2;
            $("input").attr("disabled", true);
        });

    // RESET BUTTON 

    $("#reset").click(function() {
        alarm.pause();
        $("#status").val('Work Time!');
        startWorkMinute = 25;
        startWorkSeconds = 0;
        startBreakMinute = 5;
        startBreakSeconds = 0;
        isPaused = true;
        //Prevents multiple bind clicks (fix reset->pause, multiple binds)
        if (pauseCount > 1) {
            bindClick();
            pauseCount = 0;
        }
        display();
        $("input").attr("disabled", false);
    });

    // DISPLAYS INITIAL WORK/BREAK SESSION AND GET INITIAL START TIME VALUE FOR COUNTDOWN TIMER

    function display() {
        if (startWorkMinute <= 9) {
            $("#work-minutes-display").text('0' + startWorkMinute);
            $(".start-work-display").val(startWorkMinute);
        } else {
            $("#work-minutes-display").text(startWorkMinute);
            $(".start-work-display").val(startWorkMinute);
        }
        if (startWorkSeconds <= 9) {
            $("#work-seconds-display").text('0' + startWorkSeconds);
        } else {
            $("#work-seconds-display").text(startWorkSeconds);
        }
        if (startBreakMinute <= 9) {
            $(".start-break-display").val(startBreakMinute);
        } else {
            $(".start-break-display").val(startBreakMinute);
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
                    $("#work-seconds-display").text('0' + startWorkSeconds);
                } else {
                    startWorkSeconds -= 1;
                    $("#work-seconds-display").text(startWorkSeconds);
                }
            } else if (startWorkMinute === 0 && startWorkSeconds === 0) {
                if (count === 0) {
                    clearInterval(workTimer);
                    playAlarm();
                } else {
                    $("#status").text('Break Time!');
                    startWorkSeconds = startBreakSeconds;
                    startWorkMinute = startBreakMinute;
                    playAlarm();
                    //DISPLAY INITIAL BREAK TIME
                    if (startWorkMinute <= 9) {
                        $("#work-minutes-display").text('0' + startWorkMinute);
                    } else {
                        $("#work-minutes-display").text(startWorkMinute);
                    }
                    if (startWorkSeconds <= 9) {
                        $("#work-seconds-display").text('0' + startWorkSeconds);
                    } else {
                        $("#work-seconds-display").text(startWorkSeconds);
                    }
                    count -= 1;
                }
            } else {
                startWorkSeconds = 59;
                $("#work-seconds-display").text(startWorkSeconds);
                if (startWorkMinute - 1 <= 9) {
                    startWorkMinute -= 1;
                    $("#work-minutes-display").text('0' + startWorkMinute);

                } else {
                    startWorkMinute -= 1;
                    $("#work-minutes-display").text(startWorkMinute);
                }
            }
        }
    }

    var workTimer = setInterval(timer, 1000);

    // ALLOW USERS TO MANUALLY INPUT SESSION LENGTHS

    $("input").keyup(function() {
        var inputType = $(this).attr('class');
        if (inputType == 'start-work-display') {
            startWorkMinute = $(this).val();
            display();
            console.log('a');
        } else {
            startBreakMinute = $(this).val();
            display();
            console.log('b');
        }
        console.log($("input").val().length);
    });

    // CHECK IF INPUT IS A NUMBER FROM 0-9, evt = event

    function isNum(evt) {
        var charCode = evt.which;
        // ASCII Values (DEC) for 0-9
        console.log(charCode >= 48 && charCode <= 57);

    }



});
