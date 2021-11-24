const { check, validationResult } = require('express-validator');


exports.signupValidator = [
    check('firstName').not().isEmpty().trim().withMessage('All fields required'),
    check('lastName').not().isEmpty().trim().withMessage('All fields required'),
    check('businessId').not().isEmpty().trim().withMessage('All fields required'),
    check('businessLocation').not().isEmpty().trim().withMessage('All fields required'),
    check('phoneNumber')
        .isLength({ min: 10, max: 10})
        .withMessage('Invalid Contact Number'),
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    check('username').not().isEmpty().trim().withMessage('All fields required'),
    check('password')
        .isLength({ min: 6})
        .withMessage('Password must be at least 6 characters long'),
];

exports.signinValidator = [
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    check('password')
        .isLength({ min: 6})
        .withMessage('Invalid Credentials'),
];





exports.validatorResult = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if(hasErrors) {
        const firstError = result.array()[0].msg;
        return res.status(400).json({
            errorMessage: firstError,
        });

        //console.log('hasErrors:', hasErrors);
        //console.log('result', result);
    }

    next();
}