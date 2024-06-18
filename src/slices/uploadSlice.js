import { apiSlice } from './apiSlice';

export const uploadSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: '/api/upload',
                    method: 'POST',
                    body: formData,
                    headers: {
                        // Do not set Content-Type to multipart/form-data, fetch will set it automatically
                    },
                };
            },
            transformResponse: (response, meta, arg) => {
                return { ...response, progress: 100 }; // Assuming the response includes the file URL or similar data
            },
            onQueryStarted: async (file, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    // Optionally, handle data here if needed
                } catch (error) {
                    console.error('Upload error:', error);
                }
            }
        }),
    }),
});

export const { useUploadFileMutation } = uploadSlice;
