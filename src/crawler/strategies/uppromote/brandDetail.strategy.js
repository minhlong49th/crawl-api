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
exports.UppromoteBrandDetailStrategy = void 0;
var common_1 = require("@nestjs/common");
var uppromote_extractor_1 = require("./uppromote.extractor");
var uppromote_config_1 = require("../../configs/uppromote.config");
var helpers_1 = require("../../../utils/helpers");
var UppromoteBrandDetailStrategy = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UppromoteBrandDetailStrategy = _classThis = /** @class */ (function () {
        function UppromoteBrandDetailStrategy_1(crawlDataRepository, config) {
            this.crawlDataRepository = crawlDataRepository;
            this.logger = new common_1.Logger(UppromoteBrandDetailStrategy.name);
            this.dataExtractor = new uppromote_extractor_1.UppromoteDataExtractor(config);
        }
        UppromoteBrandDetailStrategy_1.prototype.extractItemData = function (item, page, taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var itemData, visitWebsite, href, _loop_1, _i, _a, extractor, _loop_2, this_1, _b, _c, extractor, crawlData;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            this.logger.debug('Extracted Brand Detail Info');
                            if (!page) {
                                this.logger.debug('Page element is not available');
                                throw new Error('Page element is not available');
                            }
                            itemData = {};
                            //Get url of the brand details page
                            itemData['url'] = page.url();
                            this.logger.debug("Extracted Brand Detail URL: ".concat(itemData['url']));
                            return [4 /*yield*/, page.$(uppromote_config_1.uppromoteConfig.selectors.brandDetails.website)];
                        case 1:
                            visitWebsite = _d.sent();
                            if (!visitWebsite) return [3 /*break*/, 3];
                            return [4 /*yield*/, visitWebsite.getAttribute('href')];
                        case 2:
                            href = _d.sent();
                            itemData['website'] = href;
                            this.logger.debug("Extracted Website URL: ".concat(href));
                            return [3 /*break*/, 4];
                        case 3:
                            itemData['website'] = null;
                            this.logger.debug('Website URL not found');
                            _d.label = 4;
                        case 4:
                            _loop_1 = function (extractor) {
                                try {
                                    (0, helpers_1.retry)(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var element, text;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, page.$(extractor.selector)];
                                                case 1:
                                                    element = _a.sent();
                                                    if (!element) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, element.textContent()];
                                                case 2:
                                                    text = _a.sent();
                                                    itemData[extractor.name] = (text === null || text === void 0 ? void 0 : text.trim()) || null;
                                                    this.logger.debug("Extracted ".concat(extractor.name, ": ").concat(text));
                                                    _a.label = 3;
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); }, uppromote_config_1.uppromoteConfig.rules.rateLimit);
                                }
                                catch (error) {
                                    console.warn("Failed to extract ".concat(extractor.name, ":"), error instanceof Error ? error.message : 'Unknown error');
                                    itemData[extractor.name] = null;
                                }
                            };
                            //Extract general data
                            for (_i = 0, _a = this.dataExtractor.generalExtractors; _i < _a.length; _i++) {
                                extractor = _a[_i];
                                _loop_1(extractor);
                            }
                            (0, helpers_1.retry)(function () { return __awaiter(_this, void 0, void 0, function () {
                                var offerDetailsTab;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, page.$(uppromote_config_1.uppromoteConfig.selectors.brandDetails.offerDetailsTab)];
                                        case 1:
                                            offerDetailsTab = _a.sent();
                                            if (!offerDetailsTab) {
                                                this.logger.debug('Offer details tab not found');
                                                return [2 /*return*/, itemData];
                                            }
                                            //Click on the "Offer Details" tab
                                            this.logger.debug('Clicking on Offer Details tab');
                                            return [4 /*yield*/, offerDetailsTab.click()];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            _loop_2 = function (extractor) {
                                try {
                                    (0, helpers_1.retry)(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var element, text;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, page.$(extractor.selector)];
                                                case 1:
                                                    element = _a.sent();
                                                    if (!element) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, element.textContent()];
                                                case 2:
                                                    text = _a.sent();
                                                    itemData[extractor.name] = (text === null || text === void 0 ? void 0 : text.trim()) || null;
                                                    this.logger.debug("Extracted ".concat(extractor.name, ": ").concat(text));
                                                    _a.label = 3;
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); }, uppromote_config_1.uppromoteConfig.rules.rateLimit);
                                }
                                catch (error) {
                                    var errorMessage = error instanceof Error ? error.message : 'Unknown error';
                                    console.warn("Failed to extract ".concat(extractor.name, ":"), errorMessage);
                                    this_1.logger.debug("Failed to extract ".concat(extractor.name, ": ").concat(errorMessage));
                                    itemData[extractor.name] = null;
                                }
                            };
                            this_1 = this;
                            //Extract offer data
                            for (_b = 0, _c = this.dataExtractor.offersExtractors; _b < _c.length; _b++) {
                                extractor = _c[_b];
                                _loop_2(extractor);
                            }
                            crawlData = this.crawlDataRepository.create({
                                source: 'uppromote',
                                name: itemData['name'],
                                data: itemData,
                                crawlTaskId: taskId,
                            });
                            return [4 /*yield*/, this.crawlDataRepository.save(crawlData)];
                        case 5:
                            _d.sent();
                            this.logger.debug('Extracted Brand Detail Info - ready');
                            return [2 /*return*/, itemData];
                    }
                });
            });
        };
        return UppromoteBrandDetailStrategy_1;
    }());
    __setFunctionName(_classThis, "UppromoteBrandDetailStrategy");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UppromoteBrandDetailStrategy = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UppromoteBrandDetailStrategy = _classThis;
}();
exports.UppromoteBrandDetailStrategy = UppromoteBrandDetailStrategy;
