GLOBAL_DATA['root'] = document.querySelector('.basket-index');

// delItem - Удаление товара из корзины в 5 шагов
const delItem = (id) => {
    // Получаем элемент дом дерева и удаляем его с верстки
    document.getElementById(id).remove();
    // Получаем из сессии список элементов в корзине
    const session = JSON.parse(sessionStorage.getItem('basket'));
    // По уникальному индентификатору элемента ID которого передали в функцию удаляем элемент объекта
    delete session[id];
    // Обновленную сессию перезаписываем
    sessionStorage.setItem('basket', JSON.stringify(session));
    // Получем из сессии ключи объекта, узнаем сколько в объекта элементов и рендерим на вестку количество элементов в сессии
    document.getElementById('count').innerText = Object.keys(session).length;
}

const renderItemBasket = (data) => {
    // Получает данные о товаре и выводит их в HTML форме
    return `
    <div id='${JSON.parse(data).ID}' class='basket-index__element element'>
        <h2>${JSON.parse(data).TITLE}</h2>
        <div class='element__container-img'>
            <img src='../img/goods/${JSON.parse(data).IMG}.jpeg'/>
        </div>
        <div class='element__price'>${JSON.parse(data).PRICE}</div>
        <div class='element__count'>${JSON.parse(data).countUser}</div>
        <div class='element__button-del'>
            <button onclick='delItem(${JSON.parse(data).ID})'>Удалить</button>
        </div>
    </div>
    `;
}

//Функция отправки данных на сервер (след. занятие) дополнить функцию
API.sendMailBasket = function(data, formData){
    // Получаем данные для сообщения
    console.log(JSON.parse(data))
    console.log(formData);
    //Формируем сообщение
    let message = `<div>`;
    message += '<p>Ваш заказ:</p>';
    Object.keys(JSON.parse(data)).forEach(function(index){
        message += `<div>
                ${JSON.parse(data)[index]['TITLE']}
        </div>`;
        message += `<div>
                ${JSON.parse(data)[index]['DISCR']}
        </div>`;
    })
    message += `</div>`;
    //Отправляем данные для отправки письма на сервер
    //debugger
    /*this.query(
        `http://inordic.alexweber.ru/api/index.php`,
        'POST',
        function(response){
            
             if(response)
                alert('Подписка успешно оформлена!');
             else alert('Ошибка на сервере!');
        },
        {messege: message, mail:formData['EMAIL'].value, action:'sendMail'}
    )*/
    $.ajax({
        url: "http://inordic.alexweber.ru/api/index.php",
        data: { mail: formData['EMAIL'].value, message:message, action: 'sendMail' }
      }).done(function(response) {
        console.log(response);
      });
};

//PROCESS
document.addEventListener("DOMContentLoaded", function(){
    //Шаг 1 - Получаем список товаров
    const listGood = JSON.parse(sessionStorage.getItem('basket'));
     //Шаг 2 - Перебираем список товаров
    Object.keys(listGood).forEach(function(index){
        //Шаг 3 - Рендер шаблона на форму
        GLOBAL_DATA['root'].innerHTML += renderItemBasket(listGood[index])
    })

    // Шаг 4 - Отправка заказа на почту
    document.forms.order.addEventListener('submit', event => {
        // preventDefault - Останавливает стандартное событие кнопки (отправку формы)
        event.preventDefault();
        console.log(event['target']['EMAIL']);

        API.sendMailBasket(
            sessionStorage.getItem('basket'), 
            event['target']
        );

    })

})
