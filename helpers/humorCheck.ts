import type { NextFunction, Request, Response } from 'express';

const racismRegex = new RegExp(/[nmh\s-]*[1ia4\s-]*[gq9h\s-]*[3era4\s-]*/gi);
const buddyHate = new RegExp(/buddy is [a]* (gay|lame|bitch)/gi);

// const racismResponse = ['Try rewriting your joke.', 'Try Again.', 'Nah bro.', 'Learn some new words.']; racismResponse[Math.floor(Math.random() * racismResponse.length)]

export const humorCheck = (req: Request, res: Response, next: NextFunction) => {
  const joke: string = req.body.joke;
  const punchline: string = req.body.punchline;
  const tags: string[] = req.body.tags;

  if (isRacist(joke) || isRacist(punchline)) {
    return res.status(400).send('Try rewriting your joke.');
  }

  if (buddyHate.test(joke) || buddyHate.test(punchline)) {
    return res.status(400).send('No you are.');
  }

  next();
};

const isRacist = (str: string) => {
  const regexResult = str.match(racismRegex);
  if (!regexResult) {
    return false;
  }
  if (regexResult[0].length < 4) {
    return false;
  }
  const uniqueChars = new Set(regexResult[0]);
  return uniqueChars.size > 2;
};
