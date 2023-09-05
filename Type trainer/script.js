const display = document.getElementById('display');
const explain = document.getElementById('explain')
const sentenceJP = document.getElementById('sentence-jp');
const sentence = document.getElementById('sentence');
const sentenceEnglish = document.getElementById('sentenceEnglish');
const buttonJP = document.getElementById('JP');
const buttonEN = document.getElementById('EN');
const setTime = document.getElementById('set-time')
const miss = document.getElementById('miss');
const count = document.getElementById('counter');
const typed = document.getElementById('typed');
const corrects = document.getElementById('correct');
const scores = document.getElementById('scores');
const missScore = document.getElementById('miss-score');
const persent = document.getElementById('persent');
const correctSound = new Audio('./sound/correct.mp3');
const missSound = new Audio('./sound/miss.mp3');
const sentenceCorrect = new Audio('./sound/sentenceCorrect.mp3');
let time;
let JapaneseSentence1;
let JapaneseSentence2;
let ArratJapaneseSentece1;
let EnglishSentence;
let ArrayEnglishSentence;
let key;
let spanTag;
let sumOfSpan;
let correct = 0;
let mistake = 0;
let score = 0;



//ゲーム開始時にボタンを非表示
function button_disable() {
  setTime.disabled = true;
  setTime.hidden = true;
  buttonEN.disabled = true;
  buttonEN.hidden = true;
  buttonJP.disabled = true;
  buttonJP.hidden = true;
  explain.textContent = '';
}

//制限時間設定
function set_time() {
  time = setTime.value;
  if(time == false){
    time = 120;
  }
}

//英語文章作成
function makeEnglishSentence() {
  EnglishSentence = typeEnglish[Math.floor(Math.random() * typeEnglish.length)];
  EnglishSentenceArray = EnglishSentence.split('').forEach((char) => {
    const spanTag = document.createElement('span');
    spanTag.innerText = char;
    sentenceEnglish.appendChild(spanTag);
  });
  sumOfSpan = sentenceEnglish.querySelectorAll('span');
}

//日本語文章作成
function makeJapaneseSentence() {
  let randomNum = Math.floor(Math.random() * typeJapanese.length);
  sentenceJP.textContent = typeJapanese[randomNum];
  JapaneseSentence2 = typeJapanese2[randomNum];
  JapaneseSentenceArray = JapaneseSentence2.split('').forEach((char) => {
    const spanTag = document.createElement('span');
    spanTag.innerText = char;
    sentence.appendChild(spanTag);
  })
  sumOfSpan = sentence.querySelectorAll('span');
}

//正解数の表示
function textContents() {
  corrects.textContent = `正解文字数:${correct}個`;
  miss.textContent = `ミス:${mistake}個`;
  scores.textContent = `正解文:${score}個`;
}

//正解時の処理
function correctProcess() {
  correctSound.play();
  correctSound.currentTime = 0;
  correct += 1;
  corrects.textContent = `正解文字数:${correct}個`;
}

//不正解時の処理
function mistakeProcess() {
  missSound.play();
  missSound.currentTime = 0;
  mistake += 1;
  miss.textContent = `ミス:${mistake}個`;
}

//一文正解時の処理
function correctSentenceProcess() {
  sentenceCorrect.play();
  sentenceCorrect.currentTime = 0;
  score += 1;
  scores.textContent = `正解文:${score}個`;
}

//終了時の処理
function finish() {
  window.location.href = 'result.html'
  sessionStorage.setItem('correct',correct);
  sessionStorage.setItem('score',score);
  sessionStorage.setItem('miss',mistake);
}

//英語タイピングスタート
//ページ遷移の際にエラーが発生するためtrycatch
try {
  buttonEN.addEventListener('click', () => {
    set_time();
    let i = 0;
    count.textContent = `残り${time}秒`;
    textContents();
    button_disable();
    makeEnglishSentence();
    document.onkeydown = (e) => {
      key = e.key;
      if(EnglishSentence[i] == key) {
        sumOfSpan[i].classList.add('typed');
        correctProcess();
        i++;
      } else if(key === 'Shift') {
        mistake += 0;
      } else if(EnglishSentence[1] != key) {
        mistakeProcess();
      }
      if(i == EnglishSentence.length) {
        sentenceEnglish.textContent = '';
        correctSentenceProcess();
        makeEnglishSentence();
        i = 0;
      }
    }
    const timer = setInterval(() => {
      if(time == 0) {
        clearInterval(timer);
        finish();
      }
      count.textContent = `残り${time}秒`;
      time--;
    }, 1000);
  });
} catch (e) {
}

//日本語練習
//ページ遷移の際にエラーが発生するためtrycatch
try {
  buttonJP.addEventListener('click', () => {
    set_time();
    let i = 0;
    count.textContent = `残り${time}秒`;
    textContents();
    button_disable();
    buttonJP.hidden = true;
    makeJapaneseSentence();
    textContents();
    document.body.addEventListener("keydown", e => {
      key = e.key;
      if (sentence.textContent[i] === key) {
        sumOfSpan[i].classList.add('typed');
        correctProcess();
        i++;
      } else {
        mistakeProcess();
      }
      if (JapaneseSentence2.length === i) {
        sentence.textContent = '';
        correctSentenceProcess();
        makeJapaneseSentence();
        i = 0;
      }
    });
    const timer = setInterval(() => {
      if(time == 0) {
        clearInterval(timer);
        finish();
      }
      count.textContent = `残り${time}秒`;
      time--;
    }, 1000);
  })
  
} catch (e) {
}
