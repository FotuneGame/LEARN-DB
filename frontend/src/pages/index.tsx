import React from 'react';



import App from './layout/App';
const Auth = React.lazy(() => import("./Auth"));
const Main = React.lazy(() => import("./Main"));
const Code = React.lazy(() => import("./Code"));
const About = React.lazy(() => import("./About"));
const Admin = React.lazy(() => import("./Admin"));
const Forget = React.lazy(() => import("./Forget"));
const NotFound = React.lazy(() => import("./NotFound"));
const Settings = React.lazy(() => import("./Settings"));
const NewPassword = React.lazy(() => import("./NewPassword"));
const Registration = React.lazy(() => import("./Registration"));
import { createBrowserRouter,RouteObject } from "react-router-dom";




export const paths = {
    newPassword: "/new_password",
    setting: "/setting",
    clients: "/clients",
    company: "/company",
    about: "/about",
    admin:  "/admin",
    auth: "/auth",
    forget:"/forget",
    registration:  "/registration",
    FAQ: "/faq",
    code:"/code",
    auth_google: "/google",
    auth_github: "/github",
    main:  "/",
}


const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
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
        ]
    }
]


export const router = createBrowserRouter(routes);