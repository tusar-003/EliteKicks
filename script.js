document.addEventListener('DOMContentLoaded', () => {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  }

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
          image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          category: 'casual',
          description: 'Laid-back style meets all-day comfort'
      }
  ];

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
    optimizeProductRendering(productsArray);
  }

  // Update the cart functionality
  function initializeCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');
    const closeCart = document.querySelector('.close-cart');

    let cart = [];
    let total = 0;

    // Toggle cart function
    function toggleCart(e) {
      if (e) e.preventDefault();
      cartSidebar.classList.toggle('active');
      cartOverlay.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    }

    // Add to cart function
    function addToCart(product) {
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
          existingItem.quantity++;
      } else {
          cart.push({ ...product, quantity: 1 });
      }
      
      updateCart();
      toggleCart(); // Open cart when item is added
  }

    // Update cart display
  function updateCart() {
      cartItems.innerHTML = '';
      total = 0;

      cart.forEach(item => {
          total += item.price * item.quantity;
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
                  <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            <button class="remove-item" data-id="${item.id}">Remove</button>
              </div>
          `;
          cartItems.appendChild(cartItem);
      });

      cartTotal.textContent = total.toFixed(2);
      cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
      
      // Hide cart count if empty
      if (cart.length === 0) {
        cartCount.style.display = 'none';
      } else {
        cartCount.style.display = 'flex';
      }
    }

    // Event listeners
    cartIcon.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);

    // Remove item from cart
  cartItems.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item')) {
          const productId = parseInt(e.target.dataset.id);
          cart = cart.filter(item => item.id !== productId);
          updateCart();
      }
  });

    // Close cart when pressing ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
        toggleCart();
      }
    });

    // Initialize cart display
    updateCart();

    // Make addToCart function available globally
    window.addToCart = addToCart;
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
      
      // Fix images after filtering
      setTimeout(() => {
        const productImages = document.querySelectorAll('.product-image');
        productImages.forEach(img => {
          const bgUrl = img.getAttribute('data-bg');
          if (bgUrl) {
            img.style.backgroundImage = `url(${bgUrl})`;
            img.classList.remove('loading');
          }
        });
      }, 500);
    });
  });

  // Update the carousel functionality
  function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
      // Clear existing classes
      slides.forEach(slide => slide.classList.remove('active', 'prev-slide'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Add appropriate classes
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      // Handle the previous slide transition
      if (currentSlide !== index) {
        slides[currentSlide].classList.add('prev-slide');
      }
      
      // Update current slide index
      currentSlide = index;
      
      // Reset progress bar animation
      startProgressAnimation();
    }

    // Make dots clickable with improved event handling
    dots.forEach((dot, index) => {
      // Remove any existing event listeners
      dot.removeEventListener('click', dotClickHandler);
      
      // Add new event listener
      dot.addEventListener('click', dotClickHandler);
      
      function dotClickHandler(e) {
        e.stopPropagation(); // Prevent event bubbling
        console.log(`Dot ${index} clicked`);
        clearInterval(slideInterval);
        showSlide(index);
        startAutoSlide();
      }
    });

    function startAutoSlide() {
      slideInterval = setInterval(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
      }, 5000);
    }

    function startProgressAnimation() {
      const progressBar = document.querySelector('.carousel-progress-bar');
      if (progressBar) {
        progressBar.classList.remove('animate');
        void progressBar.offsetWidth; // Trigger reflow
        progressBar.classList.add('animate');
      }
    }

    // Event listeners for prev/next buttons
    prevBtn.addEventListener('click', () => {
      clearInterval(slideInterval);
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
      startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
      clearInterval(slideInterval);
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
      startAutoSlide();
    });

    // Initialize carousel
    startProgressAnimation();
    startAutoSlide();
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  // Add this to the JavaScript after your existing slide interval code
  const progressBar = document.querySelector('.carousel-progress-bar');

  // Start progress animation
  function startProgressAnimation() {
    if (progressBar) {
      progressBar.classList.remove('animate');
      // Trigger reflow
      void progressBar.offsetWidth;
      progressBar.classList.add('animate');
    }
  }

  // Call this initially and whenever the slide changes
  startProgressAnimation();

  // Update the resetInterval function
  function resetInterval() {
    clearInterval(slideInterval);
    startProgressAnimation();
    slideInterval = setInterval(() => {
      nextSlide();
      startProgressAnimation();
    }, 5000);
  }

  // Also call startProgressAnimation in your initial interval
  slideInterval = setInterval(() => {
    nextSlide();
    startProgressAnimation();
  }, 5000);

  // Debounce function to limit how often certain functions run
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Use debounce for scroll events
  window.addEventListener('scroll', debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }));

  // Force all image loading to be done efficiently
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    if (img.complete) return;
    img.setAttribute('loading', 'lazy');
  });

  // Replace the products array with optimized images (smaller sizes)
  // Change the products array images to use compressed versions
  products.forEach(product => {
    // Add size parameters to Unsplash URLs for smaller images
    if (product.image.includes('unsplash.com')) {
      product.image = product.image + '?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
    }
  });

  // Add this function to defer non-critical resource loading
  function loadDeferredResources() {
    // Load social icons and other non-critical resources after page load
    const socialIcons = document.querySelectorAll('.social-links a i');
    if (socialIcons.length) {
      socialIcons.forEach(icon => {
        icon.style.opacity = '1';
      });
    }
  }

  // Optimize image loading
  function optimizeImageLoading() {
    // Use Intersection Observer for better performance
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector('img');
          if (img && img.dataset.src) {
            // Determine image size based on viewport width
            const isMobile = window.innerWidth <= 768;
            const imgSrc = isMobile 
              ? img.dataset.src.replace('w=600&h=400', 'w=400&h=300')
              : img.dataset.src;
            
            img.src = imgSrc;
            
            // Handle image load event
            img.onload = () => {
              img.classList.add('loaded');
              entry.target.classList.add('loaded');
              img.onload = null; // Remove event listener
            };
            
            // Remove from further observation
            observer.unobserve(entry.target);
          }
        }
      });
    }, {
      rootMargin: '200px 0px', // Start loading before visible
      threshold: 0.01
    });
    
    // Observe all product images
    document.querySelectorAll('.product-image').forEach(imgContainer => {
      imageObserver.observe(imgContainer);
    });
  }

  // Update the product rendering function to use data-src for lazy loading
  function optimizeProductRendering(productsArray) {
    // Clear the grid once
    productGrid.innerHTML = '';
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Determine if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    // For mobile, render in batches to avoid UI blocking
    const renderProducts = (products, startIndex) => {
      products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.style.animationDelay = `${(startIndex + index) * (isMobile ? 0.05 : 0.1)}s`;
        
        // Prepare image URL with appropriate size and use data-src for lazy loading
        const imgSrc = product.image.includes('unsplash.com') 
          ? `${product.image}?auto=compress&cs=tinysrgb&${isMobile ? 'w=400&h=300' : 'w=600&h=400'}&fit=crop`
          : product.image;
        
        productCard.innerHTML = `
          <div class="product-image">
            <img 
              data-src="${imgSrc}" 
              alt="${product.name}" 
              loading="lazy"
              onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';"
            >
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-footer">
              <span class="price">$${product.price.toFixed(2)}</span>
              <button class="add-to-cart" data-id="${product.id}" aria-label="Add ${product.name} to cart">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        `;
        
        fragment.appendChild(productCard);
        
        // Add event listeners (deferred for better performance)
        setTimeout(() => {
          const addToCartBtn = productCard.querySelector('.add-to-cart');
          addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product);
          });
        }, 10);
      });
      
      productGrid.appendChild(fragment);
    };
    
    if (isMobile && productsArray.length > 6) {
      // Render critical products first
      renderProducts(productsArray.slice(0, 4), 0);
      
      // Render remaining products after a small delay
      setTimeout(() => {
        renderProducts(productsArray.slice(4), 4);
        optimizeImageLoading();
      }, 100);
    } else {
      renderProducts(productsArray, 0);
      optimizeImageLoading();
    }
  }

  // Add this function to preload images
  function preloadImages(productsArray) {
    productsArray.forEach(product => {
      const img = new Image();
      img.src = product.image;
    });
  }

  // Call preloadImages when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    preloadImages(products);
  });

  // Fix for product images (add this at the end)
  setTimeout(() => {
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(img => {
      const bgUrl = img.getAttribute('data-bg');
      if (bgUrl) {
        img.style.backgroundImage = `url(${bgUrl})`;
        img.classList.remove('loading');
      }
    });
  }, 1000); // Small delay to ensure DOM is fully loaded

  // Add a fallback mechanism for any image that fails to load
  document.addEventListener('error', function(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
      // Replace broken image with a reliable fallback
      e.target.src = 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
    }
  }, true);

  // Add this function to make sure product images load properly
  function ensureImagesLoad() {
    const productImgs = document.querySelectorAll('.product-image img');
    
    productImgs.forEach(img => {
      // Check if image has loaded correctly
      if (img.complete && img.naturalHeight === 0) {
        // If image fails, replace with reliable fallback
        img.src = 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
      }
      
      // Add error handler for each image
      img.onerror = function() {
        this.src = 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
      };
    });
  }

  // Call this function after rendering products and in the window load event
  window.addEventListener('load', ensureImagesLoad);

  // Also add a backup check after a short delay
  setTimeout(ensureImagesLoad, 2000);

  // Add this function to handle image loading
  function handleImageLoad(img) {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
      img.parentElement.classList.add('loaded');
    });
  }

  // Update the image error handling
  function handleImageError(img) {
    img.onerror = () => {
      img.src = 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
      handleImageLoad(img);
    };
  }

  // Initialize image handling
  function initializeImageHandling() {
    const productImages = document.querySelectorAll('.product-image img');
    productImages.forEach(img => {
      handleImageLoad(img);
      handleImageError(img);
    });
  }

  // Call this after rendering products
  window.addEventListener('load', initializeImageHandling);

  // Add this function at the start of your DOMContentLoaded event listener
  function initializeImageCache() {
    const imageCache = {
      async saveToCache(url, blob) {
        try {
          const base64String = await this.blobToBase64(blob);
          localStorage.setItem(`img_${url}`, base64String);
          return base64String;
        } catch (err) {
          console.warn('Failed to cache image:', err);
          return null;
        }
      },

      getFromCache(url) {
        return localStorage.getItem(`img_${url}`);
      },

      async blobToBase64(blob) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      },

      async loadImage(url) {
        // First check cache
        const cachedImage = this.getFromCache(url);
        if (cachedImage) {
          return cachedImage;
        }

        // If not in cache, fetch and cache it
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const base64String = await this.saveToCache(url, blob);
          return base64String || url;
        } catch (err) {
          console.warn('Failed to load and cache image:', err);
          return url;
        }
      }
    };

    return imageCache;
  }

  // Update the smooth scrolling function
  function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"], .cta-btn');
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            let targetId;
            if (this.classList.contains('cta-btn')) {
                targetId = 'products';
            } else {
                targetId = this.getAttribute('href').substring(1);
            }
            
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if it's open
                const menuToggle = document.querySelector('.menu-toggle');
                const navLinks = document.querySelector('.nav-links');
                const navOverlay = document.querySelector('.nav-overlay');
                
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    navOverlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
                
                // Calculate scroll position
                const targetPosition = targetId === 'hero' 
                    ? 0 // Scroll to very top for hero section
                    : targetElement.offsetTop - navbarHeight;
                
                // Perform smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
  }

  // Initialize smooth scrolling
  initializeSmoothScroll();

  initializeCarousel();

  // Call initializeCart after DOM is loaded
  initializeCart();

  // Enhanced mobile menu initialization
  function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    const navOverlay = document.querySelector('.nav-overlay') || createNavOverlay();
    
    if (!menuToggle || !navLinks) return;
    
    // Function to create nav overlay if it doesn't exist
    function createNavOverlay() {
      const overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);
      return overlay;
    }
    
    // Remove any existing event listeners to prevent duplication
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
    
    // Add fresh event listeners
    newMenuToggle.addEventListener('click', toggleMenu);
    
    // Add keyboard accessibility
    newMenuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu(e);
      }
    });
    
    function toggleMenu(e) {
      if (e) e.stopPropagation(); // Prevent event bubbling
      
      newMenuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      navOverlay.classList.toggle('active');
      
      // Update ARIA attributes for accessibility
      const expanded = navLinks.classList.contains('active');
      newMenuToggle.setAttribute('aria-expanded', expanded);
      
      // Prevent scrolling when menu is open
      document.body.classList.toggle('no-scroll', expanded);
    }
    
    // Close menu when clicking on navigation items
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        newMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        newMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });
    
    // Close menu when clicking on overlay
    navOverlay.addEventListener('click', () => {
      newMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navOverlay.classList.remove('active');
      newMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        newMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        newMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }
    });
    
    // Initialize ARIA attributes
    newMenuToggle.setAttribute('aria-expanded', 'false');
  }

  // Make sure this is called when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Remove older initialization of mobile menu
    const oldMenuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (oldMenuToggle) {
      // Remove old event listeners
      const newMenuToggle = oldMenuToggle.cloneNode(true);
      oldMenuToggle.parentNode.replaceChild(newMenuToggle, oldMenuToggle);
    }
    
    // Initialize the enhanced mobile menu
    initializeMobileMenu();
  });

  // Add these functions to your script.js file
  function optimizeForMobile() {
    // Check if we're on a mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Reduce animation complexity on mobile
      document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
      
      // Use smaller image sizes for mobile
      const productImages = document.querySelectorAll('.product-image img');
      productImages.forEach(img => {
        const src = img.src;
        if (src.includes('unsplash.com') && src.includes('w=600')) {
          // Replace with smaller images for mobile
          img.src = src.replace('w=600&h=400', 'w=400&h=300');
        }
      });
      
      // Optimize carousel for mobile - reduce autoplay speed to save resources
      const slideInterval = window.slideInterval;
      if (slideInterval) {
        clearInterval(slideInterval);
        window.slideInterval = setInterval(() => {
          nextSlide();
          startProgressAnimation();
        }, 7000); // Longer interval on mobile
      }
      
      // Use intersection observer to lazy load content
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            if (lazyImage.classList.contains('lazy-background')) {
              const bg = lazyImage.dataset.bg;
              if (bg) {
                lazyImage.style.backgroundImage = `url(${bg})`;
                lazyImage.classList.remove('lazy-background');
              }
            }
            observer.unobserve(lazyImage);
          }
        });
      }, {
        rootMargin: '100px 0px'
      });
      
      // Observe all lazy-loadable elements
      document.querySelectorAll('.lazy-background').forEach(img => {
        observer.observe(img);
      });
    }
  }

  // Add this to reduce motion for users who prefer it
  function respectReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Apply styles for reduced motion
      const style = document.createElement('style');
      style.innerHTML = `
        *, *::before, *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Add this to your DOMContentLoaded event
  window.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    optimizeForMobile();
    respectReducedMotion();
    
    // Re-run optimizations on resize
    window.addEventListener('resize', debounce(() => {
      optimizeForMobile();
    }, 250));
  });

  // Additional performance optimizations
  function optimizePerformance() {
    // Reduce animation complexity on mobile
    if (window.innerWidth <= 768) {
      document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
      
      // Optimize carousel for mobile by increasing interval
      if (window.slideInterval) {
        clearInterval(window.slideInterval);
        window.slideInterval = setInterval(() => {
          nextSlide();
          startProgressAnimation();
        }, 7000); // Longer interval on mobile
      }
    }
    
    // Defer non-critical JavaScript
    const deferScripts = () => {
      // Prefetch product images for faster future loading
      if ('connection' in navigator && navigator.connection.saveData === false) {
        // Only prefetch if user is not on data-saving mode
        const productImages = document.querySelectorAll('.product-image img');
        productImages.forEach(img => {
          if (img.dataset.src && !img.src) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.as = 'image';
            link.href = img.dataset.src;
            document.head.appendChild(link);
          }
        });
      }
      
      // Load social icons only when they're close to viewport
      const socialLinks = document.querySelectorAll('.social-links a');
      if (socialLinks.length) {
        const socialObserver = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            socialLinks.forEach(link => {
              link.style.opacity = '1';
            });
            socialObserver.disconnect();
          }
        }, { rootMargin: '200px 0px' });
        
        socialObserver.observe(document.querySelector('.footer'));
      }
    };
    
    // Execute after initial page load is complete
    if (document.readyState === 'complete') {
      deferScripts();
    } else {
      window.addEventListener('load', deferScripts);
    }
    
    // Prevent layout thrashing
    window.addEventListener('resize', debounce(() => {
      optimizePerformance();
    }, 250));
  }

  // Call this function to initialize all optimizations
  document.addEventListener('DOMContentLoaded', () => {
    // ... other initialization code ...
    
    optimizePerformance();
  });
});