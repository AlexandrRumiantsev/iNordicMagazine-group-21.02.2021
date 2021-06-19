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

 const renderItemGood = function(data){
    rootItem.innerHTML = `
        <div data-id='${data.ID}' class='good-index__item item'>
            <div><img src='../img/goods/${data.IMG}.jpeg'/></div>
            <h1>${data.TITLE}</h1>
            <h2>${data.DISCR}</h2>
            <div>${data.PRICE}</div>
            <div>${data.COUNT}</div>
        </div>
    `;
 }

/**
 * 
 */
API.getItemGood = function(id){
    //2 ШАГ- Происходит запрос к API сервису для получения единицы товара
   this.query(
       `http://inordic.alexweber.ru/api/index.php?action=getItemGood&id=1`,
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