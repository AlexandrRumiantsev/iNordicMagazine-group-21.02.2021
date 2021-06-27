<?
//https://www.php.net/manual/ru/language.oop5.abstract.php

abstract class AbstractModel extends Database
{
    public $TableName;
    public $info = [];
   /* Данный метод должен быть определён в дочернем классе */
    abstract public function addItem($data);
    abstract public function delItem($id);
    abstract public function getItem($data);
    abstract public function uppItem($data);
    abstract public function getList($categoryId=false);
    abstract public function delList($categoryId=false);

    public function includeTemplate($result){
      echo json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC));
      //include_once "templates/".$this -> getModel().".php";  
    }
    public function getModel(){
      return ucfirst($this -> TableName);  
    }
    public function getConnect() {
        return parent::connect();
    }
    public function getTableName() {
        return $this->TableName;
    }
    public function setTableName($tableName) {
        $this->TableName = $tableName;
    }
    public function getInfo() {
        return $this->info;
    }
    public function setInfo($index, $value) {

        $this->info[$index] = $value;

    }
}