const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");
const { studentCreateSchema, studentUpdateSchema, studentStatusSchema } = require("./students-validation");

// I avoided the try-catch because we're already using express-async-handler, so the throws inside the service shouldn't crash the app
const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents(req.query);
    res.json({ students });

});

const handleAddStudent = asyncHandler(async (req, res) => {
    const { error } = studentCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const result = await addNewStudent(req.body);
    res.status(201).json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const payload = { ...req.body, userId: req.params.id };
    const { error } = studentUpdateSchema.validate(payload);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const result = await updateStudent(payload);
    res.json(result);

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const student = await getStudentDetail(req.params.id);
    res.json(student);

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const reviewerId = req.user.id;
    const payload = { ...req.body, userId: req.params.id, reviewerId };
    const { error } = studentStatusSchema.validate(payload);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const result = await setStudentStatus({ userId: payload.userId, reviewerId, status: payload.status });
    res.json(result);

});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
