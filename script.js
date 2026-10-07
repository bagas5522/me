/* ==========================================================================
   FoodieHub - Main Interactive Logic
   Features:
   - Dynamic Menu Render with Full Data
   - Real-time Category Filtering & Keyword Search
   - Sorting (Price Low-to-High, High-to-Low, Rating)
   - "Lihat Detail" Modal with Nutrition, Ingredients & Custom Options
   - Slide-over Shopping Cart with LocalStorage Persistence
   - Instant WhatsApp Order Generator
   - Toast Feedback System & Wishlist Toggle
   ========================================================================== */

// --- 1. DATASET MENU MAKANAN FOODIEHUB ---
const FOOD_MENU = [
  {
    id: 1,
    name: "Rendang Daging Istimewa",
    category: "makanan",
    categoryLabel: "Makanan Utama",
    price: 45000,
    rating: 4.9,
    reviews: "240+",
    image: "images/rendang.jpg",
    badge: "Terlaris 🔥",
    desc: "Daging sapi pilihan dimasak perlahan dengan santan kelapa murni dan rempah Minang autentik hingga empuk dan meresap sempurna.",
    fullDesc: "Rendang Daging Istimewa khas FoodieHub diolah dengan resep warisan Minangkabau selama lebih dari 6 jam. Menggunakan daging sapi paha depan tanpa lemak berlebih dan kelapa tua berkualitas tinggi, menghasilkan tekstur daging yang lumer di mulut dengan bumbu rendang hitam kemerahan yang gurih dan wangi rempah alami.",
    tags: ["Daging Sapi", "Khas Minang", "Halal 100%"],
    ingredients: ["Daging Sapi Pilihan", "Santan Kelapa Murni", "Cabai Merah Keriting", "Bawang Merah & Putih", "Lengkuas", "Serai", "Daun Kunyit", "Asam Kandis"],
    nutrition: { kalori: "380 kkal", protein: "28 g", lemak: "22 g", karbo: "12 g" },
    hasSpicyOption: true
  },
  {
    id: 2,
    name: "Nasi Goreng Seafood Spesial",
    category: "makanan",
    categoryLabel: "Makanan Utama",
    price: 35000,
    rating: 4.8,
    reviews: "195+",
    image: "images/nasi-goreng.jpg",
    badge: "Favorit Koki ⭐",
    desc: "Nasi goreng wangi bumbu terasi khas dengan udang bakar, cumi segar, sate ayam, dan telur mata sapi renyah.",
    fullDesc: "Sajian legendaris nasi goreng Nusantara dengan aroma smoky wajan besi panas (wok hei). Dilengkapi topping mewah udang windu bakar berlumur bumbu rempah, cumi kenyal, sate ayam bumbu kacang, acar segar, dan kerupuk udang renyah.",
    tags: ["Seafood", "Wok Hei", "Porsi Kenyang"],
    ingredients: ["Beras Pandan Wangi", "Udang Segar", "Cumi-cumi", "Telur Ayam Omega", "Sate Ayam Fillet", "Bawang Goreng", "Kerupuk Udang", "Sambal Terasi"],
    nutrition: { kalori: "520 kkal", protein: "25 g", lemak: "18 g", karbo: "62 g" },
    hasSpicyOption: true
  },
  {
    id: 3,
    name: "Sate Ayam Madura Premium",
    category: "makanan",
    categoryLabel: "Makanan Utama",
    price: 32000,
    rating: 4.9,
    reviews: "310+",
    image: "images/sate-ayam.jpg",
    badge: "Rekomendasi ✨",
    desc: "Daging paha ayam empuk dipanggang arang kelapa dengan saus kacang gurih kental dan siraman kecap manis harum.",
    fullDesc: "10 tusuk sate ayam potongan tebal dari daging paha segar yang dimarinasi bumbu ketumbar dan bawang putih. Dipanggang di atas arang batok kelapa hingga harum smokey, disajikan lengkap dengan bumbu kacang lembut gurih, irisan bawang merah, cabai rawit, serta lontong pulen.",
    tags: ["Ayam Bakar", "Saus Kacang", "Lontong"],
    ingredients: ["Fillet Paha Ayam", "Kacang Tanah Sangrai", "Kecap Manis Tradisional", "Bawang Merah", "Cabai Rawit", "Lontong Daun"],
    nutrition: { kalori: "410 kkal", protein: "32 g", lemak: "16 g", karbo: "35 g" },
    hasSpicyOption: true
  },
  {
    id: 4,
    name: "Crispy Chicken Burger",
    category: "camilan",
    categoryLabel: "Camilan & Snack",
    price: 38000,
    rating: 4.7,
    reviews: "145+",
    image: "images/burger.jpg",
    badge: "Menu Baru 🆕",
    desc: "Fillet ayam krispi keemasan, lelehan keju cheddar, selada segar, dan saus spesial FoodieHub di roti brioche panggang.",
    fullDesc: "Burger ayam krispi dengan daging dada ayam tebal berbumbu buttermilk yang digoreng hingga renyah maksimal di luar namun juicy di dalam. Diapit roti brioche lembut bermentega, keju cheddar meleleh, daun selada romaine segar, potongan tomat, dan saus smoky mayo rahasia koki kami.",
    tags: ["Crispy", "Brioche Bun", "Free Fries"],
    ingredients: ["Roti Brioche Mentega", "Ayam Buttermilk Crispy", "Keju Cheddar", "Selada Romaine", "Tomat Segar", "Saus Smoky Mayo", "Kentang Goreng"],
    nutrition: { kalori: "560 kkal", protein: "24 g", lemak: "27 g", karbo: "54 g" },
    hasSpicyOption: true
  },
  {
    id: 5,
    name: "Dimsum Mentai Platter",
    category: "camilan",
    categoryLabel: "Camilan & Snack",
    price: 30000,
    rating: 4.9,
    reviews: "215+",
    image: "images/dimsum.jpg",
    badge: "Viral 🔥",
    desc: "Siomay ayam udang kukus lembut dilapisi saus mentai gurih creamy yang ditorch wangi dengan taburan tobiko renyah.",
    fullDesc: "Platter berisi 6 pcs dimsum siomay daging ayam dan udang bertekstur padat lembut, disiram saus mentai gurih creamy bercita rasa khas Jepang, kemudian dibakar dengan teknik torch api langsung. Topping telur ikan tobiko memberikan sensasi meletup renyah di setiap gigitan.",
    tags: ["Dimsum", "Mentai Torch", "Topping Tobiko"],
    ingredients: ["Daging Ayam Halus", "Udang Kupas Segar", "Kulit Pangsit Khusus", "Saus Mentai Creamy", "Telur Ikan Tobiko", "Saus Chili Oil"],
    nutrition: { kalori: "310 kkal", protein: "19 g", lemak: "14 g", karbo: "22 g" },
    hasSpicyOption: true
  },
  {
    id: 6,
    name: "Mie Ayam Jamur Komplit",
    category: "makanan",
    categoryLabel: "Makanan Utama",
    price: 28000,
    rating: 4.8,
    reviews: "180+",
    image: "images/mie-ayam.jpg",
    badge: "Klasik 🍜",
    desc: "Mie kenyal buatan sendiri disajikan dengan tumisan ayam jamur gurih, pangsit kuah lembut, dan kaldu sapi kaya rasa.",
    fullDesc: "Mie telur kenyal tanpa bahan pengawet dengan bumbu minyak wijen dan kaldu gurih. Disajikan dengan potongan ayam jamur kancing manis gurih, pangsit rebus lembut, pangsit goreng garing, sawi hijau segar, dan mangkuk terpisah kuah kaldu sapi kaya rasa.",
    tags: ["Mie Kenyal", "Pangsit Komplit", "Kaldu Gurih"],
    ingredients: ["Mie Telur Homemade", "Daging Ayam Kecap", "Jamur Kancing", "Pangsit Rebus & Goreng", "Sawi Hijau", "Minyak Bawang Wijen"],
    nutrition: { kalori: "450 kkal", protein: "21 g", lemak: "15 g", karbo: "58 g" },
    hasSpicyOption: true
  },
  {
    id: 7,
    name: "Es Teh Lemongrass Mint",
    category: "minuman",
    categoryLabel: "Minuman Segar",
    price: 15000,
    rating: 4.8,
    reviews: "95+",
    image: "images/es-teh.jpg",
    badge: "Segar ❄️",
    desc: "Teh melati dingin diseduh segar dengan sirup sereh wangi, perasan lemon asli, dan daun mint yang menyejukkan dahaga.",
    fullDesc: "Minuman pelepas dahaga yang menyehatkan dan harum alami. Perpaduan daun teh melati pilihan yang diseduh dingin, rebusan batang serai organik, irisan lemon segar, daun mint aromatik, dan gula tebu murni dengan tingkat manis yang pas.",
    tags: ["Herbal Segar", "Lemon Asli", "Dingin Segar"],
    ingredients: ["Daun Teh Melati", "Batang Serai Alami", "Lemon Organik", "Daun Mint Segar", "Gula Tebu Cair", "Es Kristal"],
    nutrition: { kalori: "75 kkal", protein: "0 g", lemak: "0 g", karbo: "18 g" },
    hasSpicyOption: false
  },
  {
    id: 8,
    name: "Matcha Berry Boba Latte",
    category: "minuman",
    categoryLabel: "Minuman Segar",
    price: 25000,
    rating: 4.9,
    reviews: "130+",
    image: "images/matcha-boba.jpg",
    badge: "Best Seller 🧋",
    desc: "Bubuk matcha Uji Jepang premium dipadukan susu segar creamy, puree stroberi manis, dan boba kenyal brown sugar.",
    fullDesc: "Kombinasi estetik 3 lapis minuman: puree stroberi manis asam alami di bagian dasar, susu sapi segar creamy di bagian tengah, dan foam matcha Uji Kyoto premium di bagian atas. Dilengkapi topping boba tapioka kenyal yang dimasak bersama brown sugar karamel.",
    tags: ["Matcha Kyoto", "Susu Segar", "Boba Chewy"],
    ingredients: ["Matcha Powder Uji Jepang", "Susu Sapi Segar (Fresh Milk)", "Boba Tapioka Brown Sugar", "Puree Stroberi Asli", "Sea Salt Cream"],
    nutrition: { kalori: "220 kkal", protein: "5 g", lemak: "6 g", karbo: "38 g" },
    hasSpicyOption: false
  },
  {
    id: 9,
    name: "Choco Lava with Ice Cream",
    category: "penutup",
    categoryLabel: "Dessert Penutup",
    price: 30000,
    rating: 5.0,
    reviews: "175+",
    image: "images/choco-lava.jpg",
    badge: "Manis Legit 🍰",
    desc: "Kue cokelat panggang hangat dengan lelehan cokelat Belgia pekat di tengahnya, disajikan dengan es krim vanilla Prancis.",
    fullDesc: "Dessert penutup primadona para penikmat manis. Kue cokelat lembut yang dipanggang segar saat dipesan, menghadirkan lelehan lava cokelat couverture Belgia hangat yang melimpah ketika dipotong. Disajikan kontras bersama satu scoop es krim vanilla Prancis yang creamy dan dingin.",
    tags: ["Cokelat Belgia", "Es Krim Vanilla", "Melted Lava"],
    ingredients: ["Dark Chocolate Belgia 70%", "Mentega Anchor", "Tepung Gandum Halus", "Telur Segar", "Es Krim Madagaskar Vanilla", "Gula Halus"],
    nutrition: { kalori: "390 kkal", protein: "6 g", lemak: "22 g", karbo: "42 g" },
    hasSpicyOption: false
  }
];

// --- 2. GLOBAL APPLICATION STATE ---
let currentCategory = "all";
let searchQuery = "";
let currentSort = "default";
let cart = [];
let wishlist = new Set();
let activeModalItem = null;
let modalQuantity = 1;

// --- 3. DOM ELEMENTS ---
const menuGrid = document.getElementById("menu-grid");
const menuEmptyState = document.getElementById("menu-empty-state");
const resetFilterBtn = document.getElementById("reset-filter-btn");
const categoryFilters = document.getElementById("category-filters");
const heroSearchInput = document.getElementById("hero-search-input");
const heroSearchBtn = document.getElementById("hero-search-btn");
const menuSearchFilter = document.getElementById("menu-search-filter");
const clearSearchBtn = document.getElementById("clear-search-btn");
const menuSortSelect = document.getElementById("menu-sort-select");
const searchTrigger = document.getElementById("search-trigger");

// Modal Elements
const detailModal = document.getElementById("detail-modal");
const closeDetailModalBtn = document.getElementById("close-detail-modal");
const modalFoodImg = document.getElementById("modal-food-img");
const modalFoodBadge = document.getElementById("modal-food-badge");
const modalFoodCategory = document.getElementById("modal-food-category");
const modalFoodRating = document.getElementById("modal-food-rating");
const modalFoodTitle = document.getElementById("modal-food-title");
const modalFoodPrice = document.getElementById("modal-food-price");
const modalFoodDesc = document.getElementById("modal-food-desc");
const modalFoodIngredients = document.getElementById("modal-food-ingredients");
const nutriKalori = document.getElementById("nutri-kalori");
const nutriProtein = document.getElementById("nutri-protein");
const nutriLemak = document.getElementById("nutri-lemak");
const nutriKarbo = document.getElementById("nutri-karbo");
const portionSelect = document.getElementById("portion-select");
const spicySelect = document.getElementById("spicy-select");
const spicyLevelGroup = document.getElementById("spicy-level-group");
const modalItemNote = document.getElementById("modal-item-note");
const modalQtyMinus = document.getElementById("modal-qty-minus");
const modalQtyPlus = document.getElementById("modal-qty-plus");
const modalQtyVal = document.getElementById("modal-qty-val");
const modalTotalPrice = document.getElementById("modal-total-price");
const modalAddCartBtn = document.getElementById("modal-add-cart-btn");
const modalDirectOrderBtn = document.getElementById("modal-direct-order-btn");

// Cart Drawer Elements
const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartDrawerOverlay = document.getElementById("cart-drawer-overlay");
const cartCounter = document.getElementById("cart-counter");
const cartDrawerCount = document.getElementById("cart-drawer-count");
const cartEmptyView = document.getElementById("cart-empty-view");
const cartItemsList = document.getElementById("cart-items-list");
const cartFooter = document.getElementById("cart-footer");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartShipping = document.getElementById("cart-shipping");
const cartTotal = document.getElementById("cart-total");
const cartBrowseMenuBtn = document.getElementById("cart-browse-menu-btn");
const checkoutBtn = document.getElementById("checkout-btn");

// Checkout Modal Elements
const checkoutModal = document.getElementById("checkout-modal");
const closeCheckoutModalBtn = document.getElementById("close-checkout-modal");
const checkoutSummaryBox = document.getElementById("checkout-summary-box");
const checkoutForm = document.getElementById("checkout-form");

// Mobile Drawer Elements
const mobileToggle = document.getElementById("mobile-toggle");
const mobileDrawer = document.getElementById("mobile-drawer");
const mobileOverlay = document.getElementById("mobile-overlay");
const closeDrawerBtn = document.getElementById("close-drawer");
const mobileOrderBtn = document.getElementById("mobile-order-btn");

// Toast Container
const toastContainer = document.getElementById("toast-container");

// Forms
const contactForm = document.getElementById("contact-form");
const newsletterForm = document.getElementById("newsletter-form");

// --- 4. HELPER FUNCTIONS ---
function formatRupiah(num) {
  return "Rp " + num.toLocaleString("id-ID");
}

function showToast(message, icon = "fa-solid fa-circle-check") {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <i class="${icon} toast-icon"></i>
    <span class="toast-message">${message}</span>
  `;
  toastContainer.appendChild(toast);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

// --- 5. RENDER MENU ITEMS ---
function renderMenu() {
  let filtered = FOOD_MENU.filter(item => {
    const matchCategory = (currentCategory === "all") || (item.category === currentCategory);
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  // Sorting
  if (currentSort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Clear Grid
  menuGrid.innerHTML = "";

  if (filtered.length === 0) {
    menuEmptyState.style.display = "block";
    return;
  } else {
    menuEmptyState.style.display = "none";
  }

  // Render cards
  filtered.forEach(item => {
    const isWished = wishlist.has(item.id);
    const card = document.createElement("article");
    card.className = "menu-card";
    card.setAttribute("data-id", item.id);
    card.setAttribute("data-category", item.category);

    card.innerHTML = `
      <div class="card-image-box">
        <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy">
        <span class="card-badge-category">${item.categoryLabel}</span>
        <button class="card-wishlist-btn ${isWished ? 'active' : ''}" 
                title="${isWished ? 'Hapus Favorit' : 'Simpan ke Favorit'}" 
                onclick="toggleWishlist(${item.id}, event)">
          <i class="${isWished ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
        </button>
        <div class="card-rating-badge">
          <i class="fa-solid fa-star text-gold"></i>
          <span>${item.rating} (${item.reviews})</span>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.desc}</p>
        <div class="card-tags">
          <span class="tag-item">${item.badge}</span>
          ${item.tags.map(t => `<span class="tag-item">${t}</span>`).join("")}
        </div>
        <div class="card-footer">
          <div class="card-price-box">
            <span class="price-label">Harga</span>
            <span class="card-price">${formatRupiah(item.price)}</span>
          </div>
          <div class="card-actions">
            <!-- TOMBOL LIHAT DETAIL (Requested in prompt) -->
            <button class="btn btn-view-detail" onclick="openDetailModal(${item.id})">
              <span>Lihat Detail</span>
            </button>
            <button class="btn-quick-add" title="Tambah Cepat" onclick="quickAddToCart(${item.id}, event)">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    menuGrid.appendChild(card);
  });
}

// --- 6. CATEGORY FILTER & SEARCH HANDLERS ---
function setCategory(category) {
  currentCategory = category;
  document.querySelectorAll(".category-pill").forEach(pill => {
    if (pill.getAttribute("data-category") === category) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });
  renderMenu();
}

window.filterByCategory = function(cat) {
  setCategory(cat);
  const menuElem = document.getElementById("menu");
  if (menuElem) {
    menuElem.scrollIntoView({ behavior: "smooth" });
  }
};

categoryFilters.addEventListener("click", (e) => {
  const pill = e.target.closest(".category-pill");
  if (!pill) return;
  const category = pill.getAttribute("data-category");
  setCategory(category);
});

// Hero search handler
heroSearchBtn.addEventListener("click", () => {
  const query = heroSearchInput.value.trim();
  searchQuery = query;
  menuSearchFilter.value = query;
  clearSearchBtn.style.display = query ? "block" : "none";
  renderMenu();
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
});

heroSearchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    heroSearchBtn.click();
  }
});

// Menu in-line search
menuSearchFilter.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  clearSearchBtn.style.display = searchQuery ? "block" : "none";
  renderMenu();
});

clearSearchBtn.addEventListener("click", () => {
  menuSearchFilter.value = "";
  searchQuery = "";
  clearSearchBtn.style.display = "none";
  renderMenu();
});

// Reset filter button in empty state
resetFilterBtn.addEventListener("click", () => {
  currentCategory = "all";
  searchQuery = "";
  menuSearchFilter.value = "";
  heroSearchInput.value = "";
  clearSearchBtn.style.display = "none";
  setCategory("all");
});

// Menu sort select
menuSortSelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  renderMenu();
});

// Header search icon trigger
searchTrigger.addEventListener("click", () => {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    menuSearchFilter.focus();
  }, 400);
});

// --- 7. WISHLIST TOGGLE ---
window.toggleWishlist = function(id, event) {
  event.stopPropagation();
  const item = FOOD_MENU.find(f => f.id === id);
  if (!item) return;

  if (wishlist.has(id)) {
    wishlist.delete(id);
    showToast(`${item.name} dihapus dari favorit`, "fa-regular fa-heart");
  } else {
    wishlist.add(id);
    showToast(`${item.name} disimpan ke favorit!`, "fa-solid fa-heart text-red");
  }
  renderMenu();
};

// --- 8. MODAL LIHAT DETAIL LOGIC ---
window.openDetailModal = function(id) {
  const item = FOOD_MENU.find(f => f.id === id);
  if (!item) return;

  activeModalItem = item;
  modalQuantity = 1;

  // Fill in content
  modalFoodImg.src = item.image;
  modalFoodImg.alt = item.name;
  modalFoodBadge.textContent = item.badge;
  modalFoodCategory.textContent = item.categoryLabel;
  modalFoodRating.innerHTML = `<i class="fa-solid fa-star text-gold"></i> ${item.rating} (${item.reviews} Ulasan)`;
  modalFoodTitle.textContent = item.name;
  modalFoodPrice.textContent = formatRupiah(item.price);
  modalFoodDesc.textContent = item.fullDesc;

  // Nutrition
  nutriKalori.textContent = item.nutrition.kalori;
  nutriProtein.textContent = item.nutrition.protein;
  nutriLemak.textContent = item.nutrition.lemak;
  nutriKarbo.textContent = item.nutrition.karbo;

  // Ingredients
  modalFoodIngredients.innerHTML = item.ingredients
    .map(ing => `<span class="ingred-tag">${ing}</span>`)
    .join("");

  // Spicy option visibility
  if (item.hasSpicyOption) {
    spicyLevelGroup.style.display = "block";
  } else {
    spicyLevelGroup.style.display = "none";
  }

  // Reset portion and spicy dropdowns
  portionSelect.value = "reguler";
  spicySelect.value = "sedang";
  modalItemNote.value = "";
  modalQtyVal.textContent = modalQuantity;

  updateModalPrice();

  // Show modal
  detailModal.classList.add("open");
  detailModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

function closeDetailModal() {
  detailModal.classList.remove("open");
  detailModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeModalItem = null;
}

closeDetailModalBtn.addEventListener("click", closeDetailModal);
detailModal.addEventListener("click", (e) => {
  if (e.target === detailModal) {
    closeDetailModal();
  }
});

function updateModalPrice() {
  if (!activeModalItem) return;
  const portionExtra = portionSelect.value === "jumbo" ? 10000 : 0;
  const singlePrice = activeModalItem.price + portionExtra;
  const total = singlePrice * modalQuantity;
  modalTotalPrice.textContent = formatRupiah(total);
}

portionSelect.addEventListener("change", updateModalPrice);

modalQtyMinus.addEventListener("click", () => {
  if (modalQuantity > 1) {
    modalQuantity--;
    modalQtyVal.textContent = modalQuantity;
    updateModalPrice();
  }
});

modalQtyPlus.addEventListener("click", () => {
  if (modalQuantity < 99) {
    modalQuantity++;
    modalQtyVal.textContent = modalQuantity;
    updateModalPrice();
  }
});

// Modal "Tambah ke Keranjang"
modalAddCartBtn.addEventListener("click", () => {
  if (!activeModalItem) return;
  const portion = portionSelect.value === "jumbo" ? "Jumbo (+Rp 10.000)" : "Reguler";
  const portionExtra = portionSelect.value === "jumbo" ? 10000 : 0;
  const spicy = activeModalItem.hasSpicyOption ? spicySelect.value : "-";
  const note = modalItemNote.value.trim();

  addItemToCart(activeModalItem, modalQuantity, portion, portionExtra, spicy, note);
  closeDetailModal();
  openCartDrawer();
  showToast(`${activeModalItem.name} (${modalQuantity}x) masuk ke keranjang!`);
});

// Modal "Pesan Sekarang Langsung via WhatsApp"
modalDirectOrderBtn.addEventListener("click", () => {
  if (!activeModalItem) return;
  const portion = portionSelect.value === "jumbo" ? "Jumbo" : "Reguler";
  const portionExtra = portionSelect.value === "jumbo" ? 10000 : 0;
  const total = (activeModalItem.price + portionExtra) * modalQuantity;
  const spicy = activeModalItem.hasSpicyOption ? spicySelect.options[spicySelect.selectedIndex].text : "-";
  const note = modalItemNote.value.trim() || "Tidak ada";

  const message = `Halo FoodieHub! Saya ingin memesan langsung:
- *Menu:* ${activeModalItem.name}
- *Jumlah:* ${modalQuantity} porsi
- *Porsi:* ${portion}
- *Level Pedas:* ${spicy}
- *Catatan:* ${note}
- *Total:* ${formatRupiah(total)}

Mohon konfirmasi pesanan dan estimasi pengiriman ya. Terima kasih!`;

  const waUrl = `https://api.whatsapp.com/send?phone=6281234567890&text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");
});

// --- 9. SHOPPING CART SYSTEM ---
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("foodiehub_cart");
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (err) {
    cart = [];
  }
}

function saveCartToStorage() {
  localStorage.setItem("foodiehub_cart", JSON.stringify(cart));
}

function addItemToCart(item, quantity = 1, portion = "Reguler", portionExtra = 0, spicy = "-", note = "") {
  const cartKey = `${item.id}-${portion}-${spicy}`;
  const existing = cart.find(c => c.cartKey === cartKey);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      cartKey,
      id: item.id,
      name: item.name,
      image: item.image,
      basePrice: item.price,
      portionExtra,
      unitPrice: item.price + portionExtra,
      portion,
      spicy,
      note,
      quantity
    });
  }

  saveCartToStorage();
  updateCartUI();
}

window.quickAddToCart = function(id, event) {
  event.stopPropagation();
  const item = FOOD_MENU.find(f => f.id === id);
  if (!item) return;

  addItemToCart(item, 1, "Reguler", 0, "sedang", "");
  showToast(`${item.name} berhasil ditambahkan!`);
};

function updateCartUI() {
  const totalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  cartCounter.textContent = totalCount;
  cartDrawerCount.textContent = `(${totalCount})`;

  if (cart.length === 0) {
    cartEmptyView.style.display = "block";
    cartItemsList.style.display = "none";
    cartFooter.style.display = "none";
    return;
  }

  cartEmptyView.style.display = "none";
  cartItemsList.style.display = "flex";
  cartFooter.style.display = "block";

  // Render cart items
  cartItemsList.innerHTML = cart.map((item, index) => {
    return `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-subtext">${item.portion}${item.spicy !== '-' ? ' • ' + item.spicy : ''}</span>
          <span class="cart-item-price">${formatRupiah(item.unitPrice * item.quantity)}</span>
          <div class="cart-item-qty">
            <button class="cart-qty-btn" onclick="updateCartItemQty(${index}, -1)">-</button>
            <span class="cart-qty-num">${item.quantity}</span>
            <button class="cart-qty-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove-btn" title="Hapus" onclick="removeCartItem(${index})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  }).join("");

  // Subtotal calculation
  const subtotal = cart.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0);
  const shipping = subtotal >= 50000 || subtotal === 0 ? 0 : 10000;
  const total = subtotal + shipping;

  cartSubtotal.textContent = formatRupiah(subtotal);
  cartShipping.textContent = shipping === 0 ? "GRATIS" : formatRupiah(shipping);
  cartTotal.textContent = formatRupiah(total);
}

window.updateCartItemQty = function(index, delta) {
  if (!cart[index]) return;
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCartToStorage();
  updateCartUI();
};

window.removeCartItem = function(index) {
  if (!cart[index]) return;
  const removedName = cart[index].name;
  cart.splice(index, 1);
  saveCartToStorage();
  updateCartUI();
  showToast(`${removedName} dihapus dari keranjang`, "fa-solid fa-trash-can");
};

// Cart drawer controls
function openCartDrawer() {
  cartDrawer.classList.add("open");
  cartDrawerOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartDrawerOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

openCartBtn.addEventListener("click", openCartDrawer);
closeCartBtn.addEventListener("click", closeCartDrawer);
cartDrawerOverlay.addEventListener("click", closeCartDrawer);
cartBrowseMenuBtn.addEventListener("click", () => {
  closeCartDrawer();
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
});

// --- 10. CHECKOUT MODAL & ORDER PROCESS ---
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;
  closeCartDrawer();

  // Populate checkout summary
  const subtotal = cart.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0);
  const shipping = subtotal >= 50000 ? 0 : 10000;
  const total = subtotal + shipping;

  checkoutSummaryBox.innerHTML = `
    <div style="font-weight: 700; margin-bottom: 8px;">Ringkasan Pesanan (${cart.length} Jenis Hidangan):</div>
    ${cart.map(c => `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: #58606E;">
        <span>${c.quantity}x ${c.name} (${c.portion})</span>
        <span>${formatRupiah(c.unitPrice * c.quantity)}</span>
      </div>
    `).join("")}
    <hr style="margin: 10px 0; border: none; border-top: 1px dashed #D5CEBF;">
    <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1rem; color: #191E24;">
      <span>Total Akhir:</span>
      <span class="text-primary">${formatRupiah(total)}</span>
    </div>
  `;

  checkoutModal.classList.add("open");
  checkoutModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
});

function closeCheckoutModal() {
  checkoutModal.classList.remove("open");
  checkoutModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

closeCheckoutModalBtn.addEventListener("click", closeCheckoutModal);
checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) {
    closeCheckoutModal();
  }
});

// Submit checkout form
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("order-name").value.trim();
  const phone = document.getElementById("order-whatsapp").value.trim();
  const address = document.getElementById("order-address").value.trim();
  const payment = document.getElementById("order-payment").value;

  const subtotal = cart.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0);
  const shipping = subtotal >= 50000 ? 0 : 10000;
  const total = subtotal + shipping;

  const orderListText = cart.map((c, i) => 
    `${i + 1}. ${c.name} x${c.quantity} (${c.portion}${c.spicy !== '-' ? ', ' + c.spicy : ''}) = ${formatRupiah(c.unitPrice * c.quantity)}`
  ).join("\n");

  const waMessage = `*PESANAN BARU FOODIEHUB* 🍽️
-----------------------------------
*Data Pelanggan:*
• Nama: ${name}
• WhatsApp: ${phone}
• Alamat: ${address}
• Pembayaran: ${payment}

*Daftar Menu:*
${orderListText}

-----------------------------------
• Subtotal: ${formatRupiah(subtotal)}
• Ongkir: ${shipping === 0 ? 'GRATIS' : formatRupiah(shipping)}
• *TOTAL AKHIR:* ${formatRupiah(total)}
-----------------------------------
Mohon segera dikonfirmasi dan diproses ya koki FoodieHub! Terima kasih.`;

  const waUrl = `https://api.whatsapp.com/send?phone=6281234567890&text=${encodeURIComponent(waMessage)}`;

  // Clear Cart
  cart = [];
  saveCartToStorage();
  updateCartUI();
  closeCheckoutModal();

  showToast("Pesanan berhasil dibuat! Membuka WhatsApp...", "fa-brands fa-whatsapp");
  window.open(waUrl, "_blank");
});

// --- 11. CONTACT & NEWSLETTER FORMS ---
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = document.getElementById("contact-submit-btn");
  const originalText = btn.innerHTML;

  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Mengirim...</span>`;
  btn.disabled = true;

  setTimeout(() => {
    showToast("Terima kasih! Pesan Anda telah kami terima.", "fa-solid fa-paper-plane");
    contactForm.reset();
    btn.innerHTML = originalText;
    btn.disabled = false;
  }, 1000);
});

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("newsletter-email");
  const email = emailInput.value.trim();
  if (email) {
    showToast("Voucher diskon 30% telah dikirim ke email Anda!", "fa-solid fa-gift");
    emailInput.value = "";
  }
});

// --- 12. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHT ---
window.addEventListener("scroll", () => {
  const header = document.getElementById("navbar");
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Active section spy
  const sections = document.querySelectorAll("main section[id]");
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
});

// --- 13. MOBILE DRAWER NAVIGATION ---
mobileToggle.addEventListener("click", () => {
  mobileDrawer.classList.add("open");
  mobileOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
});

function closeMobileDrawer() {
  mobileDrawer.classList.remove("open");
  mobileOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

closeDrawerBtn.addEventListener("click", closeMobileDrawer);
mobileOverlay.addEventListener("click", closeMobileDrawer);

document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", closeMobileDrawer);
});

mobileOrderBtn.addEventListener("click", closeMobileDrawer);

// --- 14. KEYBOARD ESCAPE LISTENER ---
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (detailModal.classList.contains("open")) closeDetailModal();
    if (cartDrawer.classList.contains("open")) closeCartDrawer();
    if (checkoutModal.classList.contains("open")) closeCheckoutModal();
    if (mobileDrawer.classList.contains("open")) closeMobileDrawer();
  }
});

// --- 15. INITIALIZATION ON DOM READY ---
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  renderMenu();
  updateCartUI();
});
