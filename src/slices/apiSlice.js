import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:4000';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Dashboard','User','Review'],
    endpoints: (builder) => ({}),
});