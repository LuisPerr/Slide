app.controller('homeController', function ($scope, $rootScope, $location, $state, Home, AlertFactory) {
	$scope.cabeceras = [];
	$scope.cabeceraShow = [];
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();

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
				
				console.log( '$scope.cabeceraShow', $scope.cabeceraShow );
			};
			$scope.cabeceraShow.push({Grupo_Nombre: 'Personalizar', Grupo_id: 999999, imagen: '/files/personalizado.jpg'})
		});
	};

	$scope.irPersonalizar = function (idGrupo) {
		if (idGrupo != 999999) {
			$rootScope.accion = 1;
			$rootScope.idGrupo = idGrupo;
		}
		else 
			$rootScope.accion = 0;
		
		$state.go('personaliza');
	};

	//====================================
	$scope.onCarouselInit = function () {
		// console.log('carousel init');
		if ($scope.cabeceraShow.length == 1) {
		$scope.cuadritos = [
				{GI_Grupo_id: 999999, GI_Img_id: 999999, GI_id: 999999, Img_Titulo: "Personaliza", imagen: "/files/personalizado.jpg"},
				{GI_Grupo_id: 999999, GI_Img_id: 999999, GI_id: 999999, Img_Titulo: "Personaliza", imagen: "/files/personalizado.jpg"},
				{GI_Grupo_id: 999999, GI_Img_id: 999999, GI_id: 999999, Img_Titulo: "Personaliza", imagen: "/files/personalizado.jpg"},
				{GI_Grupo_id: 999999, GI_Img_id: 999999, GI_id: 999999, Img_Titulo: "Personaliza", imagen: "/files/personalizado.jpg"}
			]; 
		}
	};

	$scope.onCarouselAfterChange = function (dato) {
		//console.log($scope.cabeceraShow[dato].Grupo_id);
		if($scope.cabeceraShow[dato].Grupo_id == 999999){
			$scope.cuadritos = [
				{GI_Grupo_id: 999999, GI_Img_id: 999999, GI_id: 999999, Img_Titulo: "Personaliza", imagen: "/files/personalizado.jpg"},
				{GI_Grupo_id: 999999, GI_Img_id: 999999, GI_id: 999999, Img_Titulo: "Personaliza", imagen: "/files/personalizado.jpg"},
				{GI_Grupo_id: 999999, GI_Img_id: 999999, GI_id: 999999, Img_Titulo: "Personaliza", imagen: "/files/personalizado.jpg"},
				{GI_Grupo_id: 999999, GI_Img_id: 999999, GI_id: 999999, Img_Titulo: "Personaliza", imagen: "/files/personalizado.jpg"}
			];
		}else{
			Home.detalleGrupo($scope.cabeceraShow[dato].Grupo_id).then(function(response){
				$scope.cuadritos = response.data;
				//console.log('$scope.cuadritos', $scope.cuadritos);
			});
		};
	};

});