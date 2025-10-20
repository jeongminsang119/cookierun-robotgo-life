// 음악 데이터 - 여기에 곡을 추가하세요!
const songs = [
  {
    id: 1,
    rank: 1,
    title: "숙녀에게",
    artist: "송필근",
    album: "몽환적 음악",
    duration: "3:11",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 2,
    rank: 2,
    title: "STAR WALKIN",
    artist: "Lil Nas X",
    album: "음악",
    duration: "2:59",
    rankChange: 1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 3,
    rank: 3,
    title: "yours",
    artist: "데이먼스 이어",
    album: "음악",
    duration: "3:28",
    rankChange: -1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 4,
    rank: 4,
    title: "스토커",
    artist: "10CM",
    album: "음악",
    duration: "3:55",
    rankChange: 2,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 5,
    rank: 5,
    title: "어떻게 이별까지 사랑하겠어, 널 사랑하는 거지",
    artist: "악동뮤지션",
    album: "음악",
    duration: "4:20",
    rankChange: -2,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 6,
    rank: 6,
    title: "커플",
    artist: "Jeong Eun Ji (정은지), Seo In Guk (서인국)",
    album: "음악",
    duration: "3:07",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 7,
    rank: 7,
    title: "이쁜 여자가 좋더라",
    artist: "릴러말즈",
    album: "음악",
    duration: "3:42",
    rankChange: -3,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 8,
    rank: 8,
    title: "Comethru",
    artist: "Jeremy Zucker",
    album: "음악",
    duration: "2:48",
    rankChange: 4,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 9,
    rank: 9,
    title: "Hymn For The Weekend",
    artist: "Coldplay",
    album: "음악",
    duration: "3:33",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 10,
    rank: 10,
    title: "애상",
    artist: "이무진",
    album: "음악",
    duration: "4:05",
    rankChange: 1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 11,
    rank: 11,
    title: "Vancouver",
    artist: "BIG Naughty (서동현)",
    album: "음악",
    duration: "3:12",
    rankChange: -1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 12,
    rank: 12,
    title: "이러면 안 될 거 아는데 너 앞에만 서면 나락 ",
    artist: "딘딘 (DINDIN) ",
    album: "음악",
    duration: "3:26",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 13,
    rank: 13,
    title: "LOVE me",
    artist: "BE'O (비오)",
    album: "음악",
    duration: "2:57",
    rankChange: 2,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 14,
    rank: 14,
    title: "겁도 없이",
    artist: "BIG Naughty",
    album: "음악",
    duration: "3:39",
    rankChange: -2,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 15,
    rank: 15,
    title: "Love Is All",
    artist: "검정치마",
    album: "음악",
    duration: "3:18",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 16,
    rank: 16,
    title: "끼부리지마",
    artist: "WINNER (위너)",
    album: "음악",
    duration: "4:14",
    rankChange: 3,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 17,
    rank: 17,
    title: "YESTERDAY",
    artist: "블락비",
    album: "음악",
    duration: "3:06",
    rankChange: -1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 18,
    rank: 18,
    title: "Beggin",
    artist: "Måneskin",
    album: "음악",
    duration: "2:53",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 19,
    rank: 19,
    title: "Happy",
    artist: "Pharrell Williams",
    album: "음악",
    duration: "3:31",
    rankChange: 1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 20,
    rank: 20,
    title: "웨이백홈",
    artist: "숀",
    album: "음악",
    duration: "3:44",
    rankChange: -3,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 21,
    rank: 21,
    title: "옥탑방",
    artist: "엔플라잉",
    album: "음악",
    duration: "4:02",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 22,
    rank: 22,
    title: " 폰서트",
    artist: "10CM",
    album: "음악",
    duration: "3:22",
    rankChange: 2,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 23,
    rank: 23,
    title: "폴라로이드",
    artist: "엔하이픈",
    album: "음악",
    duration: "2:49",
    rankChange: -1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 24,
    rank: 24,
    title: "그리워하다",
    artist: "비투비",
    album: "음악",
    duration: "3:15",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 25,
    rank: 25,
    title: "Boat",
    artist: "죠지",
    album: "음악",
    duration: "3:36",
    rankChange: 1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 26,
    rank: 26,
    title: "사랑은 은하수 다방에서",
    artist: "10cm",
    album: "음악",
    duration: "3:09",
    rankChange: -2,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 27,
    rank: 27,
    title: "OHAYO MY NIGHT",
    artist: "디핵 X 파테코",
    album: "음악",
    duration: "3:47",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 28,
    rank: 28,
    title: "너에게 닿기를",
    artist: "10CM",
    album: "음악",
    duration: "2:51",
    rankChange: 3,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 29,
    rank: 29,
    title: "그대만 있다면",
    artist: "너드커넥션",
    album: "음악",
    duration: "3:19",
    rankChange: -1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 30,
    rank: 30,
    title: "위잉위잉",
    artist: "혁오",
    album: "음악",
    duration: "4:10",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 31,
    rank: 31,
    title: "instagram",
    artist: "DEAN(딘)",
    album: "음악",
    duration: "3:03",
    rankChange: 1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 32,
    rank: 32,
    title: "비와 당신",
    artist: "이무진",
    album: "음악",
    duration: "3:41",
    rankChange: -3,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 33,
    rank: 33,
    title: "봄 to 러브",
    artist: "10cm",
    album: "음악",
    duration: "2:55",
    rankChange: 2,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 34,
    rank: 34,
    title: "7 Years",
    artist: "Lukas Graham",
    album: "음악",
    duration: "3:24",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 35,
    rank: 35,
    title: " Wake Up",
    artist: "개코, 아우릴고트,SINCE",
    album: "음악",
    duration: "3:58",
    rankChange: -1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 36,
    rank: 36,
    title: "DREAMERS",
    artist: "정국",
    album: "음악",
    duration: "3:17",
    rankChange: 4,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 37,
    rank: 37,
    title: "Viva la Vida",
    artist: "Coldplay",
    album: "음악",
    duration: "2:46",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 38,
    rank: 38,
    title: "Blue Moon",
    artist: "엔플라잉",
    album: "음악",
    duration: "3:35",
    rankChange: -2,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 39,
    rank: 39,
    title: "Bones",
    artist: "Imagine Dragons",
    album: "음악",
    duration: "3:52",
    rankChange: 1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 40,
    rank: 40,
    title: "새삥",
    artist: "지코",
    album: "음악",
    duration: "4:08",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 41,
    rank: 41,
    title: "나는 너 좋아",
    artist: "장범준",
    album: "음악",
    duration: "3:14",
    rankChange: -1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 42,
    rank: 42,
    title: "On My Way",
    artist: "Alan Walker",
    album: "음악",
    duration: "3:27",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 43,
    rank: 43,
    title: "Good Parts",
    artist: "르세라핌",
    album: "음악",
    duration: "2:54",
    rankChange: 2,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 44,
    rank: 44,
    title: "Cupid",
    artist: "FIFTY FIFTY",
    album: "음악",
    duration: "3:21",
    rankChange: -3,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 45,
    rank: 45,
    title: "돌림판",
    artist: "머쉬베놈",
    album: "음악",
    duration: "3:46",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 46,
    rank: 46,
    title: "TOMBOY",
    artist: "혁오",
    album: "음악",
    duration: "3:05",
    rankChange: 1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 47,
    rank: 47,
    title: "Summer",
    artist: "Paul Blanco",
    album: "음악",
    duration: "2:52",
    rankChange: -1,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 48,
    rank: 48,
    title: "금요일에 만나요",
    artist: "승식",
    album: "음악",
    duration: "3:29",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 49,
    rank: 49,
    title: "HER",
    artist: "블락비",
    album: "음악",
    duration: "3:38",
    rankChange: 2,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 50,
    rank: 50,
    title: "All For You",
    artist: "서인국, 정은지",
    album: "음악",
    duration: "4:00",
    rankChange: -2,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 51,
    rank: 51,
    title: "EASY",
    artist: "르세라핌",
    album: "음악",
    duration: "3:30",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 52,
    rank: 52,
    title: "Summer Hate",
    artist: "지코,비",
    album: "음악",
    duration: "3:11",
    rankChange: 0,
    audioUrl: "",
    coverUrl:
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 53,
    rank:53,
    title:"간석기시대 감성이",
    artist:"무앤상",
    album:"음악",
    duration:"1:54",
    rankChange:0,
    audioUrl:"",
    coverUrl:"ceo.png",

  },
];


// 각 곡의 mp3 경로를 코드 내에서 직접 지정
songs[0].audioUrl = "52.mp3";
songs[1].audioUrl = "2.mp3";
songs[2].audioUrl = "3.mp3";
songs[3].audioUrl = "4.mp3";
songs[4].audioUrl = "5.mp3";
songs[5].audioUrl = "6.mp3";
songs[6].audioUrl = "7.mp3";
songs[7].audioUrl = "8.mp3";
songs[8].audioUrl = "9.mp3";
songs[9].audioUrl = "10.mp3";
songs[10].audioUrl = "11.mp3";
songs[11].audioUrl = "12.mp3";
songs[12].audioUrl = "13.mp3";
songs[13].audioUrl = "14.mp3";
songs[14].audioUrl = "15.mp3";
songs[15].audioUrl = "16.mp3";
songs[16].audioUrl = "17.mp3";
songs[17].audioUrl = "18.mp3";
songs[18].audioUrl = "19.mp3";
songs[19].audioUrl = "20.mp3";
songs[20].audioUrl = "21.mp3";
songs[21].audioUrl = "22.mp3";
songs[22].audioUrl = "23.mp3";
songs[23].audioUrl = "24.mp3";
songs[24].audioUrl = "25.mp3";
songs[25].audioUrl = "26.mp3";
songs[26].audioUrl = "27.mp3";
songs[27].audioUrl = "28.mp3";
songs[28].audioUrl = "29.mp3";
songs[29].audioUrl = "30.mp3";
songs[30].audioUrl = "31.mp3";
songs[31].audioUrl = "32.mp3";
songs[32].audioUrl = "33.mp3";
songs[33].audioUrl = "34.mp3";
songs[34].audioUrl = "35.mp3";
songs[35].audioUrl = "36.mp3";
songs[36].audioUrl = "37.mp3";
songs[37].audioUrl = "38.mp3";
songs[38].audioUrl = "39.mp3";
songs[39].audioUrl = "40.mp3";
songs[40].audioUrl = "41.mp3";
songs[41].audioUrl = "42.mp3";
songs[42].audioUrl = "43.mp3";
songs[43].audioUrl = "44.mp3";
songs[44].audioUrl = "45.mp3";
songs[45].audioUrl = "46.mp3";
songs[46].audioUrl = "47.mp3";
songs[47].audioUrl = "48.mp3";
songs[48].audioUrl = "49.mp3";
songs[49].audioUrl = "50.mp3";
songs[50].audioUrl = "51.mp3";
songs[51].audioUrl = "1.mp3";
songs[52].audioUrl = "53.mp3";

// 상태 관리
let playingId = null;
let likedSongs = new Set();
let showLikedOnly = false;
let audio = new Audio();

// 오디오 이벤트
audio.preload = "metadata";
audio.addEventListener("ended", () => {
  // 끝나면 다음 곡으로 자동 이동
  playNext();
});
audio.addEventListener("play", () => {
  updatePlayingUI();
  updateStopButton();
});
audio.addEventListener("pause", () => {
  updatePlayingUI();
  updateStopButton();
});
audio.addEventListener("timeupdate", () => {
  const seek = document.getElementById("seekBar");
  const cur = document.getElementById("currentTime");
  const tot = document.getElementById("totalTime");
  if (!seek) return;
  if (audio.duration) {
    seek.value = ((audio.currentTime / audio.duration) * 100).toFixed(2);
    if (cur) cur.textContent = formatTime(audio.currentTime);
    if (tot) tot.textContent = formatTime(audio.duration);
  } else {
    seek.value = 0;
    if (cur) cur.textContent = "0:00";
    if (tot) tot.textContent = "0:00";
  }
});

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  renderSongs();
  updateTotalSongs();
  // 전역 유틸 노출 (개별/대량 추가를 쉽게 하기 위함)
  window.addSongs = addSongs;
  window.setSongs = setSongs;
  const btnLikedOnly = document.getElementById("btnLikedOnly");
  const seek = document.getElementById("seekBar");
  const btnStop = document.getElementById("btnStop");
  if (btnLikedOnly) btnLikedOnly.addEventListener("click", toggleLikedOnly);
  if (seek)
    seek.addEventListener("input", (e) => {
      if (!audio.duration) return;
      const pct = Number(e.target.value) / 100;
      audio.currentTime = audio.duration * pct;
    });
  if (btnStop) btnStop.addEventListener("click", stopPlayback);
  updateStopButton();
  bindPlayerModalControls();
});

// 곡 렌더링
function renderSongs() {
  const songList = document.getElementById("songList");
  songList.innerHTML = "";

  const list = showLikedOnly
    ? songs.filter((s) => likedSongs.has(s.id))
    : songs;
  list.forEach((song, index) => {
    const songItem = createSongElement(song, index);
    songList.appendChild(songItem);
  });
}

// 곡 요소 생성
function createSongElement(song, index) {
  const div = document.createElement("div");
  div.className = "song-item";
  div.style.animationDelay = `${index * 50}ms`;
  div.setAttribute("data-id", String(song.id));

  const isPlaying = playingId === song.id && !audio.paused;
  const isLiked = likedSongs.has(song.id);

  div.innerHTML = `
        <div class="rank">${song.rank}</div>
  
        <div class="rank-change ${getRankChangeClass(song.rankChange)}">
            ${getRankChangeHTML(song.rankChange)}
        </div>
  
        <div class="song-info" onclick="openPlayerAndPlay(${song.id})">
            <div class="cover-wrapper">
                <img src="${song.coverUrl}" alt="${song.title}" class="cover">
                <div class="play-overlay">
                    <button class="play-btn-overlay" onclick="openPlayerAndPlay(${
                      song.id
                    }); event.stopPropagation();">
                        ${isPlaying ? getIconPause() : getIconPlay()}
                    </button>
                </div>
            </div>
            <div class="song-details">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            </div>
        </div>
  
        <div class="album">${song.album}</div>
  
        <div class="duration">${song.duration}</div>
  
        <div class="actions">
            <button class="action-btn play-btn" onclick="openPlayerAndPlay(${
              song.id
            })">
                ${isPlaying ? getIconPause() : getIconPlay()}
            </button>
            <button class="action-btn like-btn ${
              isLiked ? "liked" : ""
            }" onclick="toggleLike(${song.id})">
                ${getIconHeart()}
            </button>
        </div>
    `;

  return div;
}

// 재생/일시정지 토글
function togglePlay(id) {
  const targetSong = songs.find((s) => s.id === id);
  if (!targetSong) return;

  // 같은 곡인 경우: 재생 중이면 일시정지, 일시정지면 재개
  if (playingId === id) {
    if (!audio.paused) {
      audio.pause();
      playingId = null;
      updatePlayingUI();
      return;
    }
  }

  // 다른 곡으로 전환하거나 처음 재생
  if (!targetSong.audioUrl) {
    // mp3 경로를 추가하면 자동 재생됩니다.
    return;
  }

  playingId = id;
  if (audio.src !== targetSong.audioUrl) {
    audio.src = targetSong.audioUrl;
  }
  audio
    .play()
    .then(() => {
      updatePlayingUI();
    })
    .catch(() => {
      // 자동 재생이 차단된 경우 등
      updatePlayingUI();
    });
}

// 좋아요 토글
function toggleLike(id) {
  if (likedSongs.has(id)) {
    likedSongs.delete(id);
  } else {
    likedSongs.add(id);
  }
  renderSongs();
}

// 좋아요만 보기 토글
function toggleLikedOnly() {
  showLikedOnly = !showLikedOnly;
  const btn = document.getElementById("btnLikedOnly");
  if (btn) btn.textContent = `Liked Only: ${showLikedOnly ? "ON" : "OFF"}`;
  renderSongs();
}

// 랭킹 자동 변경 (간단 시뮬)
// 재생 중지
function stopPlayback() {
  if (!audio.src) return; // 재생할 소스가 없는 경우 무시
  if (audio.paused) {
    // 일시정지 상태면 현재 위치에서 재개
    audio
      .play()
      .then(() => {
        updatePlayingUI();
        updateStopButton();
      })
      .catch(() => {
        updatePlayingUI();
        updateStopButton();
      });
  } else {
    // 재생 중이면 일시정지 (위치 유지)
    audio.pause();
    updatePlayingUI();
    updateStopButton();
  }
}

function updateStopButton() {
  const btn = document.getElementById("btnStop");
  if (!btn) return;
  btn.textContent = audio.paused ? "Resume" : "Stop";
}

function updatePlayingUI() {
  const items = document.querySelectorAll(".song-item");
  items.forEach((el) => {
    const idStr = el.getAttribute("data-id");
    if (!idStr) return;
    const id = Number(idStr);
    const isPlaying = playingId === id && !audio.paused;
    const mainBtn = el.querySelector(".action-btn.play-btn");
    const overlayBtn = el.querySelector(".play-btn-overlay");
    if (mainBtn) mainBtn.innerHTML = isPlaying ? getIconPause() : getIconPlay();
    if (overlayBtn)
      overlayBtn.innerHTML = isPlaying ? getIconPause() : getIconPlay();
  });
}

// 총 곡 수 업데이트
function updateTotalSongs() {
  document.getElementById("totalSongs").textContent = songs.length;
}

function formatTime(sec) {
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  const m = Math.floor(sec / 60).toString();
  return `${m}:${s}`;
}

// ===== 플레이어 모달 및 다음/이전 제어 =====
function getVisibleList() {
  return showLikedOnly ? songs.filter((s) => likedSongs.has(s.id)) : songs;
}

function playNext() {
  const list = getVisibleList();
  if (playingId == null) {
    if (list.length > 0) togglePlay(list[0].id);
    return;
  }
  const idx = list.findIndex((s) => s.id === playingId);
  if (idx >= 0 && idx + 1 < list.length) {
    togglePlay(list[idx + 1].id);
  } else {
    playingId = null;
    audio.pause();
    updatePlayingUI();
    updateStopButton();
  }
}

function playPrev() {
  const list = getVisibleList();
  if (playingId == null) return;
  const idx = list.findIndex((s) => s.id === playingId);
  if (idx > 0) togglePlay(list[idx - 1].id);
  else togglePlay(list[0].id);
}

function openPlayerAndPlay(id) {
  openPlayerModal(id);
  if (playingId === id && !audio.paused) return;
  togglePlay(id);
}

function openPlayerModal(id) {
  const modal = document.getElementById("playerModal");
  if (!modal) return;
  modal.style.display = "flex";
  updatePlayerModal(id);
}

function closePlayerModal() {
  const modal = document.getElementById("playerModal");
  if (!modal) return;
  modal.style.display = "none";
}

function bindPlayerModalControls() {
  const closeBtn = document.getElementById("pmClose");
  const prevBtn = document.getElementById("pmPrev");
  const nextBtn = document.getElementById("pmNext");
  const playBtn = document.getElementById("pmPlayPause");
  const seek = document.getElementById("pmSeek");
  if (closeBtn) closeBtn.addEventListener("click", closePlayerModal);
  if (prevBtn) prevBtn.addEventListener("click", playPrev);
  if (nextBtn) nextBtn.addEventListener("click", playNext);
  if (playBtn)
    playBtn.addEventListener("click", () => {
      if (!audio.src) return;
      if (audio.paused) audio.play();
      else audio.pause();
      updatePlayingUI();
      updatePlayerModal();
    });
  if (seek)
    seek.addEventListener("input", (e) => {
      if (!audio.duration) return;
      const pct = Number(e.target.value) / 100;
      audio.currentTime = audio.duration * pct;
    });
  audio.addEventListener("timeupdate", () => updatePlayerModal());
  audio.addEventListener("play", () => updatePlayerModal());
  audio.addEventListener("pause", () => updatePlayerModal());
}

function updatePlayerModal(optionalId) {
  const id = optionalId != null ? optionalId : playingId;
  const song = songs.find((s) => s.id === id);
  const cover = document.getElementById("pmCover");
  const title = document.getElementById("pmTitle");
  const artist = document.getElementById("pmArtist");
  const playBtn = document.getElementById("pmPlayPause");
  const cur = document.getElementById("pmCurrent");
  const tot = document.getElementById("pmTotal");
  const seek = document.getElementById("pmSeek");
  if (song) {
    if (cover) cover.src = song.coverUrl;
    if (title) title.textContent = song.title;
    if (artist) artist.textContent = song.artist;
  }
  if (playBtn) playBtn.textContent = audio.paused ? "▶" : "❚❚";
  if (tot)
    tot.textContent = audio.duration ? formatTime(audio.duration) : "0:00";
  if (cur)
    cur.textContent = audio.currentTime
      ? formatTime(audio.currentTime)
      : "0:00";
  if (seek) {
    if (audio.duration)
      seek.value = ((audio.currentTime / audio.duration) * 100).toFixed(2);
    else seek.value = 0;
  }
}

// 비어있는 audioUrl을 예시 경로로 자동 채우기
// seedExampleAudioUrls 제거 (코드 내 고정 세팅으로 대체)

// 곡 ID 생성기
function getNextSongId() {
  if (songs.length === 0) return 1;
  return Math.max(...songs.map((s) => s.id || 0)) + 1;
}

// 곡 기본값 병합
function normalizeSong(partial) {
  const normalized = { ...partial };
  if (!normalized.id) normalized.id = getNextSongId();
  if (typeof normalized.rank !== "number") normalized.rank = songs.length + 1;
  if (typeof normalized.rankChange !== "number") normalized.rankChange = 0;
  if (!normalized.duration) normalized.duration = "0:00";
  if (!normalized.audioUrl) normalized.audioUrl = "";
  if (!normalized.coverUrl)
    normalized.coverUrl =
      "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=200";
  return normalized;
}

// 곡 대량 추가 (기존 목록 뒤에 추가)
function addSongs(newSongs) {
  if (!Array.isArray(newSongs)) return;
  newSongs.forEach((s) => songs.push(normalizeSong(s)));
  updateTotalSongs();
  renderSongs();
}

// 곡 교체 (전체를 새 배열로 교체)
function setSongs(newSongs) {
  if (!Array.isArray(newSongs)) return;
  songs.length = 0;
  newSongs.forEach((s) => songs.push(normalizeSong(s)));
  updateTotalSongs();
  renderSongs();
}

// 순위 변동 클래스
function getRankChangeClass(change) {
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "same";
}

// 순위 변동 HTML
function getRankChangeHTML(change) {
  if (change > 0) {
    return `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <span>${change}</span>
        `;
  } else if (change < 0) {
    return `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(180deg)">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <span>${Math.abs(change)}</span>
        `;
  }
  return "<span>-</span>";
}

// 아이콘 SVG
function getIconPlay() {
  return `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
    `;
}

function getIconPause() {
  return `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
    `;
}

function getIconHeart() {
  return `
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
    `;
}

