var request = require('request');
var multer = require('multer')
var personalizaView = require('../views/reference'),
    personalizaModel = require('../models/dataAccess');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'app/static/files/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
});


var Personaliza = function (conf) {
    this.conf = conf || {};

    this.view = new personalizaView();
    this.model = new personalizaModel({
        parameters: this.conf.parameters
    });


    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
    this.middlewares = [
        upload.array('file[]')
    ]
}

Personaliza.prototype.post_filesComplementos = function (req, res, next) {
    
    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    var self = this;


    var params = [
        { name: 'nombre', value: req.files[0].originalname, type: self.model.types.STRING },
        { name: 'titulo', value: req.body.titulo, type: self.model.types.STRING }
    ];
    
    this.model.query('INS_TABLERO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
        res.json({  msg: result  });
    });

};

Personaliza.prototype.get_allTableros = function (req, res, next) {
    var self = this;
    var params = [];
    
    this.model.query('SEL_ALLTABLEROS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });

};

Personaliza.prototype.post_guarda = function (req, res, next) {
    

    var self = this;


    var params = [
        { name: 'Img_id', value: req.body.id, type: self.model.types.STRING },
        { name: 'Img_Titulo', value: req.body.titulo, type: self.model.types.STRING },
        { name: 'estatus', value: req.body.estatus, type: self.model.types.STRING }
    ];
 
    
    this.model.query('UPD_TABLERO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });

};

module.exports = Personaliza;
