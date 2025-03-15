"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunTaskDto = void 0;
var class_validator_1 = require("class-validator");
var RunTaskDto = function () {
    var _a;
    var _url_decorators;
    var _url_initializers = [];
    var _url_extraInitializers = [];
    var _websiteType_decorators;
    var _websiteType_initializers = [];
    var _websiteType_extraInitializers = [];
    var _proxy_decorators;
    var _proxy_initializers = [];
    var _proxy_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RunTaskDto() {
                this.url = __runInitializers(this, _url_initializers, void 0);
                this.websiteType = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _websiteType_initializers, void 0));
                this.proxy = (__runInitializers(this, _websiteType_extraInitializers), __runInitializers(this, _proxy_initializers, void 0));
                __runInitializers(this, _proxy_extraInitializers);
            }
            return RunTaskDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _url_decorators = [(0, class_validator_1.IsString)()];
            _websiteType_decorators = [(0, class_validator_1.IsString)()];
            _proxy_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: function (obj) { return "url" in obj; }, get: function (obj) { return obj.url; }, set: function (obj, value) { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _websiteType_decorators, { kind: "field", name: "websiteType", static: false, private: false, access: { has: function (obj) { return "websiteType" in obj; }, get: function (obj) { return obj.websiteType; }, set: function (obj, value) { obj.websiteType = value; } }, metadata: _metadata }, _websiteType_initializers, _websiteType_extraInitializers);
            __esDecorate(null, null, _proxy_decorators, { kind: "field", name: "proxy", static: false, private: false, access: { has: function (obj) { return "proxy" in obj; }, get: function (obj) { return obj.proxy; }, set: function (obj, value) { obj.proxy = value; } }, metadata: _metadata }, _proxy_initializers, _proxy_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RunTaskDto = RunTaskDto;
