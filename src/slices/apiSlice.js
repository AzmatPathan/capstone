import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Use environment variable for base URL
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Dashboard', 'User', 'Review'],
    endpoints: (builder) => ({}),
});
