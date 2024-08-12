import { UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const uploadSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: ({ description, file, equipment_id }) => {
                const formData = new FormData();
                formData.append('description', description);
                formData.append('image', file);
                formData.append('equipment_id', equipment_id);

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
            onQueryStarted: async ({ description, equipment_id, file }, { dispatch, queryFulfilled }) => {
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