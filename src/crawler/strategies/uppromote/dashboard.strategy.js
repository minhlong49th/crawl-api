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
exports.UppromoteDashboardStrategy = void 0;
var common_1 = require("@nestjs/common");
var uppromote_config_1 = require("../../configs/uppromote.config");
var helpers_1 = require("../../../utils/helpers");
var login_strategy_1 = require("./login.strategy");
var UppromoteDashboardStrategy = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UppromoteDashboardStrategy = _classThis = /** @class */ (function () {
        function UppromoteDashboardStrategy_1(crawlDataRepository, config) {
            this.crawlDataRepository = crawlDataRepository;
            this.logger = new common_1.Logger(UppromoteDashboardStrategy.name);
            this.loginStrategy = new login_strategy_1.UppromoteLoginStrategy(config);
        }
        ////Check Item is ready crawl data
        UppromoteDashboardStrategy_1.prototype.checkItemReadyCrawl = function (item) {
            return __awaiter(this, void 0, void 0, function () {
                var nameEl, nameValue, isExist;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug('Checking item ready crawl');
                            if (!item) {
                                this.logger.debug('Item element is not available');
                                throw new Error('Item element is not available');
                            }
                            return [4 /*yield*/, item.$(uppromote_config_1.uppromoteConfig.selectors.item.title)];
                        case 1:
                            nameEl = _a.sent();
                            if (!nameEl) return [3 /*break*/, 4];
                            return [4 /*yield*/, nameEl.textContent()];
                        case 2:
                            nameValue = _a.sent();
                            if (!nameValue) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.crawlDataRepository.findOneBy({ name: nameValue })];
                        case 3:
                            isExist = _a.sent();
                            if (isExist) {
                                this.logger.debug("Item ".concat(nameValue, " already exist"));
                                return [2 /*return*/, true];
                            }
                            _a.label = 4;
                        case 4:
                            this.logger.debug('Checking item ready crawl - ready');
                            return [2 /*return*/, false];
                    }
                });
            });
        };
        UppromoteDashboardStrategy_1.prototype.navigateToBrandDetailsPage = function (item, page) {
            return __awaiter(this, void 0, void 0, function () {
                var about_this_brand_button, brandModal, viewBrandDetailsButton;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug('Navigating to brand details page');
                            if (!item) {
                                this.logger.debug('Item element is not available');
                                throw new Error('Item element is not available');
                            }
                            if (!page) {
                                this.logger.debug('Page element is not available');
                                throw new Error('Page element is not available');
                            }
                            return [4 /*yield*/, item.$(uppromote_config_1.uppromoteConfig.selectors.item.about_this_brand_button)];
                        case 1:
                            about_this_brand_button = _a.sent();
                            if (!about_this_brand_button) {
                                this.logger.debug('About this brand button not found');
                                throw new Error('About this brand button not found');
                            }
                            //Click on the 'About the brand' button
                            return [4 /*yield*/, about_this_brand_button.click()];
                        case 2:
                            //Click on the 'About the brand' button
                            _a.sent();
                            //Wait for the Brand modal to appear
                            return [4 /*yield*/, (0, helpers_1.delay)(1000)];
                        case 3:
                            //Wait for the Brand modal to appear
                            _a.sent();
                            return [4 /*yield*/, page.$(uppromote_config_1.uppromoteConfig.selectors.item.view_brand_dialog)];
                        case 4:
                            brandModal = _a.sent();
                            //Locate the `View brand details` button of the modal
                            if (!brandModal) {
                                this.logger.debug('Brand modal not found');
                                throw new Error('Brand modal not found');
                            }
                            return [4 /*yield*/, brandModal.$(uppromote_config_1.uppromoteConfig.selectors.item.view_brand_button)];
                        case 5:
                            viewBrandDetailsButton = _a.sent();
                            if (!viewBrandDetailsButton) {
                                this.logger.debug('View brand details button not found');
                                throw new Error('View brand details button not found');
                            }
                            //Click on the `View brand details` button
                            return [4 /*yield*/, viewBrandDetailsButton.click()];
                        case 6:
                            //Click on the `View brand details` button
                            _a.sent();
                            //Wait for redirection to the brand page details
                            return [4 /*yield*/, page.waitForLoadState('networkidle')];
                        case 7:
                            //Wait for redirection to the brand page details
                            _a.sent();
                            return [4 /*yield*/, page.waitForSelector(uppromote_config_1.uppromoteConfig.selectors.brandDetails.brandContainer)];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, (0, helpers_1.delay)(uppromote_config_1.uppromoteConfig.rules.rateLimit)];
                        case 9:
                            _a.sent(); // Respect rate limiting
                            this.logger.debug('Navigating to brand details page - ready');
                            return [2 /*return*/];
                    }
                });
            });
        };
        UppromoteDashboardStrategy_1.prototype.progessDashboardPage = function (page, currentPage) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug('Processing dashboard page');
                            if (!page) {
                                this.logger.debug('Page element is not available');
                                throw new Error('Page element is not available');
                            }
                            return [4 /*yield*/, page.goto(this.getFullInitialUrl(currentPage), {
                                    waitUntil: 'networkidle',
                                })];
                        case 1:
                            _a.sent();
                            if (!page.url().includes('/login')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.loginStrategy.login(page)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, page.goto(this.getFullInitialUrl(currentPage), {
                                    waitUntil: 'networkidle',
                                })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            // Locate and click on the 'Newest' option from the dropdown
                            this.logger.debug('Clicking on the sort dropdown');
                            return [4 /*yield*/, page.click(uppromote_config_1.uppromoteConfig.selectors.sortSelect)];
                        case 5:
                            _a.sent();
                            // Wait for the sort dropdown to appear
                            return [4 /*yield*/, (0, helpers_1.delay)(1000)];
                        case 6:
                            // Wait for the sort dropdown to appear
                            _a.sent();
                            // Locate and click on the 'Newest' option from the dropdown
                            this.logger.debug('Clicking on the newest option');
                            return [4 /*yield*/, page.click(uppromote_config_1.uppromoteConfig.selectors.newestOption)];
                        case 7:
                            _a.sent();
                            // Wait for the page to load after sorting
                            return [4 /*yield*/, page.waitForSelector(uppromote_config_1.uppromoteConfig.selectors.itemList)];
                        case 8:
                            // Wait for the page to load after sorting
                            _a.sent();
                            return [4 /*yield*/, (0, helpers_1.delay)(uppromote_config_1.uppromoteConfig.rules.rateLimit)];
                        case 9:
                            _a.sent(); // Respect rate limiting
                            this.logger.debug('Processing dashboard page - ready');
                            return [2 /*return*/];
                    }
                });
            });
        };
        UppromoteDashboardStrategy_1.prototype.getFullInitialUrl = function (currentPage) {
            if (currentPage === void 0) { currentPage = 1; }
            return "".concat(uppromote_config_1.uppromoteConfig.baseUrl).concat(uppromote_config_1.uppromoteConfig.endpoints.initPage, "?page=").concat(currentPage, "&per_page=").concat(uppromote_config_1.uppromoteConfig.rules.itemsPerPage);
        };
        return UppromoteDashboardStrategy_1;
    }());
    __setFunctionName(_classThis, "UppromoteDashboardStrategy");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UppromoteDashboardStrategy = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UppromoteDashboardStrategy = _classThis;
}();
exports.UppromoteDashboardStrategy = UppromoteDashboardStrategy;
