//CONST
const rootItem = document.querySelector('.good-index');
//METHODS
/**
 * Получение гет параметров из адресной строки
 */
 var params = window
 .location
 .search
 .replace('?','')
 .split('&')
 .reduce(
     function(p,e){
         var a = e.split('=');
         p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
         return p;
     },
     {}
 );

 const resetAllActive = function(id){
    console.log('RESET');
    Object.keys(
        document.querySelectorAll('.sizes-block__item')
    ).forEach(function(key){
        document.querySelectorAll('.sizes-block__item')[key].classList.remove('active');
    })
 }

 const enterSize = function(id){
    resetAllActive();
    document.getElementById(id).classList.toggle('active');
 }
 const choiceCount = function(operation, count){
    let result;
    let numberNow = parseInt(document.getElementById('result-count').innerText);
    if(operation == '+' && numberNow < count){
        result = numberNow + 1;
        document.getElementById('result-count').innerText = result;
    }
        
    if(operation == '-' && numberNow !== 0){
        result = numberNow-1;
        document.getElementById('result-count').innerText = result;
    }
        

    
 }

 const basketSession = { 
    enter: (data) => {
        let newData = data;
        let session;
        //Изначально нужно проверить, есть ли в баскете данный товар
        if(sessionStorage.getItem('basket'))
             session = JSON.parse(sessionStorage.getItem('basket'));
        else session = {}
        session[newData['ID']] = JSON.stringify(newData);
        console.log(session);
        sessionStorage.setItem('basket', JSON.stringify(session));
    },
    remove: () => {
        sessionStorage.removeItem('basket');
    }
}

 const addBasket = function(){
    //Получить данные о выбранном количестве товара и размере
    const countGood = document.getElementById('result-count').innerText;
    //Получить выбранный размер
    const currentSize = document.querySelector('.sizes-block__item.active');

    if(currentSize){
        console.log('Общие данные', GLOBAL_DATA['curentGood']);
        console.log('Выбранное кол-во товара', countGood);
        console.log('Выбранный размер', currentSize.innerText);
        GLOBAL_DATA['curentGood']['countUser'] = countGood;
        GLOBAL_DATA['curentGood']['sizeUser'] = currentSize.innerText;

        // Сохраняем данные
        basketSession.enter(GLOBAL_DATA['curentGood']);
        document.getElementById('count').innerText = parseInt(document.getElementById('count').innerText) + 1;
    }else alert('Укажите размер товара!');

    
 
}
 
 const renderItemGood = function(data){
    let sizesBlock = '<div class="sizes-block">';
    Object.keys(JSON.parse(data.SIZES)).forEach(function(key, index){
        JSON.parse(data.SIZES)[key];
        sizesBlock += 
        `<div 
            class="sizes-block__item" 
            id="size-${JSON.parse(data.SIZES)[index]}"
            onClick="enterSize('size-${JSON.parse(data.SIZES)[index]}')"
            >
                ${JSON.parse(data.SIZES)[key]}
        </div>`;
    })
    sizesBlock += '</div>';

    GLOBAL_DATA['curentGood'] = data;

    rootItem.innerHTML = `
        <div data-id='${data.ID}' class='good-index__item item'>
            <div class='item__container-img'>
                <img src='../img/goods/${data.IMG}.jpeg'/>
            </div>
            <div class='item__container-info'>
                <h1>${data.TITLE}</h1>
                <h2>${data.DISCR}</h2>
                <div class='item__price'>${data.PRICE}</div>
                <div class='item__count'>
                    Кол-во товаров на складе:${data.COUNT}
                </div>
                <div class='item__count-choise'>
                    <span onClick="choiceCount('-', ${data.COUNT})">-</span>
                    <span id='result-count'>0</span>
                    <span onClick="choiceCount('+', ${data.COUNT})">+</span>
                </div>
                ${sizesBlock}
                <button onClick="addBasket()">Добавить в корзину</button>
            </div>
        </div>
    `;
 }

/**
 * 
 */
API.getItemGood = function(id){
    //2 ШАГ- Происходит запрос к API сервису для получения единицы товара
   this.query(
       `http://inordic.alexweber.ru/api/index.php?action=getItemGood&id=${id}`,
       'GET',
       function(response){
            // 3 Шаг - Отрисовка товара по данных полученым от сервера
            renderItemGood(JSON.parse(response)[0]);

       }
   )
   // 3 ШАГ - ОТрисовка товара на странице детализации
   /*renderItemGood({
       ID: 1,
       TITLE: 'Куртка',
       DISCR: 'Описание товара',
       COUNT: '12',
       PRICE: '30 000 р.',
       IMG: 'blue-k.jpeg'
   })*/

}

//PROCESS
document.addEventListener("DOMContentLoaded", function(){
    //1 ШАГ Запрашиваем единицу товара
    //1.1 ШАГ Необходимо получить уникальный идентификатор товара для отправки запроса на сервер
    const ID = params['id'];
    //1.2 ШАГ Получение информации о товаре путем запроса к API сервису
    API.getItemGood(ID);

});