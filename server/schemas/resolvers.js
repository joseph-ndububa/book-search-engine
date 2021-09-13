const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken, authMiddleware } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('books')
      
              return userData;
            }
      
            throw new AuthenticationError('Not logged in');
          },
    },
  
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect user');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password');
            }
      
            const token = signToken(user);
            return { token, user };
          },
          addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },
          saveBook: async (parent, { bookInfo }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookInfo } },
                { new: true },
              )
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in to save books!');
          },
          removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: {bookId: bookId }} },
                { new: true}
              )
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in to remove books!');
          }
    }
  };

module.exports = resolvers;