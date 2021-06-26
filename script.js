// List VARIBALS - CONST
GLOBAL_DATA;
// List FUNCTIONS
API.sendMailMain = function(mail, message){
    //Отправляем данные для отправки письма на сервер
    this.query(
        `http://inordic.alexweber.ru/api/index.php?action=sendMail&mail=${mail}&messege=${message}`,
        'POST',
        function(response){
            
             if(response)
                alert('Подписка успешно оформлена!');
             else alert('Ошибка на сервере!');
        }
    )
}

// List Process 
document.addEventListener("DOMContentLoaded", function(){

   //Отправку почтового сообщения
   /**
    * Обработчик нажатия на "ЗАПИСАТЬСЯ" на главной странице
    */
   document.forms.mail_form.addEventListener('submit', event => {
    // preventDefault - Останавливает стандартное событие кнопки (отправку формы)
    event.preventDefault();
    //Передаем имэйл с формы введенный пользователем в метов sendMail объекта API
    API.sendMailMain(
        event['target']['offer'].value
    )

   })
   

});

