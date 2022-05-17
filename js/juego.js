
let gamePage = document.querySelector('.game');
let finishedPage = document.querySelector('.finished');
let brainPartsImg = document.querySelector('.brain');
let questionText = document.querySelector('.question');
let livesText = document.querySelector('.lives');
let buttons = document.querySelectorAll('button');
let goToFinished = document.querySelector('#goToFinished');
let pointsText = document.querySelector('.points');
let date = new Date();
let curQuestionNum = 0;
let rightSound = new Audio('./sounds/Correct.mp3');
let wrongSound = new Audio('./sounds/Wrong.mp3');
let greenHeartPath = "./images/heartgreen.png";
let redHeartPath = "./images/heartred.png";
let curTime = 0;

// This user obj keeps track of the number of questions that
// you have gotten right and number of questions that you have
// gotten wrong. It also has a getter for the number of points.
const user = {
    lives: 3,
    points: 0,
    setPoints: function (t) {
        this.points += 100 / t;
        this.points = Math.round(this.points);
    }
}

// Question contains all of the questions as a map 
// in which the key is the question number as a string
// and the value is an array. In this array the first value 
// is the question and the second value is the answer.
let questions = new Map([['1', ['Parte del cerebro que se encarga de la vista?', '5']],
                         ['2', ['Parte del cerebro que se encarga del razonamiento?', '1']],
                         ['3', ['Parte del cerebro que se encarga de la memoria?', '4']],
                         ['4', ['Parte del cerebro que se encarga del olfato?', '2']],
                         ['5', ['Parte del cerebro que se encarga de regular las hormonas?', '3']],
                         ['6', ['Parte del cerebro que se encarga de la función motora?', '6']]
                        ])

// This function modifies the value of curQuestionNum and displays 
// the next question into the 'questionText.innerHTM'. in case that there are no
// more questions it calls the function 'finished()' and exits this function.
function displayNextQuestion () {
    curQuestionNum++;
    let value = questions.get(String(curQuestionNum));
    if (value == undefined) {
        finished();
        return;
    } 
    else {
        let question = value[0]
        questionText.innerHTML = question;
        curTime = Date.now() / 1000;
        pointsText.innerHTML = `Points: ${user.points}`;
    }
}

// This function returns the right answer for a question number as a string
function getRightAnswer (questionNum) {
    return questions.get(String(questionNum))[1];
}

function imageClicked (brainPartNum) {
    let rightAnswer = getRightAnswer(curQuestionNum);
    if (brainPartNum === false) {
        return;
    }
    else if (brainPartNum === rightAnswer) {
        inputedRightAnswer();
    }
    else {
        inputedWrongAnswer();
    }
}

// Increments the 'user.points' and calls 'getNextQuestion();'
function inputedRightAnswer () {
    user.setPoints((Date.now() / 1000) - curTime);
    correctAnimation();
    displayNextQuestion();
}

// decrements the 'user.lives' by 1 and checks if the number
// of lives is equal to 0. in which case, it calls 'finished();'
function inputedWrongAnswer () {
    user.lives -= 1;
    livesText.innerHTML = `Lives: ${user.lives} <img class="heart" src="./images/heartred.png">`;
    wrongAnimation();
    if (user.lives === 0) {
        finished();
    }
}

function correctAnimation () {
    rightSound.play();
}

function wrongAnimation () {
    wrongSound.play();
}

function finished () {
    gamePage.classList.add('finished');
    finishedPage.classList.add('visible');
    let puntos = document.querySelector('.puntos');
    puntos.innerHTML = `Acabaste con ${user.points} puntos.`
}

let allChequers = [
    part3, part4, part5, part6, part2, part1
];

function part3 (x, y) {
    if ((151 <= x && x <= 171) && (155 <= y && y <= 200)) {
        return '3';
    }
    if ((172 <= x && x <= 190) && (150 <= y  && y <= 190)) {
        return '3';
    }
    if ((112 <= x && x <= 150) && (170 <= y && y <= 207)) {
        return '3';
    }
    if ((107 <= x && x <= 129) && (207 <= y && y <= 222)) {
        return '3';
    }
    return false;
}

function part4 (x, y) {
    if ((190 <= x && x <= 324) && (138 <= y && y <= 192)) {
        return '4';
    }
    if ((101 <= x && x <= 304 ) && (193 <= y && y <= 235)) {
        return '4';
    }
    if ((101 <= x && x <= 246) && (236 <= y && y <= 246)) {
        return '4';
    }
    if ((102 <= x && x <= 217) && (247 <= y && y <= 266)) {
        return '4';
    }
    return false;
}

function part6 (x, y) {
    if ((209 <= x && x <= 353) && (226 <= y && y <= 300)) {
        return '6';
    }
    return false;
}

function part5 (x, y) {
    if ((288 <= x && x <= 392) && (131 <= y && y <= 230)) {
        return '5';
    }
    if ((340 <= x && x <= 384) && (90 <= y && y <= 130)) {
        return '5';
    }
    return false;
}

function part2 (x, y) {
    if ((171 <= x && x <= 354) && (5 <= y && y <= 154)) {
        return '2';
    }
    if ((146 <= x && x <= 170) && (40 <= y && y <= 162)) {
        return '2';
    }
    if ((137 <= x && x <= 145) && (102 <= y && y <= 162)) {
        return '2';
    }
    return false;
}

function part1 (x, y) {
    if((7 <= x && x <= 171) && (8 <= y && y <= 244)) {
        return '1';
    }
    return false;
}

// Checks what part of the brain is getting clicked and 
// returns the output as a srt that represents the part of the brain
// From left to right 1-2-3-4-5-6
//If uou arent clicking on any part of the brain, returns false.
function calcPartBrain (x, y) {
    for (let chequer of allChequers) {
        let result = chequer(x, y);
        if (!(result === false)) {
            return(result);
        }
    }
    return false;
}

brainPartsImg.addEventListener('click', function(e) {
    // gets the coordinates of the click.
    const ratioX = e.target.naturalWidth / e.target.offsetWidth;
    const ratioY = e.target.naturalHeight / e.target.offsetHeight;
      
    const domX = e.x + window.pageXOffset - e.target.offsetLeft;
    const domY = e.y + window.pageYOffset - e.target.offsetTop;
      
    const x = Math.round(domX * ratioX);
    const y = Math.round(domY * ratioY);
        
    let sectionOfBrain = calcPartBrain(x, y);
    imageClicked(sectionOfBrain);
})

displayNextQuestion();
