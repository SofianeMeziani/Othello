var sounds = false;

jQuery(document).on("click", ".sound", function () {
    if (sounds) {
        sounds = false;
        jQuery(".fa-volume-off").css("display", "initial");
        jQuery(".fa-volume-up").css("display", "none");
    } else {
        sounds = true
        jQuery(".fa-volume-off").css("display", "none");
        jQuery(".fa-volume-up").css("display", "initial");
    }
});

function play_sound(name) {
    if (sounds) {
        var audio = new Audio("sounds/" + name + ".wav");
        audio.play();
    }
}
