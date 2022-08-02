import { FC, useContext } from 'react';
import { RouteName, RouterContext, RouterProvider } from './RouterContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Library } from '../pages/library/library';
import { Login } from '../pages/auth/login/login';
import { Registration } from '../pages/auth/registration/registration';
import { Video } from '../pages/library/video/video';
import { NotFound } from '../pages/not-found/not-found';

export const Router: FC = () => {
    const { getPath } = useContext(RouterContext);

    return (
        <BrowserRouter>
            <RouterProvider>
                <Routes>
                    <Route path={getPath(RouteName.LIBRARY)} element={<Library />} />
                    <Route path={getPath(RouteName.LOGIN)} element={<Login />} />
                    <Route path={getPath(RouteName.REGISTRATION)} element={<Registration />} />
                    <Route path={`${getPath(RouteName.VIDEO)}/:name`} element={<Video />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </RouterProvider>
        </BrowserRouter>
    );
};
