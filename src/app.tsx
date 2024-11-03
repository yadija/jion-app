import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// components
import SearchModal from "./components/modal/search-modal";
// hooks
import { useSearch } from "./hooks/use-search";
// pages
import AnimePage from "./pages/anime-page";
import DetailAnimePage from "./pages/detail-anime.page";
import DetailMangaPage from "./pages/detail-manga.page";
import DetailProducerPage from "./pages/detail-producer-page";
import FavoritePage from "./pages/favorite-page";
import HomePage from "./pages/home-page";
import MangaPage from "./pages/manga-page";
import NotFoundPage from "./pages/not-found-page";
import NowPage from "./pages/now-page";
import ProducersPage from "./pages/producers-page";
import TopAnimePage from "./pages/top-anime-page";
import TopMangaPage from "./pages/top-manga-page";
import TopPage from "./pages/top-page";
import UpcomingPage from "./pages/upcoming-page";

export default function App() {
  const { isShowSearchModal, toggleCloseSearchModal } = useSearch();
  const { pathname } = useLocation();

  useEffect(() => {
    toggleCloseSearchModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <main className="background-color-white min-h-screen transition-all duration-1000 selection:bg-fun-blue selection:text-soft-peach selection:dark:bg-denim-blue dark:selection:text-baltic-sea">
      {isShowSearchModal && <SearchModal />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/now" element={<NowPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/top" element={<TopPage />} />
        <Route path="/top/anime" element={<TopAnimePage />} />
        <Route path="/top/manga" element={<TopMangaPage />} />
        <Route path="/anime" element={<AnimePage />} />
        <Route path="/manga" element={<MangaPage />} />
        <Route path="/producers" element={<ProducersPage />} />
        <Route path="/anime/:id" element={<DetailAnimePage />} />
        <Route path="/manga/:id" element={<DetailMangaPage />} />
        <Route path="/producers/:id" element={<DetailProducerPage />} />
        <Route path="/favorite/:type" element={<FavoritePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}
