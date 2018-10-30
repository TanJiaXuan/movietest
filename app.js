const express = require('express');
const app = express();
const axios = require('axios');

const Movie = require('./Movie');

const apikey = '385e80';
//const bodyParser = require('body-parser');

//x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

//localhost:5000/getmovie?title=YourMovieTitle
app.get('/getmovie', (req, res) => {
  const title = req.query.title;
  const querystr = `http://www.omdbapi.com/?t=${title}&apikey=${apikey}`;

  console.log(querystr);
  axios
    .get(querystr)
    .then(response => {
      const movie = new Movie({
        //pass javascript object to this constructor
        title: response.data.Title,
        year: response.data.Year,
        genre: response.data.Genre,
        actors: response.data.Actors,
        plot: response.data.Plot,
        poster: response.data.Poster
      });
      //if the movie data is null
      //return is exit function
      //this part is not execution
      if (!movie.title) {
        res.status(200).json('Not found');
        return;
      }
      //if the movie is undefined
      //if else statement
      //save tp database
      movie
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      console.log('axios catch', error);
      res.status(400).json(error);
    });
});

app.get('/create', (req, res) => {
  const data = new Data({
    name: req.query.name,
    value: req.query.value
  });

  data
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/getallmovies
app.get('/getallmovies', (req, res) => {
  Movie.find({})
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.get('/deletemovie', (req, res) => {
  Movie.deleteMany({ title: req.query.title })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost/postcreate
//x-www-form-urlencoded
//name=NAME value=VALUE
app.post('/postcreate', (req, res) => {
  const data = new Data({
    name: req.body.name,
    value: req.body.value
  });

  data
    .save()
    .then(respond => {
      //push the data up to server // respond anme can be res
      res.status(200).json(respond);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//start server
app.listen(5000, () => {
  console.log('server listening on port 5000');
});

//nodemon app-express-mongo.js to run
//npm install body-parser --save

//humongous.io, sing in, create new database , choose mlab
