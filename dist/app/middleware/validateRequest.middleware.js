"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../errors/ApiError");
const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        console.log('Validation error:', error);
        next(new ApiError_1.ApiError(400, error.errors?.map((e) => e.message).join(', ') || 'Validation error'));
    }
};
exports.default = validateRequest;
