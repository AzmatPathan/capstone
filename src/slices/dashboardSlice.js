import { apiSlice } from './apiSlice';
import { DASHBOARD_URL } from '../constants';

export const dashboardSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardData: builder.query({
            query: () => ({
                url: `${DASHBOARD_URL}`,
                method: 'GET',
            }),
            providesTags: ['Dashboard'],
        }),
    }),
});

export const { useGetDashboardDataQuery } = dashboardSlice;
