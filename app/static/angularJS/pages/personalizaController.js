app.controller('personalizaController', function ($scope, $location, $state,$rootScope, Personaliza, AlertFactory) {
    $scope.allTableros = [];
    $scope.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };
    $scope.guardarBtns = false;
    $scope.nombreGrupo = '';
    $scope.ver = true;
    $scope.isSearching = false;
    $scope.loadingOrder = false;
    $scope.nomTablero = "";
    $scope.idGrp = 0;
 
    $scope.init = function () {
        $scope.getAllTableros();
        if ($rootScope.accion == 1){
           $scope.getGrupoTablero($rootScope.idGrupo); 
        }else $rootScope.accion = 0
    };

     $scope.getGrupoTablero = function(id){
        Personaliza.getGrupoTablero(id).then(function(result){
            $scope.nombreGrupo = result.data[0].Grupo_Nombre;
            $scope.idGrp = result.data[0].GI_Grupo_id;
            $scope.models.lists.A = result.data;
        }, function(error) {
             AlertFactory.error('No se cargo el Grupo.')
        });
     };

   
    //GetTaleros
    $scope.getAllTableros = function(){
        $scope.allTableros = [];
        Personaliza.allTableros().then(function(response) {
            if(response.data.length > 0){
                $scope.models.lists.B = response.data;
            }else{

            }
        }, function(error) {
            $scope.pass = ''
            AlertFactory.error('RFC o contraseña incorrecta intenta de nuevo por favor.')
        });
    };

    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
        if($scope.models.lists.A.length === 5){
            $scope.guardarBtns = true;
        }else{
            $scope.guardarBtns = false;
        }
    }, true);

    $scope.edita = function(imagenSel){
        $scope.imagenSel = imagenSel;
    };

    $scope.guardar = function(tablero,opc){
        Personaliza.guarda(tablero.Img_id,tablero.Img_Titulo,opc).then(function(response) {
            if(response.data.length > 0)
                 AlertFactory.info('Exito');
             else
                 AlertFactory.info('Intentelo mas tarde');         
        }, function(error) {
            $scope.pass = ''
            AlertFactory.error('Intentelo mas tarde')
        });
        $scope.ver = true;
        $('#e a').removeAttr('class');
        $('#n a').attr( 'class', 'btn-activo' );
        $scope.getAllTableros();
        $('#editaImagen').modal('hide');
    };

    //Guarda la cabecera de los tableros
     $scope.saveTablero = function(){
        if( $scope.nombreGrupo == '' ){
            AlertFactory.info('Debes ponerle un nombre a los tableros');
        }else{
            if( $scope.models.lists.A.length === 5 ){
                $scope.loadingOrder = true;
                Personaliza.guardaNombreTablero($scope.nombreGrupo, $scope.idGrp).then(function(response){
                    console.log(response.data)
                    if( response.data[0].msj == 'Ok' ){
                        $scope.saveGrupoTablero(response.data[0].idGrupo, 0);
                    }else{
                        AlertFactory.info('Ocurrio un problema intentelo mas tarde.');
                    }
                });
            }else{
                AlertFactory.info('Solo puedes elegir 5 elementos para el tablero'); 
            }
        };
    };

    $scope.saveGrupoTablero = function(idGrupo, idArreglo){
        if( idArreglo <= $scope.models.lists.A.length -1 ){
            Personaliza.guardaDetalleGrupo(idGrupo, $scope.models.lists.A[idArreglo].Img_id).then(function(response){
                console.log( 'response', response );
                if( response.data[0].success == 1 ){
                    $scope.saveGrupoTablero( idGrupo, idArreglo + 1 );
                }else{
                    AlertFactory.info('Ocurrio un problema al guardar el grupo completo intentelo mas tarde.');
                };
            });
        }else{
            $scope.loadingOrder = false;
            AlertFactory.success('Se guardo con éxito.');     
            $state.go('home');       
        };
    };


    
    var dropzone = new Dropzone("#fileUploadComplementos", {
        url: "api/personaliza/filesComplementos/",
        uploadMultiple: true,
        autoProcessQueue: false,
        maxFiles: 1,
        dictDefaultMessage: "Selecciona una imagen.",
        dictRemoveFile: "Cancelar",
        dictCancelUpload: "Cancelar subida",
        dictCancelUploadConfirmation: "Estas seguro de cancelar la subida de este archivo?",
        addRemoveLinks: true,
        acceptedFiles: "image/jpeg,image/png,image/gif,image/jpg",

        init: function () {
            var self = this;
            this.on("addedfile", function (file) {
                if (self.files.length == 1) {
                    $scope.uploadButton = true;
                    $scope.$apply()
                } else if (self.files.length > 1) {
                    self.removeFile(file)
                }
            });
            this.on("removedfile", function (file) {
                if (self.files.length < 1) {
                    $scope.uploadButton = false;
                    $scope.$apply()
                }
            });
            this.on("success", function(event, res) {
                AlertFactory.info('Tablero Guardado con exito');
                 $scope.limpia();
                 $('#subeImagen').modal('hide');
                 $scope.$apply()
                 $scope.getAllTableros();
             });
            this.on("sending", function (file, xhr, formData) {
                formData.append("titulo", $scope.nomTablero);
            })
        }
    });

    $scope.uploadInvoice = function () {
        dropzone.processQueue();
    };


    $scope.activaNuevo = function(imagenSel){
        $scope.ver = true;
        $('#e a').removeAttr('class');
        $('#n a').attr( 'class', 'btn-activo' );
    };

    $scope.activaEditar = function () {
        $scope.ver = false;
        $('#n a').removeAttr('class');
        $('#e a').attr( 'class', 'btn-activo' );
    };

    $scope.limpia = function () {
        $scope.uploadButton = false;
        dropzone.removeAllFiles();
        $scope.uploadButton = false;
        $scope.closeButton = true;
        $scope.nomTablero = " ";
    };

    $scope.ViewSearch = function() {
        $scope.isSearching = !$scope.isSearching;
        $("#slideIzq").animate({
            width: "toggle"
        });
        if ($scope.isSearching == false) {
            $('#slideIzq').blur();
            $('#slideIzq').val('');
            $scope.keySearch = '';
        }
    };

    $scope.TextSearch = function() {
        $scope.keySearch = $('#slideIzq').val();
    };

        // Acciones a hacer cuando se cierra la modal
    $('#subeComplemento').on('hidden.bs.modal', function (e) {
        $scope.uploadButton = false;
        $scope.nomTablero = "";
        dropzone.removeAllFiles();
    });
});
