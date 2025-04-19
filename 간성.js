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
    { name: "간성치킨 상하이점 점장:김민재", address: "따거형 199", phone: "02-9999-9999" },
    { name: "간성치킨 강남점 점장:오승윤", address: "서울 강남구 테헤란로 123", phone: "02-1234-5678" },
    { name: "간성치킨 홍대점 점장:정민우", address: "서울 마포구 홍대로 456", phone: "02-2345-6789" },
    { name: "간성치킨 안산점 점장:박인호", address: "부산 해운대구 해운대로 789", phone: "051-345-6789" },
    { name: "간성치킨 광주점 점장:오선우", address: "광주광역시 북부 062", phone: "02-9999-9999" },
    { name: "간성치킨 종로점 점장:최은우", address: "서울 종로구 종로 1길 100", phone: "02-1111-1111" },
    { name: "간성치킨 잠실점 점장:이홍원", address: "서울 송파구 올림픽로 300", phone: "02-2222-2222" },
    { name: "간성치킨 서현점 점장:배은성", address: "경기 성남시 분당구 서현로 120", phone: "031-333-3333" },
    { name: "간성치킨 남양주점 점장:박채리", address: "남양주 ", phone: "031-333-3333" },
    { name: "간성치킨 봉하마을점 점장:최진영", address: "경남 김해시 진영읍 봉하로 45", phone: "055-523-2009" },
    { name: "간성치킨 서울로봇고점 점장:여장혁" , address: "강남구 일원동 또봇고 200", phone: "031-555-5555" },
    { name: "간성치킨 경기오산점 점장:하정호", address: "경기 오산 죽담로 170", phone: "042-666-6666" },
    { name: "간성치킨 용인수지점 점장:주장훈", address: "용인 좋아요 210", phone: "053-777-7777" },
    { name: "간성치킨 원주점 점장:박대섭", address: "강원도 원주 최고 90", phone: "052-888-8888" },
    { name: "간성치킨 태양흑점 점장:무싸트", address: "흑점 좋아요 210", phone: "063-999-9999" },
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

    mapContainer.style.display = "block";

    if (orderType === "delivery") {
      deliveryStatus.innerText = "배달원이 출발합니다!";
      startDeliveryLoop();
    } else if (orderType === "pickup") {
      deliveryStatus.innerText = "포장 준비 중입니다!";
    }
  
  
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
    map.innerHTML = ""; // 기존 건물 초기화
    for (let i = 0; i < count; i++) {
      const building = document.createElement("div");
      building.className = "building";
      building.style.top = `${Math.random() * 80}vh`;
      building.style.left = `${Math.random() * 80}vw`;
      map.appendChild(building);
    }
  }
  
  function startDeliveryLoop() {
    const status = document.getElementById("deliveryStatus");
    const rider1 = document.getElementById("riderIcon1");
    const rider2 = document.getElementById("riderIcon2");
  
    const steps1 = [
      { top: "50px", left: "100px" },
      { top: "150px", left: "200px" },
      { top: "250px", left: "300px" },
      { top: "350px", left: "400px" },
      { top: "450px", left: "500px" },
    ];
  
    const steps2 = [
      { top: "100px", left: "120px" },
      { top: "200px", left: "250px" },
      { top: "300px", left: "400px" },
      { top: "400px", left: "550px" },
      { top: "500px", left: "700px" },
    ];
  
    status.textContent = "조리 중...";
    rider1.style.top = "50px";
    rider1.style.left = "30px";
    rider2.style.top = "100px";
    rider2.style.left = "60px";
  
    setTimeout(() => (status.textContent = "조리 완료!"), 3000);
  
    steps1.forEach((pos, i) => {
      setTimeout(() => {
        status.textContent = "배달 중...";
        rider1.style.top = pos.top;
        rider1.style.left = pos.left;
      }, 5000 + i * 3000);
    });
  
    steps2.forEach((pos, i) => {
      setTimeout(() => {
        rider2.style.top = pos.top;
        rider2.style.left = pos.left;
      }, 5000 + i * 3000);
    });
  
    setTimeout(() => {
      status.textContent = "배달 완료! 🍗";
    }, 20000);
  }


  function showSpeechBubble(riderId, messages) {
    const rider = document.getElementById(riderId);
    if (!rider) return;
  
    const bubble = document.createElement("div");
    bubble.className = "speech-bubble";
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    bubble.innerText = randomMessage;
  
    rider.parentElement.appendChild(bubble);
    const rect = rider.getBoundingClientRect();
    const parentRect = rider.parentElement.getBoundingClientRect();
  
    bubble.style.position = "absolute";
    bubble.style.left = `${rect.left - parentRect.left + rider.offsetWidth / 2 - 75}px`;
    bubble.style.top = `${rect.top - parentRect.top - 50}px`;
  
    setTimeout(() => {
      bubble.remove();
    }, 3000);
  }

  const rider1Messages = [
  "간성이가 배달갑니다!",
  "비키세요 아저씨!",
  "에헤이 뭐하는거야!",
  "치킨 떨어지면 니가 배상해!",
];

const rider2Messages = [
  "출발했어요 싸장님!",
  "싸장님 붕 떠요!",
  "영우출격이요!",
  "난폭하게 배달 중입니다!",
];

// 말풍선 테스트
setInterval(() => {
  showSpeechBubble("riderIcon1", rider1Messages);
  setTimeout(() => {
    showSpeechBubble("riderIcon2", rider2Messages);
  }, 1500);
}, 5000);
