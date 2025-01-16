// Функция для получения заказов из localStorage
function getOrdersFromLocalStorage() {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
}

// Массив с заказами пользователя
let orders = getOrdersFromLocalStorage(); // Загружаем заказы из localStorage

// Отображение заказов
function displayOrders() {
    const ordersTableBody = document.querySelector('#orders-table tbody');
    ordersTableBody.innerHTML = ''; // Очищаем таблицу

    orders.forEach(order => {
        const orderRow = document.createElement('tr');
        orderRow.innerHTML = 
            `<td>${order.id}</td>
            <td>${order.date}</td>
            <td>${order.items.join(', ')}</td>
            <td>${order.total} руб.</td>
            <td>${order.deliveryDate} (${order.deliveryTime})</td>
            <td>
                <button onclick="viewOrder(${order.id})">Просмотр</button>
                <button onclick="editOrder(${order.id})">Редактирование</button>
                <button onclick="deleteOrder(${order.id})">Удаление</button>
            </td>`;
        ordersTableBody.appendChild(orderRow);
    });
}

// Просмотр заказа
function viewOrder(orderId) {
    const order = orders.find(order => order.id === orderId);
    document.getElementById('view-order-details').textContent = 
        `№${order.id} - ${order.date}\n` +
        `Состав: ${order.items.join(', ')}\n` +
        `Итоговая стоимость: ${order.total} руб.\n` +
        `Дата доставки: ${order.deliveryDate} (${order.deliveryTime})`;
    openModal('view-modal');
}

// Редактирование заказа
function editOrder(orderId) {
    const order = orders.find(order => order.id === orderId);
    document.getElementById('edit-items').value = order.items.join(', ');
    document.getElementById('edit-total').value = order.total;
    document.getElementById('edit-delivery-date').value = order.deliveryDate;
    document.getElementById('edit-delivery-time').value = order.deliveryTime;

    // Обработчик для формы редактирования
    document.getElementById('edit-order-form').onsubmit = function(event) {
        event.preventDefault();
        order.items = document.getElementById('edit-items').value.split(', ');
        order.total = document.getElementById('edit-total').value;
        order.deliveryDate = document.getElementById('edit-delivery-date').value;
        order.deliveryTime = document.getElementById('edit-delivery-time').value;
        saveOrdersToLocalStorage(orders); // Сохраняем изменения в localStorage
        closeModal('edit-modal');
        displayOrders(); // Обновляем таблицу
    };

    openModal('edit-modal');
}

// Удаление заказа
function deleteOrder(orderId) {
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
        orders.splice(orderIndex, 1); // Удаляем заказ из массива
        saveOrdersToLocalStorage(orders); // Сохраняем обновленный массив в localStorage
        displayOrders(); // Перерисовываем таблицу
        closeModal('delete-modal');
    }
}

// Сохранение заказов в localStorage
function saveOrdersToLocalStorage(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Открытие модального окна
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Закрытие модального окна
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', displayOrders);
