var app = angular.module('app', ['ui.router', 'httpHelper', 'ngCookies', 'dndLists'])
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
