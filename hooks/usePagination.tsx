import { useMemo, useState } from 'react';

interface usePaginationParams<T extends object> {
  data: T[];
  itemsPerPage: number;
}

export const usePagination = <T extends object>({
  data,
  itemsPerPage = 5,
}: usePaginationParams<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedData = useMemo(
    () =>
      data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [data, currentPage, itemsPerPage]
  );

  return {
    currentPage,
    displayedData,
    onPageChange,
    totalPages,
  };
};
