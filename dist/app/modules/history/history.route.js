"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const history_controller_1 = require("./history.controller");
const validateRequest_middleware_1 = __importDefault(require("../../middleware/validateRequest.middleware"));
const history_validation_1 = require("./history.validation");
const router = express_1.default.Router();
router.get('/', history_controller_1.HistoryController.getAll);
router.patch('/rider-feedback/:rideId', 
// validateRequest(riderFeedbackSchema),
history_controller_1.HistoryController.updateRiderFeedback);
router.patch('/driver-feedback/:driveId', 
// validateRequest(driverFeedbackSchema),
history_controller_1.HistoryController.updateDriverFeedback);
router.get('/:id', history_controller_1.HistoryController.getById);
router.patch('/:id', (0, validateRequest_middleware_1.default)(history_validation_1.updateHistorySchema), history_controller_1.HistoryController.update);
router.delete('/:id', history_controller_1.HistoryController.delete);
exports.default = router;
