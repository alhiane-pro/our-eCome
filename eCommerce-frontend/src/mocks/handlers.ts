import { http, HttpResponse } from "msw";

export const handlers = [
  // 1. Remove the query string from the path
  http.get("/wishlist", ({ request }) => {
    // 2. Extract parameters using the URL API
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    // Only return data if the userId matches
    if (userId === "1") {
      return HttpResponse.json(
        [
          { id: 1, userId: 1, productId: 42 },
          { id: 2, userId: 1, productId: 52 },
        ],
        {
          status: 200,
        }
      );
    }

    return HttpResponse.json([], { status: 200 });
  }),
];
