import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {faker} from "@faker-js/faker";

//DEV
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        //DEV
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(builder) {
        return {
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'Photo', id: photo.id }];
                },
                query: photo => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE',
                    };
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: ( result, error, album ) => {
                    return [{ type: 'AlbumsPhotos', id: album.id }];
                },
                query: album => {
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: {
                            albumId: album.id,
                            url: faker.image.abstract(150, 150, true)
                        }
                    };
                }
            }),
            fetchPhotos: builder.query({
                providesTags: ( result, error, album ) => {
                    const tags = result.map(photo => {
                        return { type: 'Photo', id: photo.id }
                    });
                    tags.push({ type: 'AlbumsPhotos', id: album.id });
                    return tags;
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                          albumId: album.id
                        },
                        method: 'GET',
                    };
                },
            }),
        };
    }
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export { photosApi };