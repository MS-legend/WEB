// Массив для товаров в корзине
let cartItems = [];

// Отображение товаров в корзине
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
            productItem.innerHTML = 
                `<img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Цена: ${item.price} руб. ${item.discount > 0 ? `Скидка ${item.discount}%` : ''}</p>
                <p>Количество: ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Удалить из корзины</button>`;
            cartItemsContainer.appendChild(productItem);
        });
    }
}

// Удаление товара из корзины
function removeFromCart(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1); // Удаляем товар из массива
        // Обновляем localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems(); // Перерисовываем корзину
    }
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    // Получаем товары из localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
        cartItems = storedCartItems;
    }
    displayCartItems(); // Отображаем корзину при загрузке страницы
});

// Обработчик для кнопки "Добавить в корзину" в index.html
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = parseInt(event.target.dataset.id);
        addToCart(productId);
    });
});

// Добавление товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++; // Увеличиваем количество, если товар уже в корзине
    } else {
        cartItems.push({ ...product, quantity: 1 }); // Добавляем товар в корзину
    }

    // Сохраняем обновленный список товаров в localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Отображаем обновленные товары в корзине
    displayCartItems();
}

// Обработка формы оформления заказа
document.getElementById('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();

    // Считываем данные из формы
    const orderData = {
        id: Date.now(), // уникальный ID заказа
        date: new Date().toLocaleDateString(),
        items: cartItems.map(item => `${item.name} (${item.quantity})`),
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        deliveryDate: document.getElementById('delivery-date').value,
        deliveryTime: document.getElementById('delivery-time').value,
    };

    // Сохраняем заказ в localStorage (в массив заказов)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Очистка корзины после оформления заказа
    cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems(); // Обновляем корзину

    // Перенаправление на страницу профиля
    window.location.href = 'profile.html';
});
