"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var bot_sdk_1 = require("@line/bot-sdk");
var interface_1 = require("../interface");
var parser_1 = require("./parser");
var LineClient = /** @class */ (function (_super) {
    __extends(LineClient, _super);
    function LineClient(config) {
        var _this = _super.call(this, config) || this;
        _this.client = new bot_sdk_1.Client({
            channelSecret: config.secret,
            channelAccessToken: config.accessToken
        });
        _this.parser = new parser_1.LineParser;
        return _this;
    }
    LineClient.prototype.send = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.parser.format(message).then(function (lineMessages) {
                _this.client.pushMessage(message.receiver, lineMessages).then(function () {
                    resolve({ status: "ok" });
                })["catch"](function (err) {
                    reject({ status: "error", message: err });
                });
            })["catch"](function (error) { return reject({ status: "error", message: error }); });
        });
    };
    LineClient.prototype.serviceName = function () {
        return "line";
    };
    return LineClient;
}(interface_1.Adapter));
exports.LineClient = LineClient;
