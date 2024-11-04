import { useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";

// components
import SearchModal from "@/components/common/search-modal";
// hooks
import { useSearch } from "@/hooks/use-search";
// pages
import Anime from "@/pages/anime";
import DetailAnime from "@/pages/detail-anime";
import DetailManga from "@/pages/detail-manga";
import DetailProducer from "@/pages/detail-producer";
import Favorite from "@/pages/favorite";
import Home from "@/pages/home";
import Manga from "@/pages/manga";
import NotFound from "@/pages/not-found";
import Now from "@/pages/now";
import Producers from "@/pages/producers";
import TopAnime from "@/pages/top-anime";
import TopManga from "@/pages/top-manga";
import Top from "@/pages/top";
import Upcoming from "@/pages/upcoming";

export default function App() {
  const { isShowSearchModal, toggleCloseSearchModal } = useSearch();
  const { pathname } = useLocation();

  useEffect(() => {
    toggleCloseSearchModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/now",
      element: <Now />,
    },
    {
      path: "/upcoming",
      element: <Upcoming />,
    },
    {
      path: "/top",
      element: <Top />,
    },
    {
      path: "/top/anime",
      element: <TopAnime />,
    },
    {
      path: "/top/manga",
      element: <TopManga />,
    },
    {
      path: "/anime",
      element: <Anime />,
    },
    {
      path: "/manga",
      element: <Manga />,
    },
    {
      path: "/producers",
      element: <Producers />,
    },
    {
      path: "/anime/:id",
      element: <DetailAnime />,
    },
    {
      path: "/manga/:id",
      element: <DetailManga />,
    },
    {
      path: "/producers/:id",
      element: <DetailProducer />,
    },
    {
      path: "/favorite/:type",
      element: <Favorite />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <main className="background-color-white min-h-screen transition-all duration-1000 selection:bg-fun-blue selection:text-soft-peach selection:dark:bg-denim-blue dark:selection:text-baltic-sea">
      {isShowSearchModal && <SearchModal />}
      {element}
    </main>
  );
}
