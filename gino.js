// Global state
let gameState = {
  balance: 10000,
  currentBet: 100,
  isPlaying: false,
  currentGame: null,
};

// Game data
const slotSymbols = ["🍒", "🍋", "🍇", "🍊", "🍉", "⭐", "💎", "🔔"];
const cardSuits = ["♠", "♥", "♦", "♣"];
const cardValues = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

// DOM elements
const balanceAmount = document.getElementById("balanceAmount");
const gameModal = document.getElementById("gameModal");
const gameTitle = document.getElementById("gameTitle");
const gameBalance = document.getElementById("gameBalance");
const gameArea = document.getElementById("gameArea");
const winNotification = document.getElementById("winNotification");

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  setupEventListeners();
  startLiveStats();
});

function initializeApp() {
  updateBalance();
  showPage("home");
}

function setupEventListeners() {
  // Navigation
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      showPage(page);
      updateNavigation(page);
    });
  });

  // Game cards
  document.querySelectorAll(".game-card, .game-item").forEach((card) => {
    card.addEventListener("click", () => {
      const gameType = card.dataset.game;
      if (gameType) {
        openGame(gameType);
      }
    });
  });

  // Category filters
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      filterGames(category);
      updateCategoryButtons(btn);
    });
  });

  // Modal close
  document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", (e) => {
      e.target.closest(".modal").style.display = "none";
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });

  // Hero buttons
  document.getElementById("startGameBtn").addEventListener("click", () => {
    showPage("games");
    updateNavigation("games");
  });

  document.getElementById("bonusBtn").addEventListener("click", () => {
    addBonus(1000);
  });

  // Mobile menu toggle
  document.getElementById("menuToggle").addEventListener("click", () => {
    const nav = document.getElementById("nav");
    nav.classList.toggle("mobile-open");
  });
}

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  document.getElementById(pageId).classList.add("active");
}

function updateNavigation(activePageId) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.page === activePageId) {
      link.classList.add("active");
    }
  });
}

function filterGames(category) {
  const gameItems = document.querySelectorAll(".game-item");

  gameItems.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function updateCategoryButtons(activeBtn) {
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  activeBtn.classList.add("active");
}

function updateBalance() {
  balanceAmount.textContent = gameState.balance.toLocaleString();
  if (gameBalance) {
    gameBalance.textContent = gameState.balance.toLocaleString();
  }
}

function addBonus(amount) {
  gameState.balance += amount;
  updateBalance();
  showWinNotification(`보너스 +₩${amount.toLocaleString()}`);
}

function openGame(gameType) {
  gameModal.style.display = "block";
  gameState.currentGame = gameType;
  gameTitle.textContent = getGameTitle(gameType);
  updateBalance();
  loadGameContent(gameType);
}

function getGameTitle(gameType) {
  const titles = {
    aviator: "에비에이터",
    slot: "메가 슬롯",
    "fruit-slot": "프루트 머신",
    roulette: "룰렛",
    crash: "크래시 게임",
    mines: "마인스",
    rps: "가위바위보",
    tictactoe: "틱택토",
  };
  return titles[gameType] || "게임";
}

function loadGameContent(gameType) {
  switch (gameType) {
    case "aviator":
      loadAviator();
      break;
    case "slot":
    case "fruit-slot":
      loadSlotMachine();
      break;
    case "roulette":
      loadRoulette();
      break;
    case "crash":
      loadCrashGame();
      break;
    case "mines":
      loadMinesGame();
      break;
    case "rps":
      loadRPS();
      break;
    case "tictactoe":
      loadTicTacToe();
      break;
    default:
      gameArea.innerHTML = "<p>게임을 불러오는 중...</p>";
  }
}

// Slot Machine Game (restored)
function loadSlotMachine() {
  gameArea.innerHTML = `
          <div class="slot-machine">
              <div class="slot-reels">
                  <div class="slot-reel" id="reel1">${slotSymbols[0]}</div>
                  <div class="slot-reel" id="reel2">${slotSymbols[1]}</div>
                  <div class="slot-reel" id="reel3">${slotSymbols[2]}</div>
              </div>
              <div class="slot-controls">
                  <div class="bet-controls">
                      <button class="bet-btn" onclick="changeBet(-50)">-₩50</button>
                      <div class="bet-amount">베팅금액: ₩<span id="betAmount">${gameState.currentBet}</span></div>
                      <button class="bet-btn" onclick="changeBet(50)">+₩50</button>
                  </div>
                  <button class="spin-btn" onclick="spinSlot()" id="spinBtn">스핀</button>
                  <div class="game-result" id="gameResult"></div>
              </div>
          </div>
      `;
}

function changeBet(amount) {
  const newBet = Math.max(
    50,
    Math.min(gameState.currentBet + amount, gameState.balance)
  );
  gameState.currentBet = newBet;
  const el = document.getElementById("betAmount");
  if (el) el.textContent = newBet;
}

function spinSlot() {
  if (gameState.isPlaying) return;

  const betAmount = gameState.currentBet;
  if (betAmount > gameState.balance) {
    alert("잔액이 부족합니다!");
    return;
  }

  gameState.isPlaying = true;
  const spinBtn = document.getElementById("spinBtn");
  spinBtn.disabled = true;
  spinBtn.classList.add("spinning");
  spinBtn.textContent = "스피닝...";

  // Deduct bet amount
  gameState.balance -= betAmount;
  updateBalance();

  const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3"),
  ];

  // Add spinning animation
  reels.forEach((reel) => reel.classList.add("spinning"));

  // Animate reels
  let spinCount = 0;
  const spinInterval = setInterval(() => {
    reels.forEach((reel) => {
      reel.textContent =
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
    });
    spinCount++;

    if (spinCount > 30) {
      clearInterval(spinInterval);

      // Remove spinning animation
      reels.forEach((reel) => reel.classList.remove("spinning"));

      // Final result
      const result = reels.map((reel) => reel.textContent);
      const resultElement = document.getElementById("gameResult");

      // Check for wins
      let winAmount = 0;
      let winMessage = "";

      if (result[0] === result[1] && result[1] === result[2]) {
        // Three of a kind
        if (result[0] === "💎") {
          winAmount = betAmount * 50;
          winMessage = "💎 MEGA JACKPOT! 💎";
        } else if (result[0] === "⭐") {
          winAmount = betAmount * 20;
          winMessage = "⭐ SUPER WIN! ⭐";
        } else if (result[0] === "🔔") {
          winAmount = betAmount * 15;
          winMessage = "🔔 BIG WIN! 🔔";
        } else {
          winAmount = betAmount * 10;
          winMessage = "🎉 WIN! 🎉";
        }
      } else if (
        result[0] === result[1] ||
        result[1] === result[2] ||
        result[0] === result[2]
      ) {
        // Two of a kind
        winAmount = betAmount * 2;
        winMessage = "✨ Small Win! ✨";
      }

      if (winAmount > 0) {
        gameState.balance += winAmount;
        resultElement.textContent = `${winMessage} +₩${winAmount.toLocaleString()}`;
        resultElement.className = "game-result win";
        showWinNotification(`슬롯 승리! +₩${winAmount.toLocaleString()}`);

        // Add sparkle effect to winning symbols
        reels.forEach((reel) => reel.classList.add("sparkle"));
        setTimeout(() => {
          reels.forEach((reel) => reel.classList.remove("sparkle"));
        }, 2000);
      } else {
        resultElement.textContent = "다음 기회에!";
        resultElement.className = "game-result lose";
      }

      updateBalance();
      gameState.isPlaying = false;
      spinBtn.disabled = false;
      spinBtn.classList.remove("spinning");
      spinBtn.textContent = "스핀";
    }
  }, 100);
}

// Aviator Game
function loadAviator() {
  gameArea.innerHTML = `
          <div class="crash-game">
              <div class="crash-chart" style="position:relative;overflow:hidden">
                  <canvas id="aviatorCanvas" width="800" height="260" style="width:100%;max-width:900px;height:260px;background:#0b0b0b;border:2px solid #ffb800;border-radius:12px"></canvas>
                  <div class="crash-multiplier" id="crashMultiplier">1.00x</div>
              </div>
              <div class="crash-controls">
                  <input type="number" class="crash-bet-input" id="crashBetInput" value="${gameState.currentBet}" min="50" max="${gameState.balance}">
                  <button class="btn btn-primary" onclick="startAviator()" id="aviatorStartBtn">베팅 시작</button>
                  <button class="crash-cashout-btn" onclick="aviatorCashout()" id="crashCashoutBtn" disabled>캐시아웃</button>
              </div>
              <div style="text-align:center;margin-top:1rem;color:#ffb800">
                  <div id="crashStatus">라운드를 시작하세요!</div>
              </div>
          </div>
      `;

  gameState.aviator = {
    isActive: false,
    multiplier: 1.0,
    betAmount: 0,
    crashPoint: 0,
    hasCashedOut: false,
    anim: null,
    startTs: 0,
  };

  // draw baseline
  const canvas = document.getElementById("aviatorCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#333";
  ctx.beginPath();
  ctx.moveTo(40, canvas.height - 30);
  ctx.lineTo(canvas.width - 10, canvas.height - 30);
  ctx.stroke();
}

function startAviator() {
  const av = gameState.aviator;
  if (av.isActive) return;

  const betInput = document.getElementById("crashBetInput");
  const betAmount = Math.max(50, parseInt(betInput.value || "0", 10));

  if (betAmount > gameState.balance) {
    alert("잔액이 부족합니다!");
    return;
  }

  gameState.balance -= betAmount;
  updateBalance();

  av.isActive = true;
  av.betAmount = betAmount;
  av.multiplier = 1.0;
  av.hasCashedOut = false;
  av.crashPoint = getAviatorCrashPoint();
  av.startTs = performance.now();

  document.getElementById("crashCashoutBtn").disabled = false;
  document.getElementById("aviatorStartBtn").disabled = true;
  document.getElementById("crashStatus").textContent =
    "상승 중... 캐시아웃 타이밍!";

  const canvas = document.getElementById("aviatorCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // axes
  drawAxes(ctx, canvas);

  const multiplierEl = document.getElementById("crashMultiplier");

  const step = (ts) => {
    if (!av.isActive) return;
    const dt = (ts - av.startTs) / 1000; // seconds
    av.multiplier = Math.max(1, 1 + Math.pow(dt, 1.3));
    multiplierEl.textContent = av.multiplier.toFixed(2) + "x";

    // draw flight path
    drawAviatorPath(ctx, canvas, dt);

    if (av.multiplier >= av.crashPoint) {
      av.isActive = false;
      multiplierEl.classList.add("crashed");
      multiplierEl.textContent = "CRASHED!";
      document.getElementById(
        "crashStatus"
      ).textContent = `${av.crashPoint.toFixed(2)}x 에서 추락!`;
      document.getElementById("crashCashoutBtn").disabled = true;
      document.getElementById("aviatorStartBtn").disabled = false;
      setTimeout(() => multiplierEl.classList.remove("crashed"), 1200);
      return;
    }

    av.anim = requestAnimationFrame(step);
  };

  av.anim = requestAnimationFrame(step);
}

function aviatorCashout() {
  const av = gameState.aviator;
  if (!av.isActive || av.hasCashedOut) return;
  av.hasCashedOut = true;
  const winAmount = Math.floor(av.betAmount * av.multiplier);
  gameState.balance += winAmount;
  updateBalance();
  document.getElementById("crashCashoutBtn").disabled = true;
  showWinNotification(
    `에비에이터 캐시아웃! ${av.multiplier.toFixed(
      2
    )}x +₩${winAmount.toLocaleString()}`
  );
}

function getAviatorCrashPoint() {
  // Heavier tail: mix of low and occasional high crash points
  const r = Math.random();
  if (r < 0.6) return 1 + Math.random() * 2.2; // 1x - 3.2x
  if (r < 0.9) return 3 + Math.random() * 3; // 3x - 6x
  return 6 + Math.random() * 10; // 6x - 16x
}

function drawAxes(ctx, canvas) {
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, canvas.height - 30);
  ctx.lineTo(canvas.width - 10, canvas.height - 30);
  ctx.stroke();
  for (let i = 1; i <= 10; i++) {
    const x = 40 + (i * (canvas.width - 60)) / 10;
    ctx.strokeStyle = "#222";
    ctx.beginPath();
    ctx.moveTo(x, 10);
    ctx.lineTo(x, canvas.height - 30);
    ctx.stroke();
  }
}

function drawAviatorPath(ctx, canvas, t) {
  const maxT = 10; // seconds visualized
  const samples = 200;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxes(ctx, canvas);

  ctx.strokeStyle = "#ffb800";
  ctx.lineWidth = 3;
  ctx.beginPath();
  const baseY = canvas.height - 30;
  for (let i = 0; i <= samples; i++) {
    const tt = (i / samples) * Math.min(t, maxT);
    const mult = 1 + Math.pow(tt, 1.3);
    const x = 40 + (tt / maxT) * (canvas.width - 60);
    const y = baseY - Math.min(1, (mult - 1) / 10) * (canvas.height - 60);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // plane icon
  const tt = Math.min(t, maxT);
  const mult = 1 + Math.pow(tt, 1.3);
  const x = 40 + (tt / maxT) * (canvas.width - 60);
  const y = baseY - Math.min(1, (mult - 1) / 10) * (canvas.height - 60);
  ctx.fillStyle = "#fff";
  ctx.font = "20px sans-serif";
  ctx.fillText("🛩️", x - 10, y - 10);
}

// Blackjack Game
function loadBlackjack() {
  gameArea.innerHTML = `
          <div class="blackjack-game">
              <div class="blackjack-table">
                  <div class="card-area">
                      <div class="dealer-cards">
                          <h4>딜러 <span id="dealerScore">(0)</span></h4>
                          <div class="cards" id="dealerCards"></div>
                      </div>
                      <div class="player-cards">
                          <h4>플레이어 <span id="playerScore">(0)</span></h4>
                          <div class="cards" id="playerCards"></div>
                      </div>
                  </div>
              </div>
              <div class="blackjack-controls">
                  <button class="btn btn-primary" onclick="blackjackHit()">히트</button>
                  <button class="btn btn-secondary" onclick="blackjackStand()">스탠드</button>
                  <button class="btn btn-primary" onclick="blackjackDouble()">더블</button>
                  <button class="btn btn-primary" onclick="startBlackjack()">새 게임 (₩${gameState.currentBet})</button>
              </div>
          </div>
      `;

  // Initialize blackjack state
  gameState.blackjack = {
    deck: createDeck(),
    playerCards: [],
    dealerCards: [],
    gameActive: false,
    playerScore: 0,
    dealerScore: 0,
  };
}

function createDeck() {
  const deck = [];
  for (let suit of cardSuits) {
    for (let value of cardValues) {
      deck.push({ suit, value });
    }
  }
  return shuffleDeck(deck);
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function getCardValue(card) {
  if (card.value === "A") return 11;
  if (["J", "Q", "K"].includes(card.value)) return 10;
  return parseInt(card.value);
}

function calculateScore(cards) {
  let score = 0;
  let aces = 0;

  for (let card of cards) {
    if (card.value === "A") {
      aces++;
      score += 11;
    } else if (["J", "Q", "K"].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  }

  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  return score;
}

function startBlackjack() {
  if (gameState.currentBet > gameState.balance) {
    alert("잔액이 부족합니다!");
    return;
  }

  gameState.balance -= gameState.currentBet;
  updateBalance();

  const bj = gameState.blackjack;
  bj.deck = createDeck();
  bj.playerCards = [bj.deck.pop(), bj.deck.pop()];
  bj.dealerCards = [bj.deck.pop(), bj.deck.pop()];
  bj.gameActive = true;

  updateBlackjackDisplay();
}

function updateBlackjackDisplay() {
  const bj = gameState.blackjack;
  const playerCardsEl = document.getElementById("playerCards");
  const dealerCardsEl = document.getElementById("dealerCards");
  const playerScoreEl = document.getElementById("playerScore");
  const dealerScoreEl = document.getElementById("dealerScore");

  // Player cards
  playerCardsEl.innerHTML = "";
  bj.playerCards.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.className = "playing-card";
    cardEl.textContent = `${card.value}${card.suit}`;
    playerCardsEl.appendChild(cardEl);
  });

  // Dealer cards (hide second card if game is active)
  dealerCardsEl.innerHTML = "";
  bj.dealerCards.forEach((card, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "playing-card";
    if (index === 1 && bj.gameActive) {
      cardEl.textContent = "🂠";
      cardEl.style.background = "#333";
    } else {
      cardEl.textContent = `${card.value}${card.suit}`;
    }
    dealerCardsEl.appendChild(cardEl);
  });

  bj.playerScore = calculateScore(bj.playerCards);
  bj.dealerScore = calculateScore(bj.dealerCards);

  playerScoreEl.textContent = `(${bj.playerScore})`;
  dealerScoreEl.textContent = bj.gameActive
    ? `(${getCardValue(bj.dealerCards[0])})`
    : `(${bj.dealerScore})`;

  // Check for blackjack or bust
  if (bj.playerScore === 21) {
    blackjackStand();
  } else if (bj.playerScore > 21) {
    endBlackjack("플레이어 버스트! 딜러 승리");
  }
}

function blackjackHit() {
  const bj = gameState.blackjack;
  if (!bj.gameActive) return;

  bj.playerCards.push(bj.deck.pop());
  updateBlackjackDisplay();
}

function blackjackStand() {
  const bj = gameState.blackjack;
  if (!bj.gameActive) return;

  bj.gameActive = false;

  // Dealer draws cards
  while (bj.dealerScore < 17) {
    bj.dealerCards.push(bj.deck.pop());
    bj.dealerScore = calculateScore(bj.dealerCards);
  }

  updateBlackjackDisplay();

  // Determine winner
  let result = "";
  let winAmount = 0;

  if (bj.dealerScore > 21) {
    result = "딜러 버스트! 플레이어 승리!";
    winAmount = gameState.currentBet * 2;
  } else if (bj.playerScore > bj.dealerScore) {
    result = "플레이어 승리!";
    winAmount = gameState.currentBet * 2;
  } else if (bj.playerScore < bj.dealerScore) {
    result = "딜러 승리!";
  } else {
    result = "무승부!";
    winAmount = gameState.currentBet;
  }

  endBlackjack(result, winAmount);
}

function blackjackDouble() {
  const bj = gameState.blackjack;
  if (!bj.gameActive || bj.playerCards.length !== 2) return;
  if (gameState.currentBet > gameState.balance) {
    alert("더블을 위한 잔액이 부족합니다!");
    return;
  }

  gameState.balance -= gameState.currentBet;
  gameState.currentBet *= 2;
  updateBalance();

  blackjackHit();
  if (bj.playerScore <= 21) {
    blackjackStand();
  }
}

function endBlackjack(message, winAmount = 0) {
  if (winAmount > 0) {
    gameState.balance += winAmount;
    updateBalance();
    showWinNotification(`${message} +₩${winAmount.toLocaleString()}`);
  }

  setTimeout(() => {
    alert(message);
  }, 500);
}

// Roulette Game
function loadRoulette() {
  // Single multiplier wheel with bonus jackpot sectors
  gameArea.innerHTML = `
          <div class="roulette-game">
              <div class="roulette-wheel-container">
                  <div class="roulette-wheel" id="rouletteWheel">🎡</div>
                  <div id="jackpotCharacter" style="display:none;position:absolute;transform:translateY(20px);opacity:0;font-size:3rem;">🧙‍♂️</div>
              </div>
              <div style="text-align:center;margin-top:1rem;">
                  <div style="display:flex;gap:0.5rem;justify-content:center;align-items:center;margin-bottom:0.5rem;">
                      <input type="number" id="rouletteBetInput" min="50" value="${gameState.currentBet}" class="crash-bet-input" style="width:140px"/>
                      <span style="color:#aaa">₩ 베팅</span>
                  </div>
                  <button class="btn btn-primary" onclick="spinRoulette()" id="rouletteSpinBtn">룰렛 스핀</button>
                  <div id="rouletteResult" style="margin-top:0.75rem;color:#ffb800;font-weight:bold;min-height:24px"></div>
              </div>
          </div>
      `;

  gameState.roulette = {
    isSpinning: false,
    betAmount: 0,
  };
}

function spinRoulette() {
  const roulette = gameState.roulette;
  if (roulette.isSpinning) return;

  const betInput = document.getElementById("rouletteBetInput");
  const betAmount = Math.max(
    50,
    parseInt((betInput && betInput.value) || "0", 10)
  );
  if (betAmount > gameState.balance) {
    alert("잔액이 부족합니다!");
    return;
  }

  gameState.balance -= betAmount;
  updateBalance();

  roulette.isSpinning = true;
  roulette.betAmount = betAmount;
  const wheel = document.getElementById("rouletteWheel");
  const spinBtn = document.getElementById("rouletteSpinBtn");
  const resultEl = document.getElementById("rouletteResult");
  resultEl.textContent = "스핀 중...";
  spinBtn.disabled = true;
  wheel.classList.add("spinning");

  setTimeout(() => {
    wheel.classList.remove("spinning");

    // Determine multiplier sector (include negatives and jackpot)
    const sectors = [
      -1,
      -1,
      -0.5,
      -0.5,
      0,
      1.1,
      1.2,
      1.3,
      1.5,
      2,
      2,
      2.5,
      3,
      4,
      5,
      10,
      "JACKPOT",
    ];
    const pick = sectors[Math.floor(Math.random() * sectors.length)];

    if (pick === "JACKPOT") {
      resultEl.textContent = "잭팟 진입! 캐릭터 등장";
      const ch = document.getElementById("jackpotCharacter");
      ch.style.display = "block";
      ch.animate(
        [
          { transform: "translateY(20px)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1 },
        ],
        { duration: 500, fill: "forwards" }
      );
      setTimeout(() => {
        resultEl.textContent = "보너스 룰렛 스핀!";
        runJackpotWheel(betAmount);
      }, 700);
    } else {
      let msg = "";
      if (pick <= 0) {
        const extraLoss = Math.floor(Math.abs(pick) * betAmount);
        if (extraLoss > 0) {
          gameState.balance = Math.max(0, gameState.balance - extraLoss);
        }
        updateBalance();
        msg =
          pick === 0
            ? "0x.. 환급 없음"
            : `${pick}x 패널티! -₩${extraLoss.toLocaleString()}`;
      } else {
        const winAmount = Math.floor(betAmount * pick);
        gameState.balance += winAmount;
        updateBalance();
        msg = `${pick}x 당첨! +₩${winAmount.toLocaleString()}`;
        if (winAmount > betAmount) {
          showWinNotification(
            `룰렛 승리! ${pick}x +₩${(winAmount - betAmount).toLocaleString()}`
          );
        }
      }
      resultEl.textContent = msg;
      roulette.isSpinning = false;
      spinBtn.disabled = false;
    }
  }, 2500);
}

function runJackpotWheel(baseBet) {
  const roulette = gameState.roulette;
  const resultEl = document.getElementById("rouletteResult");
  const spinBtn = document.getElementById("rouletteSpinBtn");
  const wheel = document.getElementById("rouletteWheel");
  resultEl.textContent = "보너스 룰렛 스핀 중...";
  wheel.classList.add("spinning");

  setTimeout(() => {
    wheel.classList.remove("spinning");
    const bonusPool = [20, 20, 50, 50, 100, 100, 200, 500, 1000];
    const bonus = bonusPool[Math.floor(Math.random() * bonusPool.length)];
    const capped = Math.min(1000, bonus);
    const winAmount = baseBet * capped;
    gameState.balance += winAmount;
    updateBalance();
    resultEl.textContent = `JACKPOT! ${capped}x +₩${winAmount.toLocaleString()}`;
    showWinNotification(`JACKPOT ${capped}x +₩${winAmount.toLocaleString()}`);
    roulette.isSpinning = false;
    spinBtn.disabled = false;
    const ch = document.getElementById("jackpotCharacter");
    if (ch) {
      ch.animate(
        [
          { transform: "translateY(0)", opacity: 1 },
          { transform: "translateY(-20px)", opacity: 0 },
        ],
        { duration: 400, fill: "forwards" }
      );
      setTimeout(() => {
        ch.style.display = "none";
      }, 500);
    }
  }, 2200);
}

// Crash Game
function loadCrashGame() {
  gameArea.innerHTML = `
          <div class="crash-game">
              <div class="crash-chart">
                  <div class="crash-multiplier" id="crashMultiplier">1.00x</div>
              </div>
              <div class="crash-controls">
                  <input type="number" class="crash-bet-input" id="crashBetInput" value="${gameState.currentBet}" min="50" max="${gameState.balance}">
                  <button class="btn btn-primary" onclick="startCrash()">베팅</button>
                  <button class="crash-cashout-btn" onclick="crashCashout()" id="crashCashoutBtn" disabled>캐시아웃</button>
              </div>
              <div style="text-align: center; margin-top: 1rem; color: #ffb800;">
                  <div id="crashStatus">베팅을 시작하세요!</div>
              </div>
          </div>
      `;

  gameState.crash = {
    isActive: false,
    multiplier: 1.0,
    betAmount: 0,
    crashPoint: 0,
    hasCashedOut: false,
  };
}

function startCrash() {
  const crash = gameState.crash;
  if (crash.isActive) return;

  const betInput = document.getElementById("crashBetInput");
  const betAmount = parseInt(betInput.value);

  if (betAmount > gameState.balance) {
    alert("잔액이 부족합니다!");
    return;
  }

  gameState.balance -= betAmount;
  updateBalance();

  crash.isActive = true;
  crash.betAmount = betAmount;
  crash.multiplier = 1.0;
  crash.crashPoint = Math.random() * 10 + 1; // Random crash between 1x and 11x
  crash.hasCashedOut = false;

  document.getElementById("crashCashoutBtn").disabled = false;
  document.getElementById("crashStatus").textContent =
    "게임 진행 중... 언제든 캐시아웃하세요!";

  const multiplierEl = document.getElementById("crashMultiplier");

  const crashInterval = setInterval(() => {
    crash.multiplier += 0.01;
    multiplierEl.textContent = crash.multiplier.toFixed(2) + "x";

    if (crash.multiplier >= crash.crashPoint) {
      // Crash!
      clearInterval(crashInterval);
      multiplierEl.classList.add("crashed");
      multiplierEl.textContent = "CRASHED!";

      if (!crash.hasCashedOut) {
        document.getElementById(
          "crashStatus"
        ).textContent = `${crash.crashPoint.toFixed(2)}x에서 크래시! 베팅 실패`;
      }

      crash.isActive = false;
      document.getElementById("crashCashoutBtn").disabled = true;

      setTimeout(() => {
        multiplierEl.classList.remove("crashed");
        multiplierEl.textContent = "1.00x";
        document.getElementById("crashStatus").textContent =
          "베팅을 시작하세요!";
      }, 3000);
    }
  }, 100);
}

function crashCashout() {
  const crash = gameState.crash;
  if (!crash.isActive || crash.hasCashedOut) return;

  crash.hasCashedOut = true;
  const winAmount = Math.floor(crash.betAmount * crash.multiplier);

  gameState.balance += winAmount;
  updateBalance();

  document.getElementById("crashCashoutBtn").disabled = true;
  document.getElementById(
    "crashStatus"
  ).textContent = `${crash.multiplier.toFixed(
    2
  )}x에서 캐시아웃! +₩${winAmount.toLocaleString()}`;

  showWinNotification(
    `크래시 승리! ${crash.multiplier.toFixed(
      2
    )}x +₩${winAmount.toLocaleString()}`
  );
}

// Mines Game
function loadMinesGame() {
  gameArea.innerHTML = `
          <div class="mines-game">
              <div class="mines-grid" id="minesGrid">
                  ${generateMinesGrid()}
              </div>
              <div class="mines-controls">
                  <div class="mines-info">
                      <div style="display:flex;gap:0.5rem;align-items:center;justify-content:center;">
                        <span>베팅:</span>
                        <input id="minesBetInput" type="number" min="50" value="${
                          gameState.currentBet
                        }" class="crash-bet-input" style="width:120px"/>
                        <span>₩</span>
                      </div>
                      <div id="minesMultiplier">배수: 1.00x</div>
                      <div id="minesRevealed">발견: 0/20</div>
                  </div>
                  <button class="btn btn-primary" onclick="startMines()">새 게임</button>
                  <button class="btn btn-secondary" onclick="minesCashout()" id="minesCashoutBtn" disabled>캐시아웃</button>
              </div>
          </div>
      `;

  gameState.mines = {
    isActive: false,
    minePositions: [],
    revealedCells: 0,
    multiplier: 1.0,
    betAmount: 0,
  };
}

function generateMinesGrid() {
  let html = "";
  for (let i = 0; i < 25; i++) {
    html += `<div class="mine-cell" onclick="revealMineCell(${i})" id="mineCell${i}">?</div>`;
  }
  return html;
}

function startMines() {
  const mines = gameState.mines;

  const betInput = document.getElementById("minesBetInput");
  const betAmount = Math.max(
    50,
    parseInt((betInput && betInput.value) || "0", 10)
  );
  if (betAmount > gameState.balance) {
    alert("잔액이 부족합니다!");
    return;
  }

  gameState.balance -= betAmount;
  updateBalance();

  mines.isActive = true;
  mines.betAmount = betAmount;
  mines.revealedCells = 0;
  mines.multiplier = 1.0;

  // Generate 5 random mine positions
  mines.minePositions = [];
  while (mines.minePositions.length < 5) {
    const pos = Math.floor(Math.random() * 25);
    if (!mines.minePositions.includes(pos)) {
      mines.minePositions.push(pos);
    }
  }

  // Reset grid
  for (let i = 0; i < 25; i++) {
    const cell = document.getElementById(`mineCell${i}`);
    cell.textContent = "?";
    cell.className = "mine-cell";
  }

  document.getElementById("minesCashoutBtn").disabled = true;
  document.getElementById("minesMultiplier").textContent = "배수: 1.00x";
  document.getElementById("minesRevealed").textContent = "발견: 0/20";
}

function revealMineCell(index) {
  const mines = gameState.mines;
  if (!mines.isActive) return;

  const cell = document.getElementById(`mineCell${index}`);
  if (cell.classList.contains("revealed")) return;

  cell.classList.add("revealed");

  if (mines.minePositions.includes(index)) {
    // Hit a mine!
    cell.textContent = "💣";
    cell.classList.add("mine");

    // Reveal all mines
    mines.minePositions.forEach((pos) => {
      const mineCell = document.getElementById(`mineCell${pos}`);
      mineCell.textContent = "💣";
      mineCell.classList.add("mine", "revealed");
    });

    mines.isActive = false;
    alert("지뢰를 밟았습니다! 게임 종료");
    document.getElementById("minesCashoutBtn").disabled = true;
  } else {
    // Found a gem!
    cell.textContent = "💎";
    cell.classList.add("gem");

    mines.revealedCells++;
    mines.multiplier = 1 + mines.revealedCells * 0.2;

    document.getElementById(
      "minesMultiplier"
    ).textContent = `배수: ${mines.multiplier.toFixed(2)}x`;
    document.getElementById(
      "minesRevealed"
    ).textContent = `발견: ${mines.revealedCells}/20`;
    document.getElementById("minesCashoutBtn").disabled = false;

    if (mines.revealedCells === 20) {
      // Won the game!
      minesCashout();
    }
  }
}

function minesCashout() {
  const mines = gameState.mines;
  if (!mines.isActive) return;

  const winAmount = Math.floor(mines.betAmount * mines.multiplier);
  gameState.balance += winAmount;
  updateBalance();

  mines.isActive = false;
  document.getElementById("minesCashoutBtn").disabled = true;

  showWinNotification(
    `마인스 승리! ${mines.multiplier.toFixed(
      2
    )}x +₩${winAmount.toLocaleString()}`
  );
}

// Rock Paper Scissors Game
function loadRPS() {
  gameArea.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
            <div style="font-size:1.2rem;color:#ffb800;">베팅: ₩<span id="rpsBet">${gameState.currentBet}</span></div>
            <div id="rpsStatus" style="min-height:24px;color:#ccc;">선택하세요!</div>
            <div style="display:flex;gap:1rem;">
              <button class="btn btn-secondary" onclick="playRPS('rock')">✊ 바위</button>
              <button class="btn btn-secondary" onclick="playRPS('paper')">✋ 보</button>
              <button class="btn btn-secondary" onclick="playRPS('scissors')">✌️ 가위</button>
            </div>
            <div id="rpsResult" style="font-size:1.5rem;font-weight:bold;color:#ffb800;"></div>
          </div>
        `;
  gameState.rps = { isActive: true };
}

function playRPS(playerChoice) {
  const options = ["rock", "paper", "scissors"];
  const aiChoice = options[Math.floor(Math.random() * 3)];
  const bet = gameState.currentBet;
  if (bet > gameState.balance) {
    alert("잔액이 부족합니다!");
    return;
  }
  gameState.balance -= bet;
  updateBalance();

  const outcome = getRPSOutcome(playerChoice, aiChoice);
  let message = `나: ${emojiRPS(playerChoice)}  vs  AI: ${emojiRPS(
    aiChoice
  )} → `;
  let winAmount = 0;
  if (outcome === "win") {
    winAmount = bet * 2;
    message += "승리!";
  } else if (outcome === "draw") {
    winAmount = bet; // refund
    message += "무승부";
  } else {
    message += "패배";
  }
  if (winAmount > 0) {
    gameState.balance += winAmount;
    updateBalance();
    if (winAmount > bet) {
      showWinNotification(
        `가위바위보 승리! +₩${(winAmount - bet).toLocaleString()}`
      );
    }
  }
  document.getElementById("rpsResult").textContent = message;
}

function getRPSOutcome(p, a) {
  if (p === a) return "draw";
  if (
    (p === "rock" && a === "scissors") ||
    (p === "paper" && a === "rock") ||
    (p === "scissors" && a === "paper")
  )
    return "win";
  return "lose";
}

function emojiRPS(x) {
  return x === "rock" ? "✊" : x === "paper" ? "✋" : "✌️";
}

// TicTacToe Game
function loadTicTacToe() {
  gameArea.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;width:100%">
            <div style="font-size:1.2rem;color:#ffb800;">베팅: ₩${
              gameState.currentBet
            }</div>
            <div id="tttBoard" style="display:grid;grid-template-columns:repeat(3,100px);gap:8px;">
              ${Array.from({ length: 9 })
                .map(
                  (_, i) =>
                    `<button class=\"btn\" style=\"width:100px;height:100px;font-size:2rem;background:rgba(255,255,255,0.05);border:2px solid #ffb800;color:#fff\" onclick=\"tttMove(${i})\" id=\"ttt${i}\"></button>`
                )
                .join("")}
            </div>
            <div id="tttStatus" style="min-height:24px;color:#ccc;">내 턴 (X)</div>
          </div>
        `;

  const bet = gameState.currentBet;
  if (bet > gameState.balance) {
    alert("잔액이 부족합니다!");
    return;
  }
  gameState.balance -= bet;
  updateBalance();

  gameState.ttt = {
    board: Array(9).fill(null),
    player: "X",
    ai: "O",
    active: true,
    betAmount: bet,
  };
}

function tttMove(idx) {
  const t = gameState.ttt;
  if (!t || !t.active || t.board[idx]) return;
  t.board[idx] = t.player;
  document.getElementById(`ttt${idx}`).textContent = t.player;
  const winner = tttCheckWinner(t.board);
  if (winner || t.board.every(Boolean)) return tttFinish(winner);

  // AI move (simple best: win > block > random)
  const aiIdx = tttChooseAIMove(t.board, t.ai, t.player);
  if (aiIdx !== -1) {
    t.board[aiIdx] = t.ai;
    document.getElementById(`ttt${aiIdx}`).textContent = t.ai;
  }
  const winner2 = tttCheckWinner(t.board);
  if (winner2 || t.board.every(Boolean)) return tttFinish(winner2);
}

function tttLines() {
  return [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
}

function tttCheckWinner(b) {
  for (const [a, c, d] of tttLines()) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return null;
}

function tttChooseAIMove(board, ai, player) {
  // Try winning move
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = ai;
      if (tttCheckWinner(board) === ai) {
        board[i] = null;
        return i;
      }
      board[i] = null;
    }
  }
  // Block player
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = player;
      if (tttCheckWinner(board) === player) {
        board[i] = null;
        return i;
      }
      board[i] = null;
    }
  }
  // Center, corners, sides preference
  const order = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  for (const i of order) if (!board[i]) return i;
  return -1;
}

function tttFinish(winner) {
  const t = gameState.ttt;
  if (!t) return;
  t.active = false;
  let msg = "무승부";
  let payout = 0;
  if (winner === t.player) {
    msg = "승리!";
    payout = t.betAmount * 2;
  } else if (winner === t.ai) {
    msg = "패배";
  } else {
    payout = t.betAmount; // refund
  }
  if (payout > 0) {
    gameState.balance += payout;
    updateBalance();
    if (payout > t.betAmount) {
      showWinNotification(
        `틱택토 승리! +₩${(payout - t.betAmount).toLocaleString()}`
      );
    }
  }
  const el = document.getElementById("tttStatus");
  if (el) el.textContent = `결과: ${msg}`;
}

// Utility functions
function showWinNotification(message) {
  const notification = winNotification;
  document.getElementById("winAmount").textContent = message;
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 2000);
}

function startLiveStats() {
  // Animate live statistics
  setInterval(() => {
    const onlineUsers = document.getElementById("onlineUsers");
    const totalWinnings = document.getElementById("totalWinnings");
    const gamesPlayed = document.getElementById("gamesPlayed");
    const bigWins = document.getElementById("bigWins");

    if (onlineUsers) {
      const currentUsers = parseInt(onlineUsers.textContent.replace(/,/g, ""));
      const newUsers = currentUsers + Math.floor(Math.random() * 10) - 5;
      onlineUsers.textContent = Math.max(2000, newUsers).toLocaleString();
    }

    if (gamesPlayed) {
      const currentGames = parseInt(gamesPlayed.textContent.replace(/,/g, ""));
      gamesPlayed.textContent = (
        currentGames + Math.floor(Math.random() * 5)
      ).toLocaleString();
    }

    if (Math.random() < 0.3 && bigWins) {
      const currentWins = parseInt(bigWins.textContent);
      bigWins.textContent = currentWins + 1;
    }
  }, 5000);
}

// Add some visual effects
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to cards
  const cards = document.querySelectorAll(".game-card, .stat-card, .game-item");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add loading states to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!this.disabled) {
        const original = this.textContent;
        this.style.opacity = "0.7";

        setTimeout(() => {
          this.style.opacity = "1";
        }, 200);
      }
    });
  });
});
