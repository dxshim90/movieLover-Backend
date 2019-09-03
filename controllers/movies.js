const User = require("../model/User");
const fetch = require("node-fetch");
const utils = require("../config/config");

exports.getCurrentMovies = async (req, res, next) => {
  try {
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${utils.APIKEY}&language=en-UK&page=1`
    );
    const response = await request.json();
    res.json(response.results);
  } catch (error) {
    console.log(error);
  }
};

exports.getTopRated = async (req, res, next) => {
  try {
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${utils.APIKEY}&language=en-UK&page=1`
    );
    const response = await request.json();
    res.json(response.results);
  } catch (error) {
    console.log(error);
  }
};

exports.getUpcoming = async (req, res, next) => {
  try {
    const request = await fetch(
      ` https://api.themoviedb.org/3/movie/upcoming?api_key=${utils.APIKEY}&language=en-UK&page=1`
    );
    const response = await request.json();
    res.json(response.results);
  } catch (error) {
    console.log(error);
  }
};

exports.getCollection = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.json(user.movies);
  } catch (error) {
    res.json(error);
  }
};

exports.addMovie = async (req, res, next) => {
  try {
    const { email, movie } = req.body;
    const user = await User.findOne({ email });
    if (user.movies.some(element => element.id === movie.id)) {
      return res.json("That Movie is already in your collection");
    }
    user.movies.push(movie);
    await user.save();
    res.json("Movie Added to collection");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.removeMovie = async (req, res, next) => {
  try {
    const { email, movie } = req.body;
    const user = await User.findOne({ email });
    const filter = user.movies.filter(element => {
      return element.id !== movie.id;
    });
    user.movies = filter;
    await user.save();
    res.json("Movie has been removed from your collection");
  } catch (error) {
    res.json(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { query } = req.body;
    const request = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${utils.APIKEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const response = await request.json();
    res.json(response.results);
  } catch (error) {
    res.json(error.message);
  }
};

exports.suggested = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${utils.APIKEY}&language=en-US&page=1`
    );
    const response = await request.json();
    res.json(response);
  } catch (error) {
    res.json(error.message);
  }
};
