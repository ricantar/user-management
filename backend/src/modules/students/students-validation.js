const Joi = require('joi');

const studentCreateSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    dob: Joi.date().less(new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000)).required().messages({
        'date.less': 'Student must be at least 18 years old',
        'date.base': 'Birth date must be a valid date',
        'any.required': 'Birth date is required'
    }),
    admissionDate: Joi.date().required(),
    class: Joi.string().min(1).required(),
    section: Joi.string().min(1).required(),
    role: Joi.string().min(1).required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    phone: Joi.string().pattern(/^\d{7,15}$/).required().messages({
        'string.pattern.base': 'Phone number must contain only digits and be 7-15 characters long'
    }),
    currentAddress: Joi.string().min(1).required(),
    permanentAddress: Joi.string().min(1).required(),
    fatherName: Joi.string().allow(''),
    fatherPhone: Joi.string().pattern(/^\d{7,15}$/).allow('').messages({
        'string.pattern.base': 'Father phone must contain only digits and be 7-15 characters long'
    }),
    motherName: Joi.string().allow(''),
    motherPhone: Joi.string().pattern(/^\d{7,15}$/).allow('').messages({
        'string.pattern.base': 'Mother phone must contain only digits and be 7-15 characters long'
    }),
    guardianName: Joi.string().min(1).required(),
    guardianPhone: Joi.string().pattern(/^\d{7,15}$/).required().messages({
        'string.pattern.base': 'Guardian phone must contain only digits and be 7-15 characters long'
    }),
    relationOfGuardian: Joi.string().min(1).required(),
    systemAccess: Joi.boolean().required()
});

const studentUpdateSchema = Joi.object({
    userId: Joi.number().required(),
    name: Joi.string().min(1),
    email: Joi.string().email(),
    dob: Joi.date().less(new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000)).messages({
        'date.less': 'Student must be at least 18 years old',
        'date.base': 'Birth date must be a valid date'
    }),
    admissionDate: Joi.date(),
    class: Joi.string().min(1),
    section: Joi.string().min(1),
    role: Joi.string().min(1),
    gender: Joi.string().valid('Male', 'Female', 'Other'),
    phone: Joi.string().pattern(/^\d{7,15}$/).messages({
        'string.pattern.base': 'Phone number must contain only digits and be 7-15 characters long'
    }),
    currentAddress: Joi.string().min(1),
    permanentAddress: Joi.string().min(1),
    fatherName: Joi.string().allow(''),
    fatherPhone: Joi.string().pattern(/^\d{7,15}$/).allow('').messages({
        'string.pattern.base': 'Father phone must contain only digits and be 7-15 characters long'
    }),
    motherName: Joi.string().allow(''),
    motherPhone: Joi.string().pattern(/^\d{7,15}$/).allow('').messages({
        'string.pattern.base': 'Mother phone must contain only digits and be 7-15 characters long'
    }),
    guardianName: Joi.string().min(1),
    guardianPhone: Joi.string().pattern(/^\d{7,15}$/).messages({
        'string.pattern.base': 'Guardian phone must contain only digits and be 7-15 characters long'
    }),
    relationOfGuardian: Joi.string().min(1),
    systemAccess: Joi.boolean()
});

const studentStatusSchema = Joi.object({
    userId: Joi.number().required(),
    reviewerId: Joi.number().required(),
    status: Joi.boolean().required()
});

module.exports = {
    studentCreateSchema,
    studentUpdateSchema,
    studentStatusSchema
};
