<?php
require 'vendor/autoload.php';
header("Referrer-Policy: strict-origin-when-cross-origin");
header("Access-Control-Allow-Origin", "*");
header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");   

use GuzzleHttp\Client;

// $apiUrl = 'https://staging.getsetlearn.online:18010/api/course_outline_details/course-v1:TicTacLearn+UFJ-TTL-GM8+UFJ-TTL-GM8-FREE';
$apiUrl = 'https://staging.getsetlearn.online:18010/api/course_outline_details/course-v1:GSL-IHFC+IHFC-CN01+2023-CN01';
$clientSecret = 'c411df06-a47d-11ee-b1de-791478e80d66';
$client = new Client(['verify' => false]);

$postData = [];

try {
    $response = $client->request('POST', $apiUrl, [
        'headers' => [
            'client-secret' => $clientSecret,
            'Content-Type' => 'application/json',
        ],
        'json' => $postData,
    ]);

    $responseData = json_decode($response->getBody(), true);
    // echo json_encode($responseData);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

function processVerticalData($verticalData) {
    $newVerticalData = [];

    foreach ($verticalData as $key => $value) {
        if (is_array($value) && array_key_exists('block-v1', $value)) {
            $blockKey = $value['block-v1'];
            $newVerticalData[$blockKey] = $value;
            unset($newVerticalData[$blockKey]['subsection_name']);
            unset($newVerticalData[$blockKey]['block-v1']);
        } else {
            $newVerticalData[$key] = $value;
        }
    }

    return $newVerticalData;
}

function processSubsectionData($subsectionData) {
    $newSubsectionData = [];

    foreach ($subsectionData as $key => $value) {
        if (is_array($value) && array_key_exists('subsection_name', $value)) {
            $subsectionName = $value['subsection_name'];
            $newSubsectionData[$subsectionName] = processVerticalData($value);
        } else {
            $newSubsectionData[$key] = $value;
        }
    }

    return $newSubsectionData;
}

function processCourseData($responseData) {
    $newData = [];

    foreach ($responseData['data'] as $key => $value) {
        if (is_array($value) && array_key_exists('section_name', $value)) {
            $sectionName = $value['section_name'];
            $newData[$sectionName] = processSubsectionData($value);
        } else {
            $newData[$key] = $value;
        }
    }

    $processedData = [
        'data' => (object) $newData
    ];

    return $processedData;
}

$processedData = processCourseData($responseData);

echo json_encode($processedData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
