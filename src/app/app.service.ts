//main service for landing page
import { apiQuery } from "@/services/apiQuery";
import { Commodity } from "./app.type";

export const AppApi = apiQuery.injectEndpoints({
    endpoints: (builder) => ({
        getAllCommodity: builder.query<Commodity[],void>({
            query: () => ({
                url: "/commodity",
                method: "get"
            })
        })
    })
})

export const { useGetAllCommodityQuery } = AppApi