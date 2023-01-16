const jwt = require();

const verifyJWT = async(req, res, next) => {
    const { token } = req.cookies;
    await jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) throw err;
        res.status(200).json(decoded);
    });
};