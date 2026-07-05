import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { DEFAULT_PAGE_LIMIT } from '@constants/api.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { useAppDispatch } from '@redux/hooks';
import {
  browseListAppended,
  browseListFailed,
  browseListFetchStarted,
  browseListLoaded,
  browseListRequested,
  getBrowseHasMore,
  getBrowseNextCursor,
  getBrowseRestaurants,
  getIsBrowseFetching,
  getIsBrowseLoading,
} from '@redux/restaurantStore';
import { restaurantService } from '@services/restaurant/restaurantService';

export const useBrowseRestaurants = () => {
  const dispatch = useAppDispatch();
  const items = useSelector(getBrowseRestaurants);
  const hasMore = useSelector(getBrowseHasMore);
  const nextCursor = useSelector(getBrowseNextCursor);
  const isLoading = useSelector(getIsBrowseLoading);
  const isFetching = useSelector(getIsBrowseFetching);

  const fetchInitial = useCallback(async () => {
    dispatch(browseListRequested());
    try {
      const result = await restaurantService.list();
      dispatch(browseListLoaded(result));
    } catch (error) {
      const msg = error instanceof Error ? error.message : MESSAGES.ERRORS.BROWSE_LOAD_FAILED;
      dispatch(browseListFailed(msg));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  const fetchMore = useCallback(async () => {
    if (!hasMore || isFetching || !nextCursor) return;
    dispatch(browseListFetchStarted());
    try {
      const result = await restaurantService.list(DEFAULT_PAGE_LIMIT, nextCursor);
      dispatch(browseListAppended(result));
    } catch (error) {
      const msg = error instanceof Error ? error.message : MESSAGES.ERRORS.BROWSE_LOAD_FAILED;
      dispatch(browseListFailed(msg));
    }
  }, [dispatch, hasMore, isFetching, nextCursor]);

  return { fetchMore, hasMore, isFetching, isLoading, items };
};
