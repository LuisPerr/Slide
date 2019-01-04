var app = angular.module('app', ['ui.router', 'httpHelper', 'ngCookies'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $stateProvider
            .state('login', {
                url: '/',
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
