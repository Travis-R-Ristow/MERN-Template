export const cleanTags = (tags: string[]) => {
  let cleanedTags = tags.map((tag) => tag.toLowerCase().trim()).filter((tag) => tag.trim().length);
  cleanedTags = cleanedTags.filter((tag, index) => cleanedTags.indexOf(tag) === index); // dedupe tags

  return cleanedTags;
};
