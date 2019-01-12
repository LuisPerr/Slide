app.controller('personalizaController', function ($scope, $location, $state, User, AlertFactory) {
    console.log("personalizaController");

    $scope.nomTablero = "";
 // Función para subir los archivos de PDF y XML COMPLEMENTOS !!!! 
    var dropzone = new Dropzone("#fileUploadComplementos", {
        url: "api/fileUpload/filesComplementos/",
        uploadMultiple: true,
        autoProcessQueue: false,
        maxFiles: 1,
        dictDefaultMessage: "Selecciona el XML y el PDF",
        dictRemoveFile: "Cancelar",
        dictCancelUpload: "Cancelar subida",
        dictCancelUploadConfirmation: "Estas seguro de cancelar la subida de este archivo?",
        addRemoveLinks: true,
        acceptedFiles: "image/jpeg,image/png,image/gif,image/jpg",

        init: function() {
            var self = this;
            this.on("addedfile", function(file) {
                if (self.files.length == 1) {
                    $scope.uploadButton = true;
                    $scope.$apply()
                } else if (self.files.length > 1) {
                    self.removeFile(file)
                }
            });
            this.on("removedfile", function(file) {
                if (self.files.length < 1) {
                    $scope.uploadButton = false;
                    $scope.$apply()
                }
            });
            this.on("successmultiple", function(event, res) {
                $scope.uploadButton = false;
                dropzone.removeAllFiles();
                $scope.uploadButton = false;
                $scope.closeButton = true;
                $scope.$apply()
            });
            this.on("sending", function(file, xhr, formData) {
                formData.append("titulo", $scope.nomTablero);
            })
        }
    });

        $scope.uploadInvoice = function() {
      
        dropzone.processQueue();
    };


        // Acciones a hacer cuando se cierra la modal
        $('#subeComplemento').on('hidden.bs.modal', function(e) {
            $scope.uploadButton = false;
            dropzone.removeAllFiles();
        });
    


});
