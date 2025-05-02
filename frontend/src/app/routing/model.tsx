import { createBrowserRouter, RouteObject } from "react-router-dom";
import {paths} from "@/shared/const"
import React from "react";

import Layout from "@/pages/layout";
const Auth = React.lazy(() => import("@/pages/auth"));
const Main = React.lazy(() => import("@/pages/main"));
const Code = React.lazy(() => import("@/pages/code"));
const Oauth = React.lazy(() => import("@/pages/oauth"));
const About = React.lazy(() => import("@/pages/about"));
const Admin = React.lazy(() => import("@/pages/admin"));
const Forget = React.lazy(() => import("@/pages/forget"));
const Clients = React.lazy(() => import("@/pages/clients"));
const Company = React.lazy(() => import("@/pages/company"));
const NotFound = React.lazy(() => import("@/pages/notFound"));
const Settings = React.lazy(() => import("@/pages/setting"));
const NewPassword = React.lazy(() => import("@/pages/newPassword"));
const Registration = React.lazy(() => import("@/pages/registration"));

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: paths.main,
                element: <Main/>,
                errorElement: <NotFound />,
            },
            {
                path: paths.about,
                element: <About />,
                errorElement: <NotFound />
            },
            {
                path: paths.admin,
                element: <Admin />,
                errorElement: <NotFound />
            },
            {
                path: paths.auth,
                element: <Auth />,
                errorElement: <NotFound />
            },
            {
                path: paths.forget,
                element: <Forget />,
                errorElement: <NotFound />
            },
            {
                path: paths.registration,
                element: <Registration />,
                errorElement: <NotFound />
            },
            {
                path: paths.code,
                element: <Code />,
                errorElement: <NotFound />
            },
            {
                path: paths.newPassword,
                element: <NewPassword />,
                errorElement: <NotFound />
            },
            {
                path: paths.setting,
                element: <Settings />,
                errorElement: <NotFound />
            },
            {
                path: paths.oauth,
                element: <Oauth />,
                errorElement: <NotFound />
            },
            {
                path: paths.company,
                element: <Company />,
                errorElement: <NotFound />
            },
            {
                path: paths.clients,
                element: <Clients />,
                errorElement: <NotFound />
            }
        ]
    }
]


export const router = createBrowserRouter(routes);