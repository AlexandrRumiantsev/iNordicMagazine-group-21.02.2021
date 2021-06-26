GLOBAL_DATA.countPage = 1;
GLOBAL_DATA.nowPage = 1;
GLOBAL_DATA.sortArray = [];
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

/**
 * Шаблон карточки товара на странице каталога
 * @example
 * templateGood(data);
 * @param data - Информация о товаре
 * @returns {Number} Returns шаблон карточки товара в виде строки
 */
const templateGood = function(data){
    return `
            <a href="../good/index.html?id=${data.ID}">
                <div class='main-index__good'>
                    <img src='../img/goods/${data.IMG}.jpeg'/>
                    <h2>${data.TITLE}</h2>
                    <div>${data.DISCR}</div>
                </div>
            </a>
        `
}

/**
 * 
 * @example
 * changePagination(numb);
 * @param data - Информация о товаре
 * @returns {Number} Returns шаблон карточки товара в виде строки
 */
const changePagination = (numb) => { 

    //4 ШАГ - Обрабатываем событие по изменение страницы элементов в соответствии с навигационный индексом

    GLOBAL_DATA.nowPage = numb;
    //4.1 Предворительно очистить форму для нового рендера
    document.querySelector('.main-index').innerHTML = '';
    //4.2 Предворительно очистить контейнер для пагинации
    document.querySelector('.pagination-container').innerHTML = '';

    //Констыль с новым значением УБРАТЬ!
    //4.3 Заново генерируем и отрисовываемм пагинацию
    createPagination(2);



    // 4.4 Перебериаем повторно отортированный массив и заново отрисовываем элементы
    GLOBAL_DATA.sortArray[GLOBAL_DATA.nowPage - 1].forEach( (element, index) => {

        if(GLOBAL_DATA.countPage > index)
            document.querySelector('.main-index').innerHTML += templateGood(element);
    
    });


}

const renderPagElement = (numb) => {
    return `
        <span ${ GLOBAL_DATA.nowPage == numb ? `class='active'` : `onClick='changePagination(${numb})'`} >
            ${numb}
        </span>
    `
}

const createPagination = (count) => {
    //Метод для формирования и отрисовки пагинации
    for(let i = 0; i < count; i++)
        document.querySelector('.pagination-container').innerHTML += renderPagElement(i+1);
}

//Подготавливать массив данных вв соответствии с текущей страницев для пагинации
const sortForPagination = (count, data) => {
    /**
        У нас есть:
        - Общее кол-во страниц
        - Кол-во страниц, которые должны отображатся на 1 странице
     */
    let counterElem = 0;
    let counterCell = 0;
    data.forEach(function(element){

        if(counterElem == GLOBAL_DATA.countPage){
            counterCell++;
            counterElem = 0;
        }

        if(!GLOBAL_DATA.sortArray[counterCell])
            GLOBAL_DATA.sortArray[counterCell] = [];

        GLOBAL_DATA.sortArray[counterCell][counterElem] = element;

        counterElem++;
    })
    
}

const sortByCategory = (data, caterory) => {
    // Инициализируем пустой массив лоя заполнениями товарами из нужной категории
   const sortArr = [];
   const category = caterory.toUpperCase();
   /* Перебираем массив в цикле */
   data.forEach( (element, index) => {
        // Заполняем sortArr в соответствии с категорией из ГЕТ параметр
        //console.log(element['CATEGORY']);
        if(element['CATEGORY'] == category){
            sortArr.push(element);
        }
   })
   return sortArr;
}

const emptyRenderGoods = () => {
    document.querySelector('.main-index').innerHTML = `<h1>В данной категории нет товаров</h1>`
}

const renderGoods = (data) => {
    /* 
       3.0 Так как нужно выводить товары по категориям, обработаем массив в сама начале.
       Получаем массив с товарами из нужной категории
    */
    const category = params['category'];
    let goodList = null;
    // 3.1 Если категория в параметре есть - мы сортируем основной массив, если нет - то остовляем начальные данные
    if(params['category'])
        goodList = sortByCategory(JSON.parse(data), category);
    else goodList = JSON.parse(data);

    //3.2 Общее кол-во товаров
    const countGood = goodList.length;

    if(countGood == 0){
        emptyRenderGoods()
    }else{
        //3.3 Получаем количество элементов пагинации, которые нам необходимо отрисовать
        const countPagBlock = goodList.length / GLOBAL_DATA.countPage;
        //3.4 Отрисовать элемент - Пагинация, передав в метод отрисовки кол-во элементов
        createPagination(countPagBlock)
        //3.5 Сортируем массив с товарами для дальнейшей отрисовки в соответствии со страницей
        sortForPagination(countGood, goodList);

        // 3.6 Перебераем отсоортированный массив и рендерим на форму
        GLOBAL_DATA.sortArray[GLOBAL_DATA.nowPage - 1].forEach( (element, index) => {

            document.querySelector('.main-index').innerHTML += templateGood(element);
        
        });
    }
    
}

API.getAllGoods = function(login, password){
     //2 ШАГ- Происходит запрос к API сервису для получения всех товаров
	this.query(
        `http://inordic.alexweber.ru/api/index.php?action=getAllGoods`,
		'GET',
		function(response){
			// Получить и отрисовать товары на верстке, предварительно передаем данные в функцию рендера
            //3 ШАГ - Отрисовываем данные на странице
            renderGoods(response)
		}
	)

}

// List Process 
document.addEventListener("DOMContentLoaded", function(){
    
    //Добавить а Объект API получение всех товаро и вывод(рендер) их на верстку
    //1 - ШАГ Получаем все товары
    API.getAllGoods();



});


/**
 * ДЗ 29ого занятия
 * 1) Склонировать проекты на домашний ПК
 * 2) Доделать вывод(рендер) списка товаров на верстку в строке 17
 */
