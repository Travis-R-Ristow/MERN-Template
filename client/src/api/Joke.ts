import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_ADDRESS = `${process.env.REACT_APP_API_URL ?? ''}/jokes`;

export type Joke = {
  _id?: string;
  didReport?: boolean;
  displayName?: string;
  isKidFriendly?: boolean;
  joke: string;
  punchline?: string;
  rating?: boolean | null;
  tags?: string[];
  timestamp?: string;
  totalUpVotes?: number;
};

const getToken = () => sessionStorage.getItem('accessToken');

export const createJoke = (newJoke: Joke) =>
  axios.post(`${BASE_ADDRESS}/add-joke`, newJoke, { headers: { authorization: getToken() } });

export const updateJoke = (updatedJoke: Joke) =>
  axios.post(`${BASE_ADDRESS}/update-joke`, updatedJoke, {
    headers: { authorization: getToken() }
  });

export const deleteJoke = (joke: Joke) =>
  axios.post(`${BASE_ADDRESS}/delete-joke`, joke, { headers: { authorization: getToken() } });

const getJokesCall = async (): Promise<{ data: Joke[] }> =>
  await axios.get(`${BASE_ADDRESS}/get-users-jokes`, { headers: { authorization: getToken() } });

export const getUserJokesKey = ['getUserJokes'];
export const useGetJokes = () =>
  useQuery({
    queryKey: getUserJokesKey,
    queryFn: getJokesCall,
    select: (res) => res.data,
    refetchOnWindowFocus: false
  });

export const getRandomJokeCall = async (searchOptions: {
  searchTags: string[];
  searchText: string;
  isKidFriendly: boolean;
  prevJokeId?: string;
}): Promise<{
  status: number;
  data: Joke;
}> =>
  await axios.post(
    `${BASE_ADDRESS}/get-random-joke`,
    {
      searchTags: searchOptions.searchTags,
      searchText: searchOptions.searchText,
      isKidFriendly: searchOptions.isKidFriendly,
      prevJokeId: searchOptions.prevJokeId
    },
    { headers: { authorization: getToken() } }
  );

export const sendRating = async (req: { joke: Joke; rating: boolean }) =>
  await axios.post(
    `${BASE_ADDRESS}/rate-joke`,
    { joke: req.joke, rating: req.rating },
    { headers: { authorization: getToken() } }
  );

export const reportJoke = async (joke: Joke) =>
  await axios.post(`${BASE_ADDRESS}/report-joke`, joke, { headers: { authorization: getToken() } });

export const getJokeTags = async (searchTags: string[]) =>
  await axios.post(`${BASE_ADDRESS}/get-joke-tags`, { searchTags });
