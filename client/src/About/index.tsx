import { NavBar } from '../Home/NavBar';
import { ReadJoke } from '../Home/ReadJoke';
import { WriteJoke } from '../Home/WriteJoke';
import { Backdrop, Wrapper } from '../Home/styles';

export const About = () => (
  <Backdrop>
    <meta
      name='description'
      content='PostaJoke. A place to read and write jokes. Read jokes. Write Jokes. Share Jokes. Laugh.'
    />
    <meta
      name='keywords'
      content='PostaJoke, Post a Joke, Share Jokes, Write Jokes, Read Jokes, jokes, post, laugh, Jokes for Money, social media'
    />
    <meta name='robots' content='index,follow' />
    <NavBar />
    <div style={{ width: '70%', display: 'block', margin: 'auto', textAlign: 'center' }}>
      <Wrapper>
        <ReadJoke />
        <WriteJoke />
      </Wrapper>
      <br />
      <br />
      <h1>Post a' Joke</h1>
      <h3>What is this site : About</h3>
      <p>
        Post a' Joke is a place for you to post jokes and view jokes posted by others, with a
        post-it note theme. Users can also rate jokes, each joke is timestamped so you can prove
        ownership over a joke. Soon to come will be a leader board and rewards. The goal of the site
        is allow users to write and share jokes while being able to prove ownership. Once we have
        enough good and bad jokes we can start playing around with an AI that could write jokes.
        Read and Write Jokes, Share Jokes, Rate Jokes, Laugh.
      </p>
      <h3>Privacy Policy</h3>
      <p>
        We collect only the Data you provide via the forms. Jokes, Punchlines, Tags, etc. The data
        will be used as content for others, and to help create an AI that could write jokes, Baby
        steps.
      </p>
    </div>
    <br />
    <br />
  </Backdrop>
);
