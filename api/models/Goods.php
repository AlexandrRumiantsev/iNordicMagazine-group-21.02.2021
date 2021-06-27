<?
/**
 * Class Goods extends AbstractModel
 *
 * OBJECT for worked with table in data base
 *
 * Methods:
 * 1) addItem() - add user to data base
 * 2) delItem() - del user from data base
 * 3) uppItem() - uppdata user from data base
 * 4) getItem() - get user from data base
 * 5) getList() - get list user from data base
 * 6) delList() - del list user from data base
 * Here is an inline example:
 * Get All goods 
 getAllGoods
 http://192.168.64.3/?action=getAllGoods
 * Add good: 
   http://192.168.64.3/?action=addGood&data={%22ID%22:%221%22,%22TITLE%22:%22\u041a\u0443\u0440\u0442\u043a\u0430%20Adidas%22,%22DISCR%22:%22\u041d\u043e\u0432\u0430\u044f%20\u043a\u0443\u0440\u0442\u043a\u0430,%20\u043f\u043e%20\u0441\u0442\u0430\u0440\u043e\u0439%20\u0446\u0435\u043d\u0435.%22,%22COUNT%22:%2212%22,%22PRICE%22:%2215000%22}
* Del good:
  http://192.168.64.3/?action=delGood&id=1
* Edit good:
  http://192.168.64.3/?action=uppGood&data={%22ID%22:%2260aa1984b43dc%22,%22TITLE%22:%22xxxxxxxxxxx%22,%22DISCR%22:%22\u041d\u043e\u0432\u0430\u044f%20\u043a\u0443\u0440\u0442\u043a\u0430,%20\u043f\u043e%20\u0441\u0442\u0430\u0440\u043e\u0439%20\u0446\u0435\u043d\u0435.%22,%22COUNT%22:%2212%22,%22PRICE%22:%2215000%22}
 */

class Goods extends AbstractModel
{
	public $TableName = "goods";

	public $info = [
        'sql_get_list' => "SELECT * FROM goods"
    ];

	public function addBasket(){

	}
	public function delBasket(){

	}
	public function getForCategory(){

	}
	public function addItem($data){


		$id = uniqid();
		$title = json_decode($data)-> TITLE;
		$discr = json_decode($data)-> DISCR;
		$count = json_decode($data)-> COUNT;
		$price = json_decode($data)-> PRICE;

		 $sql = "INSERT INTO `$this->TableName` 
			 (`ID`, `TITLE`, `DISCR`, `COUNT`, `PRICE`) 
			 	VALUES 
			 ('$id', '$title', '$discr', '$count', '$price')";

        $connect = parent::connect();
        $result = $connect->query($sql);
        if($result){
            echo 'Товар успешно добавлен!';
        }else  echo 'Произошла ошибка при добавлении товара!';



	}
    public function delItem($id){
        $sql = "DELETE FROM `$this->TableName` WHERE ID='$id'";
        var_dump($sql);
        $connect = parent::connect();
        $result = $connect->query($sql);
        if($result){
            echo 'Товар успешно удален!';
        }else  echo 'Произошла ошибка при удалении товара!';
    }
  	public function getItemFromID($id){

		$sql = "SELECT * FROM `$this->TableName` WHERE ID='$id'";
        $connect = parent::connect();
        $result = $connect->query($sql);
        $this -> includeTemplate($result);
      
    }
    public function getItem($data){

		$first_fild = $data[0]['FIELD'];
		$firs_val = $data[0]['VALUE'];

		$sql = "SELECT * FROM `$this->TableName` WHERE $first_fild='$firs_val'";
        $connect = parent::connect();
        $result = $connect->query($sql);
        $this -> includeTemplate($result);
    }
    public function uppItem($data){

		$id = json_decode($data)-> ID;
    	$title = json_decode($data)-> TITLE;
		$discr = json_decode($data)-> DISCR;
		$count = json_decode($data)-> COUNT;
		$price = json_decode($data)-> PRICE;

    	$sql = "
    		UPDATE `$this->TableName` 
    			SET 
	    			TITLE = '$title', 
	    			DISCR = '$discr', 
	    			COUNT = '$count',
	    			PRICE = '$price'
    		WHERE ID='$id'
    		";


        $connect = parent::connect();
        $result = $connect->query($sql);
        if($result){
            echo 'Товар успешно отредактирован!';
        }else  echo 'Произошла ошибка при редактирование товара!';
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
            echo 'Таблица товаров успешно очищена!';
        }else  echo 'Произошла ошибка при очищении таблицы товаров!';
    }
    function __construct($data){

    	switch ($data['action']) {
    		case 'getList':
    			$this->getList(false);
    			break;

    		case 'addItem':

    			$this->addItem($data['data']);
    			break;

    		case 'delItem':

				$this->delItem($data['id']);
    			break;
            case 'getItemFromID':

            	$this->getItemFromID($data['id']);
                break;
    		
    		default:
    			# code...
    			break;
    	}

    }
}