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
exports.TaskService = void 0;
var common_1 = require("@nestjs/common");
var crawl_task_entity_1 = require("../entities/crawl-task.entity");
// import { BrandData, WebsiteData } from '../crawler/types';
var TaskService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TaskService = _classThis = /** @class */ (function () {
        function TaskService_1(taskRepository, 
        // @InjectRepository(Brand)
        // private readonly brandRepository: Repository<Brand>,
        // @InjectRepository(BrandOffer)
        // private readonly brandOfferRepository: Repository<BrandOffer>,
        // @Inject(CACHE_MANAGER)
        // private readonly cacheManager: Cache,
        crawlerService, browserService) {
            this.taskRepository = taskRepository;
            this.crawlerService = crawlerService;
            this.browserService = browserService;
            this.logger = new common_1.Logger(TaskService.name);
        }
        TaskService_1.prototype.runTask = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var task;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.crawlerService.validateWebsiteConfiguration(dto.websiteType)];
                        case 1:
                            _a.sent();
                            task = this.taskRepository.create({
                                website: dto.url,
                                websiteType: dto.websiteType,
                                status: crawl_task_entity_1.TaskStatus.PENDING,
                                configuration: { proxy: dto.proxy },
                            });
                            return [4 /*yield*/, this.taskRepository.save(task)];
                        case 2:
                            _a.sent();
                            this.logger.log("Created new task with ID: ".concat(task.id));
                            this.startCrawling(task).catch(function (error) {
                                _this.logger.error("Task ".concat(task.id, " failed:"), error);
                            });
                            return [2 /*return*/, task.id];
                    }
                });
            });
        };
        TaskService_1.prototype.getTaskStatus = function (taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var task;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.taskRepository.findOne({
                                where: { id: taskId },
                            })];
                        case 1:
                            task = _a.sent();
                            if (!task) {
                                throw new Error("Task ".concat(taskId, " not found"));
                            }
                            // const cachedData = await this.cacheManager.get<WebsiteData[]>(
                            //   `task:${taskId}:data`,
                            // );
                            // await this.cacheManager.del(`task:${taskId}:data`);
                            // const data: BrandData[] = cachedData
                            //   ? cachedData.map((item) => ({
                            //       ...item.mainData,
                            //       offer: item.additionalData.offer,
                            //     }))
                            //   : task.brands?.map((brand) => ({
                            //       name: brand.name,
                            //       website: brand.website,
                            //       description: brand.description,
                            //       categories: brand.categories,
                            //       averageEPS: brand.averageEPS,
                            //       payoutRate: brand.payoutRate,
                            //       brand_website: brand.brand_website,
                            //       offer: {
                            //         commissionType: brand.offer.commissionType,
                            //         commissionAmount: brand.offer.commissionAmount,
                            //         commissionRules: brand.offer.commissionRules,
                            //         promotionOptions: brand.offer.promotionOptions,
                            //         cookie: brand.offer.cookie,
                            //         targetAudience: brand.offer.targetAudience,
                            //         preferredPromoChannels: brand.offer.preferredPromoChannels,
                            //         paymentMethods: brand.offer.paymentMethods,
                            //         applicationReview: brand.offer.applicationReview,
                            //       },
                            //     })) || [];
                            return [2 /*return*/, {
                                    status: task.status,
                                    error: task.error,
                                    data: [],
                                }];
                    }
                });
            });
        };
        TaskService_1.prototype.startCrawling = function (task) {
            return __awaiter(this, void 0, void 0, function () {
                var browser, page, context, error_1;
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
                        case 5: 
                        // await this.crawlerService.navigateToPage(
                        //   page,
                        //   task.website,
                        //   task.websiteType,
                        // );
                        return [4 /*yield*/, this.crawlerService.crawlDetails(page, task)];
                        case 6:
                            // await this.crawlerService.navigateToPage(
                            //   page,
                            //   task.website,
                            //   task.websiteType,
                            // );
                            _b.sent();
                            // let hasNextPage = true;
                            // while (hasNextPage) {
                            //   const items = await page.$$(
                            //     'div[contains(@class, "styles_offerItemGroup")]/div[contains(@class, "styles_findOfferItemContainer")]',
                            //   );
                            //   for (let i = 0; i < items.length; i++) {
                            //     const websiteData = (await this.crawlerService.crawlBrandDetails(
                            //       page,
                            //       task.websiteType,
                            //     )) as WebsiteData;
                            //     const brand = this.brandRepository.create({
                            //       name: websiteData.mainData.name,
                            //       website: websiteData.mainData.website,
                            //       description: websiteData.mainData.description,
                            //       categories: websiteData.mainData.categories,
                            //       averageEPS: websiteData.mainData.averageEPS,
                            //       payoutRate: websiteData.mainData.payoutRate,
                            //       brand_website: websiteData.mainData.brand_website,
                            //       crawlTaskId: task.id,
                            //     });
                            //     const offer = websiteData.additionalData.offer;
                            //     const brandOffer = this.brandOfferRepository.create({
                            //       commissionType: offer.commissionType,
                            //       commissionAmount: offer.commissionAmount,
                            //       commissionRules: offer.commissionRules,
                            //       promotionOptions: offer.promotionOptions,
                            //       cookie: offer.cookie,
                            //       targetAudience: offer.targetAudience,
                            //       preferredPromoChannels: offer.preferredPromoChannels,
                            //       paymentMethods: offer.paymentMethods,
                            //       applicationReview: offer.applicationReview,
                            //     });
                            //     brand.offer = brandOffer;
                            //     await this.brandRepository.save(brand);
                            //     // await this.cacheManager.set(
                            //     //   `task:${task.id}:data`,
                            //     //   [websiteData],
                            //     //   60 * 60 * 24,
                            //     // );
                            //   }
                            //   const nextButton = await page.$(
                            //     'button[contains(@class, "styles_nextButton")]',
                            //   );
                            //   if (nextButton) {
                            //     await nextButton.click();
                            //     await page.waitForLoadState('networkidle');
                            //   } else {
                            //     hasNextPage = false;
                            //   }
                            // }
                            return [4 /*yield*/, this.taskRepository.update(task.id, {
                                    status: crawl_task_entity_1.TaskStatus.COMPLETED,
                                    completedAt: new Date(),
                                })];
                        case 7:
                            // let hasNextPage = true;
                            // while (hasNextPage) {
                            //   const items = await page.$$(
                            //     'div[contains(@class, "styles_offerItemGroup")]/div[contains(@class, "styles_findOfferItemContainer")]',
                            //   );
                            //   for (let i = 0; i < items.length; i++) {
                            //     const websiteData = (await this.crawlerService.crawlBrandDetails(
                            //       page,
                            //       task.websiteType,
                            //     )) as WebsiteData;
                            //     const brand = this.brandRepository.create({
                            //       name: websiteData.mainData.name,
                            //       website: websiteData.mainData.website,
                            //       description: websiteData.mainData.description,
                            //       categories: websiteData.mainData.categories,
                            //       averageEPS: websiteData.mainData.averageEPS,
                            //       payoutRate: websiteData.mainData.payoutRate,
                            //       brand_website: websiteData.mainData.brand_website,
                            //       crawlTaskId: task.id,
                            //     });
                            //     const offer = websiteData.additionalData.offer;
                            //     const brandOffer = this.brandOfferRepository.create({
                            //       commissionType: offer.commissionType,
                            //       commissionAmount: offer.commissionAmount,
                            //       commissionRules: offer.commissionRules,
                            //       promotionOptions: offer.promotionOptions,
                            //       cookie: offer.cookie,
                            //       targetAudience: offer.targetAudience,
                            //       preferredPromoChannels: offer.preferredPromoChannels,
                            //       paymentMethods: offer.paymentMethods,
                            //       applicationReview: offer.applicationReview,
                            //     });
                            //     brand.offer = brandOffer;
                            //     await this.brandRepository.save(brand);
                            //     // await this.cacheManager.set(
                            //     //   `task:${task.id}:data`,
                            //     //   [websiteData],
                            //     //   60 * 60 * 24,
                            //     // );
                            //   }
                            //   const nextButton = await page.$(
                            //     'button[contains(@class, "styles_nextButton")]',
                            //   );
                            //   if (nextButton) {
                            //     await nextButton.click();
                            //     await page.waitForLoadState('networkidle');
                            //   } else {
                            //     hasNextPage = false;
                            //   }
                            // }
                            _b.sent();
                            return [4 /*yield*/, page.close()];
                        case 8:
                            _b.sent();
                            return [3 /*break*/, 11];
                        case 9:
                            error_1 = _b.sent();
                            return [4 /*yield*/, this.taskRepository.update(task.id, {
                                    status: crawl_task_entity_1.TaskStatus.FAILED,
                                    error: error_1 instanceof Error ? error_1.message : 'Unknown error',
                                })];
                        case 10:
                            _b.sent();
                            throw error_1;
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        TaskService_1.prototype.stopTask = function (taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var task, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.taskRepository.findOne({
                                where: { id: taskId },
                            })];
                        case 1:
                            task = _a.sent();
                            if (!task) {
                                throw new Error("Task with ID ".concat(taskId, " not found"));
                            }
                            if (task.status !== crawl_task_entity_1.TaskStatus.RUNNING) {
                                throw new Error("Task with ID ".concat(taskId, " is not running"));
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            // Call API to stop the crawl progress
                            return [4 /*yield*/, this.crawlerService.stopCrawl(taskId)];
                        case 3:
                            // Call API to stop the crawl progress
                            _a.sent();
                            // Update task status in the repository
                            return [4 /*yield*/, this.taskRepository.update(taskId, { status: crawl_task_entity_1.TaskStatus.STOPPED })];
                        case 4:
                            // Update task status in the repository
                            _a.sent();
                            this.logger.log("Stopped task with ID: ".concat(taskId));
                            return [2 /*return*/, {
                                    status: crawl_task_entity_1.TaskStatus.STOPPED,
                                    error: '',
                                    data: [],
                                }];
                        case 5:
                            error_2 = _a.sent();
                            this.logger.error("Failed to stop task with ID: ".concat(taskId), error_2.stack);
                            throw new Error("Failed to stop task with ID ".concat(taskId, ": ").concat(error_2.message));
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        return TaskService_1;
    }());
    __setFunctionName(_classThis, "TaskService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TaskService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TaskService = _classThis;
}();
exports.TaskService = TaskService;
