const stage1 = {
  name: "STAGE1",
  backgroundUrl: "또봇.jpg",
  groundUrl: "mint_wood.png",
  length: 10000,
  jumpObstacle: "obstacle table",
  jumpObstaclePosition: [1000, 1500, 5000],
  doubleJumpObstacle: "obstacle robot",
  doubleJumpObstaclePosition: [2500, 3400, 6700, 6900, 7100, 7300],
  slideObstacle: "obstacle lamp",
  slideObstaclePosition: [5500, 8200, 8700],
  blastPosition: [6500],
  coinMagicPosition: [6300],
  giantPosition: [8000],
  magnetPosition: [6400],
  energyPosition: [10200],
  miniEnergyPosition: [],
  goodPatternPosition: [9200],
  jellyPatternPosition: [],
  damage: 100,
};

const stage2 = {
  name: "찬란한 입학",
  backgroundUrl: "왕좌배경.png",
  groundUrl: "pink_crystal.png",
  length: 10000 /*10000*/,
  jumpObstacle: "obstacle green_crystal",
  jumpObstaclePosition: [3200, 3700, 4200],
  doubleJumpObstacle: "obstacle pink_crystal",
  doubleJumpObstaclePosition: [1800, 6500, 6700, 6900, 8500, 9300],
  slideObstacle: "obstacle long_crystal",
  slideObstaclePosition: [1000, 2600, 7500, 8000],
  blastPosition: [6100],
  coinMagicPosition: [],
  giantPosition: [],
  magnetPosition: [4500],
  energyPosition: [9900],
  miniEnergyPosition: [6200, 6300, 6400],
  goodPatternPosition: [],
  jellyPatternPosition: [4700],
  damage: 200,
};

const stage3 = {
  name: "무한코딩의 날",
  backgroundUrl: "코딩감옥.png",
  groundUrl: "mud.png",
  length: 10900 /*10900*/,
  jumpObstacle: "obstacle small_mushroom",
  jumpObstaclePosition: [1000, 1500, 2000, 2500, 3000, 7000],
  doubleJumpObstacle: "obstacle dragon_tail",
  doubleJumpObstaclePosition: [3800, 4600, 8200],
  slideObstacle: "obstacle mushroom",
  slideObstaclePosition: [7500, 8900],
  blastPosition: [],
  coinMagicPosition: [],
  giantPosition: [],
  magnetPosition: [9500],
  energyPosition: [6600],
  miniEnergyPosition: [10600, 10700, 10800],
  goodPatternPosition: [5600],
  jellyPatternPosition: [9700],
  damage: 100,
};

const stage4 = {
  name: "탈출!",
  backgroundUrl: "dragon.png",
  groundUrl: "wood.png",
  length: 20000 /*20000*/,
  jumpObstacle: "obstacle mini_snack",
  jumpObstaclePosition: [1000, 2200, 3400, 3900, 10500, 11000, 11500],
  doubleJumpObstacle: "obstacle snacks",
  doubleJumpObstaclePosition: [6000, 6800, 7600, 15800, 17400, 18200],
  slideObstacle: "obstacle knife",
  slideObstaclePosition: [1600, 2800, 15000, 16600],
  blastPosition: [8200],
  coinMagicPosition: [8000],
  giantPosition: [3000, 12000],
  magnetPosition: [8100],
  energyPosition: [5500],
  miniEnergyPosition: [],
  goodPatternPosition: [4500, 19000],
  jellyPatternPosition: [8400, 12200],
  damage: 100,
};

const stage5 = {
  name: "편의점가는길",
  backgroundUrl: "거미줄집.png",
  groundUrl: "구름땅.png",
  length: 20000 /*20000*/,
  jumpObstacle: "obstacle smalldoci",
  jumpObstaclePosition: [1000, 2200, 3400, 3900, 10500, 11000, 11500],
  doubleJumpObstacle: "obstacle doci",
  doubleJumpObstaclePosition: [6000, 6800, 7600, 15800, 17400, 18200],
  slideObstacle: "obstacle bird",
  slideObstaclePosition: [1600, 2800, 15000, 16600],
  blastPosition: [8200],
  coinMagicPosition: [8000],
  giantPosition: [500, 12000],
  magnetPosition: [8100],
  energyPosition: [5500],
  miniEnergyPosition: [],
  goodPatternPosition: [4500, 19000],
  jellyPatternPosition: [8400, 12200],
  damage: 100,
};

const stage6 = {
  name: "대모산 등산",
  backgroundUrl: "찐찐대모산.png",
  groundUrl: "mud.png",
  length: 20000 /*20000*/,
  jumpObstacle: "obstacle taco",
  jumpObstaclePosition: [1000, 2200, 3400, 3900, 10500, 11000, 11500],
  doubleJumpObstacle: "obstacle bigtaco",
  doubleJumpObstaclePosition: [6000, 6800, 7600, 15800, 17400, 18200],
  slideObstacle: "obstacle tree",
  slideObstaclePosition: [1600, 2800, 15000, 16600],
  blastPosition: [8200],
  coinMagicPosition: [8000],
  giantPosition: [500, 12000],
  magnetPosition: [8100],
  energyPosition: [5500],
  miniEnergyPosition: [],
  goodPatternPosition: [4500, 19000],
  jellyPatternPosition: [8400, 12200],
  damage: 100,
};

// 스테이지 7-9는 stages.ts 파일에, 스테이지 10-27은 이 파일에 있습니다.

const stage7 = {
  name: "로봇고 복도",
  backgroundUrl: "dark.png",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle ghost",
  jumpObstaclePosition: [1600, 6200, 10800, 15400, 20000, 24600, 29200],
  doubleJumpObstacle: "obstacle clocks",
  doubleJumpObstaclePosition: [3000, 7600, 12200, 16800, 21400, 26000],
  slideObstacle: "obstacle ghostslide",
  slideObstaclePosition: [2200, 6800, 11400, 16000, 20600, 25200, 29800],
  blastPosition: [5000, 15000, 25000],
  coinMagicPosition: [4800, 14800, 24800],
  giantPosition: [9000, 19000],
  magnetPosition: [5200, 15200, 25200],
  energyPosition: [30000],
  miniEnergyPosition: [2800, 8400, 14000, 19600, 25200],
  goodPatternPosition: [7000, 17000, 27000],
  jellyPatternPosition: [3500, 13500, 23500],
  damage: 120,
};

const stage8 = {
  name: "로봇고 개발자의 꿈",
  backgroundUrl: "포크.jpg",
  groundUrl: "포크땅.png",
  length: 30000,
  jumpObstacle: "obstacle smallkal",
  jumpObstaclePosition: [2000, 6600, 11200, 15800, 20400, 25000, 29600],
  doubleJumpObstacle: "obstacle bigkal",
  doubleJumpObstaclePosition: [3400, 8000, 12600, 17200, 21800, 26400],
  slideObstacle: "obstacle sin",
  slideObstaclePosition: [1200, 5800, 10400, 15000, 19600, 24200, 28800],
  blastPosition: [7000, 17000, 27000],
  coinMagicPosition: [6800, 16800, 26800],
  giantPosition: [4000, 24000],
  magnetPosition: [7200, 17200, 27200],
  energyPosition: [30000],
  miniEnergyPosition: [2600, 7800, 13000, 18200, 23400, 28600],
  goodPatternPosition: [9000, 19000, 29000],
  jellyPatternPosition: [5000, 15000, 25000],
  damage: 120,
};

const stage9 = {
  name: "로봇고화이팅",
  backgroundUrl: "검은신전.png",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle smallmou",
  jumpObstaclePosition: [2200, 6800, 11400, 16000, 20600, 25200, 29800],
  doubleJumpObstacle: "obstacle bigmou",
  doubleJumpObstaclePosition: [3600, 8200, 12800, 17400, 22000, 26600],
  slideObstacle: "obstacle jelly",
  slideObstaclePosition: [1400, 6000, 10600, 15200, 19800, 24400, 29000],
  blastPosition: [9000, 19000, 29000],
  coinMagicPosition: [8800, 18800, 28800],
  giantPosition: [6000, 26000],
  magnetPosition: [9200, 19200, 29200],
  energyPosition: [30000],
  miniEnergyPosition: [3000, 8400, 13800, 19200, 24600],
  goodPatternPosition: [5000, 15000, 25000],
  jellyPatternPosition: [7000, 17000, 27000],
  damage: 120,
};

const stage10 = {
  name: "인공지능 연구소",
  backgroundUrl: "mushrooms.jpeg",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle develop",
  jumpObstaclePosition: [1800, 6400, 11000, 15600, 20200, 24800, 29400],
  doubleJumpObstacle: "obstacle bigdevelop",
  doubleJumpObstaclePosition: [3200, 7800, 12400, 17000, 21600, 26200],
  slideObstacle: "obstacle gum",
  slideObstaclePosition: [2500, 7100, 11700, 16300, 20900, 25500],
  blastPosition: [8000, 18000, 28000],
  coinMagicPosition: [7800, 17800, 27800],
  giantPosition: [3000, 23000],
  magnetPosition: [8200, 18200, 28200],
  energyPosition: [30000],
  miniEnergyPosition: [2200, 7600, 13000, 18400, 23800, 29200],
  goodPatternPosition: [10000, 20000],
  jellyPatternPosition: [5000, 15000, 25000],
  damage: 140,
};

const stage11 = {
  name: "운동회 도전",
  backgroundUrl: "긴급배경.png",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle mini_snack",
  jumpObstaclePosition: [2000, 6600, 11200, 15800, 20400, 25000, 29600],
  doubleJumpObstacle: "obstacle snacks",
  doubleJumpObstaclePosition: [3400, 8000, 12600, 17200, 21800, 26400],
  slideObstacle: "obstacle knife",
  slideObstaclePosition: [1200, 5800, 10400, 15000, 19600, 24200, 28800],
  blastPosition: [6000, 16000, 26000],
  coinMagicPosition: [5800, 15800, 25800],
  giantPosition: [12000, 22000],
  magnetPosition: [6200, 16200, 26200],
  energyPosition: [30000],
  miniEnergyPosition: [2400, 8000, 13600, 19200, 24800],
  goodPatternPosition: [8000, 18000, 28000],
  jellyPatternPosition: [4000, 14000, 24000],
  damage: 120,
};

const stage12 = {
  name: "미래도시 모험",
  backgroundUrl: "기차.png",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle table",
  jumpObstaclePosition: [1600, 6200, 10800, 15400, 20000, 24600, 29200],
  doubleJumpObstacle: "obstacle clocks",
  doubleJumpObstaclePosition: [3000, 7600, 12200, 16800, 21400, 26000],
  slideObstacle: "obstacle lamp",
  slideObstaclePosition: [2200, 6800, 11400, 16000, 20600, 25200, 29800],
  blastPosition: [9000, 19000, 29000],
  coinMagicPosition: [8800, 18800, 28800],
  giantPosition: [5000, 25000],
  magnetPosition: [9200, 19200, 29200],
  energyPosition: [30000],
  miniEnergyPosition: [2800, 8400, 14000, 19600, 25200],
  goodPatternPosition: [4000, 14000, 24000],
  jellyPatternPosition: [7000, 17000, 27000],
  damage: 20,
};

const stage13 = {
  name: "사이버 보안 대회",
  backgroundUrl: "유리문.png",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle green_crystal",
  jumpObstaclePosition: [2000, 7600, 13200, 18800, 24400],
  doubleJumpObstacle: "obstacle pink_crystal",
  doubleJumpObstaclePosition: [3400, 9000, 14600, 20200, 25800],
  slideObstacle: "obstacle long_crystal",
  slideObstaclePosition: [1200, 6800, 12400, 18000, 23600, 29200],
  blastPosition: [5000, 15000, 25000],
  coinMagicPosition: [4800, 14800, 24800],
  giantPosition: [10000, 20000],
  magnetPosition: [5200, 15200, 25200],
  energyPosition: [30000],
  miniEnergyPosition: [2600, 8200, 13800, 19400, 25000],
  goodPatternPosition: [7000, 17000, 27000],
  jellyPatternPosition: [4000, 14000, 24000],
  damage: 100,
};

const stage14 = {
  name: "빅데이터 처리소",
  backgroundUrl: "용암신전.png",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle small_mushroom",
  jumpObstaclePosition: [2200, 7800, 13400, 19000, 24600],
  doubleJumpObstacle: "obstacle dragon_tail",
  doubleJumpObstaclePosition: [3600, 9200, 14800, 20400, 26000],
  slideObstacle: "obstacle onion_frog",
  slideObstaclePosition: [1400, 7000, 12600, 18200, 23800, 29400],
  blastPosition: [8000, 18000, 28000],
  coinMagicPosition: [7800, 17800, 27800],
  giantPosition: [4000, 24000],
  magnetPosition: [8200, 18200, 28200],
  energyPosition: [30000],
  miniEnergyPosition: [3000, 9000, 15000, 21000, 27000],
  goodPatternPosition: [6000, 16000, 26000],
  jellyPatternPosition: [10000, 20000],
  damage: 100,
};

// 스테이지 18-27 (마지막)

const stage15 = {
  name: "가상현실 세계",
  backgroundUrl: "궁전집.png",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle mini_snack",
  jumpObstaclePosition: [1800, 7400, 13000, 18600, 24200, 29800],
  doubleJumpObstacle: "obstacle snacks",
  doubleJumpObstaclePosition: [3200, 8800, 14400, 20000, 25600],
  slideObstacle: "obstacle jelly",
  slideObstaclePosition: [2600, 8200, 13800, 19400, 25000],
  blastPosition: [6000, 16000, 26000],
  coinMagicPosition: [5800, 15800, 25800],
  giantPosition: [11000, 21000],
  magnetPosition: [6200, 16200, 26200],
  energyPosition: [30000],
  miniEnergyPosition: [2400, 8400, 14400, 20400, 26400],
  goodPatternPosition: [5000, 15000, 25000],
  jellyPatternPosition: [9000, 19000, 29000],
  damage: 100,
};

const stage16 = {
  name: "로보틱스 대회",
  backgroundUrl: "purple_mud.jpeg",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle table",
  jumpObstaclePosition: [2000, 7600, 13200, 18800, 24400],
  doubleJumpObstacle: "obstacle clocks",
  doubleJumpObstaclePosition: [3400, 9000, 14600, 20200, 25800],
  slideObstacle: "obstacle lamp",
  slideObstaclePosition: [1200, 6800, 12400, 18000, 23600, 29200],
  blastPosition: [7000, 17000, 27000],
  coinMagicPosition: [6800, 16800, 26800],
  giantPosition: [3000, 23000],
  magnetPosition: [7200, 17200, 27200],
  energyPosition: [30000],
  miniEnergyPosition: [2600, 8600, 14600, 20600, 26600],
  goodPatternPosition: [10000, 20000],
  jellyPatternPosition: [5000, 15000, 25000],
  damage: 100,
};

const stage17 = {
  name: "블록체인 네트워크",
  backgroundUrl: "purple_tree.jpeg",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle green_crystal",
  jumpObstaclePosition: [2200, 7800, 13400, 19000, 24600],
  doubleJumpObstacle: "obstacle clocks",
  doubleJumpObstaclePosition: [3600, 9200, 14800, 20400, 26000],
  slideObstacle: "obstacle ghostslide",
  slideObstaclePosition: [1400, 7000, 12600, 18200, 23800, 29400],
  blastPosition: [9000, 19000, 29000],
  coinMagicPosition: [8800, 18800, 28800],
  giantPosition: [5000, 25000],
  magnetPosition: [9200, 19200, 29200],
  energyPosition: [30000],
  miniEnergyPosition: [2800, 8800, 14800, 20800, 26800],
  goodPatternPosition: [7000, 17000, 27000],
  jellyPatternPosition: [4000, 14000, 24000],
  damage: 200,
};

const stage18 = {
  name: "양자 컴퓨팅 실험실",
  backgroundUrl: "집배경.png",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle small_mushroom",
  jumpObstaclePosition: [1600, 7200, 12800, 18400, 24000, 29600],
  doubleJumpObstacle: "obstacle dragon_tail",
  doubleJumpObstaclePosition: [3000, 8600, 14200, 19800, 25400],
  slideObstacle: "obstacle onion_frog",
  slideObstaclePosition: [2400, 8000, 13600, 19200, 24800],
  blastPosition: [5000, 15000, 25000],
  coinMagicPosition: [4800, 14800, 24800],
  giantPosition: [9000, 19000],
  magnetPosition: [5200, 15200, 25200],
  energyPosition: [30000],
  miniEnergyPosition: [3200, 9200, 15200, 21200, 27200],
  goodPatternPosition: [6000, 16000, 26000],
  jellyPatternPosition: [10000, 20000],
  damage: 120,
};

const stage19 = {
  name: "우주정거장 탐험",
  backgroundUrl: "하얀신전.png",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle mou",
  jumpObstaclePosition: [2000, 7600, 13200, 18800, 24400],
  doubleJumpObstacle: "obstacle snacks",
  doubleJumpObstaclePosition: [3400, 9000, 14600, 20200, 25800],
  slideObstacle: "obstacle bird",
  slideObstaclePosition: [1200, 6800, 12400, 18000, 23600, 29200],
  blastPosition: [8000, 18000, 28000],
  coinMagicPosition: [7800, 17800, 27800],
  giantPosition: [4000, 24000],
  magnetPosition: [8200, 18200, 28200],
  energyPosition: [30000],
  miniEnergyPosition: [3000, 9000, 15000, 21000, 27000],
  goodPatternPosition: [5000, 15000, 25000],
  jellyPatternPosition: [10000, 20000],
  damage: 120,
};

const stage20 = {
  name: "마지막 로봇고 졸업",
  backgroundUrl: "옷장집.png",
  groundUrl: "mint_wood.png",
  length: 30000,
  jumpObstacle: "obstacle table",
  jumpObstaclePosition: [1800, 7400, 13000, 18600, 24200, 29800],
  doubleJumpObstacle: "obstacle clocks",
  doubleJumpObstaclePosition: [3400, 8900, 15400, 21000, 25600],
  slideObstacle: "obstacle lamp",
  slideObstaclePosition: [2600, 8200, 13800, 19400, 25000],
  blastPosition: [6000, 16000, 26000],
  coinMagicPosition: [5800, 15800, 25800],
  giantPosition: [10000, 20000],
  magnetPosition: [6200, 16200, 26200],
  energyPosition: [30000],
  miniEnergyPosition: [2400, 8400, 14400, 20400, 26400],
  goodPatternPosition: [7000, 17000, 27000],
  jellyPatternPosition: [4000, 14000, 24000],
  damage: 400,
};
