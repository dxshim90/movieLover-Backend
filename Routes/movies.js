const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");

router.get("/now", moviesController.getCurrentMovies);

router.get("/top", moviesController.getTopRated);

router.get("/upcoming", moviesController.getUpcoming);

router.post("/add", moviesController.addMovie);

router.post("/collection", moviesController.getCollection);

module.exports = router;