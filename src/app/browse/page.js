"use client";

import ManageAccounts from "@/src/components/manage-accounts";
import UnauthPage from "@/src/components/unauth-page";
import { GlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import {
    getAllfavorites,
    getPopularMedias,
    getTopratedMedias,
    getTrendingMedias,
} from "@/src/utils";
import CommonLayout from "@/src/components/common-layout";
import CircleLoader from "@/src/components/circle-loader";

export default function Browse() {
    const {
        loggedInAccount,
        mediaData,
        setMediaData,
        setPageLoader,
        pageLoader,
    } = useContext(GlobalContext);

    const { data: session } = useSession();

    console.log(session, "session");

    useEffect(() => {
        async function getAllMedias() {
            const trendingTvShows = await getTrendingMedias("tv");
            const popularTvShows = await getPopularMedias("tv");
            const topratedTvShows = await getTopratedMedias("tv");

            const trendingMovieShows = await getTrendingMedias("movie");
            const popularMovieShows = await getPopularMedias("movie");
            const topratedMovieShows = await getTopratedMedias("movie");
            const allFavorites = await getAllfavorites(
                session?.user?.uid,
                loggedInAccount?._id
            );
            setMediaData([
                ...[
                    {
                        title: "Trending TV Shows",
                        medias: trendingTvShows,
                    },
                    {
                        title: "Popular TV Shows",
                        medias: popularTvShows,
                    },
                    {
                        title: "Top rated TV Shows",
                        medias: topratedTvShows,
                    },
                ].map((item) => ({
                    ...item,
                    medias: item.medias.map((mediaItem) => ({
                        ...mediaItem,
                        type: "tv",
                        addedToFavorites:
                            allFavorites && allFavorites.length
                                ? allFavorites.map((fav) => fav.movieID).indexOf(mediaItem.id) >
                                -1
                                : false,
                    })),
                })),
                ...[
                    {
                        title: "Trending Movies",
                        medias: trendingMovieShows,
                    },
                    {
                        title: "Popular Movies",
                        medias: popularMovieShows,
                    },
                    {
                        title: "Top rated Movies",
                        medias: topratedMovieShows,
                    },
                ].map((item) => ({
                    ...item,
                    medias: item.medias.map((mediaItem) => ({
                        ...mediaItem,
                        type: "movie",
                        addedToFavorites:
                            allFavorites && allFavorites.length
                                ? allFavorites.map((fav) => fav.movieID).indexOf(mediaItem.id) >
                                -1
                                : false,
                    })),
                })),
            ]);

            setPageLoader(false);
        }

        getAllMedias();
    }, []);

    if (session === null) return <UnauthPage />;
    if (loggedInAccount === null) return <ManageAccounts />;
    if (pageLoader) return <CircleLoader />;

    console.log(mediaData);

    return (
        <main className="flex min-h-screen flex-col">
            <CommonLayout mediaData={mediaData} />
        </main>
    );
}
