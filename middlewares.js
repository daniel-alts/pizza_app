const { authenticate } = require('./utils');

async function basicAuthMiddleware(req, res, next) {
    if (req.path == "/users/authenticate" || req.path == "/users/new") {
      return next();
    }
  
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf("Basic") === -1
    ) {
      return res.status(401).json({ message: "Missing Authorization Header" });
    }
  
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
    const [username, password] = credentials.split(":");
    const user = await authenticate({ username, password });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Credentials" });
    }

    const adminPermissions = {
        "/order": "POST",
        "//\/orders\/.*/": "PATCH",
        "/\/orders\/.*/": "DELETE"
    }
    let permitted = true;
    Object.entries(adminPermissions).forEach(route => {
        if (route[0].match(req[0]) && route[1] === req.method) {
            permitted = false;
        }
    })

    if (!permitted) {
      return res.status(401).json({message: "You do not have permission to this route"})
    } else {
      res.setHeader('Content-Type', 'application/json');
      req.user = user;
      next();
    }
}

module.exports = basicAuthMiddleware;