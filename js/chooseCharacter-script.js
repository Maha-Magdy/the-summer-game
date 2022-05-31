// all variable &functions that I will need it in global scope
const boy_section = document.querySelector('.boy-section');
const boy_ellipse_animatiom_set = document.querySelector('.boy-section .ellipse-animation-set');
const girl_section = document.querySelector('.girl-section');
const girl_ellipse_animatiom_set = document.querySelector('.girl-section .ellipse-animation-set');
const choose_character_audio = document.getElementById('choose-character-audio');
let boy_pressed = false;
let girl_pressed = false;

function goToAnotherPage(next_link) {
    window.location = next_link;
}

function overEllipse(elementToHoverIt) {
    elementToHoverIt.classList.remove('hide');
}

function outEllipse(elementOutFromIt) {
    elementOutFromIt.classList.add('hide');
}

function chooseCharacterAudio() {
    choose_character_audio.play();
}

function chooseCharacterAudioPause() {
    choose_character_audio.pause();
}

// this to handle engaging with choosing character when hovering by mouse or clicking

boy_section.addEventListener('mouseover', function () {
    chooseCharacterAudio();
    if (girl_pressed === true) {
        elementOutFromIt = girl_ellipse_animatiom_set;
        outEllipse(elementOutFromIt);
    }
    elementToHoverIt = boy_ellipse_animatiom_set;
    overEllipse(elementToHoverIt);
});

boy_section.addEventListener('mouseout', function () {
    chooseCharacterAudioPause();
    elementOutFromIt = boy_ellipse_animatiom_set;
    outEllipse(elementOutFromIt);
});

girl_section.addEventListener('mouseover', function () {
    chooseCharacterAudio();
    if (boy_pressed === true) {
        elementOutFromIt = boy_ellipse_animatiom_set;
        outEllipse(elementOutFromIt);
    }
    elementToHoverIt = girl_ellipse_animatiom_set;
    overEllipse(elementToHoverIt);
});

girl_section.addEventListener('mouseout', function () {
    chooseCharacterAudioPause();
    elementOutFromIt = girl_ellipse_animatiom_set;
    outEllipse(elementOutFromIt);
});

boy_section.addEventListener('click', function () {
    localStorage["chosenCharacter"] = 'boy';
    goToAnotherPage('./game-board.html');
});

girl_section.addEventListener('click', function () {
    localStorage["chosenCharacter"] = 'girl';
    goToAnotherPage('./game-board.html');
});

//  this to handle engaging with choosing character when press arrows & enter keys on keyboard
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 39) {
        chooseCharacterAudio();
        if (!girl_pressed === true) {
            elementOutFromIt = boy_ellipse_animatiom_set;
            outEllipse(elementOutFromIt);
            boy_pressed = false;
            elementToHoverIt = girl_ellipse_animatiom_set;
            overEllipse(elementToHoverIt);
            girl_pressed = true;
        }

    } else if (e.keyCode === 37) {
        chooseCharacterAudio();
        if (!boy_pressed === true) {
            elementOutFromIt = girl_ellipse_animatiom_set;
            outEllipse(elementOutFromIt);
            girl_pressed = false;
            elementToHoverIt = boy_ellipse_animatiom_set;
            overEllipse(elementToHoverIt);
            boy_pressed = true;
        }

    } else if (e.keyCode === 13) {
        if (boy_pressed === true) {
            localStorage["chosenCharacter"] = 'boy';
            goToAnotherPage('./game-board.html');
        } else if (girl_pressed === true) {
            localStorage["chosenCharacter"] = 'girl';
            goToAnotherPage('./game-board.html');
        }
    }
});