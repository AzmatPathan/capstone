// src/slices/equipmentSlice.js
import { apiSlice } from './apiSlice';
import { EQUIPMENT_URL } from '../constants';

export const equipmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchEquipmentDetail: builder.query({
            query: (id) => ({
                url: `${EQUIPMENT_URL}/${id}`,
                method: 'GET',
            }),
        }),
        updateEquipment: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${EQUIPMENT_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        addEquipment: builder.mutation({
            query: (data) => ({
                url: EQUIPMENT_URL,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useFetchEquipmentDetailQuery,
    useUpdateEquipmentMutation,
    useAddEquipmentMutation,
} = equipmentApiSlice;
