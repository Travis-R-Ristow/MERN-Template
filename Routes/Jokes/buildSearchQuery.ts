import mongoose from 'mongoose';

export const buildSearchQuery = (
  searchText: string,
  searchTags: string,
  isKidFriendly?: boolean,
  prevJokeId?: string
): any => {
  const randoSearch: any = [];

  if (searchText?.length) {
    randoSearch.push({
      $search: {
        index: 'joke_text',
        text: {
          query: searchText,
          path: {
            wildcard: '*'
          }
        }
      }
    });
  }

  if (searchTags?.length || prevJokeId?.length || isKidFriendly) {
    randoSearch.push({ $match: {} });
  }

  if (prevJokeId) {
    randoSearch[randoSearch.length - 1].$match._id = {
      $ne: new mongoose.Types.ObjectId(prevJokeId)
    };
  }

  if (searchTags?.length) {
    randoSearch[randoSearch.length - 1].$match.tags = { $in: searchTags };
  }

  if (isKidFriendly) {
    randoSearch[randoSearch.length - 1].$match.isKidFriendly = true;
  }

  return randoSearch;
};
