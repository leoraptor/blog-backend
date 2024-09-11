const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const token = req.cookies.access_token || req.headers["access_token"];

  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "you are not authenticated" });
  }

  jwt.verify(token, process.env.SKEY, async (err, data) => {
    if (err) {
      return res
        .status(403)
        .json({ status: "failed", message: "Invalid token" });
    }

    next();
  });
};

module.exports = verify;
