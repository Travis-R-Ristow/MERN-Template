import { useMutation } from '@tanstack/react-query';
import classnames from 'classnames';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastTypes, pushToast } from '../../Global/myToaster';
import thumbsDown from '../../Static/thumbsDown.png';
import thumbsUp from '../../Static/thumbsUp.png';
import { theme } from '../../Theme';
import type { Joke as JokeType } from '../../api/Joke';
import { getRandomJokeCall, reportJoke, sendRating } from '../../api/Joke';
import { JokeTags, _setTags } from '../Tags';
import {
  Bold,
  CheckBox,
  CheckBoxWrapper,
  Emoji,
  FilterWrapper,
  InputSearch,
  Joke,
  LittleButton,
  OfferBox,
  OfferButton,
  OfferContent,
  OfferTitle,
  ReportButton,
  SmallText
} from '../styles';
import { route } from '../../Routes';

export const ReadJoke = ({ isBigComp = false }: { isBigComp?: boolean }) => {
  const [randomJoke, setRandomJoke] = useState<JokeType>();
  const [prevJokeId, setPrevJokeId] = useState<string>();
  const [jokeRating, setJokeRating] = useState<boolean | null | undefined>(null);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isKidFriendly, setIsKidFriendly] = useState<boolean>(false);
  const [showJoke, setShowJoke] = useState<boolean>(false);
  const [showJokeError, setShowJokeError] = useState<boolean>(false);
  const [showPunchLine, setShowPunchLine] = useState<boolean>(false);
  const [reportText, setReportText] = useState<string>('Report');
  const navigate = useNavigate();
  const hasToken = !!sessionStorage.getItem('accessToken');

  const useGetRandomJoke = useMutation({
    mutationFn: getRandomJokeCall,
    onError: (err) => {
      console.error(err);
      setShowJokeError(true);
    },
    onSuccess: (res) => {
      if (res.status === 204) {
        pushToast('No jokes with that search.', ToastTypes.error);
        setShowJokeError(true);
        return;
      }

      setRandomJoke(res.data);
      setPrevJokeId(res.data._id);
      setJokeRating(res.data.rating);
      setReportText(res.data.didReport ? 'Un-Report' : 'Report');
      setShowJoke(true);
    }
  });

  const useSendRating = useMutation({
    mutationFn: sendRating,
    onError: (err) => console.error(err),
    onSuccess: (res) => {
      pushToast('Rating Sent!');
      setJokeRating(res.data);
    }
  });

  const useReportJoke = useMutation({
    mutationFn: reportJoke,
    onError: (err) => console.error(err),
    onSuccess: () => {
      pushToast(`Joke ${reportText}ed`);
      setReportText((prevText) => (prevText === 'Report' ? 'Un-Report' : 'Report'));
    }
  });

  const handleGibJokeClick = () => {
    setRandomJoke(undefined);
    setShowJokeError(false);
    if (showJoke) {
      setShowJoke(false);
      setShowPunchLine(false);
    } else {
      useGetRandomJoke.mutate({ searchTags, searchText, isKidFriendly, prevJokeId });
    }
  };

  const handleSearchTextOnChange = ({ target: { value } }: { target: { value: string } }) =>
    setSearchText(value);

  const handleEmojiClick = ({ target }: MouseEvent<HTMLImageElement>) =>
    (target as HTMLImageElement).alt === 'thumbs-up'
      ? useSendRating.mutate({ joke: randomJoke as JokeType, rating: true })
      : useSendRating.mutate({ joke: randomJoke as JokeType, rating: false });

  const setTags = (tags: string[], pushStr?: string) => _setTags(tags, setSearchTags, pushStr);

  const handleReportClick = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to ${reportText} this joke?`)) {
      useReportJoke.mutate(randomJoke as JokeType);
    }
  };

  return (
    <OfferBox className={classnames({ isBigComp })}>
      <OfferTitle>Read some jokes.</OfferTitle>
      <OfferContent>Search for specific joke text:</OfferContent>
      <div style={{ alignItems: 'center', width: '50%' }}>
        <InputSearch
          placeholder='Search for specific joke text'
          onChange={handleSearchTextOnChange}
        />
      </div>
      {isBigComp && (
        <>
          <OfferContent>Add some Tags to your Search:</OfferContent>
          <SmallText>Separated by a comma. Limit 10</SmallText>
          <FilterWrapper>
            {searchTags.length ? (
              <LittleButton onClick={() => setSearchTags([])}>Clear</LittleButton>
            ) : null}
            <JokeTags tags={searchTags} setTags={setTags} />
          </FilterWrapper>
        </>
      )}
      <CheckBoxWrapper>
        <label>Kid Friendly Only</label>
        <CheckBox
          id='isKidFriendly'
          name='isKidFriendly'
          checked={isKidFriendly}
          onChange={({ target: { checked } }) => setIsKidFriendly(checked)}
        />
      </CheckBoxWrapper>
      <OfferButton onClick={handleGibJokeClick}>
        {showJoke ? 'Gib New Joke' : 'Joke Me'}
      </OfferButton>
      {showJokeError && (
        <OfferContent style={{ color: theme.postIt.red }}>
          Failed to get joke. Try with different a search or try again later.
        </OfferContent>
      )}
      {showJoke && (
        <>
          <Joke>{randomJoke?.joke}</Joke>
          {showPunchLine ? (
            <Joke>{randomJoke?.punchline}</Joke>
          ) : (
            randomJoke?.punchline && (
              <OfferButton onClick={() => setShowPunchLine(true)}>? ? ?</OfferButton>
            )
          )}
          {(showPunchLine || !randomJoke?.punchline) && (
            <div style={{ width: '100%', justifyContent: 'space-evenly' }}>
              <div
                style={{
                  marginBottom: '0.5rem',
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <p style={{ marginRight: '0.5rem' }}>
                  <Bold>Author :</Bold>
                </p>
                <p>{randomJoke?.displayName}</p>
              </div>
              {hasToken && (
                <ReportButton onClick={handleReportClick}>
                  <p>{reportText}</p>
                </ReportButton>
              )}
              {hasToken && (
                <div style={{ alignItems: 'center' }}>
                  <Emoji
                    src={thumbsUp}
                    alt='thumbs-up'
                    onClick={handleEmojiClick}
                    className={classnames({ selected: jokeRating === true })}
                  />
                  <Emoji
                    src={thumbsDown}
                    alt='thumbs-down'
                    onClick={handleEmojiClick}
                    className={classnames({ selected: jokeRating === false })}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
      {!isBigComp && (
        <div style={{ width: '100%' }}>
          <LittleButton
            style={{ marginRight: '1rem', marginLeft: 'auto' }}
            onClick={() => navigate(hasToken ? route.userPage : route.jokes)}
          >
            Go To Jokes Page.
          </LittleButton>
        </div>
      )}
    </OfferBox>
  );
};
