app.controller('adminController', function($scope, $location, $state, User, AlertFactory) {
    $scope.mostrar = false;
    $scope.models = {
        selected: null,
        lists: {"A": [{nombre: 'holaaaa'}], "B": []}
    };
    $scope.input = $scope.models.lists.A[0].nombre
    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: "Item A" + i});
        $scope.models.lists.B.push({label: "Item B" + i});
    }
    
    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        console.log(model)
        $scope.modelAsJson = angular.toJson(model, true);
        if($scope.models.lists.A.length === 6){
            $scope.mostrar = true;
        }else{
            $scope.mostrar = false;
        }
    }, true);

    
    $scope.Back = function(){
       if($scope.models.lists.A.length < 6){
        console.log( 'No se puede guardar' );
       }else{
        $scope.models.lists.A[0].nombre =  $scope.input 
        console.log( 'Lista A', $scope.models.lists.A );
        $state.go('inicio');
       }
        
    };
});
