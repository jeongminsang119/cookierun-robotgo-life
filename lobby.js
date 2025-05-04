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
