// List VARIBALS - CONST

// List FUNCTIONS
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
                alert('WELCOME' + userInfo[0].LOGIN);
			}
		)

	}
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

});
