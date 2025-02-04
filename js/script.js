//Why are you looking at my code dipshit.

//pic variables
let img1, img2, img3;
let currentImage;
let currentState = 'img1';

//drake variables
let sound;
let soundPaused = false;
let soundTime = 0;

//clicky variables
const clickRegions = {
    'img1': {
        x: 0.5,
        y: 0.4,
        width: 0.2,
        height: 0.2
    },
    'img2': {
        x: 0.3,
        y: 0.3,
        width: 0.4,
        height: 0.4
    }
};

//load dat shit
function preload() {
    img1 = loadImage('assets/images/alexMeme.jpg');
    img2 = loadImage('assets/images/AlexMeme2.jpg');
    img3 = loadImage('assets/images/drake.png');

    soundFormats('mp3', 'wav');
    sound = loadSound('assets/sounds/hotlineBling.mp3');
}

//just the face
function setup() {
    createCanvas(400, 400);
    currentImage = img1;
}

//stuff
function draw() {
    background(currentImage);
    //switching clickies
    let activeRegion;
    switch (currentState) {
        case 'img1':
            activeRegion = clickRegions.img1;
            break;
        case 'img2':
            activeRegion = clickRegions.img2;
            break;
    }
    //place drake upon the nose throne
    if (currentState === 'img2') {
        renderImages();
    }
}

function mousePressed() {
    //switch images/states when mouse pressed on nose
    let activeRegion;
    switch (currentState) {
        case 'img1':
            activeRegion = clickRegions.img1;
            break;
        case 'img2':
            activeRegion = clickRegions.img2;
            break;
    }

    // Check if click is within the current clicky region
    if (
        mouseX >= width * activeRegion.x &&
        mouseX <= width * (activeRegion.x + activeRegion.width) &&
        mouseY >= height * activeRegion.y &&
        mouseY <= height * (activeRegion.y + activeRegion.height)
    ) {
        // Toggle between images and states + sound play & pause
        switch (currentState) {
            case 'img1':
                currentImage = img2;
                currentState = 'img2';
                if (soundPaused) {
                    sound.play(0, 1, 1, soundTime);
                    soundPaused = false;
                } else {
                    sound.play();
                }
                break;
            case 'img2':
                currentImage = img1;
                currentState = 'img1';
                soundTime = sound.currentTime();
                sound.pause();
                soundPaused = true;
                break;
        }
    }
}

//Drake
function renderImages() {
    let scaledWidth = img3.width * 0.5;
    let scaledHeight = img3.height * 0.5;

    let x = (width - scaledWidth) / 2 - 30;
    let y = (height - scaledHeight) / 2 - 30;

    image(img3, x, y, scaledWidth, scaledHeight);
}