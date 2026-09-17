// Dados dos produtos
const products = [
    { id: 1, name: "Pão de Hambúrguer com Gergelim", price: 19.00, category: "hamburger", imgSrc: "hamburguer.jpg", description: "Pacote com 10 unidades, macio e com gergelim." },
    { id: 2, name: "Pão Australiano", price: 21.00, category: "hamburger", imgSrc: "australiano.jpg", description: "Pacote com 10 unidades. Por encomenda." },
    { id: 3, name: "Pão Brioche", price: 21.00, category: "hamburger", imgSrc: "brioche.jpg", description: "Pacote com 10 unidades. Por encomenda." },
    { id: 4, name: "Pão de Kachurrasco", price: 9.00, category: "especiais", imgSrc: "kachurrasco.jpg", description: "Pacote com 5 unidades, tamanho 20cm. Por encomenda." },
    { id: 5, name: "Pão de Baguete", price: 10.00, category: "especiais", imgSrc: "baguete.jpg", description: "Pacote com 5 unidades, tamanho 28cm. Por encomenda." },
    { id: 6, name: "Pão de Xis 15cm", price: 9.00, category: "xis", imgSrc: "xis.jpg", description: "Pacote com 5 unidades." },
    { id: 7, name: "Pão de Xis 17cm", price: 9.00, category: "xis", imgSrc: "xis.jpg", description: "Pacote com 5 unidades." },
    { id: 8, name: "Pão de Xis 18cm", price: 9.00, category: "xis", imgSrc: "xis.jpg", description: "Pacote com 4 unidades." },
    { id: 9, name: "Pão de Bauru", price: 10.00, category: "especiais", imgSrc: "bauru.jpg", description: "Pacote com 5 unidades. Por encomenda." },
    { id: 10, name: "Doguinho 12cm", price: 13.00, category: "hotdog", imgSrc: "doguinho.jpg", description: "Pacote com 10 unidades, 50g. Por encomenda." },
    { id: 11, name: "Pão de Hot Dog 18cm", price: 14.00, category: "hotdog", imgSrc: "dog.jpg", description: "Pacote com 8 unidades, 80g." },
    { id: 12, name: "Pão de Hot Dog 22cm", price: 18.00, category: "hotdog", imgSrc: "dog.jpg", description: "Pacote com 10 unidades, 100g." },
    { id: 13, name: "Pão de Hot Dog 23cm", price: 11.00, category: "hotdog", imgSrc: "dog.jpg", description: "Pacote com 6 unidades, 120g." },
    { id: 14, name: "Pão de Cachorrinho de Festa", price: 40.00, category: "hotdog", imgSrc: "cachorrinho.jpg", description: "Pacote com 50 unidades, mini tamanho para festas. Por encomenda." },
    { id: 15, name: "Pão de Mini Hambúrguer", price: 45.00, category: "hamburger", imgSrc: "miniham.jpg", description: "Pacote com 50 unidades, para hambúrgueres de festa. Por encomenda." },
    { id: 16, name: "Pão de Forma", price: 12.00, category: "especiais", imgSrc: "forma.jpg", description: "Pacote fatiado, ideal para sanduíches naturais." },
    { id: 17, name: "Gelo 10Kg", price: 17.00, category: "especiais", imgSrc: "gelo.jpg", description: "Pacote 10Kg." },
];

let cart = [];

function formatPrice(price) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ---------- Renderização de produtos ----------

function renderProducts(list) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    const categoryLabels = {
        hamburger: 'Hambúrguer',
        xis: 'Xis',
        hotdog: 'Hot Dog',
        especiais: 'Especiais'
    };

    list.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-photo">
                <img src="${product.imgSrc}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-body">
                <div class="product-cat">${categoryLabels[product.category] || ''}</div>
                <h3>${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-foot">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="add-to-cart-btn" data-id="${product.id}">Adicionar</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id)));
    });
}

function filterProducts(category) {
    const filtered = category === 'todos' ? products : products.filter(p => p.category === category);
    renderProducts(filtered);
}

// ---------- Carrinho ----------

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, imgSrc: product.imgSrc, quantity: 1 });
    }

    updateCartCount();
    showCartNotification();
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = total;
    document.getElementById('mobile-cart-count').textContent = total;
}

function showCartNotification() {
    const notification = document.getElementById('cart-notification');
    notification.style.display = 'flex';
    notification.classList.add('cart-notification-anim');
    setTimeout(() => {
        notification.style.display = 'none';
        notification.classList.remove('cart-notification-anim');
    }, 2000);
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('empty-cart-message');

    if (cart.length === 0) {
        container.innerHTML = '<p id="empty-cart-message">Seu carrinho está vazio</p>';
        document.getElementById('cart-total').textContent = formatPrice(0);
        return;
    }

    container.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const line = document.createElement('div');
        line.className = 'cart-line';
        line.innerHTML = `
            <div class="cart-line-info">
                <img src="${item.imgSrc}" alt="${item.name}">
                <div>
                    <div class="cart-line-name">${item.name}</div>
                    <div class="cart-line-sub">${formatPrice(item.price)} x ${item.quantity}</div>
                </div>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
                <span class="cart-line-name">${formatPrice(itemTotal)}</span>
                <div class="qty-control">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        container.appendChild(line);
    });

    document.getElementById('cart-total').textContent = formatPrice(total);

    container.querySelectorAll('.decrease-quantity').forEach(btn =>
        btn.addEventListener('click', () => decreaseQuantity(parseInt(btn.dataset.id))));
    container.querySelectorAll('.increase-quantity').forEach(btn =>
        btn.addEventListener('click', () => increaseQuantity(parseInt(btn.dataset.id))));
    container.querySelectorAll('.remove-item').forEach(btn =>
        btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id))));
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        removeFromCart(productId);
        return;
    }
    updateCartCount();
    renderCartItems();
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    item.quantity += 1;
    updateCartCount();
    renderCartItems();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
}

function checkoutViaWhatsApp() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let message = 'Olá! Gostaria de fazer o seguinte pedido:\n\n';
    cart.forEach(item => {
        message += `${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}\n`;
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal: ${formatPrice(total)}`;

    const phoneNumber = '5551999766963';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ---------- Vitrine (hero showcase) ----------

let showcaseIndex = 0;
let showcaseTimer = null;

function goToShowcaseSlide(index) {
    const slides = document.querySelectorAll('.showcase-slide');
    const dots = document.querySelectorAll('.showcase-dots button');
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    showcaseIndex = index;
}

function startShowcaseAutoplay() {
    clearInterval(showcaseTimer);
    showcaseTimer = setInterval(() => {
        const slides = document.querySelectorAll('.showcase-slide');
        goToShowcaseSlide((showcaseIndex + 1) % slides.length);
    }, 4500);
}

// ---------- Inicialização ----------

document.addEventListener('DOMContentLoaded', function () {
    renderProducts(products);

    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('is-active'));
            this.classList.add('is-active');
            filterProducts(this.dataset.category);
        });
    });

    document.getElementById('cart-button').addEventListener('click', () => {
        document.getElementById('cart-modal').style.display = 'flex';
        renderCartItems();
    });
    document.getElementById('mobile-cart-button').addEventListener('click', () => {
        document.getElementById('cart-modal').style.display = 'flex';
        renderCartItems();
    });
    document.getElementById('close-cart').addEventListener('click', () => {
        document.getElementById('cart-modal').style.display = 'none';
    });
    document.getElementById('cart-modal').addEventListener('click', function (e) {
        if (e.target === this) this.style.display = 'none';
    });
    document.getElementById('checkout-button').addEventListener('click', checkoutViaWhatsApp);

    document.getElementById('mobile-menu-button').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('open');
    });
    document.querySelectorAll('.mobile-menu a').forEach(a =>
        a.addEventListener('click', () => document.getElementById('mobile-menu').classList.remove('open')));

    document.querySelectorAll('.showcase-dots button').forEach(dot => {
        dot.addEventListener('click', function () {
            goToShowcaseSlide(parseInt(this.dataset.dot));
            startShowcaseAutoplay();
        });
    });
    startShowcaseAutoplay();
});
