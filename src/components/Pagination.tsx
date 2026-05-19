type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];

    const delta = 1;

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage - delta > 2) pages.unshift("...");
    if (currentPage + delta < totalPages - 1) pages.push("...");

    pages.unshift(1);
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center gap-2 justify-center mt-6">
      {/* Prev */}
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {/* Pages */}
      {pages.map((page, i) =>
        page === "..." ? (
          <span key={i} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(Number(page))}
            className={`px-3 py-1 border rounded ${
              currentPage === page ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
