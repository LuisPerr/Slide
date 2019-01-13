app.factory("Personaliza", function($http, $cookies) {
    var urlTableros     = '/api/personaliza/';
    return {
        allTableros: function() {
            return $http.get(urlTableros + 'allTableros', {
                params:{}
            });
        },
        guarda: function(id,titulo,status){
            return $http.post(urlTableros + 'guarda', {
                id: id,
                titulo: titulo,
                estatus: status,
            });
        },
        guardaNombreTablero: function(nombre) {
            return $http.get(urlTableros + 'nombreTablero', {
                params:{nombre:nombre}
            });
        },
    }
});