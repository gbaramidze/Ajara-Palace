<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

$api_key = "9e6d0d0adccd457490668c43e2ebc52b";


function get_data($api_key)
{
     $ch = curl_init();
     $data = "key={$api_key}&destination={$_GET["to"]}&urgent=true&sender=ajarapalace&content=".urlencode($_GET["text"]);
     $url = "http://smsoffice.ge/api/v2/send/?{$data}";
     echo $url;
     $timeout = 5;
     curl_setopt($ch, CURLOPT_URL, $url);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
     curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
     $data = curl_exec($ch);
     curl_close($ch);
     return $data;
}

echo get_data($api_key);
?>
