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
            <a href='#'>
                Женщинам
            </a>
        </li>
        <li>
            <a href='#'>
                Мужчинам
            </a>     
        </li>
        <li>
            <a href='#'>
            Детям  
            </a>
        </li>
        <li>
            <a href='#'>
                Новинки 
            </a>
        </li>
        <li>
            <a href='#'>
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
        <a href="#" class="active">Корзина</a>
    </div>
</div>
<hr>
<div class='header-top__main-info main-info'>
    <h1>НОВЫЕ ПОСТУПЛЕНИЯ ВЕСНЫ</h1>
    <h2>Мы подготовили для ВАС новинки сезона</h2>
    <a href='#'>Посмотреть новинки</a>
</div>
</header>
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
 * Закрытие формы
 * 1) Получить элемент формы из DOM дерева
 * 2) Удалить из дом дерева
 */
const switchForm = function(){
    document.querySelector('.overlay').classList.toggle('active');
}

const handlerBtnEnter = function(){
    switchForm();
}

const API = {
	query: function(queryString, method, callback){
		var xhr = new XMLHttpRequest();
		xhr.open(method, queryString, true);
		xhr.onload = function(){
		    callback(xhr.responseText);
		};
		xhr.send();
	},
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

const userSession = { 
    enter: (data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
    },
    remove: () => {
        sessionStorage.removeItem('user');
    }
}

const switchUserLogin = (login) => {
    document.querySelector('.control-panel__enter a').classList.toggle('active');
    if(GLOBAL_DATA['USER']['LOGIN'] == '')
        document.querySelector('.control-panel__enter .enter__login').innerText = '';
    else document.querySelector('.control-panel__enter .enter__login').innerText = `${login} (Выйти)`;
}


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

const validForm = () => {
    console.log('VALID')
    if(GLOBAL_DATA['USER']['LOGIN'] != '' && GLOBAL_DATA['USER']['PASSWORD'] != '')
        document.querySelector('#login input[type="submit"]').classList.add('active')
    else document.querySelector('#login input[type="submit"]').classList.remove('active')
}

// List Process 
document.addEventListener("DOMContentLoaded", function(){
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
        
    document.querySelector('.control-panel__enter .enter__login').addEventListener('click', event => {
        userSession.remove();
        GLOBAL_DATA['USER']['LOGIN'] = '';
        GLOBAL_DATA['USER']['PASSWORD'] = '';
        switchUserLogin()

    })

     /* document.forms.login.querySelectorAll("#login input[type='text']").addEventListener('oninput', event => {
        console.log('oninput', event);
     })*/

});