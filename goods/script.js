const API = {
	query: function(queryString, method, callback){
		var xhr = new XMLHttpRequest();
		xhr.open(method, queryString, true);
		xhr.onload = function(){
		    callback(xhr.responseText);
		};
		xhr.send();
	},
	getAllGoods: function(login, password){

		this.query(
            `http://inordic.alexweber.ru/api/index.php?action=getAllGoods`,
			'GET',
			function(response){
                console.log(response)
				// Получить и отрисовать товары на верстке
			}
		)

	},
    getGoods : function(){

    }

}

// List Process 
document.addEventListener("DOMContentLoaded", function(){
    
    //Добавить а Объект API получение всех товаро и вывод(рендер) их на верстку
    API.getAllGoods()
});


/**
 * ДЗ 29ого занятия
 * 1) Склонировать проекты на домашний ПК
 * 2) Доделать вывод(рендер) списка товаров на верстку в строке 17
 */
