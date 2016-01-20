var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  wins: {
    type: Number,
    required: true,
    default: 0
  }
});

PlayerSchema.methods.incrementwins = function(cb) {
  console.log('Entre en incrementwins')
  this.wins += 1;
  this.save(cb);
};

mongoose.model('Player', PlayerSchema);
