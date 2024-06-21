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
            query: ({ id, adminId, status }) => ({
                url: `${REVIEW_URL}/${id}/status`,
                method: 'PUT',
                body: { adminId, status },
            }),
        }),
        assignReview: builder.mutation({
            query: ({ reviewId, adminId }) => ({
                url: `${REVIEW_URL}/assign-review`,
                method: 'POST',
                body: { reviewId, adminId },
            }),
        }),
    }),
});

export const { useGetDashboardDataQuery, useGetReviewDataQuery, useGetReviewDetailsQuery, useUpdateReviewStatusMutation, useAssignReviewMutation } = dashboardSlice;
