
// 메인 게임 진입점
class Game {
  constructor() {
    this.gameLoop = null;
    this.saveInterval = null;
    this.playTimeInterval = null;
    this.passiveAccumulator = 0;
  }

  async initialize() {
    console.log("🎮 클래식 영거지키우기 게임 시작!");

    // 게임 데이터 로드
    const loaded = game.loadGame();
    if (loaded) {
      console.log("💾 저장된 게임을 불러왔습니다.");
    } else {
      console.log("🆕 새 게임을 시작합니다.");
    }

    // UI 초기화 (스토리와 무관하게 게임 루프는 즉시 시작)
    UI.initialize();
    this.startGameLoop();

    // 자동 저장 시작 (30초마다)
    this.saveInterval = setInterval(() => {
      game.autoSave();
    }, 30000);

    // 플레이 시간 추적 (1초마다)
    this.playTimeInterval = setInterval(() => {
      game.playTime++;
    }, 1000);

    // 페이지 종료 시 저장
    window.addEventListener("beforeunload", () => {
      if (!game.isResetting) {
        game.autoSave();
      }
    });

    // 페이지 포커스 이벤트
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        game.calculateOfflineEarnings();
        UI.updateAll();
      } else {
        // 탭이 숨겨질 때 현재 시간을 저장해 기준을 명확히 유지
        game.lastSaveTime = Date.now();
      }
    });

    // 터치 이벤트 최적화
    this.setupTouchEvents();

    console.log("✅ 게임 초기화 완료!");
  }

  setupTouchEvents() {
    // 터치 시작 시 피드백
    document.addEventListener(
      "touchstart",
      (e) => {
        if (
          e.target.classList.contains("character-sprite") ||
          e.target.classList.contains("menu-item") ||
          e.target.classList.contains("npc")
        ) {
          e.target.style.transform = "scale(0.95)";
        }
      },
      { passive: true }
    );

    // 터치 종료 시 원복
    document.addEventListener(
      "touchend",
      (e) => {
        if (
          e.target.classList.contains("character-sprite") ||
          e.target.classList.contains("menu-item") ||
          e.target.classList.contains("npc")
        ) {
          setTimeout(() => {
            e.target.style.transform = "";
          }, 100);
        }
      },
      { passive: true }
    );

    // 스크롤 방지 (게임 영역에서)
    document.addEventListener(
      "touchmove",
      (e) => {
        if (e.target.closest(".game-area")) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }

  startGameLoop() {
    let lastTime = Date.now();

    const loop = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // 자동 수익 적용
      if (game.stats.passiveIncome > 0) {
        // 긴 프레임에서 과도한 지급 방지용 델타 클램프
        const clampedDelta = Math.min(deltaTime, 0.25);
        this.passiveAccumulator += game.stats.passiveIncome * clampedDelta;

        // 0.01 단위로 여러 번 지급 (부드러운 증가 감지)
        let framePayout = 0;
        while (this.passiveAccumulator >= 0.01) {
          this.passiveAccumulator -= 0.01;
          framePayout += 0.01;
        }
        if (framePayout > 0) {
          // 소수 둘째 자리 고정
          framePayout = Math.round(framePayout * 100) / 100;
          game.addMoney(framePayout);
          UI.updateCurrency();
        }

        // 보조 UI(경험치/게이지)는 1초마다
        if (
          Math.floor(currentTime / 1000) !==
          Math.floor((currentTime - 1000) / 1000)
        ) {
          UI.updateProgress();
        }
      }

      this.gameLoop = requestAnimationFrame(loop);
    };

    this.gameLoop = requestAnimationFrame(loop);
  }

  // 게임 정지
  stop() {
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop);
      this.gameLoop = null;
    }

    if (this.saveInterval) {
      clearInterval(this.saveInterval);
      this.saveInterval = null;
    }

    if (this.playTimeInterval) {
      clearInterval(this.playTimeInterval);
      this.playTimeInterval = null;
    }

    if (this.passiveTickInterval) {
      clearInterval(this.passiveTickInterval);
      this.passiveTickInterval = null;
    }

    // UI 정리
    UI.destroy();

    // 마지막 저장
    if (!game.isResetting) {
      game.autoSave();
    }
  }

  // 게임 재시작
  restart() {
    this.stop();
    this.initialize();
  }
}

// 디버그 함수들 (개발용)
window.debugGame = {
  addMoney: (amount) => {
    game.addMoney(amount);
    UI.updateAll();
    console.log(`💰 ${amount}원 추가됨`);
  },

  addDiamonds: (amount) => {
    game.diamonds += amount;
    UI.updateAll();
    console.log(`💎 ${amount}개 다이아몬드 추가됨`);
  },

  levelUp: () => {
    game.levelUp();
    console.log("⬆️ 레벨업!");
  },

  maxLevel: () => {
    game.level = 7;
    game.experience = 0;
    UI.updateCharacter();
    UI.updateAll();
    console.log("👑 최대 레벨!");
  },

  showStats: () => {
    console.log("📊 게임 통계:");
    console.log("돈:", formatKoreanNumber(game.money));
    console.log("다이아몬드:", game.diamonds);
    console.log("레벨:", game.level);
    console.log("경험치:", game.experience);
    console.log("스탯:", game.stats);
    console.log("업그레이드:", game.upgrades);
    console.log("사업:", game.businesses);
  },

  fastMode: () => {
    game.stats.passiveIncome *= 10;
    game.stats.begPower *= 10;
    UI.updateAll();
    console.log("⚡ 빠른 모드 활성화!");
  },
};

// 게임 시작
let gameInstance;

// DOM이 로드된 후 게임 시작
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    gameInstance = new Game();
  });
} else {
  gameInstance = new Game();
}

// 전역 에러 핸들링
window.addEventListener("error", (e) => {
  console.error("게임 에러:", e.error);
  if (typeof game !== "undefined") {
    if (!game.isResetting) {
      game.autoSave();
    }
  }
});

// 메모리 누수 방지
window.addEventListener("beforeunload", () => {
  if (gameInstance) {
    gameInstance.stop();
  }
});

// 콘솔 웰컴 메시지
console.log(`
  🎮 클래식 거지키우기 게임에 오신 것을 환영합니다!
  
  📱 모바일 최적화된 클래식 UI로 제작되었습니다.
  💰 캐릭터와 NPC를 클릭하여 돈을 모으고 레벨을 올려보세요!
  🎯 하단 메뉴를 통해 다양한 기능을 이용하세요!
  
  디버그 명령어:
  - debugGame.addMoney(금액) : 돈 추가
  - debugGame.addDiamonds(개수) : 다이아몬드 추가
  - debugGame.levelUp() : 레벨업
  - debugGame.maxLevel() : 최대 레벨로
  - debugGame.showStats() : 통계 표시
  - debugGame.fastMode() : 빠른 모드
  
  즐거운 게임 되세요! 🚀
  `);
