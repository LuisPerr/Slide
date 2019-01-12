var filtroView = require('../views/reference'),
    filtroModel = require('../models/dataAccess');

var path = require('path');
//var webPage = require('webpage');
var request = require('request');


var upLoadImg = function(conf) {
    console.log('conf: ')
    console.log(conf)    

    this.conf = conf || {};

    this.view = new filtroView();
    this.model = new filtroModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

upLoadImg.prototype.get_filesImg = function(req, res, next) {

    var self = this;

    console.log('SEL_PROVEEDOR_BUSCA_SP')

   
};

module.exports = upLoadImg;