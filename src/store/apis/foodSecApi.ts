// src/api/foodSecApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IPCResponse,
  InfoResponse,
  HazardResponse,
} from "../../types/apiTypes";

const foodSecApi = createApi({
  reducerPath: "ipc",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hungermapdata.org",
  }),
  endpoints(builder) {
    return {
      fetchIPC: builder.query<IPCResponse, number>({
        query: () => {
          return {
            url: `/v1/ipc/peaks`,
            method: "GET",
          };
        },
      }),
      fetchInfo: builder.query<InfoResponse, string>({
        query: (country) => {
          return {
            url: "v2/info/country",
            method: "GET",
          };
        },
      }),
      fetchHazard: builder.query<HazardResponse, string>({
        query: (country) => {
          return {
            url: "v1/climate/hazards",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchIPCQuery, useFetchHazardQuery, useFetchInfoQuery } =
  foodSecApi;
export { foodSecApi };
