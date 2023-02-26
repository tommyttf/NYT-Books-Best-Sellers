export interface INytBaseParams {
  'api-key': string;
}

export interface IListsParams {
  list: string;
  'bestsellers-date'?: string;
  'published-date'?: string;
  offset?: number;
}

export interface IBSHistParams {
  'age-group'?: string;
  author?: string;

  contributor?: string;
  isbn?: string;
  /**
   * multiple of 20
   */
  offset?: number;
  price?: string;
  publisher?: string;
  title?: string;
}

export interface IListName {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string; // yyyy-MM-dd
  newest_published_date: string; // yyyy-MM-dd
  updated: 'WEEKLY' | 'MONTHLY';
}

interface IResponseResult {
  bestsellers_date: string; // YYYY-MM-DD
  published_date: string; // YYYY-MM-DD
}

export interface IList extends IResponseResult {
  list_name: string;
  display_name: string;
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
  asterisk: number;
  dagger: number;
  amazon_product_url: string;
  isbns: IIsbn[];
  book_details: IBookDetail[];
  reviews: IReview[];
}

interface IBookDetail {
  title: string;
  description: string;
  contributor: string;
  author: string;
  contributor_note: string;
  price: string;
  age_group: string;
  publisher: string;
  primary_isbn13: string;
  primary_isbn10: string;
}

interface IIsbn {
  isbn10: string;
  isbn13: string;
}

interface IReview {
  book_review_link: string;
  first_chapter_link: string;
  sunday_review_link: string;
  article_chapter_link: string;
}

export interface IBSHist {
  title: string;
  description: null | string;
  contributor: null | string;
  author: string;
  contributor_note: null | string;
  price: string;
  age_group: null | string;
  publisher: null | string;
  isbns: IIsbn[];
  ranks_history: IRanksHistory[];
  reviews: IReview[];
}

interface IRanksHistory {
  primary_isbn10: string;
  primary_isbn13: string;
  rank: number;
  list_name: string;
  display_name: string;
  published_date: Date;
  bestsellers_date: Date;
  weeks_on_list: number;
  rank_last_week: number;
  asterisk: number;
  dagger: number;
}
export interface INytBaseResponse<T> {
  status: string;
  copyright: string;
  num_results: number;
  results: T[];
}
