app.controller('adminController', function($scope, $location, $state, User, AlertFactory) {
    
    console.log( 'Hola Administrador' );
    $scope.Back = function(){
        $state.go('inicio');
    };
});
