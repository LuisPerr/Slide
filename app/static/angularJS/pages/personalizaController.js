app.controller('personalizaController', function ($scope, $location, $state, Personaliza, AlertFactory) {
    $scope.allTableros = [];
    $scope.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };
    $scope.guardarBtns = false;

    $scope.init = function () {
        $scope.getAllTableros();
    };

    $scope.nomTablero = "";
    // Función para subir los archivos de PDF y XML COMPLEMENTOS !!!! 
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
                 $scope.uploadButton = false;
                 dropzone.removeAllFiles();
                 $scope.uploadButton = false;
                 $scope.closeButton = true;
                 $scope.nomTablero = "";
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


    // Acciones a hacer cuando se cierra la modal
    $('#subeComplemento').on('hidden.bs.modal', function (e) {
        $scope.uploadButton = false;
        $scope.nomTablero = "";
        dropzone.removeAllFiles();
    });

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

    $scope.saveTablero = function(){
        console.log( '$scope.models.lists.A', $scope.models.lists.A );
    }
});
