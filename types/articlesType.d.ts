export interface ArticlesTypes {
  articles: ArticleTypes[];
  article: ArticleTypes;
}

export interface IarticlesFiltered {
  articleFiltered: ArticleTypes[];
}

export interface ArticleTypes {
  category: string;
  title: string;
  intro: string;
  content?: string;
  image: string;
  id?: string;
  date: date;
  views: number;
}
