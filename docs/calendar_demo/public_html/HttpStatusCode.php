<?
class HttpStatusCode {
	public function __contruct($code, $msg){
		http_response_code($code);
		echo $msg;
		exit(); // 終止繼續執行
	}
}