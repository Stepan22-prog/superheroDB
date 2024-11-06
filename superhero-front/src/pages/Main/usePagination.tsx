import { useState } from "react";

export default function usePagination(initialPage: number) {
  const [page, setPage] = useState<number>(initialPage);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return { page, handlePageChange };
}
