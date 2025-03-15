"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.SimilarwebStrategy = void 0;
var common_1 = require("@nestjs/common");
var base_crawler_strategy_1 = require("../base-crawler.strategy");
var similarweb_config_1 = require("../../configs/similarweb.config");
var types_1 = require("../../types");
var SimilarwebStrategy = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_crawler_strategy_1.BaseCrawlerStrategy;
    var SimilarwebStrategy = _classThis = /** @class */ (function (_super) {
        __extends(SimilarwebStrategy_1, _super);
        function SimilarwebStrategy_1(dataRepository, apiService) {
            var _this = _super.call(this, similarweb_config_1.similarwebConfig) || this;
            _this.dataRepository = dataRepository;
            _this.apiService = apiService;
            _this.logger = new common_1.Logger(SimilarwebStrategy.name);
            return _this;
        }
        SimilarwebStrategy_1.prototype.login = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // No login required for Similarweb
                    return [2 /*return*/];
                });
            });
        };
        SimilarwebStrategy_1.prototype.validateWebsiteSpecificConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                var requiredSelectors, missingSelectors;
                var _this = this;
                return __generator(this, function (_a) {
                    requiredSelectors = [
                        'globalRank',
                        'totalVisits',
                        'bounceRate',
                        'pagesPerVisit',
                        'avgVisitDuration',
                        'organicSearch',
                        'paidSearch',
                        'topKeywords',
                        'topCountries',
                        'trafficDemographics',
                    ];
                    missingSelectors = requiredSelectors.filter(function (selector) { return !_this.config.selectors.data[selector]; });
                    if (missingSelectors.length > 0) {
                        throw new types_1.WebsiteCrawlerError("Missing required selectors: ".concat(missingSelectors.join(', ')), this.config.type, { missingSelectors: missingSelectors });
                    }
                    return [2 /*return*/];
                });
            });
        };
        SimilarwebStrategy_1.prototype.handleNavigation = function (page) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Wait for the main content to load
                            return [4 /*yield*/, page.waitForSelector('div.app-page-navigation__content', {
                                    timeout: 30000,
                                })];
                        case 1:
                            // Wait for the main content to load
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            throw new types_1.WebsiteCrawlerError('Failed to load Similarweb page content', this.config.type, { originalError: error_1 });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        SimilarwebStrategy_1.prototype.getDomainFromURL = function (url) {
            var regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/img;
            var match = regex.exec(url);
            return match && match[1] ? match[1] : url;
        };
        SimilarwebStrategy_1.prototype.convertStringToNumber = function (value) {
            if (!value)
                return 0;
            var cleanString = value.replace(/[^0-9.%MKG]/g, '');
            if (cleanString.endsWith('%')) {
                cleanString = cleanString.slice(0, -1);
            }
            var multiplier = 1;
            if (cleanString.endsWith('M')) {
                multiplier = 1000000;
                cleanString = cleanString.slice(0, -1);
            }
            else if (cleanString.endsWith('K')) {
                multiplier = 1000;
                cleanString = cleanString.slice(0, -1);
            }
            else if (cleanString.endsWith('G')) {
                multiplier = 1000000000;
                cleanString = cleanString.slice(0, -1);
            }
            var result = parseFloat(cleanString) * multiplier;
            return isNaN(result) ? 0 : result;
        };
        SimilarwebStrategy_1.prototype.extractTextContent = function (page, selector) {
            return __awaiter(this, void 0, void 0, function () {
                var element, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, page.locator(selector).first()];
                        case 1:
                            element = _b.sent();
                            return [4 /*yield*/, element.textContent()];
                        case 2: return [2 /*return*/, (_b.sent()) || ''];
                        case 3:
                            _a = _b.sent();
                            return [2 /*return*/, ''];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        SimilarwebStrategy_1.prototype.extractNumber = function (page, selector) {
            return __awaiter(this, void 0, void 0, function () {
                var text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.extractTextContent(page, selector)];
                        case 1:
                            text = _a.sent();
                            return [2 /*return*/, this.convertStringToNumber(text)];
                    }
                });
            });
        };
        SimilarwebStrategy_1.prototype.extractArray = function (page, selector) {
            return __awaiter(this, void 0, void 0, function () {
                var elements, texts, _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, page.locator(selector).all()];
                        case 1:
                            elements = _b.sent();
                            return [4 /*yield*/, Promise.all(elements.map(function (element) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, element.textContent()];
                                        case 1: return [2 /*return*/, (_a.sent()) || ''];
                                    }
                                }); }); }))];
                        case 2:
                            texts = _b.sent();
                            return [2 /*return*/, texts.filter(function (text) { return text.length > 0; })];
                        case 3:
                            _a = _b.sent();
                            return [2 /*return*/, []];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        SimilarwebStrategy_1.prototype.extractData = function (page, taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var selectors, url, globalRank, totalVisits, bounceRate, pagesPerVisit, avgVisitDuration, organicSearch, paidSearch, topKeywords, topCountries, trafficDemographicsScreenshot, viewport, demographicsLocator, buffer, error_2, similarwebData, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 18, , 19]);
                            selectors = this.config.selectors.data;
                            return [4 /*yield*/, page.url()];
                        case 1:
                            url = _a.sent();
                            return [4 /*yield*/, this.extractNumber(page, selectors.globalRank)];
                        case 2:
                            globalRank = _a.sent();
                            return [4 /*yield*/, this.extractNumber(page, selectors.totalVisits)];
                        case 3:
                            totalVisits = _a.sent();
                            return [4 /*yield*/, this.extractNumber(page, selectors.bounceRate)];
                        case 4:
                            bounceRate = _a.sent();
                            return [4 /*yield*/, this.extractNumber(page, selectors.pagesPerVisit)];
                        case 5:
                            pagesPerVisit = _a.sent();
                            return [4 /*yield*/, this.extractTextContent(page, selectors.avgVisitDuration)];
                        case 6:
                            avgVisitDuration = _a.sent();
                            return [4 /*yield*/, this.extractNumber(page, selectors.organicSearch)];
                        case 7:
                            organicSearch = _a.sent();
                            return [4 /*yield*/, this.extractNumber(page, selectors.paidSearch)];
                        case 8:
                            paidSearch = _a.sent();
                            return [4 /*yield*/, this.extractArray(page, selectors.topKeywords)];
                        case 9:
                            topKeywords = _a.sent();
                            return [4 /*yield*/, this.extractArray(page, selectors.topCountries)];
                        case 10:
                            topCountries = _a.sent();
                            trafficDemographicsScreenshot = '';
                            _a.label = 11;
                        case 11:
                            _a.trys.push([11, 15, , 16]);
                            viewport = { width: 1920, height: 1080 };
                            return [4 /*yield*/, page.setViewportSize(viewport)];
                        case 12:
                            _a.sent();
                            demographicsLocator = page.locator(selectors.trafficDemographics);
                            return [4 /*yield*/, demographicsLocator.scrollIntoViewIfNeeded()];
                        case 13:
                            _a.sent();
                            return [4 /*yield*/, demographicsLocator.screenshot()];
                        case 14:
                            buffer = _a.sent();
                            trafficDemographicsScreenshot = "data:image/png;base64,".concat(buffer.toString('base64'));
                            return [3 /*break*/, 16];
                        case 15:
                            error_2 = _a.sent();
                            this.logger.warn('Failed to capture demographics screenshot:', error_2);
                            return [3 /*break*/, 16];
                        case 16:
                            similarwebData = this.dataRepository.create({
                                url: url,
                                globalRank: globalRank,
                                totalVisits: totalVisits,
                                bounceRate: bounceRate,
                                pagesPerVisit: pagesPerVisit,
                                avgVisitDuration: avgVisitDuration,
                                organicSearch: organicSearch,
                                paidSearch: paidSearch,
                                topKeywords: topKeywords,
                                topCountries: topCountries,
                                trafficDemographicsScreenshot: trafficDemographicsScreenshot,
                                taskId: taskId,
                            });
                            return [4 /*yield*/, this.dataRepository.save(similarwebData)];
                        case 17:
                            _a.sent();
                            return [2 /*return*/, [similarwebData]];
                        case 18:
                            error_3 = _a.sent();
                            throw new types_1.WebsiteCrawlerError('Failed to extract Similarweb data', this.config.type, { originalError: error_3 });
                        case 19: return [2 /*return*/];
                    }
                });
            });
        };
        return SimilarwebStrategy_1;
    }(_classSuper));
    __setFunctionName(_classThis, "SimilarwebStrategy");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimilarwebStrategy = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimilarwebStrategy = _classThis;
}();
exports.SimilarwebStrategy = SimilarwebStrategy;
