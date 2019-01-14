app.controller('homeController', function ($scope, $location, $state,$rootScope, Personaliza, AlertFactory) {
console.log('homeController')

$scope.irPersonalizar = function(accion){
		if (accion == 1){
			$rootScope.accion = 1;
			$rootScope.idGrupo = 11;
		}
		else {
			$rootScope.accion = 0;
		}

        $state.go('personaliza');
};

});