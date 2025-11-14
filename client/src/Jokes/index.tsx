import { NavBar } from '../Home/NavBar';
import { ReadJoke } from '../Home/ReadJoke';
import { TitleHeader, Wrapper } from './styles';

export const JokePage = () => {
  return (
    <>
      <meta
        name='description'
        content='PostaJoke. A place to read and write jokes. Read jokes. Write Jokes. Share Jokes. Laugh.'
      />
      <meta
        name='keywords'
        content='PostaJoke, Post a Joke, Share Jokes, Write Jokes, Read Jokes, jokes, post, laugh, Jokes for Money, social media'
      />
      <meta name='robots' content='index,follow' />
      <NavBar navItem='Jokes' />
      <Wrapper>
        <TitleHeader>Read Jokes</TitleHeader>
        <p>Sign in to Rate jokes, and Write jokes.</p>
        <p style={{ marginTop: 0 }}>
          Search by text in the joke or via Tags. You can filter to only Kid Friendly Jokes.
        </p>
        <br />
        <ReadJoke isBigComp />
      </Wrapper>
    </>
  );
};
