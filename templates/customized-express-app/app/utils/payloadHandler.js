const payloadHandler = (status, data, msg = undefined) => {
    let payload = {
        "data": data,
        "message": msg
    };
    res.status(status).json(payload);
};

module.exports = payloadHandler;