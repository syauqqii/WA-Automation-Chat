exports.successResponse = (phoneNumber) => {
    return {
        success: true, number: phoneNumber, message: 'Message sent successfully'
    };
};

exports.errorResponse = (phoneNumber, errorMessage) => {
    return {
        success: false, number: phoneNumber, message: errorMessage
    };
};