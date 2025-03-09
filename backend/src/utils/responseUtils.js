const successResponse = (res, data, message = "Success", status = 200) => {
    return res.status(status).json({ message, data });
};

const errorResponse = (res, message = "Error", status = 500) => {
    return res.status(status).json({ message });
};

module.exports = { successResponse, errorResponse };
