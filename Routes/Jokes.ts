import JOKE from '../Models/joke';
import express from 'express';
import { Joke } from '../Models/joke';
import { checkToken, cleanTags, humorCheck, parseTokenWhenProvided } from '../helpers';
import { returnJokeToUser } from '../helpers/returnJoke';
import rateLimit from 'express-rate-limit';
import { buildSearchQuery } from './Jokes/buildSearchQuery';

const jokeRoute = express.Router();
const DUPLICATE_KEY_ERROR = 11000;

jokeRoute.route('/get-random-joke').post(parseTokenWhenProvided, async (req, res) => {
  return await JOKE.aggregate(
    buildSearchQuery(
      req.body.searchText,
      req.body.searchTags,
      req.body.isKidFriendly,
      req.body.prevJokeId
    )
  )
    .sample(1)
    .then(async (jokes) => {
      if (!jokes[0]?._id) {
        return res.status(204).send('No jokes with that search.');
      }
      return await JOKE.findById<Joke>(jokes[0]._id)
        .then((joke) => res.send(returnJokeToUser(joke, req.body.user)))
        .catch((findByIdErr) => {
          console.log(findByIdErr);
          return res.status(500).send('Error getting random joke.');
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send('Error getting random joke.');
    });
});

jokeRoute
  .route('/add-joke')
  .post(rateLimit({ windowMs: 13000, limit: 2 }), checkToken, humorCheck, async (req, res) => {
    const newJOKE = {
      author: req.body.user._id,
      displayName: req.body.user.displayName,
      isKidFriendly: req.body.isKidFriendly,
      joke: req.body.joke,
      punchline: req.body.punchline,
      tags: cleanTags(req.body.tags.slice(0, 10))
    };

    await JOKE.create(newJOKE)
      .then(() => {
        res.status(200).send('Joke added successfully.');
      })
      .catch((err) => {
        console.log(err);
        if (err.code === DUPLICATE_KEY_ERROR) {
          return res.status(400).send('Joke already exists.');
        }

        res.status(500).send('Adding new joke failed.');
      });
  });

jokeRoute.route('/update-joke').post(checkToken, humorCheck, async (req, res) => {
  const newJOKE = {
    author: req.body.user._id,
    displayName: req.body.user.displayName,
    isKidFriendly: req.body.isKidFriendly,
    joke: req.body.joke,
    punchline: req.body.punchline,
    tags: cleanTags(req.body.tags.slice(0, 10))
  };

  await JOKE.findOneAndUpdate({ _id: req.body._id }, newJOKE, { new: true })
    .then(() => {
      res.status(200).send('Joke updated successfully.');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('updating new joke failed.');
    });
});

jokeRoute.route('/delete-joke').post(checkToken, async (req, res) => {
  await JOKE.findByIdAndDelete(req.body._id)
    .then(() => {
      return res.status(200).send('Joke deleted successfully.');
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send('Error deleting joke.');
    });
});

jokeRoute.route('/get-users-jokes').get(checkToken, async (req, res) => {
  await JOKE.find<Joke>({ author: req.body.user._id })
    .then((jokes) => {
      const returnableJokes = jokes.map((joke) => returnJokeToUser(joke, req.body.user));
      return res.send(returnableJokes);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error finding User's joke.");
    });
});

jokeRoute.route('/rate-joke').post(checkToken, async (req, res) => {
  return await JOKE.findById(req.body.joke._id)
    .then((joke) => {
      if (!joke) {
        return res.status(404).send('Joke not found.');
      }

      if (req.body.rating) {
        if (!joke.upUsers.includes(req.body.user._id)) {
          joke.upUsers.push(req.body.user._id);
          joke.downUsers = joke.downUsers.filter((user) => !user.equals(req.body.user._id));
        }
      } else {
        if (!joke.downUsers.includes(req.body.user._id)) {
          joke.downUsers.push(req.body.user._id);
          joke.upUsers = joke.upUsers.filter((user) => !user.equals(req.body.user._id));
        }
      }
      joke
        .save()
        .then(() => res.status(200).send(req.body.rating))
        .catch(() => res.status(500).send('Error rating joke.'));
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send('Error rating joke.');
    });
});

jokeRoute.route('/report-joke').post(checkToken, async (req, res) => {
  await JOKE.findById(req.body._id)
    .then((joke) => {
      if (!joke) {
        return res.status(404).send('Joke not found.');
      }

      if (joke.reports.includes(req.body.user._id)) {
        joke.reports = joke.reports.filter((user) => !user.equals(req.body.user._id));
      } else {
        joke.reports.push(req.body.user._id);
      }

      joke
        .save()
        .then(() => res.status(200).send('Joke reported.'))
        .catch(() => res.status(500).send('Error reporting joke.'));
    })
    .catch(() => {
      res.status(500).send('Error reporting joke.');
    });
});

export default jokeRoute;
