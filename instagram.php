<?php
$instagramAccessKey = "14796685.5b9e1e6.f1d607e8eef34fa2baca750bc4955389";
$instagramAccessKey = "14129628.1c31756.339914def11f4260b513787168057086";

$instagramID = 472818268;


$file = "https://api.instagram.com/v1/users/" . $instagramID . "/media/recent?access_token=" . $instagramAccessKey;


$content = file_get_contents($file);

$array = json_decode($content);

$grams = $array->data;

$first_gram = $grams[0];

echo json_encode($first_gram);

