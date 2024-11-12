import { useEffect } from "react";
import { useParams } from "react-router-dom";

// components
import FetchError from "@/components/common/fetch-error";
import Footer from "@/components/common/footer";
import ImagePreview from "@/components/common/image-preview";
import Loading from "@/components/common/loading";
// hooks
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
// pages
import NotFound from "@/pages/not-found";
// states
import { asyncReceiveDetailProducer } from "@/states/detail-producer/action";
// utils
import { getTitleFromUrl } from "@/utils";

export default function DetailProducer() {
  const { id = "" } = useParams();
  const {
    data: detail,
    isLoading,
    error,
  } = useAppSelector((states) => states.detailProducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncReceiveDetailProducer(id));
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

  const title = getTitleFromUrl(detail.data.url);
  document.title = `${title} | Jion`;

  return (
    <section className="relative flex h-full flex-col text-baltic-sea dark:text-soft-peach">
      <section className="relative z-[1] mb-6 flex grow flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-20">
        <section className="flex gap-2 md:gap-4">
          <section>
            <ImagePreview
              title={title}
              image={detail.data.images.jpg.image_url}
              largeImage={detail.data.images.jpg.image_url}
            />
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-fun-blue dark:text-denim-blue sm:text-2xl md:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p>
              <b>Alternative Names:</b>{" "}
              {detail.data.titles
                .map((item) => `${item.title}(${item.type})`)
                .join(" | ")}
            </p>
            {detail.data.favorites && (
              <p>
                <b>Member Favorites:</b> {detail.data.favorites}
              </p>
            )}
            <p>
              <b>Established:</b>{" "}
              {new Date(detail.data.established).toLocaleDateString("en-EN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {/* <p>
                <b>External:</b>{" "}
                <span>
                  {detail.data.external.map((item: any, index: number) => (
                    <span key={index}>
                      •{" "}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-fun-blue dark:text-denim-blue border-b border-fun-blue hover:border-0 dark:border-denim-blue"
                      >
                        {item.name}
                      </a>{" "}
                    </span>
                  ))}
                </span>
              </p> */}
          </section>
        </section>

        <section>
          <article className="py-2">
            <h3 className="border-b border-fun-blue text-xl font-bold text-fun-blue dark:border-denim-blue dark:text-denim-blue">
              About
            </h3>
            <p>
              {detail.data.about ||
                "No about information has been added to this title."}
            </p>
          </article>
        </section>

        {/* start url */}
        {detail.data.url && (
          <section>
            <article className="py-2">
              <h3 className="border-b border-fun-blue text-xl font-bold text-fun-blue dark:border-denim-blue dark:text-denim-blue">
                Links
              </h3>
              <p className="py-2">
                •{" "}
                <a
                  href={detail.data.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-fun-blue text-fun-blue hover:border-0 dark:border-denim-blue dark:text-denim-blue"
                >
                  MAL
                </a>
              </p>
            </article>
          </section>
        )}
        {/* end url */}
      </section>

      <section className="relative">
        <Footer />
      </section>
    </section>
  );
}
