document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle functionality - improved
  const toggleSwitch = document.querySelector('#checkbox');
  
  // Check for saved theme preference or default to light
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Set the initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Set initial toggle position
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
  
  // Toggle theme when the checkbox changes
  toggleSwitch.addEventListener('change', function() {
    let theme = this.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });

  // Product data - expanded collection with 9+ shoes
  const products = [
      {
          id: 1,
          name: 'Pro Runner X',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f',
          category: 'running',
          description: 'High-performance running shoes with advanced cushioning technology'
      },
      {
          id: 2,
          name: 'Urban Explorer',
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86',
          category: 'casual',
          description: 'Stylish urban shoes for everyday comfort'
      },
      {
          id: 3,
          name: 'Trail Blazer',
          price: 169.99,
          image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6',
          category: 'sports',
          description: 'Rugged outdoor shoes for extreme conditions'
      },
      {
          id: 4,
          name: 'Classic Retro',
          price: 119.99,
          image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
          category: 'casual',
          description: 'Timeless retro design for fashion-forward individuals'
      },
      {
          id: 5,
          name: 'Speed Demon',
          price: 189.99,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
          category: 'running',
          description: 'Ultralight racing shoes designed for maximum speed'
      },
      {
          id: 6,
          name: 'Court Master',
          price: 139.99,
          image: 'https://images.unsplash.com/photo-1603787081207-362bcef7c144',
          category: 'sports',
          description: 'Premium court shoes with superior grip and stability'
      },
      {
          id: 7,
          name: 'Summit Hiker',
          price: 179.99,
          image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
          category: 'sports',
          description: 'Waterproof hiking boots for challenging terrain'
      },
      {
          id: 8,
          name: 'Street Flow',
          price: 109.99,
          image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
          category: 'casual',
          description: 'Urban street style with premium comfort features'
      },
      {
          id: 9,
          name: 'Agility Elite',
          price: 159.99,
          image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
          category: 'sports',
          description: 'Multi-sport shoes designed for quick lateral movements'
      },
      {
          id: 10,
          name: 'Metro Luxe',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
          category: 'casual',
          description: 'Premium materials with sophisticated urban styling'
      },
      {
          id: 11,
          name: 'Marathon Pro',
          price: 169.99,
          image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
          category: 'running',
          description: 'Long-distance running shoes with superior cushioning'
      },
      {
          id: 12,
          name: 'Drift Cruiser',
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1584735175315-9d5df23be2c8',
          category: 'casual',
          description: 'Laid-back style meets all-day comfort'
      }
  ];

  let cart = [];
  let total = 0;

  // DOM elements
  const productGrid = document.querySelector('.product-grid');
  const cartIcon = document.querySelector('.cart-icon');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cartOverlay = document.querySelector('.cart-overlay');
  const cartCount = document.querySelector('.cart-count');
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total span');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Initialize
  renderProducts(products);

  // Function to render products
  function renderProducts(productsArray) {
    productGrid.innerHTML = '';
    
    productsArray.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      
      productCard.innerHTML = `
        <div class="product-image" style="background-image: url('${product.image}')"></div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-footer">
            <span class="price">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart" data-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      `;
      
      productGrid.appendChild(productCard);
      
      // Add event listener to add-to-cart button
      const addToCartBtn = productCard.querySelector('.add-to-cart');
      addToCartBtn.addEventListener('click', () => {
        addToCart(product);
      });
    });
  }

  // Add to cart
  function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
  }

  // Update cart
  function updateCart() {
    cartItems.innerHTML = '';
    total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price} x ${item.quantity}</p>
          <button class="remove-item" data-id="${item.id}">
            Remove
          </button>
        </div>
      `;
      cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Event Listeners
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      if (filter === 'all') {
        renderProducts(products);
      } else {
        const filtered = products.filter(product => product.category === filter);
        renderProducts(filtered);
      }
    });
  });

  cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
      const productId = parseInt(e.target.dataset.id);
      cart = cart.filter(item => item.id !== productId);
      updateCart();
    }
  });

  // Cart Toggle
  cartIcon.addEventListener('click', toggleCart);
  cartOverlay.addEventListener('click', toggleCart);
  document.querySelector('.close-cart').addEventListener('click', toggleCart);

  function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
  }

  // Carousel functionality
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Initialize carousel
  function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }
  
  // Next slide
  function nextSlide() {
    let next = currentSlide + 1;
    if (next >= slideCount) next = 0;
    showSlide(next);
  }
  
  // Previous slide
  function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) prev = slideCount - 1;
    showSlide(prev);
  }
  
  // Auto slide (every 5 seconds)
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Reset interval when manually changing slide
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  // Event listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetInterval();
    });
  });
});