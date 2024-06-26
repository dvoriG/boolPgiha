document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.button')
        .forEach(levelBtn => levelBtn.addEventListener('click', onLevelSelect));
});

function onLevelSelect(e) {
    let numSteps = e.target.dataset.numSteps;
    sessionStorage.setItem('steps', numSteps);
    location.href = '../html/game.html';
}