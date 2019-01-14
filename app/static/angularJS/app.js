var app = angular.module('app', ['ui.router', 'httpHelper', 'ngCookies', 'dndLists', 'ui.carousel'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $stateProvider
            .state('personaliza', {
                url: '/personaliza',
                views: {
                    admin: {
                        templateUrl: '/angularJS/templates/personaliza.html',
                        controller: 'personalizaController'
                    }
                }
            })
             .state('home', {
                url: '/home',
                views: {
                    admin: {
                        templateUrl: '/angularJS/templates/home.html',
                        controller: 'homeController'
                    }
                }
            })
        $urlRouterProvider.otherwise('/home');
    });

app.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        var changeHeight = function() {
            element.css('height', (w.height() - 20) + 'px');
        };
        w.bind('resize', function() {
            changeHeight(); // when window size gets changed
        });
        changeHeight(); // when page loads
    }
});
