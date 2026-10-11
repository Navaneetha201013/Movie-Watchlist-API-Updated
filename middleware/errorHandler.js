module.exports = (err, req, res, next) => {
    if(err.name === "ValidationError"){
        return res.status(400).json({
            message: "Validation Error arised"
        });
    }
    if(err.name === "CastError"){
        return res.status(400).json({
            message: "Cast Error arised"
        });
    }
    return res.status(500).json({
        message: "Server Error arised"
    });
}