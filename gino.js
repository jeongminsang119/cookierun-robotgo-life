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
  const betAmountInput = document.getElementById("betAmount");
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

    // Betting amount input
    if (betAmountInput) {
      betAmountInput.addEventListener("input", (e) => {
        const newBet = parseInt(e.target.value) || 100;
        gameState.currentBet = Math.max(1, Math.min(newBet, gameState.balance));
        e.target.value = gameState.currentBet;
      });

      // Handle betting amount changes
      betAmountInput.addEventListener("change", (e) => {
        const newBet = parseInt(e.target.value) || 100;
        gameState.currentBet = Math.max(1, Math.min(newBet, gameState.balance));
        e.target.value = gameState.currentBet;
        
        // Update any game displays that show the current bet
        if (gameState.currentGame === "blackjack" || gameState.currentGame === "baccarat" || gameState.currentGame === "texasHoldem") {
          const newGameBtn = document.querySelector(".btn-primary");
          if (newGameBtn && newGameBtn.textContent.includes("새 게임")) {
            newGameBtn.textContent = `새 게임 (₩${gameState.currentBet})`;
          }
        }
      });
    }
  
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

  function updateBettingAmount() {
    if (betAmountInput) {
      betAmountInput.value = gameState.currentBet;
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
    updateBettingAmount();
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
      blackjack: "블랙젝",
      baccarat: "바카라",
      texasHoldem: "텍사스 홀덤",
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
      case "blackjack":
        loadBlackjack();
        break;
      case "baccarat":
        loadBaccarat();
        break;
      case "texasHoldem":
        loadTexasHoldem();
        break;
      case "omok":
        loadOmokGame();
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
    updateBettingAmount();
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
                    <div class="dealer-section">
                        <div class="dealer-avatar">
                            <div class="dealer-head">
                                <div class="dealer-face">
                                    <div class="dealer-eyes">
                                        <div class="dealer-eye left"></div>
                                        <div class="dealer-eye right"></div>
                                    </div>
                                    <div class="dealer-mouth"></div>
                                </div>
                                <div class="dealer-hair"></div>
                            </div>
                            <div class="dealer-body">
                                <div class="dealer-shirt"></div>
                                <div class="dealer-tie"></div>
                            </div>
                        </div>
                        <div class="dealer-info">
                            <h4>딜러 마이크 <span id="dealerScore">(0)</span></h4>
                            <p class="dealer-status">카드를 섞고 있습니다...</p>
                        </div>
                        <div class="dealer-cards">
                            <div class="cards" id="dealerCards"></div>
                        </div>
                    </div>
                    <div class="player-section">
                        <div class="player-avatar">
                            <div class="player-head">
                                <div class="player-face">
                                    <div class="player-eyes">
                                        <div class="player-eye left"></div>
                                        <div class="player-eye right"></div>
                                    </div>
                                    <div class="player-mouth"></div>
                                </div>
                                <div class="player-hair"></div>
                            </div>
                            <div class="player-body">
                                <div class="player-shirt"></div>
                            </div>
                        </div>
                        <div class="player-info">
                            <h4>플레이어 <span id="playerScore">(0)</span></h4>
                            <p class="player-status">게임을 기다리는 중...</p>
                        </div>
                        <div class="player-cards">
                            <div class="cards" id="playerCards"></div>
                        </div>
                    </div>
                </div>
                <div class="blackjack-controls">
                    <button class="btn btn-primary" onclick="blackjackHit()" id="hitBtn" disabled>히트</button>
                    <button class="btn btn-secondary" onclick="blackjackStand()" id="standBtn" disabled>스탠드</button>
                    <button class="btn btn-primary" onclick="blackjackDouble()" id="doubleBtn" disabled>더블</button>
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

  function showCardDealingAnimation(cardElement, delay = 0) {
    cardElement.style.transform = "translateY(-50px) rotateY(180deg)";
    cardElement.style.opacity = "0";
    
    setTimeout(() => {
      cardElement.style.transition = "all 0.5s ease-out";
      cardElement.style.transform = "translateY(0) rotateY(0deg)";
      cardElement.style.opacity = "1";
    }, delay);
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
    bj.playerCards = [];
    bj.dealerCards = [];
    bj.gameActive = false;

    // Update dealer status
    const dealerStatus = document.querySelector(".dealer-status");
    if (dealerStatus) dealerStatus.textContent = "카드를 섞고 있습니다...";

    // Simulate dealing animation
    setTimeout(() => {
      dealerStatus.textContent = "플레이어에게 카드를 나누는 중...";
      
      setTimeout(() => {
        bj.playerCards = [bj.deck.pop(), bj.deck.pop()];
        updateBlackjackDisplay();
        dealerStatus.textContent = "딜러에게 카드를 나누는 중...";
        
        setTimeout(() => {
          bj.dealerCards = [bj.deck.pop(), bj.deck.pop()];
          updateBlackjackDisplay();
          bj.gameActive = true;
          
          // Enable game buttons
          document.getElementById("hitBtn").disabled = false;
          document.getElementById("standBtn").disabled = false;
          document.getElementById("doubleBtn").disabled = false;
          
          dealerStatus.textContent = "게임 진행 중...";
          
          // Check for blackjack
          if (calculateScore(bj.playerCards) === 21) {
            setTimeout(() => {
              blackjackStand();
            }, 1000);
          }
        }, 800);
      }, 800);
    }, 1000);
  
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
    bj.playerCards.forEach((card, index) => {
      const cardEl = document.createElement("div");
      cardEl.className = "playing-card";
      cardEl.textContent = `${card.value}${card.suit}`;
      playerCardsEl.appendChild(cardEl);
      
      // Add dealing animation
      showCardDealingAnimation(cardEl, index * 200);
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
      
      // Add dealing animation
      showCardDealingAnimation(cardEl, index * 200);
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

    // Update status messages
    const playerStatus = document.querySelector(".player-status");
    const dealerStatus = document.querySelector(".dealer-status");
    
    if (playerStatus) {
      if (bj.playerCards.length > 0) {
        playerStatus.textContent = `카드: ${bj.playerScore}점`;
      } else {
        playerStatus.textContent = "게임을 기다리는 중...";
      }
    }
    
    if (dealerStatus && !bj.gameActive) {
      if (bj.dealerCards.length > 0) {
        dealerStatus.textContent = `카드: ${bj.dealerScore}점`;
      } else {
        dealerStatus.textContent = "게임을 기다리는 중...";
      }
    }
  }
  
    function blackjackHit() {
    const bj = gameState.blackjack;
    if (!bj.gameActive) return;

    // Update dealer status
    const dealerStatus = document.querySelector(".dealer-status");
    if (dealerStatus) dealerStatus.textContent = "플레이어가 카드를 받았습니다...";

    bj.playerCards.push(bj.deck.pop());
    updateBlackjackDisplay();
    
    // Reset dealer status after a delay
    setTimeout(() => {
      if (dealerStatus) dealerStatus.textContent = "게임 진행 중...";
    }, 1500);
  }
  
    function blackjackStand() {
    const bj = gameState.blackjack;
    if (!bj.gameActive) return;

    // Update dealer status
    const dealerStatus = document.querySelector(".dealer-status");
    if (dealerStatus) dealerStatus.textContent = "딜러가 카드를 확인하고 있습니다...";

    bj.gameActive = false;
  
    // Dealer draws cards
    let cardIndex = 0;
    const drawDealerCards = () => {
      if (bj.dealerScore < 17) {
        if (dealerStatus) dealerStatus.textContent = `딜러가 ${cardIndex + 1}번째 카드를 뽑고 있습니다...`;
        
        setTimeout(() => {
          bj.dealerCards.push(bj.deck.pop());
          bj.dealerScore = calculateScore(bj.dealerCards);
          updateBlackjackDisplay();
          cardIndex++;
          
          if (bj.dealerScore < 17) {
            drawDealerCards();
          } else {
            if (dealerStatus) dealerStatus.textContent = "딜러가 카드 뽑기를 완료했습니다...";
            setTimeout(() => {
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
            }, 1000);
          }
        }, 1000);
      }
    };
    
    drawDealerCards();
  
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

           // Baccarat Game
         function loadBaccarat() {
           gameArea.innerHTML = `
                   <div class="baccarat-game">
                       <div class="baccarat-table">
                           <div class="dealer-section">
                               <div class="dealer-avatar">
                                   <div class="dealer-head">
                                       <div class="dealer-face">
                                           <div class="dealer-eyes">
                                               <div class="dealer-eye left"></div>
                                               <div class="dealer-eye right"></div>
                                           </div>
                                           <div class="dealer-mouth"></div>
                                       </div>
                                       <div class="dealer-hair"></div>
                                   </div>
                                   <div class="dealer-body">
                                       <div class="dealer-shirt"></div>
                                       <div class="dealer-tie"></div>
                                   </div>
                               </div>
                               <div class="dealer-info">
                                   <h4>딜러 마이크 <span id="dealerScore">(0)</span></h4>
                                   <p class="dealer-status">카드를 섞고 있습니다...</p>
                               </div>
                               <div class="dealer-cards">
                                   <div class="cards" id="dealerCards"></div>
                               </div>
                           </div>
                           <div class="card-area">
                               <div class="banker-section">
                                   <div class="banker-avatar">
                                       <div class="banker-head">
                                           <div class="banker-face">
                                               <div class="banker-eyes">
                                                   <div class="banker-eye left"></div>
                                                   <div class="banker-eye right"></div>
                                               </div>
                                               <div class="banker-mouth"></div>
                                           </div>
                                           <div class="banker-hair"></div>
                                       </div>
                                       <div class="banker-body">
                                           <div class="banker-suit"></div>
                                       </div>
                                   </div>
                                   <div class="banker-info">
                                       <h4>뱅커 <span id="bankerScore">(0)</span></h4>
                                       <p class="banker-status">게임을 기다리는 중...</p>
                                   </div>
                                   <div class="banker-cards">
                                       <div class="cards" id="bankerCards"></div>
                                   </div>
                               </div>
                               <div class="player-section">
                                   <div class="player-avatar">
                                       <div class="player-head">
                                           <div class="player-face">
                                               <div class="player-eyes">
                                                   <div class="player-eye left"></div>
                                                   <div class="player-eye right"></div>
                                               </div>
                                               <div class="player-mouth"></div>
                                           </div>
                                           <div class="player-hair"></div>
                                       </div>
                                       <div class="player-body">
                                           <div class="player-shirt"></div>
                                       </div>
                                   </div>
                                   <div class="player-info">
                                       <h4>플레이어 <span id="playerScore">(0)</span></h4>
                                       <p class="player-status">게임을 기다리는 중...</p>
                                   </div>
                                   <div class="player-cards">
                                       <div class="cards" id="playerCards"></div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div class="baccarat-controls">
                           <button class="btn btn-primary" onclick="startBaccarat()">새 게임 (₩${gameState.currentBet})</button>
                           <div class="baccarat-result" id="baccaratResult"></div>
                       </div>
                   </div>
               `;

    // Initialize baccarat state
    gameState.baccarat = {
      deck: createDeck(),
      playerCards: [],
      bankerCards: [],
      gameActive: false,
      playerScore: 0,
      bankerScore: 0,
      currentBet: 0,
      betType: null, // 'player', 'banker', 'tie'
    };
  }

  // Texas Hold'em Game
  function loadTexasHoldem() {
    gameArea.innerHTML = `
      <div class="texas-holdem-game">
        <div class="poker-table">
          <div class="community-cards">
            <h4>커뮤니티 카드</h4>
            <div class="cards" id="communityCards"></div>
          </div>
          <div class="dealer-section">
            <div class="dealer-avatar">
              <div class="dealer-head">
                <div class="dealer-face">
                  <div class="dealer-eyes">
                    <div class="dealer-eye left"></div>
                    <div class="dealer-eye right"></div>
                  </div>
                  <div class="dealer-mouth"></div>
                </div>
                <div class="dealer-hair"></div>
              </div>
              <div class="dealer-body">
                <div class="dealer-shirt"></div>
                <div class="dealer-tie"></div>
              </div>
            </div>
            <div class="dealer-info">
              <h4>딜러 마이크</h4>
              <p class="dealer-status">게임을 기다리는 중...</p>
            </div>
          </div>
          <div class="player-section">
            <div class="player-avatar">
              <div class="player-head">
                <div class="player-face">
                  <div class="player-eyes">
                    <div class="player-eye left"></div>
                    <div class="player-eye right"></div>
                  </div>
                  <div class="player-mouth"></div>
                </div>
                <div class="player-hair"></div>
              </div>
              <div class="player-body">
                <div class="player-shirt"></div>
              </div>
            </div>
            <div class="player-info">
              <h4>플레이어 <span id="playerScore">(0)</span></h4>
              <p class="player-status">게임을 기다리는 중...</p>
            </div>
            <div class="player-cards">
              <h5>내 카드</h5>
              <div class="cards" id="playerCards"></div>
            </div>
          </div>
        </div>
        <div class="poker-controls">
          <button class="btn btn-primary" onclick="startTexasHoldem()">새 게임 (₩${gameState.currentBet})</button>
          <div class="betting-options">
            <button class="btn btn-secondary" onclick="foldHand()">폴드</button>
            <button class="btn btn-secondary" onclick="callBet()">콜</button>
            <button class="btn btn-primary" onclick="raiseBet()">레이즈</button>
          </div>
          <div class="poker-result" id="pokerResult"></div>
        </div>
      </div>
    `;

    // Initialize texas holdem state
    gameState.texasHoldem = {
      deck: createDeck(),
      playerCards: [],
      communityCards: [],
      gameActive: false,
      pot: 0,
      currentBet: 0,
      playerBalance: gameState.balance,
    };
  }

  function startTexasHoldem() {
    if (gameState.currentBet > gameState.balance) {
      alert("잔액이 부족합니다!");
      return;
    }

    gameState.balance -= gameState.currentBet;
    updateBalance();

    const poker = gameState.texasHoldem;
    poker.deck = createDeck();
    poker.playerCards = [];
    poker.communityCards = [];
    poker.gameActive = false;
    poker.pot = gameState.currentBet;
    poker.currentBet = gameState.currentBet;

    // Show betting phase
    const dealerStatus = document.querySelector(".dealer-status");
    const playerStatus = document.querySelector(".player-status");
    
    if (dealerStatus) dealerStatus.textContent = "배팅을 기다리는 중...";
    if (playerStatus) playerStatus.textContent = "게임 시작을 확인하세요";

    // Show betting confirmation
    const bettingOptions = document.createElement("div");
    bettingOptions.className = "betting-options";
    bettingOptions.innerHTML = `
      <h4>게임 시작 확인 (10초)</h4>
      <div class="bet-buttons">
        <button class="btn btn-primary" onclick="confirmTexasHoldemBet()">게임 시작</button>
        <button class="btn btn-secondary" onclick="cancelTexasHoldemBet()">취소</button>
      </div>
      <div class="countdown" id="texasHoldemCountdown">10</div>
      <p>현재 배팅: ₩${gameState.currentBet.toLocaleString()}</p>
    `;

    // Insert betting options after the poker-table
    const pokerTable = document.querySelector(".poker-table");
    if (pokerTable) {
      pokerTable.insertAdjacentElement('afterend', bettingOptions);
    }

    // Start countdown
    let countdown = 10;
    const countdownEl = document.getElementById("texasHoldemCountdown");
    const countdownInterval = setInterval(() => {
      countdown--;
      if (countdownEl) countdownEl.textContent = countdown;
      
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        // Auto-start game if no confirmation
        proceedWithTexasHoldem();
      }
    }, 1000);
  }

  function confirmTexasHoldemBet() {
    // Remove betting options
    const bettingOptions = document.querySelector(".betting-options");
    if (bettingOptions) bettingOptions.remove();
    
    // Clear countdown
    const countdownEl = document.getElementById("texasHoldemCountdown");
    if (countdownEl) countdownEl.textContent = "";
    
    // Proceed with game
    proceedWithTexasHoldem();
  }

  function cancelTexasHoldemBet() {
    // Refund the bet
    gameState.balance += gameState.currentBet;
    updateBalance();
    
    // Remove betting options
    const bettingOptions = document.querySelector(".betting-options");
    if (bettingOptions) bettingOptions.remove();
    
    // Reset game state
    const poker = gameState.texasHoldem;
    poker.gameActive = false;
    poker.pot = 0;
    poker.currentBet = 0;
    
    // Update status
    const dealerStatus = document.querySelector(".dealer-status");
    const playerStatus = document.querySelector(".player-status");
    if (dealerStatus) dealerStatus.textContent = "게임을 기다리는 중...";
    if (playerStatus) playerStatus.textContent = "게임을 기다리는 중...";
    
    // Show new game button
    const pokerControls = document.querySelector(".poker-controls");
    if (pokerControls) {
      const newGameBtn = pokerControls.querySelector(".btn-primary");
      if (newGameBtn) newGameBtn.textContent = `새 게임 (₩${gameState.currentBet})`;
    }
  }

  function proceedWithTexasHoldem() {
    const poker = gameState.texasHoldem;
    poker.gameActive = true;
    
    // Update dealer status
    const dealerStatus = document.querySelector(".dealer-status");
    if (dealerStatus) dealerStatus.textContent = "카드를 섞고 있습니다...";

    // Simulate dealing animation
    setTimeout(() => {
      dealerStatus.textContent = "플레이어에게 카드를 나누는 중...";
      
      setTimeout(() => {
        poker.playerCards = [poker.deck.pop(), poker.deck.pop()];
        updateTexasHoldemDisplay();
        dealerStatus.textContent = "커뮤니티 카드를 나누는 중...";
        
        setTimeout(() => {
          // Deal flop (3 cards)
          poker.communityCards = [poker.deck.pop(), poker.deck.pop(), poker.deck.pop()];
          updateTexasHoldemDisplay();
          dealerStatus.textContent = "턴 카드를 나누는 중...";
          
          setTimeout(() => {
            // Deal turn (1 card)
            poker.communityCards.push(poker.deck.pop());
            updateTexasHoldemDisplay();
            dealerStatus.textContent = "리버 카드를 나누는 중...";
            
            setTimeout(() => {
              // Deal river (1 card)
              poker.communityCards.push(poker.deck.pop());
              updateTexasHoldemDisplay();
              dealerStatus.textContent = "게임 진행 중...";
              
              // Determine winner after a short delay
              setTimeout(() => {
                determineTexasHoldemWinner();
              }, 1000);
            }, 800);
          }, 800);
        }, 800);
      }, 800);
    }, 1000);
  }

  function updateTexasHoldemDisplay() {
    const poker = gameState.texasHoldem;
    const playerCardsEl = document.getElementById("playerCards");
    const communityCardsEl = document.getElementById("communityCards");
    const playerScoreEl = document.getElementById("playerScore");

    // Player cards
    playerCardsEl.innerHTML = "";
    poker.playerCards.forEach((card, index) => {
      const cardEl = document.createElement("div");
      cardEl.className = "playing-card";
      cardEl.textContent = `${card.value}${card.suit}`;
      playerCardsEl.appendChild(cardEl);
      
      // Add dealing animation
      showCardDealingAnimation(cardEl, index * 200);
    });

    // Community cards
    communityCardsEl.innerHTML = "";
    poker.communityCards.forEach((card, index) => {
      const cardEl = document.createElement("div");
      cardEl.className = "playing-card";
      cardEl.textContent = `${card.value}${card.suit}`;
      communityCardsEl.appendChild(cardEl);
      
      // Add dealing animation
      showCardDealingAnimation(cardEl, index * 200);
    });

    // Update player score (hand rank)
    if (playerScoreEl) {
      const handRank = evaluatePokerHand(poker.playerCards, poker.communityCards);
      playerScoreEl.textContent = `(${handRank})`;
    }

    // Update status messages
    const playerStatus = document.querySelector(".player-status");
    if (playerStatus) {
      if (poker.playerCards.length > 0) {
        playerStatus.textContent = `카드: ${poker.playerCards.length}장`;
      } else {
        playerStatus.textContent = "게임을 기다리는 중...";
      }
    }
  }

  function evaluatePokerHand(playerCards, communityCards) {
    // Simple hand evaluation - in a real implementation this would be more complex
    const allCards = [...playerCards, ...communityCards];
    if (allCards.length < 5) return "대기 중";
    
    // Check for pairs, three of a kind, etc.
    const values = allCards.map(card => card.value);
    const valueCounts = {};
    
    values.forEach(value => {
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    });
    
    const counts = Object.values(valueCounts).sort((a, b) => b - a);
    
    if (counts[0] === 4) return "포카드";
    if (counts[0] === 3 && counts[1] === 2) return "풀하우스";
    if (counts[0] === 3) return "트리플";
    if (counts[0] === 2 && counts[1] === 2) return "투페어";
    if (counts[0] === 2) return "원페어";
    
    return "하이카드";
  }

  function foldHand() {
    const poker = gameState.texasHoldem;
    if (!poker.gameActive) return;
    
    poker.gameActive = false;
    showWinNotification("폴드했습니다. 베팅금을 잃었습니다.");
    
    // Reset game
    setTimeout(() => {
      poker.playerCards = [];
      poker.communityCards = [];
      poker.gameActive = false;
      poker.pot = 0;
      updateTexasHoldemDisplay();
    }, 2000);
  }

  function callBet() {
    const poker = gameState.texasHoldem;
    if (!poker.gameActive) return;
    
    // In this simplified version, calling just continues the game
    showWinNotification("콜했습니다!");
  }

  function raiseBet() {
    const poker = gameState.texasHoldem;
    if (!poker.gameActive) return;
    
    const raiseAmount = Math.min(gameState.currentBet, gameState.balance);
    if (raiseAmount > 0) {
      gameState.balance -= raiseAmount;
      poker.pot += raiseAmount;
      updateBalance();
      showWinNotification(`레이즈: ₩${raiseAmount.toLocaleString()}`);
    }
  }

  function determineTexasHoldemWinner() {
    const poker = gameState.texasHoldem;
    if (!poker.gameActive) return;
    
    poker.gameActive = false;
    
    // Simple win determination - in a real game this would be more complex
    const winChance = Math.random();
    let result = "";
    let winAmount = 0;
    
    if (winChance > 0.6) {
      result = "플레이어 승리!";
      winAmount = poker.pot * 2;
      gameState.balance += winAmount;
      updateBalance();
      showWinNotification(`승리! +₩${winAmount.toLocaleString()}`);
    } else {
      result = "딜러 승리!";
      showWinNotification("패배했습니다.");
    }
    
    // Show result
    const resultEl = document.getElementById("pokerResult");
    if (resultEl) {
      resultEl.innerHTML = `<div class="result-message">${result}</div>`;
    }
    
    // Reset game after delay
    setTimeout(() => {
      poker.playerCards = [];
      poker.communityCards = [];
      poker.gameActive = false;
      poker.pot = 0;
      updateTexasHoldemDisplay();
      if (resultEl) resultEl.innerHTML = "";
    }, 3000);
  }

           function startBaccarat() {
           if (gameState.currentBet > gameState.balance) {
             alert("잔액이 부족합니다!");
             return;
           }
         
           gameState.balance -= gameState.currentBet;
           updateBalance();
         
           const bacc = gameState.baccarat;
           bacc.deck = createDeck();
           bacc.playerCards = [];
           bacc.bankerCards = [];
           bacc.gameActive = false;
           bacc.currentBet = gameState.currentBet;

           // Show betting phase
           const dealerStatus = document.querySelector(".dealer-status");
           const playerStatus = document.querySelector(".player-status");
           const bankerStatus = document.querySelector(".banker-status");
           
           if (dealerStatus) dealerStatus.textContent = "배팅을 기다리는 중...";
           if (playerStatus) playerStatus.textContent = "배팅을 선택하세요";
           if (bankerStatus) bankerStatus.textContent = "게임을 기다리는 중...";

           // Show betting options
           const bettingOptions = document.createElement("div");
           bettingOptions.className = "betting-options";
           bettingOptions.innerHTML = `
             <h4>배팅 선택 (10초)</h4>
             <div class="bet-buttons">
               <button class="btn btn-primary" onclick="placeBaccaratBet('player')">플레이어 배팅</button>
               <button class="btn btn-primary" onclick="placeBaccaratBet('banker')">뱅커 배팅</button>
               <button class="btn btn-primary" onclick="placeBaccaratBet('tie')">타이 배팅</button>
             </div>
             <div class="countdown" id="baccaratCountdown">10</div>
           `;

           // Insert betting options after the baccarat-table
           const baccaratTable = document.querySelector(".baccarat-table");
           if (baccaratTable) {
             baccaratTable.insertAdjacentElement('afterend', bettingOptions);
           }

           // Start countdown
           let countdown = 10;
           const countdownEl = document.getElementById("baccaratCountdown");
           const countdownInterval = setInterval(() => {
             countdown--;
             if (countdownEl) countdownEl.textContent = countdown;
             
             if (countdown <= 0) {
               clearInterval(countdownInterval);
               // Auto-place random bet if no selection made
               if (!bacc.betType) {
                 const betTypes = ['player', 'banker', 'tie'];
                 bacc.betType = betTypes[Math.floor(Math.random() * betTypes.length)];
               }
               proceedWithBaccarat();
             }
           }, 1000);
         }

  function placeBaccaratBet(betType) {
    const bacc = gameState.baccarat;
    bacc.betType = betType;
    
    // Remove betting options
    const bettingOptions = document.querySelector(".betting-options");
    if (bettingOptions) bettingOptions.remove();
    
    // Clear countdown
    const countdownEl = document.getElementById("baccaratCountdown");
    if (countdownEl) countdownEl.textContent = "";
    
    // Proceed with game
    proceedWithBaccarat();
  }

  function proceedWithBaccarat() {
    const bacc = gameState.baccarat;
    
    // Update dealer status
    const dealerStatus = document.querySelector(".dealer-status");
    if (dealerStatus) dealerStatus.textContent = "카드를 섞고 있습니다...";

    // Simulate dealing animation - 속도를 조금 빠르게 조절
    setTimeout(() => {
      dealerStatus.textContent = "플레이어에게 카드를 나누는 중...";
      
      setTimeout(() => {
        bacc.playerCards = [bacc.deck.pop(), bacc.deck.pop()];
        updateBaccaratDisplay();
        dealerStatus.textContent = "뱅커에게 카드를 나누는 중...";
        
        setTimeout(() => {
          bacc.bankerCards = [bacc.deck.pop(), bacc.deck.pop()];
          updateBaccaratDisplay();
          
          // 간단한 바카라 룰 적용
          setTimeout(() => {
            applySimpleBaccaratRules();
          }, 1200);
        }, 1200); // 딜링 속도 조금 빠르게
      }, 1200); // 딜링 속도 조금 빠르게
    }, 1500); // 딜링 속도 조금 빠르게
  }

  function applySimpleBaccaratRules() {
    const bacc = gameState.baccarat;
    const dealerStatus = document.querySelector(".dealer-status");
    
    // 플레이어와 뱅커의 점수 계산
    bacc.playerScore = calculateBaccaratScore(bacc.playerCards);
    bacc.bankerScore = calculateBaccaratScore(bacc.bankerCards);
    
    // 자연 승리 체크 (8 또는 9점)
    if (bacc.playerScore >= 8 || bacc.bankerScore >= 8) {
      bacc.gameActive = true;
      if (dealerStatus) dealerStatus.textContent = "자연 승리! 게임 종료";
      setTimeout(() => {
        determineBaccaratWinner();
      }, 1200);
      return;
    }
    
    // 플레이어 추가 카드 규칙 (0-5점이면 추가)
    if (bacc.playerScore <= 5) {
      if (dealerStatus) dealerStatus.textContent = "플레이어 추가 카드 뽑는 중...";
      setTimeout(() => {
        bacc.playerCards.push(bacc.deck.pop());
        updateBaccaratDisplay();
        bacc.playerScore = calculateBaccaratScore(bacc.playerCards);
        
        // 뱅커 규칙 적용
        setTimeout(() => {
          applyBankerSimpleRules();
        }, 1200);
      }, 1200);
    } else {
      // 플레이어가 6-7점이면 뱅커 규칙만 적용
      setTimeout(() => {
        applyBankerSimpleRules();
      }, 1200);
    }
  }

  function applyBankerSimpleRules() {
    const bacc = gameState.baccarat;
    const dealerStatus = document.querySelector(".dealer-status");
    
    // 뱅커 추가 카드 규칙 (간단한 버전)
    let shouldDraw = false;
    
    if (bacc.bankerScore <= 2) {
      shouldDraw = true; // 항상 뽑음
    } else if (bacc.bankerScore === 3) {
      // 플레이어가 3번째 카드를 뽑았고 8이 아니면 뽑음
      if (bacc.playerCards.length === 3 && bacc.playerCards[2].value !== "8") {
        shouldDraw = true;
      }
    } else if (bacc.bankerScore === 4) {
      // 플레이어 3번째 카드가 2-7이면 뽑음
      if (bacc.playerCards.length === 3) {
        const playerThirdCard = bacc.playerCards[2].value;
        if (["2", "3", "4", "5", "6", "7"].includes(playerThirdCard)) {
          shouldDraw = true;
        }
      }
    } else if (bacc.bankerScore === 5) {
      // 플레이어 3번째 카드가 4-7이면 뽑음
      if (bacc.playerCards.length === 3) {
        const playerThirdCard = bacc.playerCards[2].value;
        if (["4", "5", "6", "7"].includes(playerThirdCard)) {
          shouldDraw = true;
        }
      }
    } else if (bacc.bankerScore === 6) {
      // 플레이어 3번째 카드가 6-7이면 뽑음
      if (bacc.playerCards.length === 3) {
        const playerThirdCard = bacc.playerCards[2].value;
        if (["6", "7"].includes(playerThirdCard)) {
          shouldDraw = true;
        }
      }
    }
    // 7점 이상이면 추가 카드 없음
    
    if (shouldDraw) {
      if (dealerStatus) dealerStatus.textContent = "뱅커 추가 카드 뽑는 중...";
      setTimeout(() => {
        bacc.bankerCards.push(bacc.deck.pop());
        updateBaccaratDisplay();
        bacc.bankerScore = calculateBaccaratScore(bacc.bankerCards);
        
        // 게임 종료
        setTimeout(() => {
          bacc.gameActive = true;
          if (dealerStatus) dealerStatus.textContent = "게임 진행 중...";
          setTimeout(() => {
            determineBaccaratWinner();
          }, 1200);
        }, 1200);
      }, 1200);
    } else {
      // 추가 카드 없음
      bacc.gameActive = true;
      if (dealerStatus) dealerStatus.textContent = "게임 진행 중...";
      setTimeout(() => {
        determineBaccaratWinner();
      }, 1200);
    }
  }

  function updateBaccaratDisplay() {
    const bacc = gameState.baccarat;
    const playerCardsEl = document.getElementById("playerCards");
    const bankerCardsEl = document.getElementById("bankerCards");
    const playerScoreEl = document.getElementById("playerScore");
    const bankerScoreEl = document.getElementById("bankerScore");

    // Player cards
    playerCardsEl.innerHTML = "";
    bacc.playerCards.forEach((card, index) => {
      const cardEl = document.createElement("div");
      cardEl.className = "playing-card";
      cardEl.textContent = `${card.value}${card.suit}`;
      playerCardsEl.appendChild(cardEl);
      
      // Add dealing animation - 속도를 조금 빠르게
      showCardDealingAnimation(cardEl, index * 150);
    });

    // Banker cards
    bankerCardsEl.innerHTML = "";
    bacc.bankerCards.forEach((card, index) => {
      const cardEl = document.createElement("div");
      cardEl.className = "playing-card";
      cardEl.textContent = `${card.value}${card.suit}`;
      bankerCardsEl.appendChild(cardEl);
      
      // Add dealing animation - 속도를 조금 빠르게
      showCardDealingAnimation(cardEl, index * 150);
    });

    bacc.playerScore = calculateBaccaratScore(bacc.playerCards);
    bacc.bankerScore = calculateBaccaratScore(bacc.bankerCards);

    playerScoreEl.textContent = `(${bacc.playerScore})`;
    bankerScoreEl.textContent = `(${bacc.bankerScore})`;

    // Update status messages
    const playerStatus = document.querySelector(".player-status");
    const bankerStatus = document.querySelector(".banker-status");
    
    if (playerStatus) {
      if (bacc.playerCards.length > 0) {
        playerStatus.textContent = `카드: ${bacc.playerScore}점`;
      } else {
        playerStatus.textContent = "게임을 기다리는 중...";
      }
    }
    
    if (bankerStatus) {
      if (bacc.bankerCards.length > 0) {
        bankerStatus.textContent = `카드: ${bacc.bankerScore}점`;
      } else {
        bankerStatus.textContent = "게임을 기다리는 중...";
      }
    }
  }

  function calculateBaccaratScore(cards) {
    let score = 0;
    for (let card of cards) {
      if (card.value === "A") {
        score += 1;
      } else if (["J", "Q", "K"].includes(card.value)) {
        score += 0;
      } else {
        score += parseInt(card.value);
      }
    }
    return score % 10;
  }

  function determineBaccaratWinner() {
    const bacc = gameState.baccarat;
    let result = "";
    let winAmount = 0;

    // 승패 판정
    if (bacc.playerScore === bacc.bankerScore) {
      result = "타이!";
      if (bacc.betType === 'tie') {
        winAmount = bacc.currentBet * 9; // 8:1 배당 (원금 포함)
      }
    } else if (bacc.playerScore > bacc.bankerScore) {
      result = "플레이어 승리!";
      if (bacc.betType === 'player') {
        winAmount = bacc.currentBet * 2; // 1:1 배당 (원금 포함)
      }
    } else {
      result = "뱅커 승리!";
      if (bacc.betType === 'banker') {
        winAmount = Math.floor(bacc.currentBet * 1.95); // 0.95:1 배당 (5% 수수료, 원금 포함)
      }
    }

    endBaccarat(result, winAmount);
  }

  function endBaccarat(message, winAmount = 0) {
    const bacc = gameState.baccarat;
    bacc.gameActive = false;

    if (winAmount > 0) {
      gameState.balance += winAmount;
      updateBalance();
      showWinNotification(`${message} +₩${winAmount.toLocaleString()}`);
    }

    const resultEl = document.getElementById("baccaratResult");
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="result-message">
          <h3>${message}</h3>
          <p>플레이어: ${bacc.playerScore}점</p>
          <p>뱅커: ${bacc.bankerScore}점</p>
          ${winAmount > 0 ? `<p class="win-amount">+₩${winAmount.toLocaleString()}</p>` : ''}
        </div>
      `;
      resultEl.style.color = winAmount > 0 ? "#00ff00" : "#ff4444";
    }

    // 3초 후 결과 메시지 제거
    setTimeout(() => {
      if (resultEl) resultEl.innerHTML = "";
    }, 5000);
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
    const winner = tttCheckWinner(t.board);
    if (winner || t.board.every(Boolean)) return tttFinish(winner);
  
    // AI move (simple best: win > block > random)
    const aiIdx = tttChooseAIMove(t.board, t.ai, t.player);
    if (aiIdx !== -1) {
      t.board[aiIdx] = t.ai;
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

  // 오목 게임 추가 (디자인 개선 + AI 강화)
function loadOmokGame() {
  gameArea.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:1.5rem;">
      <div style="font-size:1.2rem;color:#ffb800;">베팅: ₩${gameState.currentBet}</div>
      <div style="margin-bottom:1rem;">
        <button class="btn btn-primary" onclick="startOmok('ai')">AI와 대국</button>
        <button class="btn btn-secondary" onclick="startOmok('2p')">2인 대국</button>
      </div>
      <div id="omokStatus" style="min-height:28px;color:#ffb800;font-weight:bold;font-size:1.1rem;">모드를 선택하세요!</div>
      <div id="omokBoard" style="display:grid;grid-template-columns:repeat(15,36px);gap:2px;margin-top:1rem;background:#e0c68c;border:6px solid #b8860b;border-radius:18px;box-shadow:0 8px 32px #0008;"></div>
      <div id="omokLegend" style="margin-top:1rem;font-size:1rem;color:#888;">
        <span style="margin-right:1.5rem;"><span style="font-size:1.3rem;color:#111;">●</span> 흑(선)</span>
        <span><span style="font-size:1.3rem;color:#fff;text-shadow:0 0 2px #000;">○</span> 백</span>
      </div>
    </div>
  `;
  gameState.omok = { mode: null, board: [], turn: 1, active: false, bet: gameState.currentBet };
}

function startOmok(mode) {
  const bet = gameState.currentBet;
  if (bet > gameState.balance) {
    alert("잔액이 부족합니다!");
    return;
  }
  gameState.balance -= bet;
  updateBalance();
  const board = Array(15 * 15).fill(0);
  gameState.omok = { mode, board, turn: 1, active: true, bet, history: [] };
  renderOmokBoard();
  document.getElementById("omokStatus").textContent = mode === "ai" ? "내 턴 (흑)" : "흑(플레이어1) 턴";
}

function renderOmokBoard() {
  const { board, active } = gameState.omok;
  const boardDiv = document.getElementById("omokBoard");
  boardDiv.innerHTML = "";
  for (let i = 0; i < 225; i++) {
    const cell = document.createElement("button");
    cell.className = "btn";
    cell.style.width = "36px";
    cell.style.height = "36px";
    cell.style.background = "#e0c68c";
    cell.style.border = "1px solid #b8860b";
    cell.style.borderRadius = "50%";
    cell.style.padding = "0";
    cell.style.fontSize = "1.7rem";
    cell.style.fontWeight = "bold";
    cell.style.transition = "box-shadow 0.2s";
    cell.style.boxShadow = board[i] ? "0 0 8px #ffb80088" : "none";
    cell.style.color = board[i] === 1 ? "#111" : "#fff";
    cell.disabled = !active || board[i] !== 0;
    if (board[i] === 1) {
      cell.textContent = "●";
    } else if (board[i] === 2) {
      cell.textContent = "●";
      cell.style.color = "#fff";
      cell.style.textShadow = "0 0 2px #fff, 0 0 6px #fff";
    } else {
      cell.textContent = "";
      cell.style.textShadow = "none";
    }
    cell.onmouseover = () => {
      if (!cell.disabled) cell.style.background = "#ffe4a1";
    };
    cell.onmouseout = () => {
      if (!cell.disabled) cell.style.background = "#e0c68c";
    };
    cell.onclick = () => omokMove(i);
    boardDiv.appendChild(cell);
  }
}

function omokMove(idx) {
  const o = gameState.omok;
  if (!o.active || o.board[idx] !== 0) return;
  o.board[idx] = o.turn;
  o.history.push(idx);
  renderOmokBoard();
  const winner = checkOmokWinner(o.board, idx);
  if (winner) return finishOmok(winner);
  if (o.board.every(x => x !== 0)) return finishOmok(0);

  if (o.mode === "ai") {
    o.turn = 2;
    document.getElementById("omokStatus").textContent = "AI(백) 생각 중...";
    setTimeout(() => {
      const aiIdx = omokAIMoveSmart(o.board.slice(), 2, 1);
      if (aiIdx !== -1) {
        o.board[aiIdx] = 2;
        o.history.push(aiIdx);
        renderOmokBoard();
        const winner2 = checkOmokWinner(o.board, aiIdx);
        if (winner2) return finishOmok(winner2);
        if (o.board.every(x => x !== 0)) return finishOmok(0);
      }
      o.turn = 1;
      document.getElementById("omokStatus").textContent = "내 턴 (흑)";
    }, 600);
  } else {
    o.turn = o.turn === 1 ? 2 : 1;
    document.getElementById("omokStatus").textContent = o.turn === 1 ? "흑(플레이어1) 턴" : "백(플레이어2) 턴";
  }
}

function checkOmokWinner(board, idx) {
  const who = board[idx];
  if (!who) return 0;
  const x = idx % 15, y = Math.floor(idx / 15);
  const dirs = [
    [1, 0], [0, 1], [1, 1], [1, -1]
  ];
  for (const [dx, dy] of dirs) {
    let cnt = 1;
    for (let d = 1; d < 5; d++) {
      const nx = x + dx * d, ny = y + dy * d;
      if (nx < 0 || nx >= 15 || ny < 0 || ny >= 15) break;
      if (board[ny * 15 + nx] === who) cnt++;
      else break;
    }
    for (let d = 1; d < 5; d++) {
      const nx = x - dx * d, ny = y - dy * d;
      if (nx < 0 || nx >= 15 || ny < 0 || ny >= 15) break;
      if (board[ny * 15 + nx] === who) cnt++;
      else break;
    }
    if (cnt >= 5) return who;
  }
  return 0;
}

function finishOmok(winner) {
  const o = gameState.omok;
  o.active = false;
  let msg = "";
  let payout = 0;
  if (winner === 1) {
    msg = o.mode === "ai" ? "승리! (흑)" : "흑(플레이어1) 승리!";
    payout = o.bet * 2;
    gameState.balance += payout;
    updateBalance();
    if (payout > o.bet) showWinNotification(`오목 승리! +₩${(payout - o.bet).toLocaleString()}`);
    alert(msg + `\n+₩${(payout - o.bet).toLocaleString()}`);
  } else if (winner === 2) {
    msg = o.mode === "ai" ? "패배! (백)" : "백(플레이어2) 승리!";
    // 패배: 돈 잃음, 메시지창
    alert(msg + `\n-₩${o.bet.toLocaleString()}`);
  } else {
    msg = "무승부";
    payout = o.bet;
    gameState.balance += payout;
    updateBalance();
    alert(msg + "\n베팅금 환급");
  }
  document.getElementById("omokStatus").textContent = `결과: ${msg}`;
}

// 더 똑똑한 AI: 공격/수비/우선순위 평가 (패턴 기반)
function omokAIMoveSmart(board, ai, player) {
  // 1. 즉시 승리
  for (let i = 0; i < 225; i++) {
    if (board[i] === 0) {
      board[i] = ai;
      if (checkOmokWinner(board, i) === ai) {
        board[i] = 0;
        return i;
      }
      board[i] = 0;
    }
  }
  // 2. 즉시 패배 방지
  for (let i = 0; i < 225; i++) {
    if (board[i] === 0) {
      board[i] = player;
      if (checkOmokWinner(board, i) === player) {
        board[i] = 0;
        return i;
      }
      board[i] = 0;
    }
  }

  // 3. 더블쓰렛(이중공격) 탐지: 두 군데 이상에서 4개가 만들어지는 수
  let doubleThreat = -1, doubleThreatScore = 0;
  for (let i = 0; i < 225; i++) {
    if (board[i] !== 0) continue;
    board[i] = ai;
    let threatCount = 0;
    for (let j = 0; j < 225; j++) {
      if (board[j] === 0) {
        board[j] = ai;
        if (omokPatternScore(board, j, ai) >= 10000) threatCount++;
        board[j] = 0;
      }
    }
    board[i] = 0;
    if (threatCount >= 2 && threatCount > doubleThreatScore) {
      doubleThreat = i;
      doubleThreatScore = threatCount;
    }
  }
  if (doubleThreat !== -1) return doubleThreat;

  // 4. 패턴 기반 점수 + 열린3 우선
  let best = -1, bestScore = -99999;
  for (let i = 0; i < 225; i++) {
    if (board[i] !== 0) continue;
    // 공격 점수
    board[i] = ai;
    let score = omokPatternScore(board, i, ai);
    // 열린3(삼삼) 우선
    if (omokOpenThree(board, i, ai)) score += 5000;
    board[i] = 0;
    // 수비 점수
    board[i] = player;
    score += omokPatternScore(board, i, player) * 0.95;
    if (omokOpenThree(board, i, player)) score += 4000;
    board[i] = 0;
    // 중앙 가중치
    const cx = 7, cy = 7, x = i % 15, y = Math.floor(i / 15);
    score += 12 - (Math.abs(cx - x) + Math.abs(cy - y));
    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  }
  return best;
// 열린3(삼삼) 체크 함수
function omokOpenThree(board, idx, who) {
  // 열린3: 연속 3개 + 양쪽이 비어있는 경우
  const x = idx % 15, y = Math.floor(idx / 15);
  const dirs = [
    [1, 0], [0, 1], [1, 1], [1, -1]
  ];
  for (const [dx, dy] of dirs) {
    let cnt = 1, open1 = false, open2 = false;
    // +
    for (let d = 1; d < 4; d++) {
      const nx = x + dx * d, ny = y + dy * d;
      if (nx < 0 || nx >= 15 || ny < 0 || ny >= 15) { open1 = false; break; }
      if (board[ny * 15 + nx] === who) cnt++;
      else { open1 = board[ny * 15 + nx] === 0; break; }
    }
    // -
    for (let d = 1; d < 4; d++) {
      const nx = x - dx * d, ny = y - dy * d;
      if (nx < 0 || nx >= 15 || ny < 0 || ny >= 15) { open2 = false; break; }
      if (board[ny * 15 + nx] === who) cnt++;
      else { open2 = board[ny * 15 + nx] === 0; break; }
    }
    if (cnt === 3 && open1 && open2) return true;
  }
  return false;
}

// 패턴 점수: 연속돌, 열린3, 열린4 등
function omokPatternScore(board, idx, who) {
  let score = 0;
  const x = idx % 15, y = Math.floor(idx / 15);
  const dirs = [
    [1, 0], [0, 1], [1, 1], [1, -1]
  ];
  for (const [dx, dy] of dirs) {
    let cnt = 1, open1 = false, open2 = false;
    // +
    for (let d = 1; d < 5; d++) {
      const nx = x + dx * d, ny = y + dy * d;
      if (nx < 0 || nx >= 15 || ny < 0 || ny >= 15) { open1 = false; break; }
      if (board[ny * 15 + nx] === who) cnt++;
      else { open1 = board[ny * 15 + nx] === 0; break; }
    }
    // - 
    for (let d = 1; d < 5; d++) {
      const nx = x - dx * d, ny = y - dy * d;
      if (nx < 0 || nx >= 15 || ny < 0 || ny >= 15) { open2 = false; break; }
      if (board[ny * 15 + nx] === who) cnt++;
      else { open2 = board[ny * 15 + nx] === 0; break; }
    }
    // 점수 부여
    if (cnt >= 5) score += 100000;
    else if (cnt === 4 && open1 && open2) score += 10000; // 열린4
    else if (cnt === 4 && (open1 || open2)) score += 3000; // 막힌4
    else if (cnt === 3 && open1 && open2) score += 1000; // 열린3
    else if (cnt === 3 && (open1 || open2)) score += 300; // 막힌3
    else if (cnt === 2 && open1 && open2) score += 100; // 열린2
    else if (cnt === 2 && (open1 || open2)) score += 30; // 막힌2
  }
  return score;
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
      const currentUsers = parseInt(onlineUsers.textContent.replace(/,/g, "")) || 0;
      const newUsers = currentUsers + Math.floor(Math.random() * 10) - 5;
      onlineUsers.textContent = Math.max(2000, newUsers).toLocaleString();
    }

    if (gamesPlayed) {
      const currentGames = parseInt(gamesPlayed.textContent.replace(/,/g, "")) || 0;
      gamesPlayed.textContent = (
        currentGames + Math.floor(Math.random() * 5)
      ).toLocaleString();
    }

    if (Math.random() < 0.3 && bigWins) {
      const currentWins = parseInt(bigWins.textContent) || 0;
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
}
