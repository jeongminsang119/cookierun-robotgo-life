




// =================== 메뉴 정보 ===================
const menuItems = [
  {
    name: "간성이의 존맛 닭강정",
    description: "간성정 닭간정 간성대표님의 자부심 닭간정",
    price: 18000,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "간성이의 양념치킨",
    description: "중국산 양념간성소스로 맛을 낸 대표 메뉴",
    price: 19000,
    image: "https://images.unsplash.com/photo-1575932444877-5106bee2a599?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "간성이의 핵매운 마늘치킨",
    description: "간성이가 급식실에서 뽀려온 특별한 치킨",
    price: 19000,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "대표님이 미쳤어요 간성치킨 스페셜",
    description: "비밀 레시피로 만든 프리미엄 치킨",
    price: 21000,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80",
  },
];

// =================== 매장 정보 ===================
const locations = [
  { name: "간성치킨 강남점 점장:윤영우", address: "서울 강남구 테헤란로 123", phone: "010-4074-9289" },
  { name: "간성치킨 홍대점 점장:김무상", address: "서울 마포구 홍대로 456", phone: "02-2345-6789" },
  { name: "간성치킨 부산점 점장:정민상", address: "부산 해운대구 해운대로 789", phone: "051-345-6789" },
  { name: "간성치킨 평양점 점장:김민재", address: "김정은 점장 평양로 199", phone: "02-9999-9999" },
  { name: "간성치킨 강남점 점장:오승윤", address: "서울 강남구 테헤란로 123", phone: "02-1234-5678" },
  { name: "간성치킨 홍대점 점장:정민우", address: "서울 마포구 홍대로 456", phone: "02-2345-6789" },
  { name: "간성치킨 안산점 점장:박인호", address: "부산 해운대구 해운대로 789", phone: "051-345-6789" },
  { name: "간성치킨 평양점 점장:오선우", address: "김정은 점장 평양로 199", phone: "02-9999-9999" },
  { name: "간성치킨 종로점 점장:최은우", address: "서울 종로구 종로 1길 100", phone: "02-1111-1111" },
  { name: "간성치킨 잠실점 점장:이홍원", address: "서울 송파구 올림픽로 300", phone: "02-2222-2222" },
  { name: "간성치킨 수원점 점장:배은성", address: "경기 수원시 팔달구 중부대로 120", phone: "031-333-3333" },
  { name: "간성치킨 인천점 점장:구함", address: "인천 미추홀구 주안로 45", phone: "032-444-4444" },
  { name: "간성치킨 일산점 점장:구함" , address: "경기 고양시 일산서구 중앙로 200", phone: "031-555-5555" },
  { name: "간성치킨 대전점 점장:구함", address: "대전 서구 둔산로 170", phone: "042-666-6666" },
  { name: "간성치킨 대구점 점장:구함", address: "대구 중구 동성로2가 50", phone: "053-777-7777" },
  { name: "간성치킨 울산점 점장:구함", address: "울산 남구 삼산로 90", phone: "052-888-8888" },
  { name: "간성치킨 전주점 점장:구함", address: "전북 전주시 완산구 전주천동로 110", phone: "063-999-9999" },
  { name: "간성치킨 광주점 점장:구함", address: "광주 서구 무진대로 950", phone: "062-1212-1212" },
  { name: "간성치킨 제주점 점장:구함", address: "제주 제주시 중앙로 10", phone: "064-1313-1313" },
];

// =================== DOM 준비 ===================
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 1000, once: true });
  populateMenu();
  populateLocations();
  setupMobileMenu();
  setupFranchiseForm();
});

// =================== 메뉴 표시 ===================
function populateMenu() {
  const menuGrid = document.getElementById("menuGrid");
  menuItems.forEach((item, index) => {
    const menuItem = document.createElement("div");
    menuItem.className = "menu-item";
    menuItem.setAttribute("data-aos", "fade-up");
    menuItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="menu-item-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">${item.price.toLocaleString()}원</p>
        <button class="primary-btn" onclick="orderMenu(${index})">주문하기</button>
      </div>`;
    menuGrid.appendChild(menuItem);
  });
}

function orderMenu(index) {
  const item = menuItems[index];
  const confirmPayment = confirm(`${item.name}\n${item.price.toLocaleString()}원\n결제하시겠습니까?`);
  if (confirmPayment) {
    alert("결제가 완료되었습니다!");
    startOrder("delivery");
  }
}

// =================== 매장 표시/검색 ===================
function populateLocations() {
  const locationList = document.getElementById("locationList");
  locationList.innerHTML = "";
  locations.forEach((location) => {
    const locationItem = document.createElement("div");
    locationItem.className = "location-item";
    locationItem.setAttribute("data-aos", "fade-up");
    locationItem.innerHTML = `
      <h3>${location.name}</h3>
      <p><i class="fas fa-map-marker-alt"></i> ${location.address}</p>
      <p><i class="fas fa-phone"></i> ${location.phone}</p>`;
    locationList.appendChild(locationItem);
  });
}

function searchLocations() {
  const searchInput = document.getElementById("locationSearch").value.toLowerCase();
  const locationList = document.getElementById("locationList");
  locationList.innerHTML = "";

  const filtered = locations.filter(
    (loc) => loc.name.toLowerCase().includes(searchInput) || loc.address.toLowerCase().includes(searchInput)
  );

  filtered.forEach((location) => {
    const locationItem = document.createElement("div");
    locationItem.className = "location-item";
    locationItem.setAttribute("data-aos", "fade-up");
    locationItem.innerHTML = `
      <h3>${location.name}</h3>
      <p><i class="fas fa-map-marker-alt"></i> ${location.address}</p>
      <p><i class="fas fa-phone"></i> ${location.phone}</p>`;
    locationList.appendChild(locationItem);
  });
}

// =================== 창업 폼 처리 ===================
function setupFranchiseForm() {
  const form = document.getElementById("franchiseForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("창업 문의가 접수되었습니다!");
    form.reset();
  });
}

// =================== 모바일 메뉴 ===================
function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// =================== 배달 시작 ===================
function startOrder(type) {
  const mapContainer = document.getElementById("customMapContainer");
  const map = document.querySelector(".custom-map");
  const deliveryStatus = document.getElementById("deliveryStatus");
  const rider = document.getElementById("riderIcon");

  if (type === "delivery") {
    mapContainer.style.display = "block";
    map.scrollIntoView({ behavior: "smooth" });

    map.innerHTML = `
      <div class="route-line"></div>
      <div class="destination">🏠</div>
    `;
    map.appendChild(rider);

    rider.style.top = "50px";
    rider.style.left = "30px";
    rider.style.position = "absolute";

    generateBuildings(25);
    startDeliveryLoop();
  } else {
    alert("포장 주문 시스템이 곧 오픈됩니다!");
  }
}

// =================== 건물 생성 ===================
function generateBuildings(count = 20) {
  const map = document.querySelector(".custom-map");
  for (let i = 0; i < count; i++) {
    const building = document.createElement("div");
    building.className = "building";
    building.style.top = `${Math.random() * 90}vh`;
    building.style.left = `${Math.random() * 90}vw`;
    map.appendChild(building);
  }
}

// =================== 배달 경로 이동 ===================
function startDeliveryLoop() {
  const status = document.getElementById("deliveryStatus");
  const rider = document.getElementById("riderIcon");

  const steps = [
    { top: "100px", left: "100px" },
    { top: "200px", left: "250px" },
    { top: "300px", left: "400px" },
    { top: "400px", left: "550px" },
    { top: "500px", left: "700px" },
    { top: "600px", left: "850px" },
    { top: "calc(100% - 80px)", left: "calc(100% - 80px)" },
  ];

  status.textContent = "조리 중...";
  rider.style.top = "50px";
  rider.style.left = "30px";

  setTimeout(() => (status.textContent = "조리 완료!"), 3000);

  steps.forEach((pos, i) => {
    setTimeout(() => {
      status.textContent = "배달 중...";
      rider.style.top = pos.top;
      rider.style.left = pos.left;
    }, 5000 + i * 8000);
  });

  setTimeout(() => {
    status.textContent = "배달 완료! 🍗";
  }, 60000);
}









