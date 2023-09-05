const correct2 = document.getElementById('correct2');
const scores2 = document.getElementById('scores2');
const missscore2 = document.getElementById('miss-score2');
const persent2 = document.getElementById('persent2');

const correctData = sessionStorage.getItem('correct');
const scoreData = sessionStorage.getItem('score');
const missData = sessionStorage.getItem('miss');
const sum = parseInt(correctData) + parseInt(missData);
correct2.textContent = `正解文字数:${correctData}`;
scores2.textContent = `正解分:${scoreData}個`;
missscore2.textContent = `ミス回数:${missData}回`;
persent2.textContent = `正答率:${((correctData / sum) * 100).toPrecision(3)}%`;
sessionStorage.setItem('correct',0);
sessionStorage.setItem('score',0);
sessionStorage.setItem('miss',0);



