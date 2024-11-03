// components
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// components
import CardsList from "../components/cards/cards-list";
import MessageError from "../components/error/message-error";
import Loading from "../components/loading/loading";
import Pagination from "../components/pagination/pagination";
// hooks
import { useAppDispatch, useAppSelector } from "../hooks/use-redux";
// states
import { asyncReceiveTopAnime } from "../states/top-anime/action";
import { mappingDataInArray } from "../utils";

export default function TopAnimePage() {
  document.title = "Top Anime | Jion";

  const { data: topAnime, isLoading } = useAppSelector(
    (states) => states.topAnime,
  );
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const sfw = searchParams.get("sfw") === "false" ? false : true;

  useEffect(() => {
    dispatch(asyncReceiveTopAnime({ page, sfw }));
  }, [dispatch, page, sfw]);

  if (page < 1) {
    return (
      <MessageError
        title="What Did You Do?"
        message="What you've done is illegal"
      />
    );
  }

  if (isLoading || !topAnime) {
    return <Loading />;
  }

  if (topAnime.pagination.last_visible_page < page) {
    return (
      <MessageError
        title="What Did You Do?"
        message="I know you're curious, but there's nothing here"
      />
    );
  }

  if (topAnime.data.length === 0) {
    return (
      <MessageError
        title="Nothing Here"
        message="Nothing here, please try again later"
      />
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen flex-col justify-between px-16 xs:px-12">
        <h1 className="title-page">Top Anime</h1>
        <div className="grow">
          <CardsList data={mappingDataInArray(topAnime.data)} />
        </div>
        <Pagination pagination={topAnime.pagination} />
      </div>
    </div>
  );
}
