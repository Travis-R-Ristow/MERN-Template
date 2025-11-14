import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastTypes, pushToast } from '../../Global/myToaster';
import { Button } from '../../Global/styles';
import { Input } from '../../LogIn/styles';
import { route } from '../../Routes';
import { theme } from '../../Theme';
import { Joke, createJoke, getUserJokesKey } from '../../api/Joke';
import { JokeTags, _setTags } from '../Tags';
import {
  ButtonWrapper,
  CheckBox,
  CheckBoxWrapper,
  Description,
  InputWrapper,
  OfferBox,
  OfferButton,
  OfferContent,
  OfferTitle,
  SmallText
} from '../styles';

export type OverrideProps = {
  saveBtnAction?: (updateJoke: Joke) => Promise<AxiosResponse>;
  saveBtnText?: string;
  title?: string;
  styles?: CSSProperties;
  inputWrapperStyles?: CSSProperties;
};

type WriteJokeProps = {
  isBigComp?: boolean;
  joke?: Joke;
  overrideContent?: OverrideProps;
};

export const WriteJoke = ({
  joke,
  overrideContent,
  isBigComp = !!joke ?? false
}: WriteJokeProps) => {
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const hasToken = !!sessionStorage.getItem('accessToken');
  const [newJoke, setNewJoke] = useState<Joke>(
    joke ?? { joke: '', punchline: '', tags: [], isKidFriendly: false }
  );

  const saveTags = (tags: string[]) => {
    setNewJoke((prevJoke) => ({
      ...prevJoke,
      tags: [...tags]
    }));
  };

  const setTags = (tags: string[], pushStr?: string) => _setTags(tags, saveTags, pushStr);

  const onChangeHandler = (key: 'joke' | 'punchline', value: string) => {
    newJoke[key] = value;
    setNewJoke({ ...newJoke });
  };

  return (
    <OfferBox style={{ ...overrideContent?.styles, background: theme.postIt.pink }}>
      <OfferTitle>{overrideContent?.title ?? 'Write a joke'}</OfferTitle>
      {isBigComp ? (
        <InputWrapper style={overrideContent?.inputWrapperStyles}>
          <Description>Joke. </Description>
          <Input
            onChange={({ target: { value } }) => onChangeHandler('joke', value)}
            placeholder='Why did the Super Hero flush the toilet?'
            style={{ width: '100%' }}
            value={newJoke.joke}
          />
          <Description>
            Punchline. <SmallText>*Optional</SmallText>
          </Description>
          <Input
            onChange={({ target: { value } }) => onChangeHandler('punchline', value)}
            placeholder='Because it was his Duty 🫡'
            style={{ width: '100%' }}
            value={newJoke.punchline}
          />
          <Description>
            Add Tags, <SmallText>Separated by a comma. Limit 10 *Optional</SmallText>
          </Description>
          <JokeTags tags={newJoke.tags} setTags={setTags} />
          <CheckBoxWrapper>
            <label>Is Kid Friendly</label>
            <CheckBox
              id='isKidFriendly'
              name='isKidFriendly'
              checked={newJoke.isKidFriendly}
              onChange={({ target: { checked } }) =>
                setNewJoke((prevJoke) => ({
                  ...prevJoke,
                  isKidFriendly: checked
                }))
              }
            />
          </CheckBoxWrapper>
          <ButtonWrapper>
            <Button
              onClick={() => {
                (!!overrideContent?.saveBtnAction
                  ? overrideContent.saveBtnAction(newJoke)
                  : createJoke(newJoke)
                )
                  .then((r) => {
                    pushToast(r.data);
                    setNewJoke({ joke: '', punchline: '', tags: [] });
                    queryClient.invalidateQueries({ queryKey: getUserJokesKey });
                  })
                  .catch((err) => {
                    pushToast(err.response.data || 'Failed to save Joke.', ToastTypes.error);
                  });
              }}
            >
              {overrideContent?.saveBtnText ?? 'Save Joke'}
            </Button>
          </ButtonWrapper>
        </InputWrapper>
      ) : (
        <>
          <OfferContent>Write, Manage, and Own Jokes.</OfferContent>
          <OfferContent>
            Logged in users can track their jokes and prove ownership over a joke.
          </OfferContent>
          {!hasToken ? (
            <OfferButton onClick={() => navigate(route.login)}>Log In / Create Account</OfferButton>
          ) : (
            <OfferButton onClick={() => navigate(route.userPage)}>My Jokes</OfferButton>
          )}
        </>
      )}
    </OfferBox>
  );
};
