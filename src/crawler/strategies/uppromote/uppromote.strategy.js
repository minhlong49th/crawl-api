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
exports.UppromoteStrategy = void 0;
var common_1 = require("@nestjs/common");
var api_service_1 = require("../../services/api.service");
var base_crawler_strategy_1 = require("../base-crawler.strategy");
var types_1 = require("../../types");
var uppromote_config_1 = require("../../configs/uppromote.config");
var helpers_1 = require("../../../utils/helpers");
var dashboard_strategy_1 = require("./dashboard.strategy");
var brandDetail_strategy_1 = require("./brandDetail.strategy");
var login_strategy_1 = require("./login.strategy");
var UppromoteStrategy = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_crawler_strategy_1.BaseCrawlerStrategy;
    var UppromoteStrategy = _classThis = /** @class */ (function (_super) {
        __extends(UppromoteStrategy_1, _super);
        function UppromoteStrategy_1(crawlDataRepository, config, apiService) {
            var _this = _super.call(this, config) || this;
            _this.crawlDataRepository = crawlDataRepository;
            _this.apiService = apiService;
            _this.logger = new common_1.Logger(UppromoteStrategy.name);
            _this.currentPage = 1;
            _this.apiService = new api_service_1.ApiService();
            _this.dashboardStrategy = new dashboard_strategy_1.UppromoteDashboardStrategy(crawlDataRepository, config);
            _this.brandStrategy = new brandDetail_strategy_1.UppromoteBrandDetailStrategy(crawlDataRepository, config);
            _this.loginStrategy = new login_strategy_1.UppromoteLoginStrategy(config);
            return _this;
        }
        UppromoteStrategy_1.prototype.extractData = function (page, taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var hasNextPage, accessTokenCookie_1, resultData, offers, _i, _a, offer, isExist, item, error_1, errorMessage;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.logger.debug('Extracting Uppromote data');
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 18, , 19]);
                            this.taskId = taskId;
                            this.currentPage = 1;
                            hasNextPage = true;
                            accessTokenCookie_1 = undefined;
                            resultData = [];
                            if (!page) {
                                this.logger.debug('Page element is not available');
                                throw new Error('Page element is not available');
                            }
                            return [4 /*yield*/, page.goto(uppromote_config_1.uppromoteConfig.baseUrl + uppromote_config_1.uppromoteConfig.endpoints.login, {
                                    waitUntil: 'networkidle',
                                })];
                        case 2:
                            _b.sent();
                            if (!page.url().includes('/login')) return [3 /*break*/, 17];
                            return [4 /*yield*/, this.loginStrategy.login(page)];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, page.goto(this.dashboardStrategy.getFullInitialUrl(this.currentPage), {
                                    waitUntil: 'networkidle',
                                })];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, (0, helpers_1.retry)(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var cookies;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, page.context().cookies()];
                                            case 1:
                                                cookies = _b.sent();
                                                this.logger.debug("Cookies:", cookies);
                                                if (cookies) {
                                                    accessTokenCookie_1 = (_a = cookies.find(function (cookie) { return cookie.name === 'marketplace_access_token'; })) === null || _a === void 0 ? void 0 : _a.value;
                                                    this.logger.debug("Access Token Cookie:", accessTokenCookie_1);
                                                }
                                                else {
                                                    this.logger.debug("No cookies found");
                                                    throw new Error('Cookie not found');
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, uppromote_config_1.uppromoteConfig.rules.maxRetries)];
                        case 5:
                            _b.sent();
                            if (!accessTokenCookie_1) return [3 /*break*/, 16];
                            _b.label = 6;
                        case 6:
                            if (!hasNextPage) return [3 /*break*/, 15];
                            return [4 /*yield*/, this.crawlListOffer(accessTokenCookie_1)];
                        case 7:
                            offers = _b.sent();
                            if (!(offers && offers.data)) return [3 /*break*/, 14];
                            _i = 0, _a = offers.data;
                            _b.label = 8;
                        case 8:
                            if (!(_i < _a.length)) return [3 /*break*/, 13];
                            offer = _a[_i];
                            return [4 /*yield*/, this.crawlDataRepository.findOneBy({ name: offer['name'] })];
                        case 9:
                            isExist = _b.sent();
                            if (isExist) {
                                this.logger.debug("Item ".concat(offer['name'], " already exist"));
                                return [3 /*break*/, 12];
                            }
                            return [4 /*yield*/, this.crawlBrandInfo(offer, accessTokenCookie_1, taskId)];
                        case 10:
                            item = _b.sent();
                            if (item) {
                                resultData.push(item);
                            }
                            return [4 /*yield*/, (0, helpers_1.delay)(uppromote_config_1.uppromoteConfig.rules.rateLimit)];
                        case 11:
                            _b.sent(); // Respect rate limiting
                            _b.label = 12;
                        case 12:
                            _i++;
                            return [3 /*break*/, 8];
                        case 13:
                            if (offers.next_page_url !== null) {
                                hasNextPage = true;
                                this.currentPage++;
                                this.logger.debug('Move to next page');
                            }
                            else {
                                hasNextPage = false;
                                this.logger.debug('No more pages to crawl');
                            }
                            _b.label = 14;
                        case 14: return [3 /*break*/, 6];
                        case 15: return [3 /*break*/, 17];
                        case 16:
                            this.logger.debug('Access Token Cookie not found');
                            throw new Error('Access Token Cookie not found');
                        case 17: return [2 /*return*/, resultData];
                        case 18:
                            error_1 = _b.sent();
                            errorMessage = error_1 instanceof Error ? error_1.message : String(error_1);
                            throw new types_1.WebsiteCrawlerError("Failed to extract Uppromote data: ".concat(errorMessage), this.config.type, { originalError: error_1 });
                        case 19: return [2 /*return*/];
                    }
                });
            });
        };
        UppromoteStrategy_1.prototype.crawlListOffer = function (accessTokenCookie) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("Calling API ".concat(uppromote_config_1.uppromoteConfig.apiUrl).concat(uppromote_config_1.uppromoteConfig.endpoints.findOffers, "?page=").concat(this.currentPage, "&per_page=").concat(uppromote_config_1.uppromoteConfig.rules.itemsPerPage, "&keyword=&sort_by=newest"));
                            return [4 /*yield*/, this.apiService.fetchData(uppromote_config_1.uppromoteConfig.apiUrl + uppromote_config_1.uppromoteConfig.endpoints.findOffers, {
                                    page: this.currentPage,
                                    per_page: uppromote_config_1.uppromoteConfig.rules.itemsPerPage,
                                    keyword: '',
                                    sort_by: 'newest'
                                }, accessTokenCookie)];
                        case 1:
                            response = _a.sent();
                            if (response && response.data) {
                                return [2 /*return*/, response.data];
                            }
                            else {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        UppromoteStrategy_1.prototype.crawlBrandInfo = function (offer, accessTokenCookie, taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var brandResponse, crawlData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("Calling API ".concat(uppromote_config_1.uppromoteConfig.apiUrl).concat(uppromote_config_1.uppromoteConfig.endpoints.brandDetail).concat(offer['shop_id']));
                            return [4 /*yield*/, this.apiService.fetchData(uppromote_config_1.uppromoteConfig.apiUrl + uppromote_config_1.uppromoteConfig.endpoints.brandDetail + offer['shop_id'], {}, accessTokenCookie)];
                        case 1:
                            brandResponse = _a.sent();
                            if (brandResponse && brandResponse.data) {
                                crawlData = this.crawlDataRepository.create({
                                    source: 'uppromote',
                                    name: offer['name'],
                                    data: brandResponse.data,
                                    crawlTaskId: taskId,
                                });
                                this.crawlDataRepository.save(crawlData);
                                return [2 /*return*/, brandResponse.data];
                            }
                            else {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        // async extractData(
        //   page: Page,
        //   taskId: string,
        // ): Promise<Record<string, any>[]> {
        //   this.logger.debug('Extracting Uppromote data');
        //   try {
        //     this.taskId = taskId;
        //     this.currentPage = 1;
        //     let hasNextPage = true;
        //     const resultData: Record<string, any>[] = [];
        //     await this.dashboardStrategy.progessDashboardPage(page, this.currentPage);
        //     // Loop through all the pages
        //     while (hasNextPage) {
        //       this.logger.debug(`Extracting data from page ${this.currentPage}`);
        //       // Extract items from current page
        //       const items = await this.extractPageData(page);
        //       resultData.push(...items);
        //       hasNextPage = await this.progressNextPageButton(page);
        //     }
        //     this.logger.debug('Extracting Uppromote data - ready');
        //     return resultData;
        //   } catch (error: unknown) {
        //     const errorMessage =
        //       error instanceof Error ? error.message : String(error);
        //     throw new WebsiteCrawlerError(
        //       `Failed to extract Uppromote data: ${errorMessage}`,
        //       this.config.type,
        //       { originalError: error },
        //     );
        //   }
        // }
        UppromoteStrategy_1.prototype.progressNextPageButton = function (page) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, helpers_1.retry)(function () { return __awaiter(_this, void 0, void 0, function () {
                                var nextButton, isEnabled, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: 
                                        // Scroll to bottom page
                                        return [4 /*yield*/, page.evaluate(function () {
                                                window.scrollTo(0, document.body.scrollHeight);
                                            })];
                                        case 1:
                                            // Scroll to bottom page
                                            _b.sent();
                                            return [4 /*yield*/, page.$(uppromote_config_1.uppromoteConfig.selectors.nextButton)];
                                        case 2:
                                            nextButton = _b.sent();
                                            if (!nextButton) return [3 /*break*/, 4];
                                            return [4 /*yield*/, nextButton.isEnabled()];
                                        case 3:
                                            _a = _b.sent();
                                            return [3 /*break*/, 5];
                                        case 4:
                                            _a = false;
                                            _b.label = 5;
                                        case 5:
                                            isEnabled = _a;
                                            this.logger.debug("The next button in the ".concat(this.currentPage, " page is ").concat(isEnabled ? 'enabled' : 'disabled'));
                                            if (!nextButton) return [3 /*break*/, 11];
                                            if (!isEnabled) return [3 /*break*/, 9];
                                            this.logger.debug('Move to next page');
                                            this.currentPage++;
                                            // await this.dashboardStrategy.progessDashboardPage(page, this.currentPage);
                                            nextButton.click();
                                            // Wait for the page to load after sorting
                                            return [4 /*yield*/, page.waitForSelector(uppromote_config_1.uppromoteConfig.selectors.itemList)];
                                        case 6:
                                            // Wait for the page to load after sorting
                                            _b.sent();
                                            return [4 /*yield*/, (0, helpers_1.delay)(uppromote_config_1.uppromoteConfig.rules.rateLimit)];
                                        case 7:
                                            _b.sent(); // Respect rate limiting
                                            return [4 /*yield*/, page.$(uppromote_config_1.uppromoteConfig.selectors.nextButton)];
                                        case 8:
                                            nextButton = _b.sent();
                                            return [2 /*return*/, true];
                                        case 9:
                                            this.logger.debug('No more pages to crawl');
                                            return [2 /*return*/, false];
                                        case 10: return [3 /*break*/, 12];
                                        case 11: throw new Error('No next button found');
                                        case 12: return [2 /*return*/];
                                    }
                                });
                            }); }, uppromote_config_1.uppromoteConfig.rules.maxRetries)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, false];
                    }
                });
            });
        };
        UppromoteStrategy_1.prototype.extractPageData = function (page) {
            return __awaiter(this, void 0, void 0, function () {
                var items, itemData, itemIndex, maxItems, item, isExist, error_2, errorMessage, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug('Extracting data from page');
                            return [4 /*yield*/, page.$$(uppromote_config_1.uppromoteConfig.selectors.itemList)];
                        case 1:
                            items = _a.sent();
                            itemData = [];
                            itemIndex = 0;
                            maxItems = items.length;
                            _a.label = 2;
                        case 2:
                            if (!(itemIndex < maxItems)) return [3 /*break*/, 13];
                            this.logger.debug("Extracting data from item ".concat(itemIndex + 1));
                            item = items[itemIndex];
                            return [4 /*yield*/, this.dashboardStrategy.checkItemReadyCrawl(item)];
                        case 3:
                            isExist = _a.sent();
                            if (isExist) {
                                itemIndex++;
                                return [3 /*break*/, 2];
                            }
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.dashboardStrategy.navigateToBrandDetailsPage(item, page)];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            error_2 = _a.sent();
                            errorMessage = error_2 instanceof Error ? error_2.message : String(error_2);
                            this.logger.debug(errorMessage);
                            return [3 /*break*/, 2];
                        case 7: return [4 /*yield*/, this.brandStrategy.extractItemData(item, page, this.taskId)];
                        case 8:
                            data = _a.sent();
                            itemData.push(data);
                            return [4 /*yield*/, page.goBack({ waitUntil: 'networkidle' })];
                        case 9:
                            _a.sent();
                            // Wait for the page to load after sorting
                            return [4 /*yield*/, page.waitForSelector(uppromote_config_1.uppromoteConfig.selectors.itemList)];
                        case 10:
                            // Wait for the page to load after sorting
                            _a.sent();
                            return [4 /*yield*/, (0, helpers_1.delay)(uppromote_config_1.uppromoteConfig.rules.rateLimit)];
                        case 11:
                            _a.sent(); // Respect rate limiting
                            return [4 /*yield*/, page.$$(uppromote_config_1.uppromoteConfig.selectors.itemList)];
                        case 12:
                            // //Locate the back button
                            // const backButton = await page.$(crawlConfig.selectors.brandDetails.backButton);
                            // if (backButton) {
                            //   backButton.click();
                            //   this.logger.debug('Back button clicked');
                            //   await page.waitForURL(this.dashboardStrategy.getFullInitialUrl(), { waitUntil: 'networkidle' }, );
                            //   // Wait for the page to load after sorting
                            //   await page.waitForSelector(crawlConfig.selectors.itemList);
                            //   await delay(crawlConfig.rules.rateLimit); // Respect rate limiting
                            // } else {
                            //   this.logger.debug('No back button found');
                            // }
                            // await this.dashboardStrategy.progessDashboardPage(page, this.currentPage);
                            items = _a.sent();
                            itemIndex = 0;
                            return [3 /*break*/, 2];
                        case 13:
                            this.logger.debug('Extracting data from page - ready');
                            return [2 /*return*/, itemData];
                    }
                });
            });
        };
        UppromoteStrategy_1.prototype.login = function (page) {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        };
        UppromoteStrategy_1.prototype.handleNavigation = function (page) {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        };
        UppromoteStrategy_1.prototype.validateWebsiteSpecificConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                var requiredSelectors, missingSelectors;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requiredSelectors = [
                            // 'mainContent',
                            // 'itemContainer',
                            // 'brandButton',
                            // 'brandDetails',
                            ];
                            missingSelectors = requiredSelectors.filter(function (selector) { return !_this.config.selectors.data[selector]; });
                            if (!(missingSelectors.length > 0)) return [3 /*break*/, 2];
                            throw new types_1.WebsiteCrawlerError("Missing required Uppromote selectors: ".concat(missingSelectors.join(', ')), this.config.type, { missingSelectors: missingSelectors });
                        case 1:
                            _a.sent(); // Dummy await to satisfy async requirement
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return UppromoteStrategy_1;
    }(_classSuper));
    __setFunctionName(_classThis, "UppromoteStrategy");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UppromoteStrategy = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UppromoteStrategy = _classThis;
}();
exports.UppromoteStrategy = UppromoteStrategy;
