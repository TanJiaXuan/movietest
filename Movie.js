const mongoose = require('mongoose');
const db = 'mongodb://jx97:7801Anjoo@ds141043.mlab.com:41043/jxmovies';

//connect database
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connection error: ', error);
  });

//Title, Year, Genre, Actors, Plot and Poster
const schema = mongoose.Schema({
  title: { type: String },
  year: { type: String },
  genre: { type: String },
  actors: { type: String },
  plot: { type: String },
  poster: { type: String }
});

const Movie = mongoose.model('Movie', schema, 'movieCollection'); //dataCollection mean table

//export model
module.exports = Movie;
