
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../Components/ModalComponent/UserForm";


export const userApi = createApi(
    {
        reducerPath: "userApi",
        baseQuery: fetchBaseQuery(
            {
                baseUrl: 'http://localhost:8080'
            }
        ),
        tagTypes:['Users'],
        endpoints: (builder) =>
        ({
            getUsers: builder.query<User[], void>({
                query: () => `/users`,
                providesTags: ['Users'],
            }),
            createUser: builder.mutation<User, Partial<User>>({
                query: (newUser) => ({
                    url: "/users",
                    method: "POST",
                    body: newUser,
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                   
                }),
                  invalidatesTags: ['Users'],
            }),
            updatedUser:builder.mutation<User,{id:number,updatedUser:Partial<User>}>({
               query: ({id,updatedUser})=>(
               {
                  url:`users/${id}`,
                  method:'PUT',
                  body:updatedUser
               }),
                 invalidatesTags: ['Users'],

            }),
            deleteUser:builder.mutation<void,number>(
                {
                    query:(id)=>({
                        url:`users/${id}`,
                        method:'DELETE'
                    }),
                     invalidatesTags: ['Users'],
                }
            )
            
           

        })
    }
)
export const { useGetUsersQuery, useCreateUserMutation,useUpdatedUserMutation,useDeleteUserMutation } = userApi;