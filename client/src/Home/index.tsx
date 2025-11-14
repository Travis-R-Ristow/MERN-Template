import { Backdrop, Title, Wrapper } from './styles';
import { ReadJoke } from './ReadJoke';
import { WriteJoke } from './WriteJoke';
import { NavBar } from './NavBar';

export const Home = () => (
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
    <Title>Post a'Joke</Title>
    <Wrapper>
      <ReadJoke />
      <WriteJoke />
    </Wrapper>
  </Backdrop>
);
