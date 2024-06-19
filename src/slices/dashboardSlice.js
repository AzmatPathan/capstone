import { apiSlice } from './apiSlice';
import { REVIEW_URL, DASHBOARD_URL } from '../constants';

export const dashboardSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardData: builder.query({
            query: () => ({
                url: `${DASHBOARD_URL}`,
                method: 'GET',
            }),
            providesTags: ['Dashboard'],
        }),
        getReviewData: builder.query({
            query: () => ({
                url: `${REVIEW_URL}`,
                method: 'GET',
            }),
            providesTags: ['Review'],
        }),
        getReviewDetails: builder.query({
            query: (id) => ({
                url: `${REVIEW_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: ['Review'],
        }),
        updateReviewStatus: builder.mutation({
            query: ({ reviewId, adminId, status }) => ({
                url: `${REVIEW_URL}/${reviewId}/status`,
                method: 'PUT',
                body: { reviewId, adminId, status },
            }),
        }),
    }),
});

export const { useGetDashboardDataQuery, useGetReviewDataQuery, useGetReviewDetailsQuery, useUpdateReviewStatusMutation } = dashboardSlice;
