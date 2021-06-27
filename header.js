/**
 * Общая шапка сайта, которая используется на всех других страницах
 */
const local = 'file:///Users/aleksandr/Desktop/iNordicShop/';
document.write(`
<header class='header-top'>
<div class='header-top__logo-container logo-container'>
    <div class="logo-container__logo-item">
        SH
    </div>
</div>
<nav>
    <ul>
        <li>
            <a href="${local}catalog/index.html">
                Все товары
            </a>
            <a href='${local}catalog/index.html?category=woman'>
                Женщинам
            </a>
        </li>
        <li>
            <a href="${local}catalog/index.html?category=men">
                Мужчинам
            </a>     
        </li>
        <li>
            <a href="${local}catalog/index.html?category=children">
            Детям  
            </a>
        </li>
        <li>
            <a href="${local}catalog/index.html?category=new">
                Новинки 
            </a>
        </li>
        <li>
            <a href="${local}about/index.html">
                О нас  
            </a>
        </li>
    </ul>
</nav>
<div class='header-top__control-panel control-panel'>
    <div class='control-panel__enter enter'>
        <a href="#" class="active">Войти</a>
        <span class="enter__login"></span>
    </div>
    <div class='control-panel__basket'>
        <a href="${local}basket/index.html" class="active">
            Корзина
            <span id='count'>0</span>
        </a>
    </div>
</div>
</header>
<hr>
<div class='overlay'>
        <form id='login'>
            <div class='overlay__close' onClick='switchForm()'></div>
            <div class='overlay__modal modal'>
                <input placeholder='Логин' type='text' max='30' class='overlay__login' name='LOGIN'/>
                <input placeholder='Пароль' type='password' max='30' class='overlay__password' name='PASSWORD'/>
                <input type="submit" value='Войти'/>
                <div class='modal__error'></div>
            </div>
        </form>
</div>
`); 

/**
 * Глобальные данные, которые содержат информацию о пользователе и системные сообщения
 */
const GLOBAL_DATA = {
    USER: {
        LOGIN: '',
        PASSWORD: '',
    },
    DATA: {
        RU: {
            USER_NOT_FOUND: "Пользователь не найден в системе"
        }
    }
}

 /**
 * Закрытие и открытие формы для авторизации и регистрации пользователя в системе
 * 1) Получить элемент формы из DOM дерева
 * 2) Удалить из дом дерева
 */
const switchForm = function(){
    document.querySelector('.overlay').classList.toggle('active');
}

/**
 * Обработчик нажатия на кнопку - Войти
 */
const handlerBtnEnter = function(){
    switchForm();
}

/**
 * Объект для работы с внешним API сервисом
 */
const API = {
    /**
     * query -  Асинхронный запрос к серверу 
     */
	query: function(queryString, method, callback, params){
		var xhr = new XMLHttpRequest();
		xhr.open(method, queryString, true);
		xhr.onload = function(){
		    callback(xhr.responseText);
		};
        debugger
        if(params){
            xhr.send(params);
        }else xhr.send();
	},
    /**
     * getUserItem - Делает запрос к получения ползователя из АПИ и
     * если сервис возвращает нам данные о пользователе
     * то отрабатывает функция для логирования пользователя, 
     * в ином случае отрабывает displayError, которая выводит ошибку(пользователь не найден в системе)
     */
	getUserItem: function(login, password){

		this.query(
            `http://inordic.alexweber.ru/api/index.php?action=getUser&LOGIN=${login}&PASSWORD=${password}`,
			'GET',
			function(response){
				let userInfo = JSON.parse(response);
                //Остановились на 28 Занятии 
                if(userInfo.length == 0){
                    //Уведомление что данного польщователя нет в системе
                    displayError(GLOBAL_DATA.DATA.RU.USER_NOT_FOUND);
                }else{
                    loginUser(userInfo[0]);
                    GLOBAL_DATA['USER'] = userInfo[0]
                    //alert('WELCOME' + userInfo[0].LOGIN)
                }
			}
		)

	}
}

/**
 * userSession - Работает с сиссиями д JS
 * enter - Записывает сессию пользователя
 * remove - Удаляет сессию пользователя
 */
const userSession = { 
    enter: (data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
    },
    remove: () => {
        sessionStorage.removeItem('user');
    }
}

/**
 * userSession - Работает с сиссиями д JS
 * enter - Записывает сессию пользователя
 * remove - Удаляет сессию пользователя
 */
const switchUserLogin = (login) => {
    document.querySelector('.control-panel__enter a').classList.toggle('active');
    if(GLOBAL_DATA['USER']['LOGIN'] == '')
        document.querySelector('.control-panel__enter .enter__login').innerText = '';
    else document.querySelector('.control-panel__enter .enter__login').innerText = `${login} (Выйти)`;
}

/**
 * Основная функция логирования пользователя в системе
 */
const loginUser = (data) => {
    //Записываем данные в сессию
    userSession.enter(data);
    // После записи пользователя в сессею
    // 1) Убираем форму авторизации
    switchForm();
    // 2) Вместо кнопки войти, выводим логин пользователя
    switchUserLogin(data.LOGIN);
}

const displayError= (mess) => {
    /*
        1) Получить элемнт в который записываем уведомление
        2) Записать уведомление в элемент
    */ 
   document.getElementsByClassName('modal__error')[0].innerText = mess;

}

/**
 * Проверяем(валидируем) форму на пусстые значения
 */
const validForm = () => {
    console.log('VALID')
    if(GLOBAL_DATA['USER']['LOGIN'] != '' && GLOBAL_DATA['USER']['PASSWORD'] != '')
        document.querySelector('#login input[type="submit"]').classList.add('active')
    else document.querySelector('#login input[type="submit"]').classList.remove('active')
}

// List Process 
document.addEventListener("DOMContentLoaded", function(){
    if(sessionStorage.getItem('basket'))
        document.getElementById('count').innerText = Object.keys(JSON.parse(sessionStorage.getItem('basket'))).length;
    else document.getElementById('count').innerText = 0;
    /**
     * Обработчик Нажатия на кнопку - Войти
     */
    document.querySelector('.control-panel__enter a').addEventListener('click', event => {
        //При клике срабатывает функция handlerBtnEnter 
        handlerBtnEnter();
    })

    /**
     * Обработчик Отправки формы на сервер - Кнопка Войти на форме 
     */
    document.forms.login.addEventListener('submit', event => {
        // preventDefault - Останавливает стандартное событие кнопки (отправку формы)
        event.preventDefault();

        /**
         * Отправка данных введенных пользователем на сервер
         */
        API.getUserItem(
            event.target[0].value,
            event.target[1].value
        )

    })

    /**
     * Обработчик события ввода текста в элементы формы
     */
        const formInputs =  document.forms.login.querySelectorAll("#login input:not(input[type='submit'])"); 
        Object.keys(formInputs).forEach(element => {
            console.log(formInputs[element]);
            formInputs[element].oninput  = (event) => {
                GLOBAL_DATA['USER'][event.target.name] = event.target.value;
                validForm();
            }
        })
    
    /**
     * Сброс авторизации(разлогин) пользователя в системе
     */
    document.querySelector('.control-panel__enter .enter__login').addEventListener('click', event => {
        userSession.remove();
        GLOBAL_DATA['USER']['LOGIN'] = '';
        GLOBAL_DATA['USER']['PASSWORD'] = '';
        switchUserLogin()

    })

});