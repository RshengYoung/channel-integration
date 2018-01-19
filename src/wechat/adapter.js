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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var Cache = require("node-cache");
var uuid = require("uuid");
var FormData = require("form-data");
var interface_1 = require("../interface");
var WechatClient = /** @class */ (function (_super) {
    __extends(WechatClient, _super);
    function WechatClient(config) {
        var _this = _super.call(this, config) || this;
        _this.wechatUrl = "https://api.weixin.qq.com/cgi-bin";
        _this.getTokenUrl = _this.wechatUrl + "/token?";
        _this.sendMessageUrl = _this.wechatUrl + "/message/custom/send?";
        _this.uploadMediaUrl = _this.wechatUrl + "/media/upload?";
        _this.sessionId = uuid.v4();
        _this.cache = new Cache({ stdTTL: 7000, checkperiod: 0 });
        _this.getAccessToken();
        return _this;
    }
    WechatClient.prototype.send = function (message) {
        return Promise.resolve();
    };
    WechatClient.prototype.serviceName = function () {
        return "wechat";
    };
    WechatClient.prototype.uploadMedia = function (type, media /*Media URL*/) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaBuffer, accessToken, url, form;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBuffer(media)];
                    case 1:
                        mediaBuffer = _a.sent();
                        return [4 /*yield*/, this.getAccessToken()];
                    case 2:
                        accessToken = _a.sent();
                        url = this.uploadMediaUrl + "access_token=" + accessToken + "&type=" + type;
                        form = new FormData();
                        form.append("media", mediaBuffer);
                        return [2 /*return*/, axios_1["default"].post(url, form, {
                                headers: form.getHeaders()
                            }).then(function (res) { return res.data.media_id; })];
                }
            });
        });
    };
    WechatClient.prototype.getAccessToken = function () {
        var _this = this;
        var url = this.getTokenUrl + "grant_type=client_credential&appid=" + this.config.id + "&secret=" + this.config.secret;
        var token = this.cache.get(this.sessionId);
        if (token)
            return Promise.resolve(token);
        return axios_1["default"].get(url).then(function (result) {
            var accessToken = result.data.access_token;
            _this.cache.set(_this.sessionId, accessToken);
            return Promise.resolve(accessToken);
        });
    };
    WechatClient.prototype.getBuffer = function (media) {
        return axios_1["default"].get(media, { responseType: "ArrayBuffer" }).then(function (buffer) { return Promise.resolve(buffer.data); });
    };
    return WechatClient;
}(interface_1.Adapter));
exports.WechatClient = WechatClient;
