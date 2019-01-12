app.controller('personalizaController', function ($scope, $location, $state, User, AlertFactory) {
    console.log("personalizaController");

 var dropzone = new Dropzone("#fileUploadImg", {
        url: "api/fileUpload/files/",
        uploadMultiple: false,
        maxFiles: 1,
        dictDefaultMessage: "Selecciona Imagen",
        dictRemoveFile: "Cancelar",
        dictCancelUpload: "Cancelar subida",
        dictCancelUploadConfirmation: "Estas seguro de cancelar la subida de este archivo?",
        addRemoveLinks: true,
        acceptedFiles: "image/*",

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
                //dropzone.removeAllFiles();
                $scope.uploadButton = false;
                $scope.closeButton = true;
                $scope.$apply()
            });
             this.on("sending", function(file, xhr, formData) {
                 formData.append("provider", 1);
            //     formData.append("rfc", File.order.rfc);
            //     formData.append("folio", File.order.folio);
            //     formData.append("idRol", File.order.idRol);
            //     formData.append("rfcProvider", File.order.rfcProvider);
            //     formData.append("tipoDocumento", 3); // tipo 3 complemento de pago
             })
        }
    });

    $scope.uploadInvoice = function() {
        dropzone.processQueue();
    };

});
