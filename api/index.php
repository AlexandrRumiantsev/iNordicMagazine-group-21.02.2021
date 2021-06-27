<?

include_once __DIR__.'/models/IncludeModels.php';
/**
 * Оптимизировть 
 */

/*
switch ($_REQUEST['action']) {

	/* START actions for goods 
	case 'getAllGoods':

		$Goods = new Goods(
			[
				'action' => 'getList',
				'category' => false
			]
		);

		break;

	case 'addGood':

		$Goods = new Goods(
			[
				'action' => 'addItem',
				'data' => $_REQUEST['data']
			]
		);

		break;
	case 'delGood':

		$Goods = new Goods(
			[
				'action' => 'delItem',
				'id' => $_REQUEST['id']
			]
		);

		break;
	case 'uppGood':

		$Goods = new Goods;
		$Goods -> uppItem($_REQUEST['data']);

		break;
	case 'getItemGood':

		$Goods = new Goods;
		$Goods -> getItem($_REQUEST['id']);

		break;
	case 'delGoodList':

		$Goods = new Goods;
		$Goods -> delList(false);

		break;

	/* END actions for goods 

	case 'getAllUsers':

		$Users = new Users;
		$Users -> getList(false);

		break;

	case 'addUser':

		$Users = new Users;
		$Users -> addItem($_REQUEST['data']);

		break;

	case 'delUser':

		$User = new Users;
		$User -> delItem($_REQUEST['id']);

		break;

	case 'getItemUser':

		$Users = new Users;
		$Users -> getItem($_REQUEST['id']);

		break;

	case 'uppUser':

		$Users = new Users;
		$Users -> uppItem($_REQUEST['data']);

		break;

	case 'delUserList':

		$User = new Users;
		$User -> delList(false);

		break;

	default:

        echo 'ACTION NOT FOUND!';

		break;
}
//$User = new Goods;
//$User -> getList(false);
*/


switch ($_REQUEST['action']) {

	case 'sendMail':
	
		$to      = $_REQUEST['mail'];
	    $subject = 'Подписка на сайт SH';
	    
	    $message = '';
	    
	    if($_REQUEST['$message']) 
	    	$message = $_REQUEST['$message'];
	    else $message = 'Поздравляем вы подписаны на сайт SH';
	    
	    $headers = 'From: SH@mail.com'       . "\r\n" .
	                 'Reply-To: webmaster@example.com' . "\r\n" .
	                 'X-Mailer: PHP/' . phpversion();
	
	    $resultMess = mail($to, $subject, $message, $headers);
	    echo  $resultMess;
	break;
	case 'sendOrder':
            $order = (array)  json_decode($_REQUEST['order']);

            $messege .= '<h1>Ваш заказ:</h1>';
            $messege .= '<table>';
            foreach( $order as $itemOrder){
            	$itemOrder = json_decode($itemOrder);
                $messege .= '<tr><td>Название<td><td>'. $itemOrder->TITLE.'</td></tr>';
                $messege .= '<tr><td>Описание<td><td>'. $itemOrder->DISCR.'</td></tr>';
                $messege .= '<tr><td>Цена<td><td>'. $itemOrder->PRICE.'</td></tr>';
                $messege .= '<tr><td>Картинка<td><td> <img src="'.$_SERVER['SERVER_NAME'].'/img/catalog/'.$itemOrder->IMG.'.jpg"/></td></tr>';
                $messege .= '<tr><td>Категория<td><td>'. $itemOrder->category.'</td></tr>';
                $messege .= '<tr><td>Размеры<td><td>'. $itemOrder->sizes.'</td></tr>';
                $messege .= '<tr><td>Кол-во.<td><td>'. $itemOrder->countUser.'</td></tr>';
            }
            $messege .= '</table>';

            $subject = "Ваш заказ на сайте SH";
            $headers = "MIME-Version: 1.0" . "\r\n";
            
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            
            $resultMail = mail($_REQUEST['mail'], $subject, $messege, $headers);
            echo $resultMail;
       break;

	case 'getAllGoods':

		$Goods = new Goods(
			[
				'action' => 'getList',
				'category' => false
			]
		);

	break;
    
	case 'addUser':

		$Users = new Users(null);
		$Users -> addItem(json_encode($_REQUEST));

	break;
	
	case 'getUser':
    	
		$Users = new Users(null);
		$Users -> getItem(
			[
				[
					'FIELD' => 'LOGIN', 
					'VALUE' => $_REQUEST['LOGIN']
				],
				[
					'FIELD' => 'PASSWORD', 
					'VALUE' => $_REQUEST['PASSWORD']
				]
			]
		);

	break;

	case 'getItemGood':

		$Goods = new Goods([
        	'action' => 'getItemFromID',
          	'id' => $_REQUEST['id']
        ]);

	break;

	default:

        echo 'ACTION NOT FOUND!';

		break;
}

include_once 'form.php';
