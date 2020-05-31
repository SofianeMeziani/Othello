function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var m = 0;
var s = 0;
var chronometer;

function seconde() {
    if (s <= 59) {
        s++;
    }
    if (s > 59) {
        s = 0, m++;
    }
    if (m > 59) {
        m = 0, h++;
    }

    jQuery(".time").html(addZero(m) + ":" + addZero(s));
}

function start_chronometer() {
    chronometer = setInterval(seconde, 1000);
}

function stop_chronometer() {
    clearInterval(chronometer);
}