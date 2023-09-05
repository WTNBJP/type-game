//scores2.textContent = `点数:${score}点`;
//missscore2.textContent = `ミス回数:${mistake}回`;
//persent2.textContent = `正答率:${((correct / (mistake + correct)) * 100).toPrecision(3)}%`;

const correct2 = document.getElementById('correct2');
const scores2 = document.getElementById('scores2');
const missscore2 = document.getElementById('miss-score2');
const persent2 = document.getElementById('persent2');

const correctData = sessionStorage.getItem('correct');
const scoreData = sessionStorage.getItem('score');
const missData = sessionStorage.getItem('miss');

scores2.textContent = `点数:${scoreData}点`;
missscore2.textContent = `ミス回数:${missData}回`;
persent2.textContent = `正答率:${((correct / (mistake + correct)) * 100).toPrecision(3)}%`;

window.location.href = 'index.html'