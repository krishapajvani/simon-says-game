let gameSeq = [];
let userSeq = [];

let btns = ['yellow', 'red', 'blue', 'green'];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// ✅ Event listeners to start the game
document.addEventListener("keypress", handleStart);
document.addEventListener("click", function (e) {
  // ✅ Only start if clicked outside the buttons
  if (!e.target.classList.contains("btn") && !started) {
    handleStart();
  }
});

function handleStart() {
  if (!started) {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h2.innerText = `Level ${level + 1}`;
    levelUp();
  }
}

function gameflash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randInd = Math.floor(Math.random() * btns.length);
  let randColor = btns[randInd];
  let randBtn = document.querySelector(`#${randColor}`);
  gameSeq.push(randColor);
  gameflash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    gameOver();
  }
}

function btnPress() {
  if (!started) return;

  let btn = this;
  userflash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function gameOver() {
  h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Tap outside buttons or press a key to restart`;
  document.body.style.backgroundColor = "red";

  setTimeout(() => {
    document.body.style.backgroundColor = "white";
  }, 150);

  // Reset flags but don't auto-start
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
