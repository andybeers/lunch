const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const schema = new Schema({ //eslint-disable-line
  username: {type: String, required: true},
  password: {type: String, required: true},
  communityId: {
    type: Schema.Types.ObjectId,
    ref: 'Community'
  },
  favoriteUsers: {type: Array}
});

schema.methods.generateHash = function(password) {
  return this.password = bcrypt.hashSync(password, 8);
};

schema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);