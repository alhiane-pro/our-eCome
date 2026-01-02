import { LottieHandler, SuspenseFallback } from "@/components/feedback";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CanActivate } from "@/components/guards";
import { lazy, Suspense } from "react";

const MainLayout = lazy(() => import("@/layouts/MainLayout/MainLayout"));
const Categories = lazy(() => import("@/pages/Categories/Categories"));
const Products = lazy(() => import("@/pages/Products/Products"));
const Register = lazy(() => import("@/pages/Register/Register"));
const Wishlist = lazy(() => import("@/pages/Wishlist/Wishlist"));
const Account = lazy(() => import("@/pages/Account/Account"));
const Orders = lazy(() => import("@/pages/Orders/Orders"));
const Login = lazy(() => import("@/pages/Login/Login"));
const Error = lazy(() => import("@/pages/Error/Error"));
const Home = lazy(() => import("@/pages/Home/Home"));
const Cart = lazy(() => import("@/pages/Cart/Cart"));
const ProfileLayout = lazy(
  () => import("@/layouts/ProfileLayout/ProfileLayout")
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LottieHandler
              type="loading"
              title="Loading..."
              message="Loading please wait..."
              className="text-info"
            />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <SuspenseFallback>
            <Home />
          </SuspenseFallback>
        ),
      },
      {
        path: "categories",
        element: (
          <SuspenseFallback>
            <Categories />
          </SuspenseFallback>
        ),
      },
      {
        path: "products/:prefix",
        element: (
          <SuspenseFallback>
            <Products />
          </SuspenseFallback>
        ),
        loader: async ({ params }) => {
          /* const response = await fetch(
            "http://localhost:8000/products?cat_prefix=" + params.prefix
          );
          const data = await response.json();
          if (data.length <= 0) {
            throw new Response("Bad Request", {
              status: 400,
              statusText: "Category was not found!",
            });
          } */

          if (params.prefix && !/^[a-z]+$/i.test(params.prefix)) {
            throw new Response("Bad Request", {
              status: 400,
              statusText: "Category was not found!",
            });
          }
        },
      },
      {
        path: "cart",
        element: (
          <SuspenseFallback>
            <Cart />
          </SuspenseFallback>
        ),
      },
      {
        path: "wishlist",
        element: (
          <CanActivate>
            <SuspenseFallback>
              <Wishlist />
            </SuspenseFallback>
          </CanActivate>
        ),
      },
      {
        path: "register",
        element: (
          <SuspenseFallback>
            <Register />
          </SuspenseFallback>
        ),
      },
      {
        path: "login",
        element: (
          <SuspenseFallback>
            <Login />
          </SuspenseFallback>
        ),
      },
      {
        path: "profile",
        element: (
          <CanActivate>
            <SuspenseFallback>
              <ProfileLayout />
            </SuspenseFallback>
          </CanActivate>
        ),
        children: [
          {
            index: true,
            element: (
              <SuspenseFallback>
                <Account />
              </SuspenseFallback>
            ),
          },
          {
            path: "orders",
            element: (
              <SuspenseFallback>
                <Orders />
              </SuspenseFallback>
            ),
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={routes} />;
};

export default AppRouter;
