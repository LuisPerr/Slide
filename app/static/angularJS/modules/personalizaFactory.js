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
        guardaNombreTablero: function(nombre,idGrp) {
            return $http.get(urlTableros + 'nombreTablero', {
                params:{nombre:nombre,idGrp:idGrp}
            });
        },
        guardaDetalleGrupo: function(idGrupo, idImagen) {
            return $http.get(urlTableros + 'detalleGrupo', {
                params:{
                    idGrupo: idGrupo,
                    idImagen: idImagen
                }
            });
        },
        getGrupoTablero: function(id) {
            return $http.get(urlTableros + 'grupoTablero', {
                params:{
                    id: id
                }
            });
        },
    }
});