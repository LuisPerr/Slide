app.factory("Home", function($http, $cookies) {
    var urlhome    = '/api/home/';
    return {
        allHeadersGrupo: function() {
            return $http.get(urlhome + 'allHeaders', {
                params:{}
            });
        }
    }
});