import React, { lazy, Suspense } from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainNavbar from "../mainNavbar/MainNavbar";
import Footer from "../footer/Footer";

import "./Home.scss";


const AlbumsPage = lazy(() => import("../album/Albums"));
const AlbumDetailView = lazy(() => import("../albumDetailView/AlbumDetailView"));
const Home = () => {
    return (
        <>
            <div className="home">
                <div>
                    <MainNavbar/>
                    <Suspense fallback={<div>Loading...</div>}>
                        <BrowserRouter>
                            <Switch>
                                <Route name="albums" exact path="/" component={AlbumsPage} />
                                <Route name="album_detail_view" exact path="/:id" component={AlbumDetailView} />
                            </Switch>
                        </BrowserRouter>
                    </Suspense>
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default Home;
