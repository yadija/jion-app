import { useEffect } from "react";
import { useParams } from "react-router-dom";

// components
import BannerImage from "@/components/common/banner-image";
import FavoriteButton from "@/components/common/favorite-button";
import FetchError from "@/components/common/fetch-error";
import Footer from "@/components/common/footer";
import GenreList from "@/components/common/genre-list";
import ImagePreview from "@/components/common/image-preview";
import LinkSection from "@/components/common/link-section";
import Loading from "@/components/common/loading";
import ScoreBoard from "@/components/common/score-board";
import SummarySection from "@/components/common/summary-section";
// hooks
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
// lib
import { mapMangaData } from "@/lib/utils";
// section
import MangaInformationSection from "@/pages/detail-manga/section/manga-information.section";
// pages
import NotFound from "@/pages/not-found";
// states
import { AppDispatch } from "@/states";
import { asyncReceiveDetailManga } from "@/states/detail-manga/action";

export default function DetailManga() {
  const { id = "" } = useParams();
  const {
    data: detail,
    isLoading,
    error,
  } = useAppSelector((states) => states.detailManga);

  const dispatch = useAppDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(asyncReceiveDetailManga(id));
  }, [dispatch, id]);

  if (error?.match(/not found/)) {
    return <NotFound />;
  }

  if (error) {
    return <FetchError />;
  }

  if (isLoading || !detail?.data) {
    return <Loading />;
  }

  document.title = `${detail.data.title} | Jion`;

  return (
    <section className="relative flex h-full flex-col text-baltic-sea dark:text-soft-peach">
      <FavoriteButton data={mapMangaData(detail.data)} />

      <BannerImage image={detail.data.images.jpg.large_image_url} />

      <section className="relative mx-auto mb-6 flex w-full max-w-7xl grow flex-col gap-4 px-5">
        <section className="grid gap-5 [grid-template-areas:'image_title''score_score'] [grid-template-columns:auto_1fr] md:[grid-template-areas:'image_title''image_score']">
          <section className="[grid-area:image]">
            <ImagePreview
              title={detail.data.title}
              image={detail.data.images.jpg.image_url}
              largeImage={detail.data.images.jpg.large_image_url}
            />
          </section>

          <section className="min-h-[var(--banner-height)] [grid-area:title]">
            <h2 className="text-xl font-bold text-fun-blue dark:text-denim-blue sm:text-2xl md:text-3xl lg:text-4xl">
              {detail.data.title}
            </h2>

            <GenreList genres={detail.data.genres} />
          </section>

          <section className="[grid-area:score]">
            <ScoreBoard {...detail.data} />
          </section>
        </section>

        <SummarySection
          title="Synopsis"
          content={
            detail.data.synopsis ||
            "No synopsis information has been added to this title."
          }
        />
        <SummarySection
          title="Background"
          content={
            detail.data.background ||
            "No background information has been added to this title."
          }
        />

        <MangaInformationSection {...detail.data} />

        <LinkSection title="More Information" url={detail.data.url} />
      </section>

      <section className="relative">
        <Footer />
      </section>
    </section>
  );
}
