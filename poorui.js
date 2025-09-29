
// UI 관리 클래스
class UIManager {
  constructor() {
    this.elements = {};
    this.currentModal = null;
    this.speechTimer = null;
    this.initializeElements();
    this.bindEvents();
    // 스토리 온보딩: UI 생성 직후 바로 표시
    if (!game.settings.storySeen) {
      // 약간의 렌더 지연 후 표시
      setTimeout(() => this.showStoryOnboarding(), 0);
    }
  }

  initializeElements() {
    this.elements = {
      money: document.getElementById("money"),
      diamonds: document.getElementById("diamonds"),
      level: document.getElementById("level"),
      mainCharacter: document.getElementById("main-character"),
      characterSprite: document.getElementById("character-sprite"),
      characterName: document.getElementById("character-name"),
      levelName: document.getElementById("level-name"),
      speechText: document.getElementById("speech-text"),
      currentExp: document.getElementById("current-exp"),
      requiredExp: document.getElementById("required-exp"),
      expFill: document.getElementById("exp-fill"),
      autoRate: document.getElementById("auto-rate"),
      modalOverlay: document.getElementById("modal-overlay"),
      modalContent: document.getElementById("modal-content"),
      floatingMessages: document.getElementById("floating-messages"),
      clickEffects: document.getElementById("click-effects"),
      characterVideo: document.getElementById("character-video"),
    };
  }

  bindEvents() {
    // 캐릭터 클릭
    if (this.elements.characterSprite) {
      this.elements.characterSprite.addEventListener("click", (e) => {
        this.handleCharacterClick(e);
      });
    }
    if (this.elements.mainCharacter) {
      this.elements.mainCharacter.addEventListener("click", (e) => {
        this.handleCharacterClick(e);
      });
    }
    if (this.elements.characterVideo) {
      this.elements.characterVideo.addEventListener("click", (e) => {
        this.handleCharacterClick(e);
      });
    }

    // 비디오 활성화: 첫 상호작용 시 재생 허용
    const startVideoIfAvailable = () => {
      const vid = this.elements.characterVideo;
      if (vid && vid.dataset.enabled !== "1") {
        try {
          // 무음 자동재생으로 먼저 시작 → 바로 음소거 해제
          vid.muted = true;
          vid.style.display = "block";
          if (this.elements.characterSprite) {
            this.elements.characterSprite.style.display = "none";
          }
          vid
            .play()
            .then(() => {
              // 사용자 제스처 안에서 즉시 언뮤트 시도
              vid.muted = false;
              vid.dataset.enabled = "1";
            })
            .catch(() => {
              // 일부 환경에서는 언뮤트가 막힘 → 무음으로라도 재생 유지
              vid.muted = true;
              vid.play().finally(() => (vid.dataset.enabled = "1"));
            });
        } catch (e) {
          console.warn("video play failed", e);
        }
      }
    };

    if (this.elements.characterSprite) {
      this.elements.characterSprite.addEventListener(
        "click",
        startVideoIfAvailable
      );
    }
    if (this.elements.characterVideo) {
      this.elements.characterVideo.addEventListener(
        "click",
        startVideoIfAvailable
      );
    }
    document.addEventListener("keydown", startVideoIfAvailable, { once: true });
    document.addEventListener(
      "pointerdown",
      (e) => {
        // 화면 어디든 첫 터치/클릭 한 번으로 재생 처리
        const vid = this.elements.characterVideo;
        if (!vid || vid.dataset.enabled === "1") return;
        try {
          vid.style.display = "block";
          if (this.elements.characterSprite) {
            this.elements.characterSprite.style.display = "none";
          }
          vid.muted = true;
          vid
            .play()
            .then(() => {
              // 같은 사용자 제스처 안에서 언뮤트 재시도
              vid.muted = false;
              return vid.play();
            })
            .finally(() => {
              vid.dataset.enabled = "1";
            });
        } catch (err) {
          console.warn("global play failed", err);
        }
      },
      { once: true, passive: true }
    );

    // 게임 영역 클릭
    document
      .querySelector(".character-scene")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("character-scene")) {
          this.handleSceneClick(e);
        }
      });

    // NPC 클릭
    document.querySelectorAll(".npc").forEach((npc) => {
      npc.addEventListener("click", (e) => {
        this.handleNPCClick(e);
      });
    });

    // 메뉴 버튼들
    document.querySelectorAll(".menu-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const action = e.currentTarget.dataset.action;
        this.handleMenuAction(action);
      });
    });

    // 모달 닫기
    this.elements.modalOverlay.addEventListener("click", (e) => {
      if (e.target === this.elements.modalOverlay) {
        this.closeModal();
      }
    });

    // 상단 메뉴 버튼 (햄버거)
    const menuBtn = document.getElementById("menu-btn");
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        this.showQuickMenu();
      });
    }

    // 음소거 토글 버튼
    const muteBtn = document.getElementById("mute-toggle");
    if (muteBtn) {
      const updateIcon = () => {
        const vid = this.elements.characterVideo;
        muteBtn.textContent = vid && !vid.muted ? "🔊" : "🔇";
      };
      updateIcon();
      muteBtn.addEventListener("click", () => {
        const vid = this.elements.characterVideo;
        if (!vid) return;
        if (vid.style.display === "none") {
          vid.style.display = "block";
          if (this.elements.characterSprite) {
            this.elements.characterSprite.style.display = "none";
          }
          vid.muted = true;
          vid.play().catch(() => {});
        }
        vid.muted = !vid.muted;
        if (!vid.muted) {
          vid.play().catch(() => {});
        }
        updateIcon();
      });
    }

    // 키보드 단축키
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        this.handleCharacterClick();
      } else if (e.code === "Escape") {
        this.closeModal();
      }
    });

    // 자동 말풍선 변경
    this.startSpeechTimer();
  }

  // 빠른 메뉴 모달
  showQuickMenu() {
    const content = `
              <div class="modal-header">
                  <h2 class="modal-title">빠른 메뉴</h2>
                  <button class="modal-close" onclick="UI.closeModal()">×</button>
              </div>
              <div class="upgrade-list" style="gap: 10px;">
                  <button class="upgrade-btn" data-qm="upgrade">능력 업그레이드</button>
                  <button class="upgrade-btn" data-qm="business">사업 투자</button>
                  <button class="upgrade-btn" data-qm="shop">상점</button>
                  <button class="upgrade-btn" data-qm="settings">설정</button>
                  <button class="upgrade-btn" data-qm="save">저장</button>
                  <button class="upgrade-btn" data-qm="reset" style="background:#e74c3c">게임 초기화</button>
              </div>
          `;
    this.showModal(content);
    this.bindQuickMenuEvents();
  }

  bindQuickMenuEvents() {
    document.querySelectorAll("[data-qm]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const action = e.currentTarget.dataset.qm;
        switch (action) {
          case "upgrade":
            this.showUpgradeModal();
            break;
          case "business":
            this.showBusinessModal();
            break;
          case "shop":
            this.showShopModal();
            break;
          case "settings":
            this.showSettingsModal();
            break;
          case "save":
            game.autoSave();
            this.showFloatingMessage("💾 게임이 저장되었습니다!");
            break;
          case "reset":
            game.resetGame();
            break;
        }
      });
    });
  }

  // 캐릭터 클릭 처리
  handleCharacterClick(e) {
    const earnings = game.getClickEarnings();
    game.addMoney(earnings);
    // 자산 즉시 반영 (애니메이션/이펙트 전에 바로 표시)
    this.updateCurrency();
    game.totalClicks++;

    // 클릭 효과
    this.showClickEffect(earnings, e);

    // 캐릭터 애니메이션
    // 비디오에는 애니메이션 적용하지 않음
    if (this.elements.characterSprite) {
      this.elements.characterSprite.classList.add("pulse");
      setTimeout(() => {
        this.elements.characterSprite.classList.remove("pulse");
      }, 300);
    }

    // 햅틱 피드백
    triggerHaptic();

    // 말풍선 변경
    this.updateSpeech();

    this.updateAll();
  }

  // 게임 영역 클릭 처리
  handleSceneClick(e) {
    this.handleCharacterClick(e);
  }

  // NPC 클릭 처리
  handleNPCClick(e) {
    const npc = e.currentTarget;
    const bonus = Math.floor(Math.random() * 50) + 10;
    game.addMoney(bonus);

    // NPC 애니메이션
    npc.classList.add("pulse");
    setTimeout(() => {
      npc.classList.remove("pulse");
    }, 300);

    this.showClickEffect(bonus, e);
    this.showFloatingMessage(`👥 NPC 보너스: +${bonus}원`);
    this.updateAll();
  }

  // 클릭 효과 표시
  showClickEffect(amount, event) {
    const effect = document.createElement("div");
    effect.className = "click-effect";
    effect.textContent = `+${formatKoreanNumber(amount)}`;

    // 위치 설정
    let x, y;
    if (event && event.clientX) {
      x = event.clientX;
      y = event.clientY;
    } else {
      // 캐릭터 중심 위치
      const refEl =
        this.elements.characterVideo ||
        this.elements.characterSprite ||
        this.elements.mainCharacter;
      if (refEl) {
        const rect = refEl.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else {
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
      }
    }

    effect.style.left = x + "px";
    effect.style.top = y + "px";

    this.elements.clickEffects.appendChild(effect);

    setTimeout(() => {
      if (effect.parentNode) {
        effect.parentNode.removeChild(effect);
      }
    }, 2000);
  }

  // 메뉴 액션 처리
  handleMenuAction(action) {
    switch (action) {
      case "beg":
        this.showBegInfoModal();
        break;
      case "upgrade":
        this.showUpgradeModal();
        break;
      case "business":
        this.showBusinessModal();
        break;
      case "investment":
        this.showInvestmentModal();
        break;
      case "job":
        this.showJobModal();
        break;
      case "lottery":
        this.showLotteryModal();
        break;
      case "shop":
        this.showShopModal();
        break;
      case "settings":
        this.showSettingsModal();
        break;
    }
  }

  flashBegInfo() {
    const begButton = document.querySelector('.menu-item[data-action="beg"]');
    if (!begButton) return;
    const info = begButton.querySelector(".beg-info");
    if (!info) return;
    info.classList.add("show");
    clearTimeout(this._begInfoTimer);
    this._begInfoTimer = setTimeout(() => {
      info.classList.remove("show");
    }, 1200);
  }

  // 구걸 정보 모달
  showBegInfoModal() {
    const levelInfo = game.getLevelInfo(game.level);
    const required = levelInfo.requiredExp;
    const current = game.experience;
    const progress = Math.min((current / required) * 100, 100);

    const content = `
              <div class="modal-header">
                  <h2 class="modal-title">구걸 정보</h2>
                  <button class="modal-close" onclick="UI.closeModal()">×</button>
              </div>
              <div style="padding: 10px 5px 20px 5px;">
                  <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:12px;">
                      <div style="font-weight:bold; color:#8b4513;">Lv.<span>${
                        game.level
                      }</span> <span>${levelInfo.name}</span></div>
                      <div style="font-size:12px; color:#7f8c8d;">총 클릭: ${game.totalClicks.toLocaleString()}</div>
                  </div>
                  <div class="exp-bar" style="height:18px;">
                      <div class="exp-fill" style="width:${progress}%;"></div>
                      <div class="exp-text" style="font-size:11px;">
                          ${formatKoreanNumber(current)} / ${formatKoreanNumber(
      required
    )} EXP
                      </div>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:16px;">
                      <div class="upgrade-item" style="padding:10px;">
                          <div class="upgrade-name">클릭 수익</div>
                          <div class="upgrade-desc">현재 클릭 예상 수익</div>
                          <div class="upgrade-cost" style="color:#27ae60;">~ ${formatKoreanNumber(
                            game.getClickEarnings()
                          )}원</div>
                      </div>
                      <div class="upgrade-item" style="padding:10px;">
                          <div class="upgrade-name">자동 수익</div>
                          <div class="upgrade-desc">초당</div>
                          <div class="upgrade-cost" style="color:#27ae60;">${formatKoreanNumber(
                            game.stats.passiveIncome
                          )}/초</div>
                      </div>
                  </div>
                  <div style="display:flex; gap:10px; margin-top:16px;">
                      <button id="beg-now-btn" class="upgrade-btn" style="flex:1;">지금 구걸하기</button>
                      <button class="upgrade-btn" style="background:#95a5a6;" onclick="UI.closeModal()">닫기</button>
                  </div>
              </div>
          `;
    this.showModal(content);

    const begBtn = document.getElementById("beg-now-btn");
    if (begBtn) {
      begBtn.addEventListener("click", () => {
        this.handleCharacterClick();
        // 진행도/화폐 갱신
        this.updateAll();
        // 모달 내 게이지도 즉시 리프레시
        const lvl = game.getLevelInfo(game.level);
        const req = lvl.requiredExp;
        const cur = game.experience;
        const pct = Math.min((cur / req) * 100, 100);
        const bar =
          this.elements.modalContent.querySelector(".exp-bar .exp-fill");
        const txt = this.elements.modalContent.querySelector(".exp-text");
        if (bar) bar.style.width = pct + "%";
        if (txt)
          txt.textContent = `${formatKoreanNumber(cur)} / ${formatKoreanNumber(
            req
          )} EXP`;
      });
    }
  }

  // 업그레이드 모달
  showUpgradeModal() {
    const content = `
              <div class="modal-header">
                  <h2 class="modal-title">능력치 업그레이드</h2>
                  <button class="modal-close" onclick="UI.closeModal()">×</button>
              </div>
              <div class="upgrade-list" id="upgrade-list">
                  ${this.generateUpgradeList()}
              </div>
          `;
    this.showModal(content);
    this.bindUpgradeEvents();
  }

  // 사업 모달
  showBusinessModal() {
    const content = `
              <div class="modal-header">
                  <h2 class="modal-title">사업 투자</h2>
                  <button class="modal-close" onclick="UI.closeModal()">×</button>
              </div>
              <div class="upgrade-list" id="business-list">
                  ${this.generateBusinessList()}
              </div>
          `;
    this.showModal(content);
    this.bindBusinessEvents();
  }

  // 투자 모달
  showInvestmentModal() {
    const content = `
              <div class="modal-header">
                  <h2 class="modal-title">주식 투자</h2>
                  <button class="modal-close" onclick="UI.closeModal()">×</button>
              </div>
              <div style="padding: 20px;">
                  <h3>📈 주식 투자</h3>
                  <p>리스크를 감수하고 큰 수익을 노려보세요!</p>
                  <div style="display: flex; gap: 10px; margin-top: 15px;">
                      <input type="number" id="invest-amount" placeholder="투자금액" min="1000" style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                      <button id="invest-btn" class="upgrade-btn">투자하기</button>
                  </div>
              </div>
          `;
    this.showModal(content);
    this.bindInvestmentEvents();
  }

  // 일자리 모달
  showJobModal() {
    const content = `
              <div class="modal-header">
                  <h2 class="modal-title">일자리</h2>
                  <button class="modal-close" onclick="UI.closeModal()">×</button>
              </div>
              <div class="upgrade-list">
                  ${this.generateJobList()}
              </div>
          `;
    this.showModal(content);
    this.bindJobEvents();
  }

  // 복권 모달
  showLotteryModal() {
    const content = `
              <div class="modal-header">
                  <h2 class="modal-title">복권 게임</h2>
                  <button class="modal-close" onclick="UI.closeModal()">×</button>
              </div>
              <div style="padding: 20px; text-align: center;">
                  <h3>🎰 복권 긁기</h3>
                  <p>1,000원으로 복권을 구매하여 행운을 시험해보세요!</p>
                  <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 15px 0;">
                      <div>🥇 잭팟: 100,000원</div>
                      <div>🥈 큰상금: 10,000원</div>
                      <div>🥉 소액: 2,000원</div>
                  </div>
                  <button id="lottery-btn" class="upgrade-btn" style="font-size: 16px; padding: 15px 30px;">복권 구매 (1,000원)</button>
              </div>
          `;
    this.showModal(content);
    this.bindLotteryEvents();
  }

  bindJobEvents() {
    document.querySelectorAll("[data-job]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const jobId = e.target.dataset.job;
        if (game.buyJob(jobId)) {
          this.showFloatingMessage(`💼 ${game.jobData[jobId].name} 취업!`);
          this.showJobModal();
          this.updateAll();
          triggerHaptic();
        } else {
          this.showFloatingMessage("💰 돈이 부족하거나 이미 보유중입니다!");
        }
      });
    });
  }

  // 상점 모달
  showShopModal() {
    const content = `
              <div class="modal-header">
                  <h2 class="modal-title">상점</h2>
                  <button class="modal-close" onclick="UI.closeModal()">×</button>
              </div>
              <div class="upgrade-list" id="shop-list">
                  ${this.generateShopList()}
              </div>
          `;
    this.showModal(content);
    this.bindShopEvents();
  }

  // 설정 모달
  showSettingsModal() {
    const content = `
              <div class="modal-header">
                  <h2 class="modal-title">설정</h2>
                  <button class="modal-close" onclick="UI.closeModal()">×</button>
              </div>
              <div style="padding: 20px;">
                  <div style="margin-bottom: 20px;">
                      <h3>게임 데이터</h3>
                      <div style="display: flex; gap: 10px; margin-top: 10px;">
                          <button id="save-btn" class="upgrade-btn">수동 저장</button>
                          <button id="reset-btn" class="upgrade-btn" style="background: #e74c3c;">게임 초기화</button>
                          <button id="story-replay-btn" class="upgrade-btn" style="background:#8e44ad;">스토리 다시 보기</button>
                      </div>
                  </div>
                  <div style="margin-bottom: 20px;">
                      <h3>스킨</h3>
                      <div style="display: flex; gap: 10px; margin-top: 10px;">
                          <button class="upgrade-btn skin-btn" data-skin="modern" ${
                            (game.settings?.skin || "modern") === "modern"
                              ? "disabled"
                              : ""
                          }>모던</button>
                          <button class="upgrade-btn skin-btn" data-skin="classic" ${
                            (game.settings?.skin || "modern") === "classic"
                              ? "disabled"
                              : ""
                          }>클래식</button>
                      </div>
                  </div>
                  <div>
                      <h3>게임 통계</h3>
                      <div style="margin-top: 10px; text-align: left;">
                          <p>총 플레이 시간: <strong>${formatTime(
                            game.playTime
                          )}</strong></p>
                          <p>총 클릭 횟수: <strong>${game.totalClicks.toLocaleString()}회</strong></p>
                          <p>총 획득 금액: <strong>${formatKoreanNumber(
                            game.totalEarned
                          )}원</strong></p>
                      </div>
                  </div>
              </div>
          `;
    this.showModal(content);
    this.bindSettingsEvents();
  }

  // 상점 리스트 생성
  generateShopList() {
    let html = "";
    for (let itemId in game.itemData) {
      const item = game.itemData[itemId];
      const owned = game.inventory[itemId] || 0;
      const moneyCost = item.cost ? `${formatKoreanNumber(item.cost)}원` : "";
      const diamondCost = item.costDiamonds ? `${item.costDiamonds}💎` : "";
      const costText = [moneyCost, diamondCost].filter(Boolean).join(" / ");
      const canAfford =
        (item.cost ? game.money >= item.cost : true) &&
        (item.costDiamonds ? game.diamonds >= item.costDiamonds : true);

      html += `
                  <div class="upgrade-item">
                      <div class="upgrade-info">
                          <div class="upgrade-name">${item.icon} ${
        item.name
      } (${owned}개)</div>
                          <div class="upgrade-desc">${item.description}</div>
                          <div class="upgrade-cost">${costText}</div>
                      </div>
                      <button class="upgrade-btn" data-item="${itemId}" ${
        !canAfford ? "disabled" : ""
      }>
                          구매
                      </button>
                  </div>
              `;
    }
    return html;
  }

  bindShopEvents() {
    document.querySelectorAll("[data-item]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const itemId = e.target.dataset.item;
        if (game.buyItem(itemId)) {
          this.showFloatingMessage(`🛒 ${game.itemData[itemId].name} 구매!`);
          this.showShopModal();
          this.updateAll();
          triggerHaptic();
        } else {
          this.showFloatingMessage("💰 재화가 부족합니다!");
        }
      });
    });
  }

  // 업그레이드 리스트 생성
  generateUpgradeList() {
    let html = "";
    for (let type in game.upgradeData) {
      const upgrade = game.upgradeData[type];
      const cost = game.getUpgradeCost(type);
      const canAfford = game.money >= cost;

      html += `
                  <div class="upgrade-item">
                      <div class="upgrade-info">
                          <div class="upgrade-name">${upgrade.name} Lv.${
        game.upgrades[type]
      }</div>
                          <div class="upgrade-desc">${upgrade.description}</div>
                          <div class="upgrade-cost">${formatKoreanNumber(
                            cost
                          )}원</div>
                      </div>
                      <button class="upgrade-btn" data-upgrade="${type}" ${
        !canAfford ? "disabled" : ""
      }>
                          구매
                      </button>
                  </div>
              `;
    }
    return html;
  }

  // 사업 리스트 생성
  generateBusinessList() {
    let html = "";
    for (let businessId in game.businessData) {
      const business = game.businessData[businessId];
      const owned = game.businesses[businessId] || 0;
      const cost = Math.floor(business.cost * Math.pow(1.5, owned));
      const canAfford = game.money >= cost;

      html += `
                  <div class="upgrade-item">
                      <div class="upgrade-info">
                          <div class="upgrade-name">${business.icon} ${
        business.name
      } (${owned}개)</div>
                          <div class="upgrade-desc">${
                            business.description
                          }</div>
                          <div class="upgrade-cost">${formatKoreanNumber(
                            cost
                          )}원</div>
                      </div>
                      <button class="upgrade-btn" data-business="${businessId}" ${
        !canAfford ? "disabled" : ""
      }>
                          구매
                      </button>
                  </div>
              `;
    }
    return html;
  }

  // 일자리 리스트 생성
  generateJobList() {
    let html = "";
    for (let jobId in game.jobData) {
      const job = game.jobData[jobId];
      const owned = game.jobs[jobId] || false;
      const canAfford = game.money >= job.cost;

      html += `
                  <div class="upgrade-item">
                      <div class="upgrade-info">
                          <div class="upgrade-name">${job.icon} ${job.name} ${
        owned ? "(보유중)" : ""
      }</div>
                          <div class="upgrade-desc">${job.description}</div>
                          <div class="upgrade-cost">${
                            job.cost > 0
                              ? formatKoreanNumber(job.cost) + "원"
                              : "무료"
                          }</div>
                      </div>
                      <button class="upgrade-btn" data-job="${jobId}" ${
        !canAfford || owned ? "disabled" : ""
      }>
                          ${owned ? "보유중" : "취업"}
                      </button>
                  </div>
              `;
    }
    return html;
  }

  // 이벤트 바인딩
  bindUpgradeEvents() {
    document.querySelectorAll("[data-upgrade]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const type = e.target.dataset.upgrade;
        if (game.buyUpgrade(type)) {
          this.showFloatingMessage(
            `✨ ${game.upgradeData[type].name} 업그레이드!`
          );
          this.showUpgradeModal(); // 모달 새로고침
          this.updateAll();
          triggerHaptic();
        }
      });
    });
  }

  bindBusinessEvents() {
    document.querySelectorAll("[data-business]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const businessId = e.target.dataset.business;
        if (game.buyBusiness(businessId)) {
          this.showFloatingMessage(
            `🏪 ${game.businessData[businessId].name} 구매!`
          );
          this.showBusinessModal(); // 모달 새로고침
          this.updateAll();
          triggerHaptic();
        }
      });
    });
  }

  bindInvestmentEvents() {
    document.getElementById("invest-btn").addEventListener("click", () => {
      const amount =
        parseInt(document.getElementById("invest-amount").value) || 0;
      if (amount < 1000) {
        this.showFloatingMessage("💰 최소 1,000원 이상 투자해야 합니다!");
        return;
      }

      if (game.makeInvestment(amount)) {
        document.getElementById("invest-amount").value = "";
        this.updateAll();
      } else {
        this.showFloatingMessage("💰 투자할 돈이 부족합니다!");
      }
    });
  }

  bindLotteryEvents() {
    document.getElementById("lottery-btn").addEventListener("click", () => {
      if (game.playLottery()) {
        this.updateAll();
      } else {
        this.showFloatingMessage("💰 돈이 부족합니다! (1,000원 필요)");
      }
    });
  }

  bindSettingsEvents() {
    document.getElementById("save-btn").addEventListener("click", () => {
      game.autoSave();
      this.showFloatingMessage("💾 게임이 저장되었습니다!");
    });

    document.getElementById("reset-btn").addEventListener("click", () => {
      game.resetGame();
    });

    document.querySelectorAll(".skin-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const skin = e.currentTarget.dataset.skin;
        game.settings.skin = skin;
        this.applySkin();
        game.autoSave();
        this.showSettingsModal();
      });
    });

    const storyBtn = document.getElementById("story-replay-btn");
    if (storyBtn) {
      storyBtn.addEventListener("click", () => {
        game.settings.storySeen = false;
        game.autoSave();
        this.showStoryOnboarding();
      });
    }
  }

  // 모달 표시
  showModal(content) {
    this.elements.modalContent.innerHTML = content;
    this.elements.modalOverlay.classList.add("active");
    this.currentModal = true;
  }

  // 모달 닫기
  closeModal() {
    this.elements.modalOverlay.classList.remove("active");
    this.currentModal = null;
  }

  // 모든 UI 업데이트
  updateAll() {
    this.updateCurrency();
    this.updateLevel();
    this.updateProgress();
    this.updateAutoIncome();
  }

  // 화폐 표시 업데이트
  updateCurrency() {
    this.elements.money.textContent = formatKoreanNumber(game.money);
    this.elements.diamonds.textContent = game.diamonds;
  }

  // 레벨 표시 업데이트
  updateLevel() {
    this.elements.level.textContent = game.level;
  }

  // 캐릭터 업데이트
  updateCharacter() {
    const levelInfo = game.getLevelInfo(game.level);
    if (this.elements.characterSprite) {
      this.elements.characterSprite.textContent = levelInfo.character;
    }
    if (this.elements.characterName) {
      this.elements.characterName.textContent = levelInfo.name;
    }
    if (this.elements.levelName) {
      this.elements.levelName.textContent = levelInfo.name;
    }
    if (this.elements.speechText) {
      this.elements.speechText.textContent = levelInfo.quote;
    }

    // 테마 변경
    document.body.className = levelInfo.theme;
  }

  // 말풍선 업데이트
  updateSpeech() {
    const speech = game.getRandomSpeech();
    this.elements.speechText.textContent = speech;
  }

  // 자동 말풍선 타이머
  startSpeechTimer() {
    this.speechTimer = setInterval(() => {
      if (Math.random() < 0.3) {
        this.updateSpeech();
      }
    }, 5000);
  }

  // 진행도 바 업데이트
  updateProgress() {
    const levelInfo = game.getLevelInfo(game.level);
    const progress = Math.min(
      (game.experience / levelInfo.requiredExp) * 100,
      100
    );

    this.elements.currentExp.textContent = formatKoreanNumber(game.experience);
    this.elements.requiredExp.textContent = formatKoreanNumber(
      levelInfo.requiredExp
    );
    this.elements.expFill.style.width = progress + "%";
  }

  // 자동 수익 표시 업데이트
  updateAutoIncome() {
    this.elements.autoRate.textContent = formatKoreanNumber(
      game.stats.passiveIncome
    );
  }

  // 플로팅 메시지 표시
  showFloatingMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "floating-message";
    messageElement.textContent = message;

    this.elements.floatingMessages.appendChild(messageElement);

    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.parentNode.removeChild(messageElement);
      }
    }, 2500);
  }

  // 초기 로딩 완료 후 UI 설정
  initialize() {
    this.updateCharacter();
    this.updateAll();
    this.updateSpeech();
    this.applySkin();

    // 스토리 온보딩
    if (!game.settings.storySeen) {
      this.showStoryOnboarding();
    }
  }

  // UI 정리
  destroy() {
    if (this.speechTimer) {
      clearInterval(this.speechTimer);
    }
  }

  // 스토리 온보딩 모달
  showStoryOnboarding() {
    const slides = [
      {
        title: "간성치킨 폐업",
        text: "잘 나가던 간성치킨, 간성대표와 영우배달원과의 충돌로 결국 문을 닫았습니다.",
      },
      {
        title: "연쇄적인 빚",
        text: "권리금과 재고 정리에 실패해 남은 건 산더미 같은 빚뿐이었습니다.",
      },
      {
        title: "거리에서의 시작",
        text: "간성대표는 빛쟁이를 피해 도주중이고 영우배달원은 길바닥에서 다시 시작할것입니다.",
      },
    ];

    // 스토리 동안 영상 사운드 일시 차단 (필요 시 재생도 일시 중지)
    const vid = this.elements.characterVideo;
    this._storyVideoState = {
      hadVideo: !!vid,
      muted: vid ? vid.muted : true,
      paused: vid ? vid.paused : true,
      volume: vid ? vid.volume : 1,
    };
    if (vid) {
      try {
        vid.muted = true;
        vid.volume = 0;
        // 소리 유출 방지를 위해 일시정지
        if (!vid.paused) vid.pause();
      } catch {}
    }

    let idx = 0;
    const render = () => {
      const s = slides[idx];
      const dots = slides
        .map(
          (_, i) =>
            `<span style="width:8px;height:8px;border-radius:50%;display:inline-block;margin:0 3px;${
              i === idx ? "background:#3498db;" : "background:#d0d7de;"
            }"></span>`
        )
        .join("");
      const illustration =
        '<div style="height:160px;border-radius:14px;background:linear-gradient(135deg,#f6f8fa,#eaeef2);display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.15);margin-bottom:16px;"><div style="background:url(\'dolko.png\') center/cover no-repeat;width:100%;height:100%;opacity:.9;"></div></div>';
      const content = `
                  <div class="modal-header" style="border:none;padding-bottom:0;">
                      <h2 class="modal-title" style="font-size:22px;letter-spacing:-0.2px;">${
                        s.title
                      }</h2>
                      <button class="modal-close" onclick="UI.closeModal()">×</button>
                  </div>
                  <div style="padding: 12px 16px 18px 16px; line-height:1.7;">
                      ${illustration}
                      <p style="margin: 0 2px 14px 2px; color:#34495e;">${
                        s.text
                      }</p>
                      <div style="text-align:center;margin-bottom:14px;">${dots}</div>
                      <div style="display:flex; gap:10px;">
                          <button id="story-prev" class="upgrade-btn" style="flex:1;${
                            idx === 0 ? "opacity:.5;pointer-events:none;" : ""
                          }">이전</button>
                          <button id="story-next" class="upgrade-btn" style="flex:2;background:linear-gradient(180deg,#5dade2,#2e86c1);">${
                            idx === slides.length - 1 ? "시작하기" : "다음"
                          }</button>
                      </div>
                  </div>
              `;
      this.showModal(content);

      const prev = document.getElementById("story-prev");
      const next = document.getElementById("story-next");
      if (prev)
        prev.addEventListener("click", () => {
          if (idx > 0) {
            idx--;
            render();
          }
        });
      if (next)
        next.addEventListener("click", () => {
          if (idx < slides.length - 1) {
            idx++;
            render();
          } else {
            this.closeModal();
            game.settings.storySeen = true;
            game.autoSave();
            // 스토리 종료: 영상 사운드/재생 상태 복원
            if (this._storyVideoState && this._storyVideoState.hadVideo) {
              try {
                const v = this.elements.characterVideo;
                v.muted = this._storyVideoState.muted;
                v.volume = this._storyVideoState.volume;
                if (!this._storyVideoState.paused) {
                  v.play().catch(() => {});
                }
              } catch {}
            }
            // 루프 시작 신호 (초기화 단계에서 대기 중일 수 있음)
            document.dispatchEvent(new CustomEvent("storyFinished"));
          }
        });
    };

    render();
  }

  // 스킨 적용
  applySkin() {
    document.body.dataset.skin = game.settings?.skin || "modern";
  }
}

// 전역 UI 인스턴스
const UI = new UIManager();