import { Joke } from '../Models/joke';
import { User } from '../Models/user';

export type ReturnableJoke = {
  _id?: string;
  didReport: boolean;
  displayName?: string;
  isKidFriendly: boolean | null;
  joke: string;
  punchline?: string;
  rating: boolean | null;
  tags?: string[];
  timestamp?: Date;
  totalUpVotes?: number;
};

export const returnJokeToUser = (joke: Joke | null, user?: User): ReturnableJoke | null => {
  if (!joke) {
    return null;
  }

  const isUpRating = joke.upUsers?.includes(user?._id ?? '') ?? false;
  const isDownRating = joke.downUsers?.includes(user?._id ?? '') ?? false;

  return {
    _id: joke._id,
    didReport: joke.reports?.includes(user?._id ?? '') ?? false,
    displayName: joke.displayName,
    isKidFriendly: joke.isKidFriendly,
    joke: joke.joke,
    punchline: joke.punchline,
    rating: isUpRating ? true : isDownRating ? false : null,
    tags: joke.tags,
    timestamp: joke.timestamp,
    totalUpVotes: joke.upUsers?.length ?? 0
  };
};
