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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var crawler_service_1 = require("./crawler.service");
var typeorm_1 = require("@nestjs/typeorm");
var crawl_data_entity_1 = require("../../../../../../src/entities/crawl-data.entity");
var browser_service_1 = require("./browser.service");
var crawl_task_entity_1 = require("../../../../../../src/entities/crawl-task.entity");
var api_service_1 = require("./services/api.service");
var similarweb_data_entity_1 = require("../../../../../../src/entities/similarweb-data.entity");
var similarweb_strategy_1 = require("./strategies/similarweb/similarweb.strategy");
var CrawlerModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                config_1.ConfigModule,
                typeorm_1.TypeOrmModule.forFeature([crawl_data_entity_1.CrawlData, crawl_task_entity_1.CrawlTask, similarweb_data_entity_1.SimilarwebData])
            ],
            providers: [
                crawler_service_1.CrawlerService,
                browser_service_1.BrowserService,
                api_service_1.ApiService,
                similarweb_strategy_1.SimilarwebStrategy
            ],
            exports: [crawler_service_1.CrawlerService, browser_service_1.BrowserService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CrawlerModule = _classThis = /** @class */ (function () {
        function CrawlerModule_1() {
        }
        return CrawlerModule_1;
    }());
    __setFunctionName(_classThis, "CrawlerModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CrawlerModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CrawlerModule = _classThis;
}();
exports.CrawlerModule = CrawlerModule;
