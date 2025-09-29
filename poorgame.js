// 게임 상태 관리 클래스
class GameState {
  constructor() {
    this.money = 0;
    this.diamonds = 0;
    this.level = 1;
    this.experience = 0;
    this.isResetting = false;
    this.stats = {
      begPower: 1,
      passiveIncome: 0,
      luck: 1,
      charisma: 1,
    };
    this.upgrades = {
      begPower: 0,
      passiveIncome: 0,
      luck: 0,
      charisma: 0,
    };
    this.businesses = {};
    this.jobs = {};
    this.inventory = {};
    this.totalClicks = 0;
    this.totalEarned = 0;
    this.playTime = 0;
    this.lastSaveTime = Date.now();
    this.achievements = [];
    this.settings = {
      skin: "modern",
      storySeen: false,
    };

    this.initializeData();
  }

  initializeData() {
    // 업그레이드 데이터
    this.upgradeData = {
      begPower: {
        name: "구걸력 강화",
        description: "클릭당 획득 금액 증가",
        baseCost: 10,
        multiplier: 1.5,
        effect: 1,
      },
      passiveIncome: {
        name: "자동 수익",
        description: "초당 자동으로 돈 획득",
        baseCost: 100,
        multiplier: 2.0,
        effect: 1,
      },
      luck: {
        name: "운 향상",
        description: "복권과 투자 성공률 증가",
        baseCost: 500,
        multiplier: 3.0,
        effect: 0.1,
      },
      charisma: {
        name: "카리스마",
        description: "더 큰 금액을 얻을 확률 증가",
        baseCost: 1000,
        multiplier: 2.5,
        effect: 0.05,
      },
    };

    // 사업 데이터
    this.businessData = {
      newspaper: {
        name: "신문 배달",
        description: "초당 5원 획득",
        cost: 1000,
        income: 5,
        icon: "📰",
      },
      foodTruck: {
        name: "음식 트럭",
        description: "초당 50원 획득",
        cost: 10000,
        income: 50,
        icon: "🚚",
      },
      store: {
        name: "편의점",
        description: "초당 200원 획득",
        cost: 100000,
        income: 200,
        icon: "🏪",
      },
      restaurant: {
        name: "레스토랑",
        description: "초당 1,000원 획득",
        cost: 1000000,
        income: 1000,
        icon: "🍽️",
      },
      company: {
        name: "회사",
        description: "초당 5,000원 획득",
        cost: 10000000,
        income: 5000,
        icon: "🏢",
      },
      kiosk: {
        name: "길거리 키오스크",
        description: "초당 10원 획득",
        cost: 3000,
        income: 10,
        icon: "🧃",
      },
      farm: {
        name: "소규모 농장",
        description: "초당 100원 획득",
        cost: 50000,
        income: 100,
        icon: "🌾",
      },
      taxi: {
        name: "택시 영업",
        description: "초당 350원 획득",
        cost: 250000,
        income: 350,
        icon: "🚕",
      },
      workshop: {
        name: "수공업 공방",
        description: "초당 800원 획득",
        cost: 800000,
        income: 800,
        icon: "🛠️",
      },
      factory: {
        name: "작은 공장",
        description: "초당 3,000원 획득",
        cost: 3000000,
        income: 3000,
        icon: "🏭",
      },
      mine: {
        name: "광산",
        description: "초당 12,000원 획득",
        cost: 15000000,
        income: 12000,
        icon: "⛏️",
      },
      bank: {
        name: "금융 회사",
        description: "초당 60,000원 획득",
        cost: 80000000,
        income: 60000,
        icon: "🏦",
      },
      oilRig: {
        name: "유전 개발",
        description: "초당 250,000원 획득",
        cost: 300000000,
        income: 250000,
        icon: "🛢️",
      },
      techStartup: {
        name: "테크 스타트업",
        description: "초당 1,200,000원 획득",
        cost: 1500000000,
        income: 1200000,
        icon: "💻",
      },
      spaceStation: {
        name: "우주 정거장",
        description: "초당 7,500,000원 획득",
        cost: 8000000000,
        income: 7500000,
        icon: "🛰️",
      },
      solarFarm: {
        name: "태양광 발전소",
        description: "초당 12,000,000원 획득",
        cost: 15000000000,
        income: 12000000,
        icon: "🔆",
      },
      dataCenter: {
        name: "데이터 센터",
        description: "초당 22,000,000원 획득",
        cost: 30000000000,
        income: 22000000,
        icon: "🖥️",
      },
      mediaNetwork: {
        name: "미디어 네트워크",
        description: "초당 35,000,000원 획득",
        cost: 50000000000,
        income: 35000000,
        icon: "📺",
      },
      airline: {
        name: "항공사",
        description: "초당 55,000,000원 획득",
        cost: 90000000000,
        income: 55000000,
        icon: "✈️",
      },
      luxuryHotel: {
        name: "럭셔리 호텔",
        description: "초당 80,000,000원 획득",
        cost: 130000000000,
        income: 80000000,
        icon: "🏨",
      },
      shippingFleet: {
        name: "해운 선단",
        description: "초당 120,000,000원 획득",
        cost: 200000000000,
        income: 120000000,
        icon: "🚢",
      },
      pharmaLab: {
        name: "제약 연구소",
        description: "초당 180,000,000원 획득",
        cost: 320000000000,
        income: 180000000,
        icon: "🧪",
      },
      semiconductorFab: {
        name: "반도체 팹",
        description: "초당 260,000,000원 획득",
        cost: 500000000000,
        income: 260000000,
        icon: "💿",
      },
      aiCloud: {
        name: "AI 클라우드",
        description: "초당 380,000,000원 획득",
        cost: 800000000000,
        income: 380000000,
        icon: "☁️",
      },
      megaCity: {
        name: "메가시티 개발",
        description: "초당 600,000,000원 획득",
        cost: 1200000000000,
        income: 600000000,
        icon: "🏙️",
      },
    };

    // 일자리 데이터
    this.jobData = {
      cleaner: {
        name: "청소부",
        description: "시간당 8,000원",
        cost: 0,
        hourlyWage: 8000,
        icon: "🧹",
      },
      delivery: {
        name: "배달원",
        description: "시간당 12,000원",
        cost: 50000,
        hourlyWage: 12000,
        icon: "🛵",
      },
      office: {
        name: "사무직",
        description: "시간당 20,000원",
        cost: 200000,
        hourlyWage: 20000,
        icon: "💼",
      },
      manager: {
        name: "관리자",
        description: "시간당 50,000원",
        cost: 1000000,
        hourlyWage: 50000,
        icon: "👔",
      },
      intern: {
        name: "인턴",
        description: "시간당 6,000원",
        cost: 0,
        hourlyWage: 6000,
        icon: "📝",
      },
      barista: {
        name: "바리스타",
        description: "시간당 9,000원",
        cost: 30000,
        hourlyWage: 9000,
        icon: "☕",
      },
      cashier: {
        name: "캐셔",
        description: "시간당 11,000원",
        cost: 80000,
        hourlyWage: 11000,
        icon: "🧾",
      },
      security: {
        name: "경비원",
        description: "시간당 14,000원",
        cost: 150000,
        hourlyWage: 14000,
        icon: "🛡️",
      },
      driver: {
        name: "운전기사",
        description: "시간당 18,000원",
        cost: 300000,
        hourlyWage: 18000,
        icon: "🚚",
      },
      nurseAid: {
        name: "간호조무사",
        description: "시간당 22,000원",
        cost: 600000,
        hourlyWage: 22000,
        icon: "🩺",
      },
      teacher: {
        name: "학원 강사",
        description: "시간당 28,000원",
        cost: 1200000,
        hourlyWage: 28000,
        icon: "📚",
      },
      engineer: {
        name: "엔지니어",
        description: "시간당 40,000원",
        cost: 3000000,
        hourlyWage: 40000,
        icon: "🔧",
      },
      marketer: {
        name: "마케터",
        description: "시간당 55,000원",
        cost: 6000000,
        hourlyWage: 55000,
        icon: "📈",
      },
      director: {
        name: "이사",
        description: "시간당 80,000원",
        cost: 15000000,
        hourlyWage: 80000,
        icon: "👨‍💼",
      },
      chef: {
        name: "셰프",
        description: "시간당 32,000원",
        cost: 1800000,
        hourlyWage: 32000,
        icon: "👨‍🍳",
      },
      firefighter: {
        name: "소방관",
        description: "시간당 36,000원",
        cost: 2200000,
        hourlyWage: 36000,
        icon: "🚒",
      },
      police: {
        name: "경찰관",
        description: "시간당 38,000원",
        cost: 2500000,
        hourlyWage: 38000,
        icon: "👮",
      },
      architect: {
        name: "건축가",
        description: "시간당 52,000원",
        cost: 7000000,
        hourlyWage: 52000,
        icon: "📐",
      },
      pilot: {
        name: "파일럿",
        description: "시간당 95,000원",
        cost: 30000000,
        hourlyWage: 95000,
        icon: "🧑‍✈️",
      },
      doctor: {
        name: "의사",
        description: "시간당 120,000원",
        cost: 50000000,
        hourlyWage: 120000,
        icon: "🩺",
      },
      lawyer: {
        name: "변호사",
        description: "시간당 150,000원",
        cost: 80000000,
        hourlyWage: 150000,
        icon: "⚖️",
      },
      dataScientist: {
        name: "데이터 사이언티스트",
        description: "시간당 180,000원",
        cost: 120000000,
        hourlyWage: 180000,
        icon: "📊",
      },
      gameDesigner: {
        name: "게임 디자이너",
        description: "시간당 75,000원",
        cost: 20000000,
        hourlyWage: 75000,
        icon: "🎮",
      },
      astronaut: {
        name: "우주비행사",
        description: "시간당 300,000원",
        cost: 300000000,
        hourlyWage: 300000,
        icon: "🧑‍🚀",
      },
    };

    // 상점 아이템 데이터
    this.itemData = {
      tinCup: {
        name: "양철 컵",
        description: "구걸력 +1",
        cost: 200,
        icon: "🥤",
        effects: { begPower: 1 },
      },
      warmCoat: {
        name: "따뜻한 코트",
        description: "카리스마 +0.1",
        cost: 1500,
        icon: "🧥",
        effects: { charisma: 0.1 },
      },
      luckyCharm: {
        name: "행운의 부적",
        description: "운 +0.2",
        cost: 3000,
        icon: "🍀",
        effects: { luck: 0.2 },
      },
      megaphone: {
        name: "확성기",
        description: "구걸력 +3",
        cost: 8000,
        icon: "📢",
        effects: { begPower: 3 },
      },
      shoppingCart: {
        name: "쇼핑카트",
        description: "자동수익 +2/초",
        cost: 20000,
        icon: "🛒",
        effects: { passiveIncome: 2 },
      },
      pickaxe: {
        name: "곡괭이",
        description: "자동수익 +10/초",
        cost: 75000,
        icon: "⛏️",
        effects: { passiveIncome: 10 },
      },
      smartphone: {
        name: "스마트폰",
        description: "카리스마 +0.3, 운 +0.3",
        cost: 120000,
        icon: "📱",
        effects: { charisma: 0.3, luck: 0.3 },
      },
      goldenSign: {
        name: "황금 간판",
        description: "구걸력 +10",
        cost: 500000,
        icon: "🏷️",
        effects: { begPower: 10 },
      },
      robotAssistant: {
        name: "로봇 조수",
        description: "자동수익 +100/초",
        costDiamonds: 10,
        icon: "🤖",
        effects: { passiveIncome: 100 },
      },
      crown: {
        name: "작은 왕관",
        description: "카리스마 +1, 운 +1",
        costDiamonds: 20,
        icon: "👑",
        effects: { charisma: 1, luck: 1 },
      },
    };
  }

  // 레벨 정보 가져오기
  getLevelInfo(level) {
    const levels = [
      {
        name: "영거지",
        character: "🥺",
        quote: '"한푼줍쇼 한푼"',
        requiredExp: 100,
        theme: "level-theme-0",
        messages: ["동전 하나만...", "배고파요...", "도와주세요..."],
      },
      {
        name: "서울역 노숙자",
        character: "😔",
        quote: '"따뜻한 곳을 찾고 있어요..."',
        requiredExp: 500,
        theme: "level-theme-1",
        messages: ["추워요...", "잠잘 곳이...", "따뜻한 음식..."],
      },
      {
        name: "영우배달원",
        character: "😊",
        quote: '"열심히 일하고 있어요!"',
        requiredExp: 2000,
        theme: "level-theme-2",
        messages: ["열심히 일해요!", "돈을 모으고 있어요", "꿈이 있어요!"],
      },
      {
        name: "간성치킨점주",
        character: "😎",
        quote: '"사업이 잘 되고 있습니다!"',
        requiredExp: 10000,
        theme: "level-theme-3",
        messages: [
          "사업이 번창해요!",
          "직원들이 열심히!",
          "투자할 곳을 찾아요",
        ],
      },
      {
        name: "영만장자",
        character: "🤑",
        quote: '"돈? 그게 뭔가요?"',
        requiredExp: 100000,
        theme: "level-theme-4",
        messages: ["돈이 넘쳐나요!", "뭘 살까요?", "투자가 재미있어요!"],
      },
      {
        name: "재벌영우",
        character: "👑",
        quote: '"이 세상은 내 것이다!"',
        requiredExp: 1000000,
        theme: "level-theme-5",
        messages: ["세상이 내 손안에!", "모든 것을 소유해요!", "권력이 최고!"],
      },
      {
        name: "영우황제",
        character: "🌟",
        quote: '"우주도 내 소유야!"',
        requiredExp: 999999999,
        theme: "level-theme-6",
        messages: ["우주를 지배해요!", "별들이 내 것!", "무한한 부!"],
      },
    ];

    return levels[Math.min(level - 1, levels.length - 1)];
  }

  // 경험치 추가
  addExperience(amount) {
    this.experience += amount;
    const levelInfo = this.getLevelInfo(this.level);

    if (this.experience >= levelInfo.requiredExp && this.level < 7) {
      this.levelUp();
    }
  }

  // 레벨업
  levelUp() {
    this.level++;
    this.experience = 0;

    // 레벨업 보너스
    const bonus = this.level * 1000;
    this.addMoney(bonus);
    this.diamonds += this.level;

    UI.showFloatingMessage(
      `🎉 레벨업! ${this.getLevelInfo(this.level).name}이 되었습니다!`
    );
    UI.showFloatingMessage(
      `💰 보너스: ${formatKoreanNumber(bonus)}원 + ${this.level}💎`
    );
    UI.updateCharacter();
    UI.updateAll();
  }

  // 돈 추가
  addMoney(amount) {
    this.money += amount;
    this.totalEarned += amount;
    this.addExperience(Math.floor(amount / 10));
  }

  // 업그레이드 비용 계산
  getUpgradeCost(type) {
    const upgrade = this.upgradeData[type];
    return Math.floor(
      upgrade.baseCost * Math.pow(upgrade.multiplier, this.upgrades[type])
    );
  }

  // 업그레이드 구매
  buyUpgrade(type) {
    const cost = this.getUpgradeCost(type);
    if (this.money >= cost) {
      this.money -= cost;
      this.upgrades[type]++;
      this.updateStats();
      return true;
    }
    return false;
  }

  // 스탯 업데이트
  updateStats() {
    this.stats.begPower =
      1 + this.upgrades.begPower * this.upgradeData.begPower.effect;

    let passiveTotal =
      this.upgrades.passiveIncome * this.upgradeData.passiveIncome.effect;

    // 사업 수익 추가
    for (let businessId in this.businessData) {
      const business = this.businessData[businessId];
      passiveTotal += business.income * (this.businesses[businessId] || 0);
    }

    // 일자리 수익 추가 (시간당 급여 → 초당 환산)
    for (let jobId in this.jobData) {
      if (this.jobs[jobId]) {
        const job = this.jobData[jobId];
        passiveTotal += job.hourlyWage / 3600;
      }
    }

    // 상점 아이템 효과 적용
    let itemBegBonus = 0;
    let itemPassiveBonus = 0;
    let itemLuckBonus = 0;
    let itemCharismaBonus = 0;

    for (let itemId in this.inventory) {
      const count = this.inventory[itemId] || 0;
      if (count <= 0) continue;
      const data = this.itemData[itemId];
      if (!data || !data.effects) continue;
      const effects = data.effects;
      if (effects.begPower) itemBegBonus += effects.begPower * count;
      if (effects.passiveIncome)
        itemPassiveBonus += effects.passiveIncome * count;
      if (effects.luck) itemLuckBonus += effects.luck * count;
      if (effects.charisma) itemCharismaBonus += effects.charisma * count;
    }

    this.stats.begPower += itemBegBonus;
    this.stats.passiveIncome = passiveTotal + itemPassiveBonus;
    this.stats.luck =
      1 + this.upgrades.luck * this.upgradeData.luck.effect + itemLuckBonus;
    this.stats.charisma =
      1 +
      this.upgrades.charisma * this.upgradeData.charisma.effect +
      itemCharismaBonus;
  }

  // 사업 구매
  buyBusiness(businessId) {
    const business = this.businessData[businessId];
    const currentOwned = this.businesses[businessId] || 0;
    const cost = Math.floor(business.cost * Math.pow(1.5, currentOwned));

    if (this.money >= cost) {
      this.money -= cost;
      this.businesses[businessId] = currentOwned + 1;
      this.updateStats();
      return true;
    }
    return false;
  }

  // 클릭 수익
  getClickEarnings() {
    const base = this.stats.begPower;
    const charismaBonus = Math.random() < this.stats.charisma * 0.1 ? 5 : 1;
    const levelBonus = this.level * 0.5;
    return Math.max(1, Math.floor((base + levelBonus) * charismaBonus));
  }

  // 복권
  playLottery() {
    const cost = 1000;
    if (this.money < cost) return false;

    this.money -= cost;
    const luckMultiplier = this.stats.luck;
    const chance = Math.random() * luckMultiplier;

    let prize = 0;
    let message = "";

    if (chance > 0.95) {
      prize = cost * 1000;
      message = "🎰 대박! 잭팟!! 💰";
      this.diamonds += 5;
    } else if (chance > 0.8) {
      prize = cost * 100;
      message = "🎰 큰 상금 당첨! 🎉";
      this.diamonds += 1;
    } else if (chance > 0.5) {
      prize = cost * 20;
      message = "🎰 소액 당첨! 👍";
    } else {
      message = "🎰 아쉽게도 꽝... 😢";
    }

    if (prize > 0) {
      this.addMoney(prize);
    }

    UI.showFloatingMessage(message);
    return true;
  }

  // 투자
  makeInvestment(amount) {
    if (this.money < amount) return false;

    this.money -= amount;
    const luckMultiplier = this.stats.luck;
    const chance = Math.random() * luckMultiplier;

    let return_rate = 0;
    let message = "";

    if (chance > 0.9) {
      return_rate = 3.0;
      message = "📈 투자 대성공! 300% 수익! 🚀";
      this.diamonds += Math.floor(amount / 10000);
    } else if (chance > 0.7) {
      return_rate = 1.5;
      message = "📈 투자 성공! 150% 수익! 📊";
    } else if (chance > 0.4) {
      return_rate = 1.0;
      message = "📊 투자 원금 회수 💼";
    } else {
      return_rate = 0;
      message = "📉 투자 실패... 손실 발생 😰";
    }

    const profit = Math.floor(amount * return_rate);
    if (profit > 0) {
      this.addMoney(profit);
    }

    UI.showFloatingMessage(message);
    return true;
  }

  // 랜덤 메시지 가져오기
  getRandomSpeech() {
    const levelInfo = this.getLevelInfo(this.level);
    return getRandomMessage(levelInfo.messages || [levelInfo.quote]);
  }

  // 자동 저장
  autoSave() {
    const saveData = {
      money: this.money,
      diamonds: this.diamonds,
      level: this.level,
      experience: this.experience,
      stats: this.stats,
      upgrades: this.upgrades,
      businesses: this.businesses,
      jobs: this.jobs,
      totalClicks: this.totalClicks,
      totalEarned: this.totalEarned,
      playTime: this.playTime,
      lastSaveTime: Date.now(),
      achievements: this.achievements,
      settings: this.settings,
    };

    Storage.save("classic_beggar_game_save", saveData);
  }

  // 게임 로드
  loadGame() {
    const saveData = Storage.load("classic_beggar_game_save");
    if (saveData) {
      this.money = saveData.money || 0;
      this.diamonds = saveData.diamonds || 0;
      this.level = saveData.level || 1;
      this.experience = saveData.experience || 0;
      this.stats = { ...this.stats, ...saveData.stats };
      this.upgrades = { ...this.upgrades, ...saveData.upgrades };
      this.businesses = { ...this.businesses, ...saveData.businesses };
      this.jobs = { ...this.jobs, ...saveData.jobs };
      this.totalClicks = saveData.totalClicks || 0;
      this.totalEarned = saveData.totalEarned || 0;
      this.playTime = saveData.playTime || 0;
      this.lastSaveTime = saveData.lastSaveTime || Date.now();
      this.achievements = saveData.achievements || [];
      this.settings = { ...this.settings, ...(saveData.settings || {}) };

      this.calculateOfflineEarnings();
      this.updateStats();

      return true;
    }
    return false;
  }

  // 오프라인 수익 계산
  calculateOfflineEarnings() {
    const now = Date.now();
    const timeDiff = Math.floor((now - this.lastSaveTime) / 1000);

    if (timeDiff > 30 && this.stats.passiveIncome > 0) {
      const maxOfflineHours = 8;
      const offlineSeconds = Math.min(timeDiff, maxOfflineHours * 3600);
      const offlineEarnings = Math.floor(
        this.stats.passiveIncome * offlineSeconds
      );

      if (offlineEarnings > 0) {
        this.addMoney(offlineEarnings);
        UI.showFloatingMessage(
          `💰 오프라인 수익: +${formatKoreanNumber(offlineEarnings)}원`
        );
        UI.showFloatingMessage(
          `⏰ 오프라인 시간: ${formatTime(offlineSeconds)}`
        );
      }
    }

    // 오프라인 수익 계산 이후 기준시간 갱신 (중복 지급 방지)
    this.lastSaveTime = now;
  }

  // 게임 초기화
  resetGame() {
    if (
      confirm("정말로 게임을 초기화하시겠습니까?\n모든 진행상황이 삭제됩니다!")
    ) {
      this.isResetting = true;
      Storage.remove("classic_beggar_game_save");
      location.reload();
    }
  }

  // 일자리 취업
  buyJob(jobId) {
    const job = this.jobData[jobId];
    if (!job) return false;
    const owned = this.jobs[jobId] || false;
    if (owned) return false;

    const cost = job.cost || 0;
    if (this.money < cost) return false;

    this.money -= cost;
    this.jobs[jobId] = true;
    this.updateStats();
    return true;
  }

  // 아이템 구매
  buyItem(itemId) {
    const item = this.itemData[itemId];
    if (!item) return false;

    const cost = item.cost || 0;
    const diamondCost = item.costDiamonds || 0;

    if (cost > 0 && this.money < cost) return false;
    if (diamondCost > 0 && this.diamonds < diamondCost) return false;

    if (cost > 0) this.money -= cost;
    if (diamondCost > 0) this.diamonds -= diamondCost;

    this.inventory[itemId] = (this.inventory[itemId] || 0) + 1;
    this.updateStats();
    return true;
  }
}

// 전역 게임 상태 인스턴스
const game = new GameState();