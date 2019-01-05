app.controller('inicioController', function($scope, $location, $state, User, AlertFactory) {

    $scope.prueba = function(){
        $state.go('administrador');
    };
});
