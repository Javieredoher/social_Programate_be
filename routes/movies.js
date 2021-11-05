const express = require('express');
const MoviesService = require('../services/movies');
const validationHandler = require('../utils/middleware/validationHandler');
const { updateMovieSchema, createMovieSchema, movieIdSchema } = require('../utils/schemas/movies');


//recive a app express for become a dinamyc router and control of what application is going to consume our app
function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);
  const moviesService = new MoviesService();
  router.get('/', async function (req, res, next) {
    const { tags } = req.query;
    try {

      const movies = await moviesService.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch (error) {
      next(error)
    }
  });
  router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
    const { movieId } = req.params;
    try {
      const movies = await moviesService.getMovie({ movieId })
      res.status(200).json({
        data: movies,
        message: 'movies retrieved'
      })
    } catch (error) {
      next(error)
    }
  });
  router.post('/', validationHandler(createMovieSchema), async function (req, res, next) {
    const { body: movie } = req;
    try {
      const createMovieId = await moviesService.createMovie({ movie })
      res.status(201).json({
        data: createMovieId,
        message: 'movies created'
      })
    } catch (error) {
      next(error)
    }
  });
  router.put('/:movieId', validationHandler(updateMovieSchema), validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const updatedMovieId = await moviesService.updateMovie({ movieId, movie })
      res.status(200).json({
        data: updatedMovieId,
        message: 'movies updated'
      })
    } catch (error) {
      next(error)
    }
  });
  router.delete('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
    const { movieId } = req.params;
    try {
      const deleteMovieId = await moviesService.deleteMovie({ movieId })
      res.status(200).json({
        data: deleteMovieId,
        message: 'movies deleted'
      })
    } catch (error) {
      next(error)
    }
  });
  router.patch('/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const deleteMovieId = await moviesService.deleteMovie({ movieId, movie })
      res.status(200).json({
        data: deleteMovieId,
        message: 'movies deleted'
      })
    } catch (error) {
      next(error)
    }
  });
};

module.exports = moviesApi;
