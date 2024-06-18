import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

export const userApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),

        getUserData: builder.query({
                query: () => ({
                    url: `${USERS_URL}`,
                    method: 'GET',
                }),
            })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetUserDataQuery
} = userApiSlice;
