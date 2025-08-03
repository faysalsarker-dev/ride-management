"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const history_service_1 = require("./history.service");
exports.HistoryController = {
    getAll: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await history_service_1.HistoryService.getAllHistories();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Histories retrieved successfully',
            data: result,
        });
    }),
    getById: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { id } = req.params;
        const result = await history_service_1.HistoryService.getSingleHistory(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'History retrieved successfully',
            data: result,
        });
    }),
    update: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const result = await history_service_1.HistoryService.updateHistory(id, data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'History updated successfully',
            data: result,
        });
    }),
    delete: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { id } = req.params;
        const result = await history_service_1.HistoryService.deleteHistory(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'History deleted successfully',
            data: result,
        });
    }),
    updateRiderFeedback: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { rideId } = req.params;
        const updated = await history_service_1.HistoryService.updateRiderFeedback(rideId, req.body, req.user._id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Rider feedback submitted',
            data: updated,
        });
    }),
    updateDriverFeedback: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { driveId } = req.params;
        const updated = await history_service_1.HistoryService.updateDriverFeedback(driveId, req.body, req.user._id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Driver feedback submitted',
            data: updated,
        });
    }),
};
