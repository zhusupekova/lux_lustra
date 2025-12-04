document.addEventListener('DOMContentLoaded', () => {
  // ===== Данные товаров =====
  const products = [
    {
      id: 1,
      name: 'Хрустальная люстра 1',
      style: 'crystal',
      price: 8500,
      img: 'img/lustra1.jpg',
      desc: 'Элегантная хрустальная люстра для классического интерьера.'
    },
    {
      id: 2,
      name: 'Хрустальная люстра 2',
      style: 'crystal',
      price: 9200,
      img: 'img/lustra2.jpg',
      desc: 'Роскошная хрустальная люстра с уникальным дизайном и ярким свечением.'
    },
    {
      id: 3,
      name: 'Потолочная люстра 1',
      style: 'ceiling',
      price: 4800,
      img: 'img/lustra3.jpg',
      desc: 'Современная потолочная люстра в минималистичном стиле.'
    },
    {
      id: 4,
      name: 'Потолочная люстра 2',
      style: 'ceiling',
      price: 5100,
      img: 'img/lustra4.jpg',
      desc: 'Компактная потолочная люстра для небольших комнат и коридоров.'
    },
    {
      id: 5,
      name: 'Современная люстра 1',
      style: 'modern',
      price: 10400,
      img: 'img/lustra5.jpg',
      desc: 'Идеальна для современных интерьеров с открытой планировкой.'
    },
    {
      id: 6,
      name: 'Современная люстра 2',
      style: 'modern',
      price: 11200,
      img: 'img/lustra6.jpg',
      desc: 'Стильная люстра с LED-подсветкой и мягким рассеянным светом.'
    },
    {
      id: 7,
      name: 'Дизайнерская люстра 1',
      style: 'designer',
      price: 13500,
      img: 'img/lustra7.jpg',
      desc: 'Уникальный дизайнерский светильник для ярких интерьеров.'
    },
    {
      id: 8,
      name: 'Дизайнерская люстра 2',
      style: 'designer',
      price: 14900,
      img: 'img/lustra8.jpg',
      desc: 'Арт-объект в виде люстры — центр внимания в любой комнате.'
    },
    {
      id: 9,
      name: 'Классическая люстра 1',
      style: 'classic',
      price: 7800,
      img: 'img/lustra9.jpg',
      desc: 'Классическая люстра с традиционным дизайном и мягким светом.'
    },
    {
      id: 10,
      name: 'Классическая люстра 2',
      style: 'classic',
      price: 8300,
      img: 'img/lustra10.jpg',
      desc: 'Традиционная люстра с хрустальными элементами и тёплым свечением.'
    }
  ];

  // ===== Корзина (счётчик в localStorage) =====
  function getCartCount() {
    try {
      const stored = localStorage.getItem('cartCount');
      const num = stored ? parseInt(stored, 10) : 0;
      return Number.isNaN(num) ? 0 : num;
    } catch (e) {
      return 0;
    }
  }

  function setCartCount(count) {
    try {
      localStorage.setItem('cartCount', String(count));
    } catch (e) {
      // игнорируем, если запретили localStorage
    }
  }

  function updateCartCountDisplay() {
    const el = document.getElementById('cart-count');
    if (el) {
      el.textContent = getCartCount();
    }
  }

  updateCartCountDisplay();

  // ===== Рендер карточек товаров =====
  function createProductCard(product) {
    return `
      <article class="product" data-id="${product.id}">
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="product-desc">${product.desc}</p>
        <p class="product-price">${product.price.toLocaleString('ru-RU')} сом</p>
        <button type="button" class="btn-add-cart" data-add-to-cart="true">В корзину</button>
        <button type="button" class="btn-more" data-show-details="true">Подробнее</button>
      </article>
    `;
  }

  function renderProducts(container, items) {
    if (!container) return;
    container.innerHTML = items.map(createProductCard).join('');
  }

  const catalogList = document.getElementById('product-list');
  const previewList = document.getElementById('product-list-preview');

  if (catalogList) {
    renderProducts(catalogList, products);
  }

  if (previewList) {
    renderProducts(previewList, products.slice(0, 6));
  }

  // ===== Фильтры и поиск =====
  const styleFilter = document.getElementById('filter-style');
  const priceFilter = document.getElementById('filter-price');
  const searchInput = document.getElementById('search');

  function filterByStyle(product, styleVal) {
    if (!styleVal) return true;
    return product.style === styleVal;
  }

  function filterByPrice(product, priceVal) {
    if (!priceVal) return true;
    if (priceVal === '0-5000') return product.price <= 5000;
    if (priceVal === '5000-10000') return product.price > 5000 && product.price <= 10000;
    if (priceVal === '10000+') return product.price > 10000;
    return true;
  }

  function filterBySearch(product, searchVal) {
    if (!searchVal) return true;
    const text = (product.name + ' ' + product.desc).toLowerCase();
    return text.includes(searchVal);
  }

  function applyFilters() {
    const styleVal = styleFilter ? styleFilter.value : '';
    const priceVal = priceFilter ? priceFilter.value : '';
    const searchVal = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const filtered = products.filter(p =>
      filterByStyle(p, styleVal) &&
      filterByPrice(p, priceVal) &&
      filterBySearch(p, searchVal)
    );

    if (catalogList) {
      renderProducts(catalogList, filtered);
    }

    if (previewList) {
      renderProducts(previewList, filtered.slice(0, 6));
    }
  }

  if (styleFilter) styleFilter.addEventListener('change', applyFilters);
  if (priceFilter) priceFilter.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  // ===== Меню (бургер) =====
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // ===== Модальное окно =====
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.querySelector('.modal-close');

  function openModal(html) {
    if (!modal || !modalBody) return;
    modalBody.innerHTML = html;
    modal.classList.add('active');
    if (modalClose) {
      modalClose.focus();
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
  }

  if (modal) {
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ===== Обработка кликов по товарам (корзина / подробнее) =====
  function getProductById(id) {
    return products.find(p => p.id === id);
  }

  function handleProductListClicks(event) {
    const target = event.target;
    const productEl = target.closest('.product');
    if (!productEl) return;

    const id = parseInt(productEl.getAttribute('data-id'), 10);
    const product = getProductById(id);
    if (!product) return;

    if (target.hasAttribute('data-add-to-cart')) {
      const currentCount = getCartCount();
      setCartCount(currentCount + 1);
      updateCartCountDisplay();
      openModal(`
        <h3>Товар добавлен в корзину</h3>
        <p>${product.name} — ${product.price.toLocaleString('ru-RU')} сом.</p>
        <p>Мы свяжемся с вами для подтверждения заказа.</p>
      `);
    } else if (target.hasAttribute('data-show-details')) {
      openModal(`
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <p><strong>${product.price.toLocaleString('ru-RU')} сом</strong></p>
        <p>Оставьте заявку через форму на странице или свяжитесь с нами в WhatsApp.</p>
      `);
    }
  }

  if (catalogList) {
    catalogList.addEventListener('click', handleProductListClicks);
  }
  if (previewList) {
    previewList.addEventListener('click', handleProductListClicks);
  }

  // ===== Отзывы =====
  const reviewForm = document.getElementById('review-form');
  const reviewList = document.querySelector('.review-list');

  if (reviewForm && reviewList) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('review-name');
      const commentInput = document.getElementById('review-comment');

      const name = nameInput ? nameInput.value.trim() : '';
      const comment = commentInput ? commentInput.value.trim() : '';

      if (!name || !comment) return;

      const article = document.createElement('article');
      article.className = 'review';
      article.innerHTML = `<p><strong>${name}</strong>: "${comment}"</p>`;
      reviewList.prepend(article);

      reviewForm.reset();
      openModal('<h3>Спасибо за отзыв!</h3><p>Ваше мнение очень важно для нас.</p>');
    });
  }

  // ===== Форма заказа =====
  const orderForm = document.getElementById('order-form');

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      orderForm.reset();
      openModal('<h3>Спасибо за заявку!</h3><p>Мы свяжемся с вами по указанному номеру в ближайшее время.</p>');
    });
  }

  // ===== Инициализация Swiper (только если подключён) =====
  if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-container')) {
    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      autoplay: {
        delay: 5000
      }
    });
  }
});