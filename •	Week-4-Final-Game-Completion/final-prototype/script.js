// ===== GAME DATA =====
const questions = [
  {
    context: "Level 1 — Which of these passwords is toughest to guess instantly?",
    options: [
      { text: "123456", correct: false, tip: "Sequential numbers are among the most commonly used and first-guessed passwords. They offer zero security." },
      { text: "2003/08/07", correct: false, tip: "Using your birth date is very risky — it's personal info that can easily be found on social media or public records." },
      { text: "Pa$$w0rD", correct: true, tip: null }
    ],
    correctExplanation: "Avoid common words combined with standard sequential numbers like '123'. Also mix uppercase letters, symbols and numbers. Making it harder to crack than numeric sequences or dates."
  },
  {
    context: "Level 2 — Why is 'abcdef' considered an incredibly weak password?",
    options: [
      { text: "Too short", correct: false, tip: "The answer is the use of alphabetical pattern which is among the easiest one to guess." },
      { text: "Follows easy alphabetical pattern", correct: true, tip: null },
      { text: "Uses personal information", correct: false, tip: "The answer is the use of alphabetical pattern which is among the easiest one to guess." }
    ],
    correctExplanation: "Easy patterns like 'abcdef' are in every hacker's dictionary. Adding numbers at the end doesn't help much."
  },
  {
    context: "Level 3 — You have a password 'Poodle2024' based on your pet dog's name and birthdate. Why is this unsafe?",
    options: [
      { text: "Not enough uppercase letters", correct: false, tip: "Name + birth year is a very predictable pattern. If someone knows your info, this is one of the first things they'll try." },
      { text: "Lack of special symbol", correct: false, tip: "Special symbol wont matter if the password contains personal information that can be easily found in social medias." },
      { text: "Vulnerable social engineering", correct: true, tip: null }
    ],
    correctExplanation: "Information that can be easily found on your social profiles (pets, birthdays, sports teams) should never be used in a password."
  },
  {
    context: "Level 4 — Which one of these would make up a stronger password?",
    options: [
      { text: "Using capital letter at beginning", correct: false, tip: "When external force brute-forces the system, uppercase letters become pretty predictable unless the length of the password is significantly long." },
      { text: "Significantly long password (16+)", correct: true, tip: null },
      { text: "Replacing 'a' with '@'", correct: false, tip: "Replacing letters with identical symbols becomes an easy guesswork as some patterns are typical known tactic among the cyber world, like 'O' and '0', 'S' and '$', 'E' and '3'" }
    ],
    correctExplanation: "Length increases mathematical 'entropy' exponentially. A long, simple phrase takes much longer to crack than a short, complex one"
  },
  {
    context: "Level 5 — You use the password 'bluesky-099' for all your social accounts. Why is this a risk?",
    options: [
      { text: "Only 1 account is in danger", correct: false, tip: "That is likely the case but information the hackers received from the breached website might come to harm you because of your other primary account's password. " },
      { text: "Risk of 'credential stuffing'", correct: true, tip: null },
      { text: "Your computer will get a virus", correct: false, tip: "This criteria is irrelevant to the scenario. " }
    ],
    correctExplanation: "Reusing passwords creates a domino effect. If a low-security website gets breached, hackers will test those exact credentials on high-value targets like emails and banks (credential stuffing)."
  },
  {
    context: "Level 6 - A Hacker successfully guesses or steals your password, what will provide a vital secondary defence?",
    options: [
      { text: "Clearing your browser history", correct: false, tip: "Clearing the browser history doesnt totally hide your privacy from hackers. A password hazard is more critical to all your online systems. " },
      { text: "Multi-Factor Authentication (MFA/2FA)", correct: true, tip: null },
      { text: "Using a dark background theme", correct: false, tip: "The theme of your desktop or device doesnt affect the security or hinder any cyber security objectives." }
    ],
    correctExplanation: "MFA ensures that even if your password fails completely, an attacker still cannot access your account without physical possession of your secondary device."
  },
  {
    context: "Level 7 - What is the safest way to manage dozens of unique, strong passwords for all your different accounts?",
    options: [
      { text: "Write them down in a text document", correct: false, tip: "There is vulnerability risk of losing your text document in your computer file. A digital Password Manager woulde be handy." },
      { text: "Use slight variations of the same password for every site", correct: false, tip: "The passwords would fall into guessable scenario hence prompting more risks." },
      { text: "A secure digital Password Manager", correct: true, tip: null }
    ],
    correctExplanation: "Password managers securely encrypt your credentials, meaning you only need to remember one strong 'master password' to access the rest safely."
  },
  {
    context: "Level 8 - You bought a new Wi-Fi router and the setup sticker says the password is admin. What should you do?",
    options: [
      { text: "Change it immediately into new strong passphrase", correct: true, tip: null },
      { text: "Leave it as it is", correct: false, tip: "Factory default passwords are documented publicly hence the information is easily guessable by hackers. Never set up an easy keyword." },
      { text: "Share your password with your neighbors", correct: false, tip: "Sharing passwords to other people only brings more risk to be hacked." }
    ],
    correctExplanation: "Factory default passwords (like admin, password, or 1234) are publicly documented online. Attackers actively scan networks looking for devices that never changed their default settings"
  }
];

// ===== SAFE AUDIO SYSTEM =====
let audioContextUnlocked = false;

const soundFiles = {
  click: 'click.mp3',
  correct: 'correct.mp3',
  wrong: 'wrong.mp3',
  complete: 'complete.mp3'
};

// Play audio safely with full reset
function playSound(soundName) {
  try {
    const audio = new Audio(soundFiles[soundName]);
    audio.play().catch(e => console.log("Audio playback waiting for user click interaction."));
  } catch (err) {
    console.error("Audio engine failed to load file:", err);
  }
}

// Unlock audio pool on very first user interaction click
function unlockAudioEngine() {
  if (audioContextUnlocked) return;
  audioContextUnlocked = true;
  
  // Create a silent buffer pop to kickstart the hardware audio channel
  const silentAudio = new Audio();
  silentAudio.play().catch(() => {});
  
  console.log("🔒 Cyber Audio Core successfully unlocked and synchronized.");
  document.removeEventListener('click', unlockAudioEngine);
}
document.addEventListener('click', unlockAudioEngine);

let currentQuestion = 0;
let points = 0;
let correctCount = 0;
let answered = false;
let levelResults = [];

// ===== PARTICLES ENGINE =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
    container.appendChild(p);
  }
}

// ===== SCREEN MANAGEMENT =====
function showScreen(id) {
  playSound('click');

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const dashboard = document.getElementById('side-dashboard');
  if (id === 'screen-question') {
    dashboard.classList.add('visible');
  } else {
    dashboard.classList.remove('visible');
  }
}

// ===== GAME MODULE LOGIC =====
function startGame() {
  currentQuestion = 0;
  points = 0;
  correctCount = 0;
  levelResults = [];
  showScreen('screen-question');
  renderQuestion();
}

function makeLockSVG(state) {
  const isOpen = state === 'unlocked';
  const shackle = isOpen
    ? `<path class="lock-shackle" d="M14 22 L14 10 Q14 4 22 4 Q30 4 30 16" stroke-width="4" stroke-linecap="round" fill="none"/>`
    : `<path class="lock-shackle" d="M14 22 L14 12 Q14 4 22 4 Q30 4 30 22" stroke-width="4" stroke-linecap="round" fill="none"/>`;
  return `<svg viewBox="0 0 44 52" xmlns="http://www.w3.org/2000/svg" width="44" height="52">
    ${shackle}
    <rect class="lock-body" x="4" y="22" width="36" height="26" rx="5" stroke-width="2"/>
    <circle class="lock-keyhole" cx="22" cy="35" r="4"/>
    <rect class="lock-keyhole" x="20" y="35" width="4" height="6" rx="1"/>
  </svg>`;
}

function renderLocks() {
  const row = document.getElementById('lock-row');
  if (!row) return;
  row.innerHTML = '';
  for (let i = 0; i < questions.length; i++) {
    const div = document.createElement('div');
    div.className = 'lock-indicator';
    if (i < currentQuestion) {
      const result = levelResults[i];
      if (result === 'wrong') {
        div.classList.add('wrong-done');
        div.innerHTML = makeLockSVG('current');
      } else {
        div.classList.add('unlocked');
        div.innerHTML = makeLockSVG('unlocked');
      }
    } else if (i === currentQuestion) {
      div.classList.add('current');
      div.innerHTML = makeLockSVG('current');
    } else {
      div.classList.add('upcoming');
      div.innerHTML = makeLockSVG('upcoming');
    }
    row.appendChild(div);
  }
}

function renderQuestion() {
  answered = false;
  const q = questions[currentQuestion];

  document.getElementById('hud-points').textContent = points;
  document.getElementById('hud-level').textContent = (currentQuestion + 1) + ' / ' + questions.length;
  document.getElementById('q-level-num').textContent = currentQuestion + 1;
  document.getElementById('q-context').textContent = q.context;

  const matrixShift = currentQuestion * -45;
  document.getElementById('inner-matrix').style.transform = `rotate(${matrixShift}deg)`;
  document.getElementById('term-pos').textContent = `${Math.abs(matrixShift)}°`;
  
  const coreView = document.getElementById('vault-core');
  coreView.className = 'vault-core-shield';
  document.getElementById('term-status').textContent = "CALIBRATING...";
  document.getElementById('term-status').style.color = "var(--accent-cyan)";

  renderLocks();

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  const letters = ['A', 'B', 'C'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span class="option-password">${opt.text}</span>`;
    btn.onclick = () => selectOption(i);
    grid.appendChild(btn);
  });

  const fb = document.getElementById('feedback-box');
  fb.className = 'feedback-box';
  document.getElementById('next-btn-row').style.display = 'none';
}

function selectOption(index) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const chosenOption = q.options[index];
  const opts = document.querySelectorAll('.option-btn');
  const fb = document.getElementById('feedback-box');
  const fbTitle = document.getElementById('fb-title');
  const fbText = document.getElementById('fb-text');
  const coreView = document.getElementById('vault-core');

  opts.forEach(o => o.classList.add('disabled'));

  if (chosenOption.correct) {
    playSound('correct');

    opts[index].classList.remove('disabled');
    opts[index].classList.add('correct');
    points += 10;
    correctCount++;
    document.getElementById('hud-points').textContent = points;

    coreView.classList.add('core-success');
    const successfulLockShift = (currentQuestion * -45) - 360;
    document.getElementById('inner-matrix').style.transform = `rotate(${successfulLockShift}deg)`;
    document.getElementById('term-status').textContent = "CORE SYNCED";
    document.getElementById('term-status').style.color = "var(--accent-green)";

    fb.className = 'feedback-box correct-fb show';
    fbTitle.innerHTML = '✅ THE ANSWER IS CORRECT — +10 POINTS RECEIVED';
    fbText.textContent = q.correctExplanation;

    const toast = document.createElement('div');
    toast.className = 'points-toast';
    toast.textContent = '+10';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1200);

  } else {
    playSound('wrong');

    opts[index].classList.remove('disabled');
    opts[index].classList.add('wrong');

    coreView.classList.add('core-failure');
    document.getElementById('term-status').textContent = "INTRUSION LOCK";
    document.getElementById('term-status').style.color = "var(--accent-red)";
    
    const lossPercentage = (currentQuestion + 1 - correctCount) * 12.5;
    document.getElementById('term-integrity').textContent = `${100 - lossPercentage}%`;
    document.getElementById('term-integrity').style.color = "var(--accent-yellow)";

    q.options.forEach((opt, i) => {
      if (opt.correct) {
        opts[i].classList.remove('disabled');
        opts[i].classList.add('correct');
      }
    });

    fb.className = 'feedback-box wrong-fb show';
    fbTitle.innerHTML = '❌ THE ANSWER IS WRONG';
    fbText.innerHTML = `<strong>Here's why:</strong> ${chosenOption.tip}<br><br><em>The correct answer is <strong style="color:var(--accent-green)">${q.options.find(o=>o.correct).text}</strong> — ${q.correctExplanation}</em>`;
  }

  levelResults[currentQuestion] = chosenOption.correct ? 'correct' : 'wrong';
  const nextRow = document.getElementById('next-btn-row');
  nextRow.style.display = 'flex';
  const nextBtn = document.getElementById('next-btn');
  if (currentQuestion >= questions.length - 1) {
    nextBtn.textContent = 'CRACK THE CORE 🔓';
    nextBtn.onclick = showComplete;
  } else {
    nextBtn.textContent = 'NEXT LEVEL →';
    nextBtn.onclick = nextQuestion;
  }
}

function nextQuestion() {
  currentQuestion++;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showComplete() {
  playSound('complete');

  document.getElementById('final-points').textContent = points;
  document.getElementById('final-correct').textContent = correctCount + ' / ' + questions.length;

  const badge = points >= 70 ? '🥇' : points >= 50 ? '🥈' : '🥉';
  document.getElementById('final-badge').textContent = badge;
  document.getElementById('final-badge-graphic').textContent = badge;

  showScreen('screen-complete');
}

function collectBadge() {
  const btn = document.getElementById('btn-collect-badge');
  if (!btn) return;
  btn.textContent = '✓ BADGE COLLECTED!';
  btn.disabled = true;
  btn.style.opacity = '0.7';
  playSound('click');
}

function restartGame() {
  showScreen('screen-title');
}

// ===== EVENT LISTENERS INSTANTIATION =====
document.addEventListener('DOMContentLoaded', () => {
  createParticles();

  document.getElementById('btn-to-rules').onclick = () => showScreen('screen-rules');
  document.getElementById('btn-back-to-title').onclick = () => showScreen('screen-title');
  document.getElementById('btn-deploy').onclick = startGame;
  document.getElementById('btn-play-again').onclick = restartGame;
  document.getElementById('btn-collect-badge').onclick = collectBadge;

  const fabWrapper = document.getElementById('fab-wrapper');
  const fabTrigger = document.getElementById('fab-main-trigger');

  if (fabTrigger && fabWrapper) {
    fabTrigger.onclick = (e) => {
      e.stopPropagation();
      fabWrapper.classList.toggle('open');
      playSound('click');
    };

    document.addEventListener('click', () => {
      fabWrapper.classList.remove('open');
    });

    document.getElementById('fab-share').onclick = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(window.location.href);
      alert("🚀 Link copied to clipboard! Share it with other Defenders.");
      fabWrapper.classList.remove('open');
      playSound('click');
    };

    document.getElementById('fab-feedback').onclick = (e) => {
      e.stopPropagation();
      alert("💬 Feedback engine initialized! Thank you for reviewing Password Defenders. We'll followup toward your feedback shortly.");
      fabWrapper.classList.remove('open');
      playSound('click');
    };

    document.getElementById('fab-help').onclick = (e) => {
      e.stopPropagation();
      alert("❓ MISSION DATABASE:\n Password Defenders is a cyber-safety oriented learning and educational game focused towards gaining base Password Safety and Security codes of conduct. Analyze through multiple levels of questions to open the vault and CRACK THE CODE. Rules are simple; to complete all levels and earn badges based on your progress.    Good Luck :D");
      fabWrapper.classList.remove('open');
      playSound('click');
    };
  }
});
