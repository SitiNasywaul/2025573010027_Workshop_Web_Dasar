const products = [
  {
    id: 1,
    name: "Lip Tint",
    price: 10000,
    img: "https://i.pinimg.com/736x/7c/de/2b/7cde2b8dea3ffd9dc6dff7b1440c2b77.jpg",
  },
  {
    id: 2,
    name: "Perfume",
    price: 15000,
    img: "https://i.pinimg.com/736x/41/4e/3e/414e3eb9f1d6bc88ba5a7144a68bfb75.jpg",
  },
  {
    id: 3,
    name: "Blush",
    price: 20000,
    img: "https://i.pinimg.com/control1/1200x/03/6d/f3/036df35ea7365270d3370044cf75ca5f.jpg",
  },
  {
    id: 4,
    name: "Skincare",
    price: 25000,
    img: "https://i.pinimg.com/1200x/d3/ac/44/d3ac44d01d1bcc61249d77a69e149355.jpg",
  },
  {
    id: 5,
    name: "Make Up",
    price: 30000,
    img: "https://i.pinimg.com/736x/ea/42/1a/ea421a2d0d3e19f21f87256e31f92a10.jpg",
  },
  {
    id: 6,
    name: "Lotion",
    price: 18000,
    img: "https://i.pinimg.com/1200x/28/39/8a/28398a847744bdb7ef4a1f145ee0849d.jpg",
  },
];

let cart = [];

const productContainer = document.getElementById("products");
const cartContainer = document.getElementById("cartItems");
const totalEl = document.getElementById("total");
const countEl = document.getElementById("count");

/* ANIMASI TERBANG */
function flyToCart(imgEl) {
  const cartIcon = document.querySelector(".cart-icon");

  const imgRect = imgEl.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  const clone = imgEl.cloneNode(true);
  clone.classList.add("fly-img");

  clone.style.top = imgRect.top + "px";
  clone.style.left = imgRect.left + "px";
  clone.style.width = imgRect.width + "px";
  clone.style.height = imgRect.height + "px";

  document.body.appendChild(clone);

  setTimeout(() => {
    clone.style.top = cartRect.top + "px";
    clone.style.left = cartRect.left + "px";
    clone.style.width = "20px";
    clone.style.height = "20px";
    clone.style.opacity = "0.5";
  }, 10);

  setTimeout(() => clone.remove(), 700);
}

/* RENDER PRODUK */
function renderProducts() {
  productContainer.innerHTML = products
    .map(
      (p) => `
    <div class="card">
      <img src="${p.img}">
      <h4>${p.name}</h4>
      <p>Rp ${p.price}</p>
      <button data-id="${p.id}">+ Keranjang</button>
    </div>
  `,
    )
    .join("");
}

/* TAMBAH KE CART */
productContainer.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const card = e.target.closest(".card");
  const img = card.querySelector("img");

  flyToCart(img);

  const id = Number(e.target.dataset.id);
  const item = cart.find((i) => i.id === id);

  if (item) item.qty++;
  else {
    const product = products.find((p) => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
});

/* RENDER CART */
function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;
    count += item.qty;

    cartContainer.innerHTML += `
      <div class="cart-item">
        ${item.name} x${item.qty} - Rp ${item.price * item.qty}
        <br>
        <button class="plus" data-id="${item.id}">+</button>
        <button class="minus" data-id="${item.id}">-</button>
        <button class="remove" data-id="${item.id}">🗑</button>
      </div>
    `;
  });

  totalEl.textContent = total;
  countEl.textContent = count;
}

/* CONTROL CART */
cartContainer.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  if (e.target.classList.contains("plus")) item.qty++;
  if (e.target.classList.contains("minus")) item.qty--;
  if (e.target.classList.contains("remove")) {
    cart = cart.filter((i) => i.id !== id);
  }

  cart = cart.filter((i) => i.qty > 0);
  renderCart();
});

/* CHECKOUT */
document.getElementById("checkout").addEventListener("click", () => {
  if (!cart.length) return alert("Keranjang kosong 😢");

  let text = "💖 Order kamu:\n\n";
  cart.forEach((i) => {
    text += `${i.name} x${i.qty} = Rp ${i.price * i.qty}\n`;
  });

  text += `\nTotal: Rp ${totalEl.textContent}`;
  alert(text);
});

/* INIT */
renderProducts();
