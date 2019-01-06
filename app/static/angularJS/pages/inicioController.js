app.controller('inicioController', function ($scope, $location, $state, User, AlertFactory) {
    $scope.title = 'Here is the carousel demo';

    $scope.slides = [
        {
            title: "1 title",
            image: 'http://lorempixel.com/560/400/sports/1',
        },
        {
            title: "2 title",
            image: 'http://lorempixel.com/560/400/sports/2',
        },
        {
            title: "3 title",
            image: 'http://lorempixel.com/560/400/sports/3',
        },
        {
            title: "4 title",
            image: 'http://lorempixel.com/560/400/sports/4',
        },
        {
            title: "5 title",
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
