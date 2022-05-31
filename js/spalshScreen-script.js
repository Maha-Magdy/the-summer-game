// all variable &functions that I will need it in global scope
function goToAnotherPage(next_link) {
    window.location = next_link;
}

// this for splash screen animation
document.addEventListener('DOMContentLoaded', animation());

function animation() {
    // this to add the audio for the splash screen
    const audio = document.getElementById('splash-screen-audio');

    // this to fade out the audio
    let volume = 1;
    setInterval(function () {
        audio.volume = volume;
        volume -= .05;
    }, 1000);

    // this to fade in instrauction to go to next page if audio ended and still he didn't get it
    const phase_one_instructions = document.querySelector(".phase-one-instructions");
    audio.onended = function () {
        phase_one_instructions.classList.remove("hide")
        phase_one_instructions.classList.add("show", "animated", "fadeInUp")
    }

    setTimeout(function () {
        const tweenMaxAnimate = new TimelineMax();
        tweenMaxAnimate.to('.basic-ellipse', 0.75, {
            ease: Back.easeOut.config(1.7),
            width: 230,
            height: 230
        })

        tweenMaxAnimate.staggerFromTo('.letter', 0.5, {
            ease: Back.easeOut.config(1.7),
            visibility: 'hidden',
            opacity: 0,
            top: '+=80'
        }, {
            ease: Back.easeOut.config(1.7),
            visibility: 'visible',
            opacity: 1,
            top: '-=80'
        }, .05);

        tweenMaxAnimate.fromTo('.slipper-block', 1.5, {
            ease: Bounce.easeOut,
            visibility: 'hidden',
            scale: 0.9
        }, {
            ease: Bounce.easeOut,
            visibility: 'visible',
            scale: 1
        })
    }, 250)
}

// events to handle engaging with basic-ellipse by mouse or by press on enter key on keyboard

const splashScreenBasicEllipse = document.querySelector('.basic-ellipse');
splashScreenBasicEllipse.addEventListener('click', function () {
    goToAnotherPage('./choose-character.html');
});

document.addEventListener('keydown', function (e) {
    (e.keyCode === 13) ? goToAnotherPage('./choose-character.html'): false;
});
