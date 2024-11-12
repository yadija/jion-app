import { parseAsBoolean, parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";

// components
import CardsList from "@/components/common/cards-list";
import Loading from "@/components/common/loading";
import MessageError from "@/components/common/message-error";
import Pagination from "@/components/common/pagination";
// hooks
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
// states
import { asyncReceiveAnime } from "@/states/anime/action";
// utils
import { mappingDataInArray } from "@/utils";

export default function Anime() {
  const { data: anime, isLoading } =
    useAppSelector((states) => states.anime) || [];
  const dispatch = useAppDispatch();

  const [search] = useQueryState("search", { defaultValue: "" });
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [nsfw] = useQueryState("nsfw", parseAsBoolean.withDefault(false));

  document.title = search ? `Search Anime: ${search} | Jion` : "Anime | Jion";

  useEffect(() => {
    dispatch(asyncReceiveAnime({ query: search, page, sfw: !nsfw }));
  }, [dispatch, search, page, nsfw]);

  if (page < 1) {
    return (
      <MessageError
        title="What Did You Do?"
        message="What you've done is illegal"
      />
    );
  }

  if (isLoading || !anime?.data) {
    return <Loading />;
  }

  if (anime.pagination.last_visible_page < page) {
    return (
      <MessageError
        title="What Did You Do?"
        message="I know you're curious, but there's nothing here"
      />
    );
  }

  if (anime.data.length === 0 && search) {
    return (
      <MessageError title="No Result" message={`No result for "${search}"`} />
    );
  }

  if (anime.data.length === 0) {
    return <MessageError title="No Anime" message="No anime here" />;
  }

  return (
    <section className="flex flex-col justify-between px-16 xs:px-12">
      {search ? (
        <h1 className="mb-4 text-xl font-bold text-baltic-sea dark:text-soft-peach">{`Search Anime: ${search}`}</h1>
      ) : (
        <h1 className="mb-4 text-center text-2xl font-bold text-baltic-sea dark:text-soft-peach">
          Anime
        </h1>
      )}
      <section className="grow">
        <CardsList data={mappingDataInArray(anime.data)} />
      </section>
      <Pagination pagination={anime.pagination} />
    </section>
  );
}
