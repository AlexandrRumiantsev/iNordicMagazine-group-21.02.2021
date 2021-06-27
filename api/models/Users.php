<?
/*

Добавление Пользователя 
http://192.168.64.3/?action=addUser&data={%22FIO%22:%22xxxx%22,%22ADDR%22:%20%22TEST%22,%22PHONE%22:%22123213123%22}

Обновление пользователя
http://192.168.64.3/?action=uppUser&data={"ID":"60aa2aff8a578","FIO":"New TEXT","ADDR":"xxx","PHONE": "XXX"}

*/

class Users extends AbstractModel
{
    public $TableName = "users";

    public $info = [
        'sql_get_list' => "SELECT * FROM users"
    ];

    public function addItem($data){
        $id = uniqid();

        $fio = json_decode($data) -> FAMILY .json_decode($data) -> NAME .json_decode($data) -> LASTNAME ;
        $name = json_decode($data) -> NAME;
        $family = json_decode($data) -> FAMILY;
        $lastname = json_decode($data) -> LASTNAME;
        $mail = json_decode($data) -> MAIL;
        $login = json_decode($data) -> LOGIN;
        $password = json_decode($data) -> PASSWORD;
        $img = json_decode($data) -> IMG;
        $addr = json_decode($data) -> ADDR;
        $tel = json_decode($data) -> PHONE;

        $sql = "INSERT INTO `$this->TableName` (`ID`, `FIO`, `NAME`, `FAMILY`, `LASTNAME`, `LOGIN`, `PASSWORD`, `IMG`, `ADDR`, `PHONE`) VALUES ('$id', '$fio', '$name', '$family', '$lastname', '$login', '$password', '$img', '$addr', '$tel')";
        $connect = parent::connect();
        $result = $connect->query($sql);
        if($result){
            echo 'Пользователь успешно добавлен!';
        }else  echo 'Произошла ошибка при добавлении пользователя!';
    }
    public function delItem($id){
        $sql = "DELETE FROM `$this->TableName` WHERE ID='$id'";
        $connect = parent::connect();
        $result = $connect->query($sql);
        if($result){
            echo 'Пользователь успешно удален!';
        }else  echo 'Произошла ошибка при удалении пользователя!';
    }
    public function getItem($data){
      

      $connect = parent::connect();

      
  

        $sql = "SELECT * FROM `$this->TableName` WHERE ";

        foreach ($data as $key => $value) {
            $field = $value['FIELD'];
            $value = $value['VALUE'];
            $sql .= "$field = '$value'";
            if($key+1 != count($data)){
                $sql .= " AND ";
            }
        }

        $connect = parent::connect();
        $result = $connect->query($sql);
        $this -> includeTemplate($result);
       
    }
    public function uppItem($data){
        $id = json_decode($data)-> ID;
        $fio = json_decode($data)-> FIO;
        $addr = json_decode($data)-> ADDR;
        $phone = json_decode($data)-> PHONE;

        $sql = "
            UPDATE `$this->TableName` 
                SET 
                    FIO = '$fio', 
                    ADDR = '$addr', 
                    PHONE = '$phone'
            WHERE ID='$id'
            ";


        $connect = parent::connect();
        $result = $connect->query($sql);
        if($result){
            echo 'Пользователь успешно отредактирован!';
        }else  echo 'Произошла ошибка при редактирование пользователя!';
    }
    public function getList($categoryId=false){
        $connect = parent::connect();
        $result = $connect->query(
            $this -> info['sql_get_list']
        );
        $this->includeTemplate($result);
    }

    public function delList($categoryId=false){
        $sql = "DELETE FROM `$this->TableName`";
        $connect = parent::connect();
        $result = $connect->query($sql);
        if($result){
            echo 'Таблица пользователей успешно очищена!';
        }else  echo 'Произошла ошибка при очищении таблицы пользователей!';
    }
    
   


    

    function __construct($data){





    }
}
