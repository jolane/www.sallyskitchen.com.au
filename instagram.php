<?php
header('Content-Type: application/json');

$instagramAccessKey = "14796685.5b9e1e6.f1d607e8eef34fa2baca750bc4955389";
$instagramAccessKey = "14129628.1c31756.339914def11f4260b513787168057086";
$instagramAccessKey = "14129628.1677ed0.518710182cb04e6eb1305712361a7b14";

$instagramID = 472818268;


$file = "https://api.instagram.com/v1/users/" . $instagramID . "/media/recent?access_token=" . $instagramAccessKey;
echo $file;

$content = file_get_contents($file);
echo $content;

$array = json_decode($content);

$grams = $array->data;

//echo json_encode($grams);

