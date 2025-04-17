// Menu data
const menuItems = [
  {
    name: "강간닭강정",
    description: "간강정 닭간정 간성대표님의 자부심 닭간정",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "간성이의 양념치킨",
    description: "특제 양념간성소스로 맛을 낸 대표 메뉴",
    price: 19000,
    image:
      "https://images.unsplash.com/photo-1575932444877-5106bee2a599?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "간성이의 핵매운 마늘치킨",
    description: "간성이가 급식실에서 뽀려온 특별한 치킨",
    price: 19000,
    image:
      "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "대표님이 미쳤어요 간성치킨 스페셜",
    description: "비밀 레시피로 만든 프리미엄 치킨",
    price: 21000,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80",
  },
];

// Locations data
const locations = [
  {
    name: "간성치킨 강남점",
    address: "서울 강남구 테헤란로 123",
    phone: "02-1234-5678",
  },
  {
    name: "간성치킨 홍대점",
    address: "서울 마포구 홍대로 456",
    phone: "02-2345-6789",
  },
  {
    name: "간성치킨 부산점",
    address: "부산 해운대구 해운대로 789",
    phone: "051-345-6789",
  },
];

// Initialize AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    once: true,
  });

  // Initialize menu
  populateMenu();

  // Initialize locations
  populateLocations();

  // Setup mobile menu
  setupMobileMenu();

  // Setup franchise form
  setupFranchiseForm();
});

// Mobile menu toggle
function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Populate menu items
function populateMenu() {
  const menuGrid = document.getElementById("menuGrid");
  menuItems.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.className = "menu-item";
    menuItem.setAttribute("data-aos", "fade-up");

    menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">${item.price.toLocaleString()}원</p>
            </div>
        `;

    menuGrid.appendChild(menuItem);
  });
}

// Populate locations
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
            <p><i class="fas fa-phone"></i> ${location.phone}</p>
        `;

    locationList.appendChild(locationItem);
  });
}

// Search locations
function searchLocations() {
  const searchInput = document
    .getElementById("locationSearch")
    .value.toLowerCase();
  const locationList = document.getElementById("locationList");
  locationList.innerHTML = "";

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchInput) ||
      location.address.toLowerCase().includes(searchInput)
  );

  filteredLocations.forEach((location) => {
    const locationItem = document.createElement("div");
    locationItem.className = "location-item";
    locationItem.setAttribute("data-aos", "fade-up");

    locationItem.innerHTML = `
            <h3>${location.name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${location.address}</p>
            <p><i class="fas fa-phone"></i> ${location.phone}</p>
        `;

    locationList.appendChild(locationItem);
  });
}

// Setup franchise form
function setupFranchiseForm() {
  const form = document.getElementById("franchiseForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      location: document.getElementById("location").value,
      message: document.getElementById("message").value,
    };

    // Here you would typically send the data to a server
    alert("창업 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
    form.reset();
  });
}

// Handle ordering
function startOrder(type) {
  if (type === "delivery") {
    alert("배달 주문 시스템이 곧 오픈됩니다!");
  } else {
    alert("포장 주문 시스템이 곧 오픈됩니다!");
  }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

function openOrderModal() {
  document.getElementById("orderModal").style.display = "flex";
}

function startOrder(type) {
  const mapContainer = document.getElementById("customMapContainer");
  const deliveryStatus = document.getElementById("deliveryStatus");

  if (type === "delivery") {
    mapContainer.style.display = "block";
    deliveryStatus.textContent = "배달 시작!";

    const rider = document.getElementById("riderIcon");
    rider.style.left = "10px"; // 초기 위치 리셋

    // 배달 시작 애니메이션
    setTimeout(() => {
      deliveryStatus.textContent = "배달 중...";
      rider.style.left = "calc(100% - 70px)";
    }, 500);

    // 도착 후 상태 업데이트
    setTimeout(() => {
      deliveryStatus.textContent = "배달 완료! 맛있게 드세요 🐔";
    }, 4500);
  } else {
    alert("포장 주문 시스템이 곧 오픈됩니다!");
  }
}
