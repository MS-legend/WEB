// Массив для хранения товаров (для демонстрации)
const products = [
  { id: 1, name: 'Сумка', price: 8000, oldPrice: 10000, rating: 4, image: 'https://avatars.mds.yandex.net/i?id=227f7b319099737801c143825769302b39184eff-8529854-images-thumbs&n=13', discount: 20 },
  { id: 2, name: 'Ноутбук', price: 45000, oldPrice: null, rating: 5, image: 'https://sun9-41.userapi.com/impg/YzqQdXLgPVNI_a1iRO8J2UMTV-EnCv9Qm17J0A/Kq3U6VmctBE.jpg?size=604x431&quality=96&sign=181f6226b83120699f2f2c3e4200a3db&type=albumhttps://s7g10.scene7.com/is/image/aldi/202205080169', discount: 0 },
  { id: 3, name: 'Планшет', price: 9500, oldPrice: 10000, rating: 3, image: 'https://avatars.mds.yandex.net/i?id=d39750c7f3c145ac2fd893c8c622fc5802e1ea24-2462069-images-thumbs&n=13', discount: 5 },
  { id: 4, name: 'Смартфон', price: 20000, oldPrice: null, rating: 4, image: 'https://avatars.mds.yandex.net/get-mpic/2009321/img_id674005504552773329.jpeg/orig', discount: 0 },
  { id: 5, name: 'Наушники', price: 400, oldPrice: 500, rating: 5, image: 'https://avatars.mds.yandex.net/i?id=7f29292f0c7e4259ea113aa3302bf1a8_l-5263630-images-thumbs&n=13', discount: 20 },
  { id: 6, name: 'Телевизор', price: 250, oldPrice: null, rating: 3, image: 'https://avatars.mds.yandex.net/i?id=759783f8245751bcc90eaf14ba03c89e55f2d0a1-5228562-images-thumbs&n=13', discount: 0 },
  { id: 7, name: 'Проводная мышь', price: 180, oldPrice: 220, rating: 4, image: 'https://avatars.mds.yandex.net/i?id=ea93296867f9190ec26e9dc9e7d6a8e3a2aa4e1b-10414649-images-thumbs&n=13', discount: 15 },
  { id: 8, name: 'Клавиатура', price: 500, oldPrice: 600, rating: 4, image: 'https://avatars.mds.yandex.net/i?id=b2d747c5db14cabb48407cf5c0662a7d_l-4120709-images-thumbs&n=13', discount: 10 },
  { id: 9, name: 'Видеокарта', price: 54000, oldPrice: 60000, rating: 3, image: 'https://avatars.mds.yandex.net/i?id=a71afa9a5f156f4f5b36936114b0b836b647d83d-9153855-images-thumbs&n=13', discount: 10 },
  { id: 10, name: 'Процессор', price: 40000, oldPrice: null, rating: 5, image: 'https://avatars.mds.yandex.net/i?id=5caa1d7ccdeb1d385f2dd9f07825d97e971210a4-6947135-images-thumbs&n=13', discount: 0 }
];

let filteredProducts = [...products];
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Загружаем корзину из localStorage

// Функция отображения товаров
function displayProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  if (products.length === 0) {
    productList.innerHTML = 'Нет товаров, соответствующих вашему запросу';
  } else {
    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Рейтинг: ${product.rating} ★</p>
        <p>
          Цена: 
          <span class="price">${product.price} руб.</span>
          ${product.oldPrice ? `<span class="old-price">${product.oldPrice} руб.</span>` : ''}
          ${product.discount > 0 ? `<span class="discount">(${product.discount}% скидка)</span>` : ''}
        </p>
        <button class="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
      `;
      productList.appendChild(productItem);
    });
  }

  // Добавление обработчика событий на кнопки "Добавить в корзину"
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = parseInt(event.target.dataset.id);
      addToCart(productId);
    });
  });
}

// Функция добавления товара в корзину
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cartItems.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++; // Увеличиваем количество, если товар уже в корзине
  } else {
    cartItems.push({ ...product, quantity: 1 }); // Добавляем товар в корзину
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Сохраняем корзину в localStorage
  displayCartItems();
}

// Функция отображения товаров в корзине
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  if (cartItems.length === 0) {
    document.getElementById('empty-cart-message').style.display = 'block';
    cartItemsContainer.style.display = 'none';
  } else {
    document.getElementById('empty-cart-message').style.display = 'none';
    cartItemsContainer.style.display = 'grid';

    cartItems.forEach(item => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Цена: ${item.price} руб. ${item.discount > 0 ? `Скидка ${item.discount}%` : ''}</p>
        <p>Количество: ${item.quantity}</p>
        <button onclick="removeFromCart(${item.id})">Удалить из корзины</button>
      `;
      cartItemsContainer.appendChild(productItem);
    });
  }
}

// Удаление товара из корзины
function removeFromCart(itemId) {
  const itemIndex = cartItems.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1); // Удаляем товар из корзины
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Сохраняем обновленную корзину в localStorage
    displayCartItems();
  }
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
  displayProducts(filteredProducts);
  displayCartItems();
});

// Применение фильтров
document.getElementById('apply-filters').addEventListener('click', () => {
  const priceFrom = parseInt(document.getElementById('filter-price-from').value) || 0;
  const priceTo = parseInt(document.getElementById('filter-price-to').value) || Infinity;
  const onlyDiscount = document.getElementById('filter-discount').checked;

  filteredProducts = products.filter(product => {
    return product.price >= priceFrom &&
           product.price <= priceTo &&
           (!onlyDiscount || product.discount > 0);
  });

  displayProducts(filteredProducts);
});

// Сортировка товаров
document.getElementById('sort-select').addEventListener('change', () => {
  const sortValue = document.getElementById('sort-select').value;
  switch (sortValue) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating-asc':
      filteredProducts.sort((a, b) => a.rating - b.rating);
      break;
    case 'rating-desc':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
  }

  displayProducts(filteredProducts);
});

// Поиск с автодополнением
document.getElementById('search-input').addEventListener('input', function() {
  const query = this.value.trim().toLowerCase();
  if (query.length > 2) {
    const filteredSuggestions = products.filter(product => product.name.toLowerCase().includes(query));
    showAutocompleteSuggestions(filteredSuggestions);
  } else {
    hideAutocompleteSuggestions();
  }
});

function showAutocompleteSuggestions(suggestions) {
  const autocompleteList = document.getElementById('autocomplete-list');
  autocompleteList.innerHTML = '';

  suggestions.forEach(product => {
    const suggestionItem = document.createElement('li');
    suggestionItem.textContent = product.name;
    suggestionItem.addEventListener('click', () => {
      document.getElementById('search-input').value = product.name;
      hideAutocompleteSuggestions();
    });
    autocompleteList.appendChild(suggestionItem);
  });

  autocompleteList.style.display = 'block';
}

function hideAutocompleteSuggestions() {
  document.getElementById('autocomplete-list').style.display = 'none';
}

// Обработчик для кнопки "Найти"
document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-input').value.trim();
  filteredProducts = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
  displayProducts(filteredProducts);
});
