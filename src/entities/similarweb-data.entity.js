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
exports.SimilarwebData = void 0;
var typeorm_1 = require("typeorm");
var SimilarwebData = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _url_decorators;
    var _url_initializers = [];
    var _url_extraInitializers = [];
    var _globalRank_decorators;
    var _globalRank_initializers = [];
    var _globalRank_extraInitializers = [];
    var _totalVisits_decorators;
    var _totalVisits_initializers = [];
    var _totalVisits_extraInitializers = [];
    var _bounceRate_decorators;
    var _bounceRate_initializers = [];
    var _bounceRate_extraInitializers = [];
    var _pagesPerVisit_decorators;
    var _pagesPerVisit_initializers = [];
    var _pagesPerVisit_extraInitializers = [];
    var _avgVisitDuration_decorators;
    var _avgVisitDuration_initializers = [];
    var _avgVisitDuration_extraInitializers = [];
    var _organicSearch_decorators;
    var _organicSearch_initializers = [];
    var _organicSearch_extraInitializers = [];
    var _paidSearch_decorators;
    var _paidSearch_initializers = [];
    var _paidSearch_extraInitializers = [];
    var _topKeywords_decorators;
    var _topKeywords_initializers = [];
    var _topKeywords_extraInitializers = [];
    var _topCountries_decorators;
    var _topCountries_initializers = [];
    var _topCountries_extraInitializers = [];
    var _trafficDemographicsScreenshot_decorators;
    var _trafficDemographicsScreenshot_initializers = [];
    var _trafficDemographicsScreenshot_extraInitializers = [];
    var _taskId_decorators;
    var _taskId_initializers = [];
    var _taskId_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var SimilarwebData = _classThis = /** @class */ (function () {
        function SimilarwebData_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.url = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _url_initializers, void 0));
            this.globalRank = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _globalRank_initializers, void 0));
            this.totalVisits = (__runInitializers(this, _globalRank_extraInitializers), __runInitializers(this, _totalVisits_initializers, void 0));
            this.bounceRate = (__runInitializers(this, _totalVisits_extraInitializers), __runInitializers(this, _bounceRate_initializers, void 0));
            this.pagesPerVisit = (__runInitializers(this, _bounceRate_extraInitializers), __runInitializers(this, _pagesPerVisit_initializers, void 0));
            this.avgVisitDuration = (__runInitializers(this, _pagesPerVisit_extraInitializers), __runInitializers(this, _avgVisitDuration_initializers, void 0));
            this.organicSearch = (__runInitializers(this, _avgVisitDuration_extraInitializers), __runInitializers(this, _organicSearch_initializers, void 0));
            this.paidSearch = (__runInitializers(this, _organicSearch_extraInitializers), __runInitializers(this, _paidSearch_initializers, void 0));
            this.topKeywords = (__runInitializers(this, _paidSearch_extraInitializers), __runInitializers(this, _topKeywords_initializers, void 0));
            this.topCountries = (__runInitializers(this, _topKeywords_extraInitializers), __runInitializers(this, _topCountries_initializers, void 0));
            this.trafficDemographicsScreenshot = (__runInitializers(this, _topCountries_extraInitializers), __runInitializers(this, _trafficDemographicsScreenshot_initializers, void 0));
            this.taskId = (__runInitializers(this, _trafficDemographicsScreenshot_extraInitializers), __runInitializers(this, _taskId_initializers, void 0));
            this.createdAt = (__runInitializers(this, _taskId_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return SimilarwebData_1;
    }());
    __setFunctionName(_classThis, "SimilarwebData");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _url_decorators = [(0, typeorm_1.Column)()];
        _globalRank_decorators = [(0, typeorm_1.Column)('float', { nullable: true })];
        _totalVisits_decorators = [(0, typeorm_1.Column)('float', { nullable: true })];
        _bounceRate_decorators = [(0, typeorm_1.Column)('float', { nullable: true })];
        _pagesPerVisit_decorators = [(0, typeorm_1.Column)('float', { nullable: true })];
        _avgVisitDuration_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _organicSearch_decorators = [(0, typeorm_1.Column)('float', { nullable: true })];
        _paidSearch_decorators = [(0, typeorm_1.Column)('float', { nullable: true })];
        _topKeywords_decorators = [(0, typeorm_1.Column)('simple-array', { nullable: true })];
        _topCountries_decorators = [(0, typeorm_1.Column)('simple-array', { nullable: true })];
        _trafficDemographicsScreenshot_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
        _taskId_decorators = [(0, typeorm_1.Column)()];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: function (obj) { return "url" in obj; }, get: function (obj) { return obj.url; }, set: function (obj, value) { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
        __esDecorate(null, null, _globalRank_decorators, { kind: "field", name: "globalRank", static: false, private: false, access: { has: function (obj) { return "globalRank" in obj; }, get: function (obj) { return obj.globalRank; }, set: function (obj, value) { obj.globalRank = value; } }, metadata: _metadata }, _globalRank_initializers, _globalRank_extraInitializers);
        __esDecorate(null, null, _totalVisits_decorators, { kind: "field", name: "totalVisits", static: false, private: false, access: { has: function (obj) { return "totalVisits" in obj; }, get: function (obj) { return obj.totalVisits; }, set: function (obj, value) { obj.totalVisits = value; } }, metadata: _metadata }, _totalVisits_initializers, _totalVisits_extraInitializers);
        __esDecorate(null, null, _bounceRate_decorators, { kind: "field", name: "bounceRate", static: false, private: false, access: { has: function (obj) { return "bounceRate" in obj; }, get: function (obj) { return obj.bounceRate; }, set: function (obj, value) { obj.bounceRate = value; } }, metadata: _metadata }, _bounceRate_initializers, _bounceRate_extraInitializers);
        __esDecorate(null, null, _pagesPerVisit_decorators, { kind: "field", name: "pagesPerVisit", static: false, private: false, access: { has: function (obj) { return "pagesPerVisit" in obj; }, get: function (obj) { return obj.pagesPerVisit; }, set: function (obj, value) { obj.pagesPerVisit = value; } }, metadata: _metadata }, _pagesPerVisit_initializers, _pagesPerVisit_extraInitializers);
        __esDecorate(null, null, _avgVisitDuration_decorators, { kind: "field", name: "avgVisitDuration", static: false, private: false, access: { has: function (obj) { return "avgVisitDuration" in obj; }, get: function (obj) { return obj.avgVisitDuration; }, set: function (obj, value) { obj.avgVisitDuration = value; } }, metadata: _metadata }, _avgVisitDuration_initializers, _avgVisitDuration_extraInitializers);
        __esDecorate(null, null, _organicSearch_decorators, { kind: "field", name: "organicSearch", static: false, private: false, access: { has: function (obj) { return "organicSearch" in obj; }, get: function (obj) { return obj.organicSearch; }, set: function (obj, value) { obj.organicSearch = value; } }, metadata: _metadata }, _organicSearch_initializers, _organicSearch_extraInitializers);
        __esDecorate(null, null, _paidSearch_decorators, { kind: "field", name: "paidSearch", static: false, private: false, access: { has: function (obj) { return "paidSearch" in obj; }, get: function (obj) { return obj.paidSearch; }, set: function (obj, value) { obj.paidSearch = value; } }, metadata: _metadata }, _paidSearch_initializers, _paidSearch_extraInitializers);
        __esDecorate(null, null, _topKeywords_decorators, { kind: "field", name: "topKeywords", static: false, private: false, access: { has: function (obj) { return "topKeywords" in obj; }, get: function (obj) { return obj.topKeywords; }, set: function (obj, value) { obj.topKeywords = value; } }, metadata: _metadata }, _topKeywords_initializers, _topKeywords_extraInitializers);
        __esDecorate(null, null, _topCountries_decorators, { kind: "field", name: "topCountries", static: false, private: false, access: { has: function (obj) { return "topCountries" in obj; }, get: function (obj) { return obj.topCountries; }, set: function (obj, value) { obj.topCountries = value; } }, metadata: _metadata }, _topCountries_initializers, _topCountries_extraInitializers);
        __esDecorate(null, null, _trafficDemographicsScreenshot_decorators, { kind: "field", name: "trafficDemographicsScreenshot", static: false, private: false, access: { has: function (obj) { return "trafficDemographicsScreenshot" in obj; }, get: function (obj) { return obj.trafficDemographicsScreenshot; }, set: function (obj, value) { obj.trafficDemographicsScreenshot = value; } }, metadata: _metadata }, _trafficDemographicsScreenshot_initializers, _trafficDemographicsScreenshot_extraInitializers);
        __esDecorate(null, null, _taskId_decorators, { kind: "field", name: "taskId", static: false, private: false, access: { has: function (obj) { return "taskId" in obj; }, get: function (obj) { return obj.taskId; }, set: function (obj, value) { obj.taskId = value; } }, metadata: _metadata }, _taskId_initializers, _taskId_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimilarwebData = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimilarwebData = _classThis;
}();
exports.SimilarwebData = SimilarwebData;
