import { DASHBOARD_URL, REVIEW_URL } from '../constants';
import { apiSlice } from './apiSlice';

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
        exportEquipments: builder.mutation({
            query: () => ({
                url: `${DASHBOARD_URL}/export`,
                method: 'GET',
                responseType: 'text/csv',
            }),
        }),
    }),
});

export const { useGetDashboardDataQuery, useGetReviewDataQuery, useGetReviewDetailsQuery, useUpdateReviewStatusMutation, useAssignReviewMutation, useExportEquipmentsMutation } = dashboardSlice;
