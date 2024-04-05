const auth = async (req, res, next) => {
    try {
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = auth;