app.factory("Personaliza", function($http, $cookies) {
    // var url             = "/api/usuario/"
    var urlTableros     = '/api/personaliza/';
    // var urlSiginup      = '/api/login/siginup';
    // var urlSendMail     = '/api/login/sendmailing';
    // urlValidarCuenta    = '/api/login/verificar';
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
        }
        // signup: function(razon, email, rfc, pass, token, ) {
        //     return $http.post(urlSiginup, {
        //         razon: razon,
        //         email: email,
        //         rfc: rfc,
        //         pass: pass,
        //         token: token
        //     })
        // },
        // sendMail: function(email, token){
        //     return $http.post(urlSendMail, {
        //         email: email,
        //         token: token
        //     });
        // },
        // validarCuenta: function( token ){
        //     return $http.post(urlValidarCuenta,{
        //         token: token
        //     });
        // }
    }
});