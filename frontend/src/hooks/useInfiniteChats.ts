import useSWRInfinite from "swr/infinite";
import axios from "axios";

const CHATS_PER_PAGE = 10;

interface Chat {
  id: number;
  label: string;
  // dodaj inne pola które przychodzą z backendu
  createdAt?: string;
  updatedAt?: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useInfiniteChats = () => {
  const getKey = (pageIndex: number, previousPageData: Chat[]) => {
    // Jeśli poprzednia strona była pusta, kończymy
    if (previousPageData && !previousPageData.length) return null;

    // Endpoint z paginacją - dostosuj do swojego API
    return `/api/chats?page=${pageIndex}&limit=${CHATS_PER_PAGE}`;
  };

  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<Chat[]>(getKey, fetcher, {
      revalidateFirstPage: false, // nie refetchuj pierwszej strony przy każdej zmianie
      persistSize: true, // pamiętaj ile stron już załadowano
      revalidateOnFocus: false, // nie refetchuj gdy wrócisz do okna
      dedupingInterval: 60000, // cache na 60s
    });

  const chats = data ? data.flat() : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < CHATS_PER_PAGE);

  const loadMore = () => {
    if (!isLoadingMore && !isReachingEnd) {
      setSize(size + 1);
    }
  };

  return {
    chats,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    error,
  };
};
