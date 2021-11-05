
const MongoLib = require('../lib/mongo');

class UsersService {


  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }
  async getUsers({ tags }) {
    const query = tags && { tags: { $in: tags } }
    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }
  async getUser({ userId }) {
    const user = await this.mongoDB.get(this.collection, userId)
    return user || {};
  }
  async createUser({ user }) {
    const createdUserId = this.mongoDB.create(this.collection, user);
    return createdUserId;
  }
  async updateUser({ userId, user }) {
    const updatedUserId = this.mongoDB.update(this.collection, userId, user);
    return updatedUserId;
  }
  async deleteUser({ userId }) {
    const deletedUserId = this.mongoDB.delete(this.collection, userId);
    return deletedUserId;
  }
  // async patchuser() {
  //   const patcheduserId = await Promise.resolve(usersMocks[0].id);
  //   return patcheduserId;
  // }
}
module.exports = UsersService;