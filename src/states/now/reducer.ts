// types
import { AnimeList } from "../../types/anime.type";
import { Pagination } from "../../types/pagination.type";
// actions
import { ActionType, NowAction } from "./action";

const initialState: AnimeList = {
  data: [],
  pagination: {
    last_visible_page: 1,
    has_next_page: false,
    current_page: 1,
    items: {
      count: 0,
      total: 0,
      per_page: 0,
    },
  } as Pagination,
};

function nowReducer(state = initialState, action: NowAction) {
  switch (action.type) {
    case ActionType.RECEIVE_NOW:
      return action.payload.now;
    case ActionType.CLEAR_NOW:
      return initialState;
    default:
      return state;
  }
}

export default nowReducer;
