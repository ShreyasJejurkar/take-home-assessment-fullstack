import { api } from "../api";
import { Order } from "../../types";

interface CreateOrderRequest {
  customerEmail: string;
  items: { productId: string; quantity: number }[];
}

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, CreateOrderRequest>({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
