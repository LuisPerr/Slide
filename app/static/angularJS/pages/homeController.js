app.controller('homeController', function ($scope, $rootScope, $location, $state, Home, AlertFactory) {
	$scope.cabeceras = [];
	$scope.cabeceraShow = []

	$scope.init = function () {
		$scope.allHeaders();
	};

	$scope.allHeaders = function () {
		Home.allHeadersGrupo().then(function (response) {
			var diferente = 0;
			if (response.data.length > 0) {
				$scope.cabeceras = response.data;
				angular.forEach($scope.cabeceras, function (value, key) {
					if (value.Grupo_id != diferente) {
						diferente = value.Grupo_id;
						$scope.cabeceraShow.push(value);
					};
				});
				console.log($scope.cabeceraShow)
			};
		});
	};

	$scope.irPersonalizar = function (accion) {
		if (accion == 1) {
			$rootScope.accion = 1;
			$rootScope.idGrupo = 11;
		}
		else {
			$rootScope.accion = 0;
		}

		$state.go('personaliza');
	};
});