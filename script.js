
// Dados dos produtos
        const products = [
            { id: 1, name: "Pão de Hambúrguer com Gergelim", price: 19.00, category: "hamburger", image: "🍔", imgSrc: "hamburguer.png", description: "Pacote com 10 unidades, macio e com gergelim." },
            { id: 2, name: "Pão Australiano", price: 21.00, category: "hamburger", image: "🍔", imgSrc: "australiano.png", description: "Pacote com 10 unidades. Por encomenda." },
            { id: 3, name: "Pão Brioche", price: 21.00, category: "hamburger", image: "🍔", imgSrc: "brioche.png", description: "Pacote com 10 unidades. Por encomenda." },
            { id: 4, name: "Pão de Kachurrasco", price: 9.00, category: "especiais", image: "🍔", imgSrc: "kachurrasco.png", description: "Pacote com 5 unidades, tamanho 20cm. Por encomenda." },
            { id: 5, name: "Pão de Baguete", price: 10.00, category: "especiais", image: "🥪", imgSrc: "baguete.png", description: "Pacote com 5 unidades, tamanho 28cm. Por encomenda." },
            { id: 6, name: "Pão de Xis 15cm", price: 9.00, category: "xis", image: "🥪", imgSrc: "xis.png", description: "Pacote com 5 unidades." },
            { id: 7, name: "Pão de Xis 17cm", price: 9.00, category: "xis", image: "🥪", imgSrc: "xis.png", description: "Pacote com 5 unidades." },
            { id: 8, name: "Pão de Xis 18cm", price: 9.00, category: "xis", image: "🥪", imgSrc: "xis.png", description: "Pacote com 4 unidades." },
            { id: 9, name: "Pão de Bauru", price: 10.00, category: "especiais", image: "🥪", imgSrc: "bauru.png", description: "Pacote com 5 unidades. Por encomenda." },
            { id: 10, name: "Doguinho 12cm", price: 13.00, category: "hotdog", image: "🌭", imgSrc: "doguinho.png", description: "Pacote com 10 unidades, 50g. Por encomenda." },
            { id: 11, name: "Pão de Hot Dog 18cm", price: 14.00, category: "hotdog", image: "🌭", imgSrc: "dog.png", description: "Pacote com 8 unidades, 80g." },
            { id: 12, name: "Pão de Hot Dog 22cm", price: 18.00, category: "hotdog", image: "🌭", imgSrc: "dog.png", description: "Pacote com 10 unidades, 100g." },
            { id: 13, name: "Pão de Hot Dog 23cm", price: 11.00, category: "hotdog", image: "🌭", imgSrc: "dog.png", description: "Pacote com 6 unidades, 120g." },
            { id: 14, name: "Pão de Cachorrinho de Festa", price: 40.00, category: "hotdog", image: "🌭", imgSrc: "cachorrinho.png", description: "Pacote com 50 unidades, mini tamanho para festas. Por encomenda." },
            { id: 15, name: "Pão de Mini Hambúrguer", price: 45.00, category: "hamburger", image: "🍔", imgSrc: "miniham.png", description: "Pacote com 50 unidades, para hambúrgueres de festa. Por encomenda." },
            { id: 16, name: "Gelo 10Kg", price: 17.00, category: "especiais", image: "🥪", imgSrc: "gelo.png", description: "Pacote 10Kg." },
          
        ];

        // Carrinho de compras
        let cart = [];
        
        // Função para formatar preço em reais
        function formatPrice(price) {
            return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        
        // Função para renderizar produtos
        function renderProducts(productsToRender) {
            const container = document.getElementById('products-container');
            container.innerHTML = '';
            
            productsToRender.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300';
                
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.imgSrc}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="product-emoji hidden flex items-center justify-center h-full">${product.image}</div>
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-bold text-kipao-800 mb-1">${product.name}</h3>
                        <p class="text-gray-600 text-sm mb-2">${product.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-kipao-600">${formatPrice(product.price)}</span>
                            <button class="add-to-cart-btn bg-kipao-400 hover:bg-kipao-500 text-white px-3 py-1 rounded-md text-sm font-medium transition duration-300" data-id="${product.id}">
                                Adicionar
                            </button>
                        </div>
                    </div>
                `;
                
                container.appendChild(productCard);
            });
            
            // Adicionar event listeners aos botões de adicionar ao carrinho
            document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    addToCart(productId);
                });
            });
        }
        
        // Função para adicionar produto ao carrinho
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            
            // Verificar se o produto já está no carrinho
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    imgSrc: product.imgSrc,
                    quantity: 1
                });
            }
            
            // Atualizar contadores do carrinho
            updateCartCount();
            
            // Mostrar notificação
            showCartNotification();
        }
        
        // Função para atualizar contadores do carrinho
        function updateCartCount() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cart-count').textContent = totalItems;
            document.getElementById('mobile-cart-count').textContent = totalItems;
        }
        
        // Função para mostrar notificação de produto adicionado
        function showCartNotification() {
            const notification = document.getElementById('cart-notification');
            notification.classList.remove('hidden');
            notification.classList.add('cart-notification');
            
            setTimeout(() => {
                notification.classList.add('hidden');
                notification.classList.remove('cart-notification');
            }, 2000);
        }
        
        // Função para renderizar itens do carrinho
        function renderCartItems() {
            const cartItemsContainer = document.getElementById('cart-items');
            const emptyCartMessage = document.getElementById('empty-cart-message');
            
            if (cart.length === 0) {
                emptyCartMessage.classList.remove('hidden');
                cartItemsContainer.innerHTML = '';
                document.getElementById('cart-total').textContent = formatPrice(0);
                return;
            }
            
            emptyCartMessage.classList.add('hidden');
            cartItemsContainer.innerHTML = '';
            
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'flex justify-between items-center border-b pb-3 mb-3';
                
                cartItem.innerHTML = `
                    <div class="flex items-center">
                        <div class="text-2xl mr-3">${item.image}</div>
                        <div>
                            <h4 class="font-medium">${item.name}</h4>
                            <p class="text-sm text-gray-500">${formatPrice(item.price)} x ${item.quantity}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <span class="font-medium mr-3">${formatPrice(itemTotal)}</span>
                        <div class="flex items-center border rounded">
                            <button class="decrease-quantity px-2 py-1 text-gray-500 hover:text-kipao-800" data-id="${item.id}">-</button>
                            <span class="px-2">${item.quantity}</span>
                            <button class="increase-quantity px-2 py-1 text-gray-500 hover:text-kipao-800" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item ml-2 text-red-500 hover:text-red-700" data-id="${item.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItem);
            });
            
            document.getElementById('cart-total').textContent = formatPrice(total);
            
            // Adicionar event listeners aos botões do carrinho
            document.querySelectorAll('.decrease-quantity').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    decreaseQuantity(productId);
                });
            });
            
            document.querySelectorAll('.increase-quantity').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    increaseQuantity(productId);
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    removeFromCart(productId);
                });
            });
        }
        
        // Função para diminuir quantidade
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
        
        // Função para aumentar quantidade
        function increaseQuantity(productId) {
            const item = cart.find(item => item.id === productId);
            item.quantity += 1;
            
            updateCartCount();
            renderCartItems();
        }
        
        // Função para remover item do carrinho
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            
            updateCartCount();
            renderCartItems();
        }
        
        // Função para finalizar pedido via WhatsApp
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
            
            // Número de WhatsApp atualizado
            const phoneNumber = '5551999766963';
            
            // Criar URL do WhatsApp
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            // Abrir WhatsApp em nova janela
            window.open(whatsappUrl, '_blank');

            console.log("Novo carrinho:", cart);

        }
        
        // Slideshow
        let slideIndex = 0;
        
        function showSlides() {
            const slides = document.querySelectorAll('.slide');
            
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
            }
            
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            
            slides[slideIndex - 1].classList.add('active');
            setTimeout(showSlides, 5000); // Mudar slide a cada 5 segundos
        }
        
        // Função para navegar para o slide anterior
        function prevSlide() {
            const slides = document.querySelectorAll('.slide');
            
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
            }
            
            slideIndex--;
            if (slideIndex < 1) {
                slideIndex = slides.length;
            }
            
            slides[slideIndex - 1].classList.add('active');
        }
        
        // Função para navegar para o próximo slide
        function nextSlide() {
            const slides = document.querySelectorAll('.slide');
            
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
            }
            
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            
            slides[slideIndex - 1].classList.add('active');
        }
        
        // Função para filtrar produtos por categoria
        function filterProducts(category) {
            let filteredProducts;
            
            if (category === 'todos') {
                filteredProducts = products;
            } else {
                filteredProducts = products.filter(product => product.category === category);
            }
            
            renderProducts(filteredProducts);
        }
        
        // Função para animar elementos quando entram na viewport
        function handleIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }
        
        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            // Renderizar produtos
            renderProducts(products);
            
            // Iniciar slideshow
            showSlides();
            
            // Event listeners para navegação do slideshow
            document.getElementById('prev-slide').addEventListener('click', prevSlide);
            document.getElementById('next-slide').addEventListener('click', nextSlide);
            
            // Event listeners para filtros de categoria
            document.querySelectorAll('.category-filter').forEach(button => {
                button.addEventListener('click', function() {
                    const category = this.getAttribute('data-category');
                    
                    // Atualizar estilos dos botões
                    document.querySelectorAll('.category-filter').forEach(btn => {
                        btn.classList.remove('bg-kipao-400', 'text-white');
                        btn.classList.add('bg-white', 'text-kipao-800');
                    });
                    
                    this.classList.remove('bg-white', 'text-kipao-800');
                    this.classList.add('bg-kipao-400', 'text-white');
                    
                    filterProducts(category);
                });
            });
            
            // Event listeners para o carrinho
            document.getElementById('cart-button').addEventListener('click', function() {
                document.getElementById('cart-modal').classList.remove('hidden');
                renderCartItems();
            });
            
            document.getElementById('mobile-cart-button').addEventListener('click', function() {
                document.getElementById('cart-modal').classList.remove('hidden');
                renderCartItems();
            });
            
            document.getElementById('close-cart').addEventListener('click', function() {
                document.getElementById('cart-modal').classList.add('hidden');
            });
            
            document.getElementById('checkout-button').addEventListener('click', checkoutViaWhatsApp);
            
            // Event listener para menu mobile
            document.getElementById('mobile-menu-button').addEventListener('click', function() {
                const mobileMenu = document.getElementById('mobile-menu');
                mobileMenu.classList.toggle('hidden');
            });
            
            // Configurar observador de interseção para animações
            const observer = new IntersectionObserver(handleIntersection, {
                root: null,
                threshold: 0.1
            });
            
            document.querySelectorAll('.section-fade').forEach(section => {
                observer.observe(section);
            });
        });

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'962ef308107a622e',t:'MTc1MzE0NTQ4My4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();