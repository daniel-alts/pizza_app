const router = require("express").Router;

router.get("/", (req, res) => {
	return res.json({ status: true });
});

