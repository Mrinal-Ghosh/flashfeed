import axios from "axios";
import { NewsAPIArticle } from "../types";
import { count } from "console";

const API_KEY = process.env.NEWSAPI_KEY;
const BASE_URL = "https://newsapi.org/v2";

export async function fetchTopHeadlines(params: {
  category?: string;
  country: string;
  pageSize?: number;
}): Promise<NewsAPIArticle[]> {
  const { data } = await axios.get<{ articles: NewsAPIArticle[] }>(
    `${BASE_URL}/top-headlines`,
    {
      params: { apiKey: API_KEY, ...params },
    }
  );
  return data.articles;
}
