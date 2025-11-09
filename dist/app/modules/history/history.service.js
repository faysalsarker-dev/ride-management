"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const ApiError_1 = require("../../errors/ApiError");
const History_model_1 = require("./History.model");
exports.HistoryService = {
    createHistory: async (payload) => {
        const history = await History_model_1.History.create(payload);
        return history;
    },
    getAllHistories: async () => {
        return History_model_1.History.find().populate("rideId riderId driverId");
    },
    getSingleHistory: async (id) => {
        return History_model_1.History.findById(id).populate("rideId riderId driverId");
    },
    updateHistory: async (id, payload) => {
        return History_model_1.History.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
    },
    deleteHistory: async (id) => {
        return History_model_1.History.findByIdAndDelete(id);
    },
    updateRiderFeedback: async (historyId, data) => {
        const history = await History_model_1.History.findById(historyId);
        if (!history) {
            throw new ApiError_1.ApiError(404, 'History not found');
        }
        const result = await History_model_1.History.findByIdAndUpdate(historyId, {
            riderRating: data.rating,
        }, { new: true });
        return result;
    },
    updateDriverFeedback: async (historyId, data) => {
        const history = await History_model_1.History.findById(historyId);
        if (!history) {
            throw new ApiError_1.ApiError(404, 'History not found');
        }
        return History_model_1.History.findByIdAndUpdate(historyId, {
            driverRating: data.rating,
        }, { new: true });
    }
};
