const express = require("express");
const router = express.Router();
const c = require("../controllers/movieControllers");
const { protect }  = require("../middleware/auth");

router.get("", c.getMovies);

router.get("/:id", protect, c.getMovie);

router.post("", protect, c.postMovies);

router.put("/:id", protect, c.putMovies);

router.delete("/:id", protect, c.deleteMovies) ;

module.exports = router;



