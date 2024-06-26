let num = parseInt(sessionStorage.getItem('steps'));
let arrRandom = [];
let arrPlayer = [];
let counterB = 0;
let counterP = 0;
let index = 0;
let mat = [
    [1, 2, 2, 2, 2, 3],
    [1, 2, 2, 2, 2, 3],
    [1, 2, 2, 2, 2, 3],
    [1, 2, 2, 2, 2, 3],
    [1, 2, 2, 2, 2, 3],
    [1, 2, 2, 2, 2, 3],
    [1, 2, 2, 2, 2, 3],
    [1, 2, 2, 2, 2, 3],
    [1, 2, 2, 2, 2, 3],
    [1, 2, 2, 2, 2, 3]
];

newGame();

function newGame() {
    createRandom();
    index = 0;
}

function createRandom() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < 4; i++) {
        let num = Math.floor((Math.random() * arr.length));
        arrRandom[i] = "color" + arr.splice(num, 1);
    }
}

function border() {
    let playBoard = document.querySelector(".playerBorder");
    for (let i = 0; i < num; i++) {
        let row = document.createElement('div');
        playBoard.append(row);
        row.classList.add("row");
        row.classList.add(i);
        let divCircels = document.createElement('div');
        divCircels.classList.add('divCircels');
        row.append(divCircels);
        for (let j = 0; j < mat[i].length; j++) {
            if (mat[i][j] == 1) {
                let text = document.createElement('div');
                divCircels.before(text);
                text.classList.add("divBoolPgiaa");
                let boolP = document.createElement('p');
                text.append(boolP);
                let pgiaaP = document.createElement('p');
                text.append(pgiaaP);
                boolP.textContent = "Bool: " + counterB;
                pgiaaP.textContent = "Pgiaa: " + counterP;
            }
            if (mat[i][j] == 2) {
                let circle = document.createElement('div');
                divCircels.append(circle);
                circle.classList.add('emptyCircle');
                circle.classList.add("droptarget");
                circle.setAttribute("draggable", true);
                circle.addEventListener("drag", drop);
                circle.addEventListener("dragstart", dragstart);
                circle.addEventListener("dragend", dragend);
                circle.addEventListener("dragover", dragover);
                circle.addEventListener("drop", drop);
            }
            if (mat[i][j] == 3) {
                let divButton = document.createElement('div');
                row.append(divButton);
                let button = document.createElement('button');
                divButton.append(button);
                button.textContent = "Check";
                button.classList.add('checkButton');
                button.addEventListener("click", checkClick);
            }
        }
    }
}
border();

function colorfullCircles() {
    for (let i = 1; i < 9; i++) {
        let colorfullCircle = document.createElement('div');
        document.querySelector('.borderColorfullCircles').append(colorfullCircle);
        colorfullCircle.classList.add('colorfullCircle');
        colorfullCircle.classList.add("color" + i);
        colorfullCircle.setAttribute("draggable", true);
        colorfullCircle.addEventListener("drag", drop);
        colorfullCircle.addEventListener("dragstart", dragstart);
        colorfullCircle.addEventListener("dragend", dragend);
    }
    document.querySelector('.borderColorfullCircles').addEventListener("dragover", dragover);
    document.querySelector('.borderColorfullCircles').addEventListener("drop", drop);
}
colorfullCircles();

let dragged;

function dragstart(e) {
    dragged = e.target;
    e.target.classList.add("dragging");
}

function dragend(e) {
    e.target.classList.remove("dragging");
}

function dragover(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    if ((e.target.classList.contains("emptyCircle") && e.target.parentElement.parentElement.classList.contains(index)) || (e.target.classList.contains("borderColorfullCircles"))) {
        e.target.classList.remove("dragover");
        e.target.appendChild(dragged);
    }
}

function compareArr() {
    for (let i = 0; i < arrPlayer.length; i++) {
        if (arrRandom.indexOf(arrPlayer[i].classList[arrPlayer[i].classList.length - 1]) != -1 &&
            arrRandom[i] != arrPlayer[i].classList[arrPlayer[i].classList.length - 1]) { //אם יש מספר נכון
            counterP++;
        }
    }
    for (let j = 0; j < arrPlayer.length; j++) {
        if (arrRandom[j] == arrPlayer[j].classList[arrPlayer[j].classList.length - 1]) { //אם המספר בול
            counterB++;
        }
    }
}

function createArrPlayer(e) {
    if (e.target.parentElement.parentElement.classList.contains(index)) {
        arrPlayer = Array.from(e.target.parentElement.parentElement.querySelectorAll('.colorfullCircle'));
    }
}

function ShowComputerBorder() {
    let computerCircels = document.querySelectorAll('.computerBorder div');
    for (let i = 0; i < 4; i++) {
        computerCircels[i].classList.add(arrRandom[i]);
    }
}

function winModal() {
    ShowComputerBorder();
    setTimeout(winPage, 500);
    newGame();
};

function winPage() {
    document.querySelector(".winlose").classList.add("open");
    document.querySelector(".message").textContent = "You win!!";
    document.querySelector(".close-modal").textContent = "next";
    document.querySelector('.close-modal').addEventListener("click", backToLevel);
}

function loseModal() {
    ShowComputerBorder();
    setTimeout(losePage, 2000);
    newGame();
}

function losePage() {
    document.querySelector(".winlose").classList.add("open");
    document.querySelector(".message").textContent = "Game over";
    document.querySelector(".close-modal").textContent = "play again";
    document.querySelector('.close-modal').addEventListener("click", backToLevel);
}

function backToLevel() {
    location.href = '../html/levels.html';
}

function checkClick(e) {
    createArrPlayer(e);
    compareArr();
    if (counterB === 4) {
        winModal();
    } else if (index >= (num - 1)) {
        loseModal();;
    };
    let divBoolPgiaa = document.querySelectorAll('.divBoolPgiaa');
    divBoolPgiaa[index].firstChild.textContent = "Bool: " + counterB;
    divBoolPgiaa[index].lastChild.textContent = "Pgiaa: " + counterP;

    index++;
    counterB = 0;
    counterP = 0;
    let removecircels = Array.from(document.querySelectorAll(".borderColorfullCircles div"));
    for (let i = 0; i < removecircels.length; i++) {
        removecircels[i].remove();
    }
    colorfullCircles();
}