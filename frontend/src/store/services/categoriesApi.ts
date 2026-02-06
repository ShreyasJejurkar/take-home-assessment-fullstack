import { api } from "../api";
import { Category } from "../../types";

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "categories",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
