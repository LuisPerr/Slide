var app = angular.module('app', ['ui.router', 'httpHelper', 'ngCookies', 'dndLists', 'ui.carousel'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    admin: {
                        templateUrl: '/angularJS/templates/login.html',
                        controller: 'loginController'
                    }
                }
            })
            .state('signup', {
                url: '/registro',
                views: {
                    admin: {
                        templateUrl: '/angularJS/templates/signup.html',
                        controller: 'signupController'
                    }
                }

            })
            .state('inicio', {
                url: '/',
                views: {
                    admin: {
                        templateUrl: '/angularJS/templates/inicio.html',
                        controller: 'inicioController'
                    }
                }
            })
            .state('administrador', {
                url: '/administrador',
                views: {
                    admin: {
                        templateUrl: '/angularJS/templates/administrador.html',
                        controller: 'adminController'
                    }
                }
            })
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
        $urlRouterProvider.otherwise('/');
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
