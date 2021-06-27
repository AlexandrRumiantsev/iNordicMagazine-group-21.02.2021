document.write(`
    <footer>
        <div class='block'>
            <div class='content'>
            <h2>КОЛЛЕКЦИИ</h2>
                <ul>
                    <li>
                        <a href="${local}catalog/index.html">Все(<span id='ALL'></span>)</a>
                    </li>
                    <li>
                        <a href='${local}catalog/index.html?category=woman'>Женщинам(<span id='WOMAN'></span>)</a>
                    </li>
                    <li>
                        <a href="${local}catalog/index.html?category=men">Мужчинам(<span id='MEN'></span>)</a>
                    </li>
                    <li>
                        <a href="${local}catalog/index.html?category=children">Детям(<span id='CHILDREN'></span>)</a>
                    </li>
                    <li>
                        <a href="${local}catalog/index.html?category=new">Новинки(<span id='NEW'></span>)</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class='block'>
            <div class='content'>
                <h2>МАГАЗИН</h2>
                <ul>
                    <li>
                        <a href='#'>О нас</a>
                    </li>
                    <li>
                        <a href='#'>Доставка</a>
                    </li>
                    <li>
                        <a href='#'>Контакты</a>
                    </li>
                    <li>
                        <a href='#'>Работа с нами</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class='block'>
            <div class='content'>
                <h2>МЫ В СОЦИАЛЬНЫХ СЕТЯХ</h2>
                <p>Сайт разработан в <a href='https://inordic.ru' target='_blank'>inordic.ru</a></p>
                <p>2018 - ${new Date().getFullYear()} @ Все права защищены</p>
                <div class='box-sohial'>
                    <a href='https://www.facebook.com' target='_blank' rel="nofollow">
                        <span>
                            f
                        </span>
                    </a>
                    <a href='https://twitter.com/?lang=en' target='_blank' rel="nofollow">
                        <span>
                            t
                        </span>
                    </a>
                    <a href='https://www.instagram.com' target='_blank' rel="nofollow">
                        <span>
                            i
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
`);

const sortByCategoryFooter = (data, callback) => {

    // Инициализируем пустой массив для заполнениями товарами по категориям
   const sortArr = {};
   /* Перебираем массив в цикле */
   data.forEach( (element) => {
        if(sortArr[element['CATEGORY']] == undefined || sortArr[element['CATEGORY']] == 'undefined'){
            sortArr[element['CATEGORY']] = [];
            sortArr[element['CATEGORY']].push(element);
        } else {
            sortArr[element['CATEGORY']].push(element);
        }
   });
   callback(sortArr, data)
   return sortArr;
}

API.getGoodsForCategory = function(login, password){
    //2 ШАГ- Происходит запрос к API сервису для получения всех товаров
   this.query(
       `http://inordic.alexweber.ru/api/index.php?action=getAllGoods`,
       'GET',
       function(response){
            sortByCategoryFooter(
                JSON.parse(response),
                function(array, oldArray){
                    if(array['WOMAN'])
                        document.getElementById('WOMAN').innerText = array['WOMAN'].length;
                    else document.getElementById('WOMAN').innerText = 0;
                    if(array['MEN'])
                        document.getElementById('MEN').innerText = array['MEN'].length;
                    else document.getElementById('MEN').innerText = 0;
                    if(array['CHILDREN'])
                        document.getElementById('CHILDREN').innerText = array['CHILDREN'].length;
                    else document.getElementById('CHILDREN').innerText = 0;
                    if(array['NEW'])
                        document.getElementById('NEW').innerText = array['NEW'].length;
                    else document.getElementById('NEW').innerText = 0;
                    if(oldArray)
                        document.getElementById('ALL').innerText = oldArray.length;
                    else document.getElementById('ALL').innerText = 0;
                }
            );
       }
   )

}

// List Process 
document.addEventListener("DOMContentLoaded", function(){
    API.getGoodsForCategory();
})