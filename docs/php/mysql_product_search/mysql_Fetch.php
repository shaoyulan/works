<HTML>
	<HEAD>
		<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf8">
		<TITLE>顯示欄位資訊</TITLE>
		<style>
			form{
				width: 60%;
				margin: 0 auto;
			}
			table{
				border:1px solid black;
			}
			table:last-child tr td:last-child{
				text-align: right;
			}
		</style>
	</HEAD>
	<BODY>
		<?php
			// Basic Setting
			$DB_NAME = 'b13_22914069_php_product_search';
			$TABLE_NAME = 'price';
			$MYSQL_SERVER = 'sql300.byethost.com';
			$USER_NAME = 'b13_22914069';
			$PASSWORD = 'codeforme';
			// End of Basic Setting



			echo "<form action='".$_SERVER['PHP_SELF']."' method='post'>";
			echo "<h1>產品資訊查詢</h1>";
			$link = mysql_connect("{$MYSQL_SERVER}", "{$USER_NAME}", "{$PASSWORD}");
			if(!$link){echo "Database connection fail";};
			$db_selected = mysql_select_db("{$DB_NAME}", $link);
			if(!$db_selected){echo "Table connection fail";};

			// 取得資料表的欄位數量
			$DB_SQL = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '{$DB_NAME}' AND TABLE_NAME = 'price'";
			$DB_SQL_RESULT = mysql_query($DB_SQL,$link);
			$DB_SQL_COL_NUM = mysql_num_rows($DB_SQL_RESULT); // 欄位數量
			
			echo "<table>";
			for ($i=0; $i <$DB_SQL_COL_NUM ; $i++) { 
				// echo $i."->".mysql_result($DB_SQL_RESULT,$i); // 印出所有欄位名稱
				
				$col_name = mysql_result($DB_SQL_RESULT,$i);
				// SQL query
				$sql_nuique = $sql_unique_.$col_name; 
				$sql_nuique = "SELECT DISTINCT {$col_name} FROM `price`";

				// Query execute
				$result_unique = $result_unique_.$col_name;
				$result_unique = mysql_query($sql_nuique,$link);
				// Query number of rows
				$count = $count_.$col_name;
				$count= mysql_num_rows($result_unique);

				// 印出搜尋欄位選項
				
				echo "<tr><td>請選擇".$col_name."：</td><td><select name='".$col_name."'>";
				echo  "<option value='' >無</option>"; //印出空直
				for ($s=0; $s <$count ; $s++) { 
					$option = mysql_result($result_unique, $s);
					echo  "<option value='".$option."'>".$s.".".$option."</option>";
				}
				echo "</select></td></tr>";
			}
			echo "</table>";
			// 印出價格輸入欄位
			echo "<p>從價格<input type='text' name='from'>元，到";
			echo "價格<input type='text' name='to'>元</p>";
			echo "<input type='submit'>";
				

			if (isset($_POST['brand']) and isset($_POST['category']) and isset($_POST['from']) and isset($_POST['to'])){

				$from=$_POST['from'];$to=$_POST['to'];
				// 組合 SQL command 
				for ($i=0; $i <$DB_SQL_COL_NUM ; $i++) { 
					$col_name = mysql_result($DB_SQL_RESULT,$i);
					if(isset($_POST["$col_name"])){
						if($_POST["$col_name"]<>""){
							if($SQL_piece){
								$SQL_piece .= " AND ".$col_name."='".$_POST["$col_name"]."'";
							}else{
								$SQL_piece .= " ".$col_name."='".$_POST["$col_name"]."'";
							}
						}
					}
				}
				$SQL_first_piece = "SELECT * FROM price WHERE";
				$SQL_last_piece = " AND price BETWEEN {$from} AND {$to}";
				$sql = $SQL_first_piece.$SQL_piece.$SQL_last_piece;

				echo "<p><fieldset>";
				echo "<legend>執行的SQL如下</legend>";
				echo $sql;
				echo "</fieldset></p>";
				// query
				$result = mysql_query($sql,$link);

				// Query number of rows 取得資料筆數
				$count_searchResult = mysql_num_rows($result);
				
				echo "<h2>查詢結果如下，共取得".$count_searchResult."筆資料</h2>";
				echo "<TABLE WIDTH='400' BORDER='1'><TR ALIGN='CENTER'>";
				echo "<TD>類別</TD><TD>品牌</TD><TD>說明</TD><TD>價格</TD></TR>";
				
				for ($i=0; $i <$count_searchResult ; $i++) {  
					$data_to_print = mysql_fetch_array($result,MYSQL_NUM);
					// What are MYSQL_NUM & MYSQL_ASSOC used for? What are their differences?
					/// ASSOC will use the coloum names as array keys 
					/// NUM will use a incremental number from 0 (computers count from 0 not 1)

					echo "<tr>";
					echo "<td>".$data_to_print[1]."</td>";
					echo "<td>".$data_to_print[2]."</td>";
					echo "<td>".$data_to_print[3]."</td>";
					echo "<td>".number_format($data_to_print[4])."</td>";
					echo "</tr>";
				}

			}


			// for ($i=0; $i <count($result_unique_brand) ; $i++) { 
			// 	echo $result_unique_brand[$i]."<br>";
			// }

			// echo mysql_num_fields($result);
			// echo mysql_num_rows($result);
			// mysql_query("SET NAMES utf-8");
			// if (!$result)
			// {
   //  		die("執行命令失敗 <BR>" . mysql_error());
			// }
			
			// echo "<TABLE WIDTH='400' BORDER='1'><TR ALIGN='CENTER'>";
			// echo "<TD>欄位名稱</TD><TD>資料型態</TD><TD>最大長度</TD><TD>是否可為NULL</TD></TR>";
			
			// $i = 0;
			// while ($i < mysql_num_fields($result))   //被影響欄位數
			// {
			// $meta = mysql_fetch_field($result, $i);   //將欄位訊息放到$meta
			// 	echo "<TR>";
			// 	echo "<TD>" . $meta->name . "</TD>";
			// 	echo "<TD>" . $meta->type . "</TD>";
			// 	echo "<TD>" . $meta->max_length . "</TD>";
			// 	echo "<TD>" . $meta->not_null . "</TD>";								
			// 	echo "</TR>";
			// 	$i++;
			// }
			// echo "</TABLE>" ;
			// mysql_close($link);
			echo "</form>";
		?> 
	</BODY>
</HTML>
