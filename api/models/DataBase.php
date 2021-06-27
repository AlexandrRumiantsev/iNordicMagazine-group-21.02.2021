<?
/**
 * Class DataBase
 *
 * OBJECT for worked with data base
 *
 * Methods:
 * 1) connect() - return connect with data base
 */
class DataBase{

    private $HOST = 'localhost';
    private $LOGIN = 'cl45527_shop';
    private $PASSWORD = 'NP5f1dEZ';
    private $BASE_NAME = 'cl45527_shop';

    public function connect(){
        $mysqli = new mysqli(
            $this->HOST, 
            $this->LOGIN, 
            $this->PASSWORD, 
            $this->BASE_NAME
        );
        if ($mysqli->connect_errno) {
            return  "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
        }else return $mysqli;
    }
}