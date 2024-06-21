import { UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const uploadSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: ({ description, file }) => {
                const formData = new FormData();
                formData.append('description', description);
                formData.append('image', file);

                return {
                    url: '/api/upload',
                    method: 'POST',
                    body: formData,
                    headers: {
                        // Let fetch set the Content-Type automatically
                    },
                };
            },
            transformResponse: (response, meta, arg) => {
                return { ...response, progress: 100 }; // Assuming the response includes the file URL or similar data
            },
            onQueryStarted: async ({ description, file }, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    console.log('Upload successful:', data);
                    // You can dispatch additional actions here if needed
                } catch (error) {
                    console.error('Upload error:', error);
                    // Handle the error appropriately here
                }
            },
        }),
        fetchUploadsData: builder.query({
            query: () => ({
                url: `${UPLOAD_URL}`,
                method: 'GET',
            }),
            providesTags: ['Upload'],
        }),
    }),
});

export const { useUploadFileMutation, useFetchUploadsDataQuery } = uploadSlice;