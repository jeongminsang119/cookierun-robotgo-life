let rank = "UNRANKED";
let rankImgUrl = "url('No_rank.png')";
const rankGuideBox = document.querySelector(".rank_guide");

const myPage = () => {
  document.querySelector(".my_page").style.display =
    document.querySelector(".my_page").style.display === "none"
      ? "block"
      : "none";
};
const notice = () => {
  document.querySelector(".notice_page").style.display =
    document.querySelector(".notice_page").style.display === "none"
      ? "block"
      : "none";
};

const rankGuide = () => {
  rankGuideBox.style.display =
    rankGuideBox.style.display === "none" ? "block" : "none";
};

const reset = () => {
  doReset = confirm("모든 데이터가 지워집니다. 리셋 하시겠어요?");
  if (doReset) {
    localStorage.clear();
    // console.log(localStorage);
    location.reload();
  } else {
    return;
  }
};

const windowEvent = () => {
  document.querySelector(".rank_image").addEventListener("mouseover", (e) => {
    rankGuideBox.style.display = "table-cell";
  });
  document.querySelector(".rank_image").addEventListener("mouseout", (e) => {
    rankGuideBox.style.display = "none";
  });
};

const loadImg = async () => {
  const preLoadImgSrc = [
    "The Witch's Kitchen.png",
    "gingerMK_profile.png",
    "notice.png",
    "No_rank.png",
    "rank_Guide.PNG",
    "gingerMK_run.png",
    "gingerMK_slide.png",
    "gingerMK_jump_one.png",
    "gingerMK_jump_double.png",
    "gingerMK_jump_down.png",
    "gingerMK_crashed3.png",
    "gingerMK_dead.png",
    "blue_jelly_bean.png",
    "yellow_bear_jelly.png",
    "pink_bear_jelly.png",
    "blue_bear_jelly.png",
    "big_bear_jelly.png",
    "clock.png",
    "pink_crystal.png",
    "snacks.png",
    "cake1.png",
    "table.png",
    "green_crystal.png",
    "mini_snack.png",
    "lamp.png",
    "long_crystal.png",
    "knife.png",
    "lamp_broken.png",
  ];

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });

  try {
    await Promise.all(preLoadImgSrc.map((src) => loadImage(src)));
    document.querySelector(".loading_box").style.display = "none";
  } catch (error) {
    console.error("이미지 로드 실패:", error);
  }
};

const init = () => {
  const highestScoreBox = document.querySelector(".highest_score_text");
  const highestScore = localStorage.getItem("highestScore")
    ? localStorage.getItem("highestScore")
    : "기록 없음";
  highestScoreBox.innerText = "내 최고 점수: " + highestScore;

  const scoreBox = document.querySelector(".score_text");
  const score = localStorage.getItem("score")
    ? localStorage.getItem("score")
    : "기록 없음";
  scoreBox.innerText = "현재 점수: " + score;

  rankGuideBox.style.display = "none";
  // document.querySelector(".my_page").style.display = "none";
  document.querySelector(".notice_page").style.display = "none";

  if (highestScore >= 170000) {
    rank = "RAINBOW";
    rankImgUrl = "url('Rainbow.png')";
  } else if (highestScore >= 140000) {
    rank = "DIAMOND";
    rankImgUrl = "url('Diamond.png')";
  } else if (highestScore >= 100000) {
    rank = "RUBY";
    rankImgUrl = "url('Ruby.png')";
  } else if (highestScore >= 60000) {
    rank = "GOLD";
    rankImgUrl = "url('Gold.png')";
  } else if (highestScore >= 30000) {
    rank = "SILVER";
    rankImgUrl = "url('Silver.png')";
  } else if (highestScore > 0) {
    rank = "BRONZE";
    rankImgUrl = "url('Bronze.png')";
  }
  document.querySelector(".rank_text").innerText = rank;
  document.querySelector(".rank_image").style.backgroundImage = rankImgUrl;

  //   if (!localStorage.getItem("score")) {
  //     localStorage.setItem("score", 0);
  //   }

  if (!localStorage.getItem("currentStageIndex")) {
    localStorage.setItem("currentStageIndex", 0);
  }

  loadImg();
  windowEvent();
};

window.onload = () => {
  init();
};

const music = document.getElementById("lobbyMusic");
const musicButton = document.querySelector(".music_button");

function toggleMusic() {
  if (music.paused) {
    music.play();
    musicButton.innerHTML = '<i class="fa-solid fa-pause"></i> 음악 일시정지';
  } else {
    music.pause();
    musicButton.innerHTML = '<i class="fa-solid fa-music"></i> 로비 음악 재생';
  }
}

// ... existing code ...

// 뽑기 캐릭터 목록 (예시)
const allCharacters = [
  { name: "붕뜬요한 쿠키", img: "요한.png" },
  { name: "화난요한 쿠키", img: "화난요한.png" },
  { name: "궁금요한 쿠키", img: "궁금요한.png" },
  { name: "시험공부요한 쿠키", img: "시험공부요한.png" },
  { name: "무싸티요한 쿠키", img: "무싸티요한.png" },
  // ... 추가 가능
];

// 내 캐릭터 목록 불러오기
function getMyCharacters() {
  return JSON.parse(localStorage.getItem("myCharacters") || "[]");
}

// 뽑기 팝업 열기
function openGacha() {
  // 효과음 재생
  const gachaAudio = document.getElementById("gachaEffect");
  if (gachaAudio) {
    gachaAudio.currentTime = 0;
    gachaAudio.play();
  }

  const idx = Math.floor(Math.random() * allCharacters.length);
  const char = allCharacters[idx];

  // 내 캐릭터에 저장 (중복X)
  let myChars = getMyCharacters();
  if (!myChars.find((c) => c.name === char.name)) {
    myChars.push(char);
    localStorage.setItem("myCharacters", JSON.stringify(myChars));
  }

  document.querySelector(".gacha_popup").style.display = "flex";
  const charDiv = document.querySelector(".gacha_character");
  charDiv.style.background = `url('${char.img}') center/contain no-repeat`;
  charDiv.innerHTML = "";

  // 애니메이션 재생을 위해 클래스 리셋
  const boxDiv = document.querySelector(".gacha_box");
  const lightDiv = document.querySelector(".gacha_light");
  boxDiv.style.animation = "none";
  lightDiv.style.animation = "none";
  charDiv.style.animation = "none";
  void boxDiv.offsetWidth;
  void lightDiv.offsetWidth;
  void charDiv.offsetWidth;

  boxDiv.style.backgroundImage = "url('gacha_box_closed.png')";
  boxDiv.style.animation = "boxOpen 1.2s forwards";
  lightDiv.style.animation = "lightShow 0.7s 1s forwards";
  charDiv.style.animation = "charPop 0.5s 1.3s forwards";
}

// 뽑기 팝업 닫기
function closeGacha() {
  document.querySelector(".gacha_popup").style.display = "none";
}

// 캐릭터 선택창 열기
function openCharacterList() {
  const myChars = getMyCharacters();
  const listDiv = document.querySelector(".character_list");
  if (myChars.length === 0) {
    listDiv.innerHTML = "<div>뽑은 캐릭터가 없습니다!</div>";
  } else {
    listDiv.innerHTML = myChars
      .map(
        (char) => `
      <div style="margin:10px;">
        <img src="${char.img}" style="width:80px;vertical-align:middle;">
        <span style="margin:0 10px;">${char.name}</span>
        <button onclick="selectCharacter('${char.name}')">선택</button>
      </div>
    `
      )
      .join("");
  }
  document.querySelector(".character_list_popup").style.display = "flex";
}

// 캐릭터 선택창 닫기
function closeCharacterList() {
  document.querySelector(".character_list_popup").style.display = "none";
}

// 캐릭터 선택
function selectCharacter(name) {
  const myChars = getMyCharacters();
  const char = myChars.find((c) => c.name === name);
  if (char) {
    localStorage.setItem("selectedCharacter", JSON.stringify(char));
    setLobbyCharacter();
    alert(`${char.name} 캐릭터로 변경되었습니다!`);
    closeCharacterList();
  }
}

// 로비 쿠키 이미지 변경
function setLobbyCharacter() {
  const char = JSON.parse(localStorage.getItem("selectedCharacter") || "null");
  const lobbyDiv = document.querySelector(".cookie_lobby");
  if (char && char.img) {
    lobbyDiv.style.backgroundImage = `url('${char.img}')`;
  } else {
    lobbyDiv.style.backgroundImage = `url('키키.png')`; // 기본 이미지
  }
}

// 기존 init 함수에 setLobbyCharacter 추가
const oldInit = init;
init = function () {
  oldInit && oldInit();
  setLobbyCharacter();
};

window.onload = () => {
  init();
};
