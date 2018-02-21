<?php 

header('Access-Control-Allow-Origin: *');

require 'Config/Config.php';
require 'Library/Response.php';
require 'Controller/controller.php';
require 'Library/Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

///////////////////////////////////////////////////////////

$app->get('/', function () {
    echo "Bienvenido a mi API sencilla con SLIM";
});

$app->post('/sincronizar', function () {
    $ctr = Controller::loadController("Jornalero");
    echo $ctr->sincronizar($_POST["jornaleros"]);
});

$app->post('/createJornalero', function () {
    $ctr = Controller::loadController("Jornalero");
    echo $ctr->createJornalero($_POST["nombres"],$_POST["correo"],$_POST["fechaNacimiento"],$_POST["peso"]);
});

$app->get('/readJornaleros', function () {
    $ctr = Controller::loadController("Jornalero");
    echo $ctr->readJornaleros();
});

$app->post('/updateJornalero', function () {
    $ctr = Controller::loadController("Jornalero");
    echo $ctr->updateJornalero($_POST["idJornalero"], $_POST["nombres"],$_POST["correo"],$_POST["fechaNacimiento"],$_POST["peso"]);
});

$app->post('/deleteJornalero', function () {
    $ctr = Controller::loadController("Jornalero");
    echo $ctr->deleteJornalero($_POST["idJornalero"]);
});

$app->run();
