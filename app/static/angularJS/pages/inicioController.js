app.controller('inicioController', function ($scope, $location, $state, User, AlertFactory) {
    $scope.title = 'Here is the carousel demo';

    $scope.slides = [
        {
            title: "El primero",
            image: 'http://lorempixel.com/560/400/sports/1',
        },
        {
            title: "El segundo",
            image: 'http://lorempixel.com/560/400/sports/2',
        },
        {
            title: "El tercero",
            image: 'http://lorempixel.com/560/400/sports/3',
        },
        {
            title: "El cuarto",
            image: 'http://lorempixel.com/560/400/sports/4',
        },
        {
            title: "El quinto",
            image: 'http://lorempixel.com/560/400/sports/5',
        },
    ];

    $scope.onCarouselInit = function () {
        console.log('carousel init');
    }
    $scope.prueba = function () {
        $state.go('administrador');
    };
});
