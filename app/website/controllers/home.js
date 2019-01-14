var request = require('request');
var homeView = require('../views/reference'),
    homeModel = require('../models/dataAccess');


var Home = function (conf) {
    this.conf = conf || {};

    this.view = new homeView();
    this.model = new homeModel({
        parameters: this.conf.parameters
    });


    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Home.prototype.get_allHeaders = function (req, res, next) {
    var self = this;
    var params = [];
    
    this.model.query('SEL_ALLHEADERSGRUPO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });

};
module.exports = Home;
