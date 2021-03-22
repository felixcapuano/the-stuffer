const { checkSchema, validationResult } = require("express-validator");

const rejectInvalid = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
}


exports.validate = (schema) => {
    return [checkSchema(schema), rejectInvalid];
}