import { Article } from './articles';

export type ImagesApiResponse = {
  articles: {
    image: string;
    article?: Article;
  }[];
};
