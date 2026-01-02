import useSWRInfinite from "swr/infinite";
import { mutate, useSWRConfig } from "swr";
import axios from "axios";
import { chatApi } from "@/api/chatApi";
import apiClient from "@/api/apiClient";
import type { UUID } from "@/types/global";
import type { PageResponse } from "@/types/backendResponse";
import type { chatMode } from "@/types/sidebarOptions";
import { useEffect } from "react";

const CHATS_PER_PAGE = 10;

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export const revalidateChats = () => {
  mutate((key: any) => {
    if (typeof key !== "string") return false;

    // if (!key.includes("/api/v1/chats")) return false;

    return true;
  });
};

// Funkcja do debugowania cache
export const logSWRCache = () => {
  console.log("=== SWR Cache ===");
  const allKeys = Array.from(cache.keys());
  console.log("All cache keys:", allKeys);

  // Filtruj tylko klucze związane z chatami
  const chatKeys = allKeys.filter(
    (key: any) => typeof key === "string" && key.includes("/api/v1/chats")
  );
  console.log("Chat cache keys:", chatKeys);

  // Pokaż wartości
  chatKeys.forEach((key: any) => {
    console.log(`Key: ${key}`);
    console.log("Value:", cache.get(key));
  });
  console.log("=================");
};

export const useInfiniteChats = ({ mode }: { mode: chatMode }) => {
  const getKey = (pageIndex: number, previousPageData: PageResponse | null) => {
    if (previousPageData && previousPageData.last) return null;

    let url = `/api/v1/chats?page=${pageIndex}&size=${CHATS_PER_PAGE}`;

    if (mode === "GLOBAL") {
      url += "&type=GLOBAL";
    } else if (mode === "PRIVATE") {
      url += "&type=PRIVATE";
    }

    return url;
  };
  console.log("mode", mode);

  // const { cache } = useSWRConfig();

  // const logCache = () => {
  //   console.group("📦 SWR Cache Dump");

  //   // Cache jest Mapą, więc iterujemy po niej
  //   // W SWR v2 cache działa trochę jak Mapa
  //   for (const [key, value] of cache as any) {
  //     console.log("🔑 Klucz:", key);
  //     console.log("📄 Dane:", value.data);
  //     console.log("❌ Błąd:", value.error);
  //     console.log("-------------------");
  //   }

  //   console.groupEnd();
  // };

  // logCache()

  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<PageResponse>(getKey, fetcher, {
      revalidateFirstPage: false, // Don't revalidate the first page on focus
      persistSize: true, // Keep the size when revalidating
      revalidateOnFocus: false, // Disable revalidation on window focus
      dedupingInterval: 60000, // 1 minute deduplication interval
    });

  // useEffect(() => {
  //   // Reset to first page when mode changes
  //   setSize(1);
  // }, [mode]);

  const chats = data ? data.flatMap((page) => page.content) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.content?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data?.length - 1]?.last === true);

  const loadMore = () => {
    if (!isLoadingMore && !isReachingEnd) {
      setSize(size + 1);
    }
  };

  const isErrorInitial = error && !data;

  return {
    chats,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    error,
    isErrorInitial,
  };
};
