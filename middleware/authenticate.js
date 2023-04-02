const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
    const headers = req.headers[`authorization`];
    if (!headers) {
        return res.status(401).json({
           
           message: 'Full authentication reqired',
           responce:"Missing authentication header",
           status:"401 Unauthorized"
           });
      }
    const token = headers.split(" ")[1];
    if (!token) {
      return res.status(404).json({ status: "error", message: "Token Error" });
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ status: "error", message: "No Token found" });
      }
      req.id = user.id;
    });
    next();
}

module.exports = authenticate;

