"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerService = void 0;
var common_1 = require("@nestjs/common");
var crawl_task_entity_1 = require("../../../../../../src/entities/crawl-task.entity");
var types_1 = require("./types");
var uppromote_strategy_1 = require("./strategies/uppromote/uppromote.strategy");
var uppromote_config_1 = require("./configs/uppromote.config");
var CrawlerService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CrawlerService = _classThis = /** @class */ (function () {
        function CrawlerService_1(browserService, configService, crawlDataRepository, apiService, taskRepository, similarwebStrategy) {
            this.browserService = browserService;
            this.configService = configService;
            this.crawlDataRepository = crawlDataRepository;
            this.apiService = apiService;
            this.taskRepository = taskRepository;
            this.similarwebStrategy = similarwebStrategy;
            this.logger = new common_1.Logger(CrawlerService.name);
            this.activeCrawlingTasks = new Map();
            this.strategies = new Map();
            this.initializeStrategies();
        }
        CrawlerService_1.prototype.stopCrawl = function (taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var page, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Stopping crawl for task ID: ".concat(taskId));
                            page = this.activeCrawlingTasks.get(taskId);
                            if (!page) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, page.close()];
                        case 2:
                            _a.sent();
                            this.activeCrawlingTasks.delete(taskId);
                            this.logger.log("Successfully stopped crawl for task ID: ".concat(taskId));
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error("Failed to stop crawl for task ID: ".concat(taskId), error_1 instanceof Error ? error_1.stack : 'Unknown error');
                            throw new Error("Failed to stop crawl for task ID ".concat(taskId, ": ").concat(error_1 instanceof Error ? error_1.message : 'Unknown error'));
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            this.logger.warn("No active crawling task found for task ID: ".concat(taskId));
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        CrawlerService_1.prototype.startCrawling = function (task) {
            return __awaiter(this, void 0, void 0, function () {
                var browser, page, context, error_2;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 9, , 11]);
                            this.logger.debug("Starting crawling for task ".concat(task.id));
                            return [4 /*yield*/, this.taskRepository.update(task.id, { status: crawl_task_entity_1.TaskStatus.RUNNING })];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, this.browserService.getBrowser()];
                        case 2:
                            browser = _b.sent();
                            return [4 /*yield*/, browser.newPage()];
                        case 3:
                            page = _b.sent();
                            this.activeCrawlingTasks.set(task.id, page);
                            if (!((_a = task.configuration) === null || _a === void 0 ? void 0 : _a.proxy)) return [3 /*break*/, 5];
                            this.logger.debug("Using proxy: ".concat(task.configuration.proxy));
                            context = browser.contexts()[0];
                            return [4 /*yield*/, context.route('**/*', function (route) {
                                    var proxyUrl = new URL(task.configuration.proxy);
                                    route.continue({
                                        headers: {
                                            'Proxy-Authorization': "Basic ".concat(Buffer.from("".concat(proxyUrl.username, ":").concat(proxyUrl.password)).toString('base64')),
                                        },
                                    });
                                })];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5: return [4 /*yield*/, this.crawlDetails(page, task)];
                        case 6:
                            _b.sent();
                            return [4 /*yield*/, this.taskRepository.update(task.id, {
                                    status: crawl_task_entity_1.TaskStatus.COMPLETED,
                                    completedAt: new Date(),
                                })];
                        case 7:
                            _b.sent();
                            return [4 /*yield*/, page.close()];
                        case 8:
                            _b.sent();
                            this.activeCrawlingTasks.delete(task.id);
                            return [3 /*break*/, 11];
                        case 9:
                            error_2 = _b.sent();
                            return [4 /*yield*/, this.taskRepository.update(task.id, {
                                    status: crawl_task_entity_1.TaskStatus.FAILED,
                                    error: error_2 instanceof Error ? error_2.message : 'Unknown error',
                                })];
                        case 10:
                            _b.sent();
                            throw error_2;
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        CrawlerService_1.prototype.initializeStrategies = function () {
            // Initialize Uppromote strategy
            var uppromoteStrategy = new uppromote_strategy_1.UppromoteStrategy(this.crawlDataRepository, __assign(__assign({}, uppromote_config_1.uppromoteConfig), { authentication: uppromote_config_1.uppromoteConfig.authentication }), this.apiService);
            this.strategies.set('uppromote', uppromoteStrategy);
            this.logger.debug('Uppromote strategy initialized');
            // Initialize Similarweb strategy
            this.strategies.set('similarweb', this.similarwebStrategy);
            this.logger.debug('Similarweb strategy initialized');
        };
        CrawlerService_1.prototype.getStrategy = function (websiteType) {
            var strategy = this.strategies.get(websiteType.toLowerCase());
            if (!strategy) {
                throw new types_1.WebsiteCrawlerError("No crawler strategy found for website type: ".concat(websiteType), websiteType, { availableTypes: Array.from(this.strategies.keys()) });
            }
            this.logger.debug("Using strategy for website type: ".concat(websiteType));
            return strategy;
        };
        CrawlerService_1.prototype.crawlDetails = function (page, task) {
            return __awaiter(this, void 0, void 0, function () {
                var strategy, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            strategy = this.getStrategy(task.websiteType);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, strategy.extractData(page, task.id)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_3 = _a.sent();
                            this.logger.error('Failed to crawl details:', error_3);
                            throw error_3;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        CrawlerService_1.prototype.validateWebsiteConfiguration = function (websiteType) {
            return __awaiter(this, void 0, void 0, function () {
                var strategy, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            strategy = this.getStrategy(websiteType);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, strategy.validateConfiguration()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            this.logger.error('Failed to validate website configuration:', error_4);
                            throw error_4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        CrawlerService_1.prototype.getAvailableWebsiteTypes = function () {
            return Array.from(this.strategies.keys());
        };
        return CrawlerService_1;
    }());
    __setFunctionName(_classThis, "CrawlerService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CrawlerService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CrawlerService = _classThis;
}();
exports.CrawlerService = CrawlerService;
