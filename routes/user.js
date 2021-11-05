const express = require('express');
const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');
const { updateUserSchema, createUserSchema, userIdSchema } = require('../utils/schemas/users');


//recive a app express for become a dinamyc router and control of what application is going to consume our app
function usersApi(app) {
  const router = express.Router();


  app.use('/api/user', router);

  //get method 
  const usersService = new UsersService();
  router.get('/', async function (req, res, next) {
    const { tags } = req.query;
    try {

      const users = await usersService.getUsers({ tags });

      res.status(200).json({
        data: users,
        message: 'Users listed'
      })
    } catch (error) {
      next(error)
    }
  });
  //get by id
  router.get('/:userId', validationHandler({ movieId: userIdSchema }, 'params'), async function (req, res, next) {
    const { userId } = req.params;
    try {
      const user = await usersService.getUser({ userId })
      res.status(200).json({
        data: user,
        message: 'users retrieved'
      })
    } catch (error) {
      next(error)
    }
  });

  //create user

  router.post('/', validationHandler(createUserSchema), async function (req, res, next) {
    const { body: user } = req;
    try {
      const createUserId = await usersService.createUser({ user })
      res.status(201).json({
        data: createUserId,
        message: 'users created'
      })
    } catch (error) {
      next(error)
    }
  });

  //update by id
  router.put('/:userId', validationHandler(updateUserSchema), validationHandler({ movieId: userIdSchema }, 'params'), async function (req, res, next) {
    const { userId } = req.params;
    const { body: user } = req;
    try {
      const updatedUserId = await usersService.updateUser({ userId, user })
      res.status(200).json({
        data: updatedUserId,
        message: 'user updated'
      })
    } catch (error) {
      next(error)
    }
  });
  //delete by id:
  router.delete('/:userId', validationHandler({ userId: userIdSchema }, 'params'), async function (req, res, next) {
    const { userId } = req.params;
    try {
      const deleteUserId = await usersService.deleteUser({ userId })
      res.status(200).json({
        data: deleteUserId,
        message: 'movies deleted'
      })
    } catch (error) {
      next(error)
    }
  });

};

module.exports = usersApi;
