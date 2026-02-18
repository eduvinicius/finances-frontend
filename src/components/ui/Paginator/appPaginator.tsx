import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Paginator"

interface AppPaginatorProps {
  readonly currentPage: number
  readonly totalPages: number
  readonly onPageChange: (page: number) => void
}

export function AppPaginator({
  currentPage,
  totalPages,
  onPageChange,
}: Readonly<AppPaginatorProps>) {
  const maxVisiblePages = 5
  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  const getPageNumbers = () => {
    const pages: (number | { type: "ellipsis"; id: string })[] = []

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 3) {
        endPage = 4
      }

      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3
      }

      if (startPage > 2) {
        pages.push({ type: "ellipsis", id: "start" })
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages - 1) {
        pages.push({ type: "ellipsis", id: "end" })
      }

      pages.push(totalPages)
    }

    return pages
  }

  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    e.preventDefault()
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (canGoPrevious) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (canGoNext) {
      onPageChange(currentPage + 1)
    }
  }

  if (totalPages < 1) {
    return null
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrevious}
            aria-disabled={!canGoPrevious}
            style={{
              pointerEvents: canGoPrevious ? "auto" : "none",
              opacity: canGoPrevious ? 1 : 0.5,
            }}
          />
        </PaginationItem>

        {getPageNumbers().map((page) => {
          if (typeof page === "object" && page.type === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${page.id}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          const pageNumber = page as number
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                onClick={(e) => handlePageClick(e, pageNumber)}
                isActive={pageNumber === currentPage}
                className="text-white hover:bg-(--green-200)"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            aria-disabled={!canGoNext}
            style={{
              pointerEvents: canGoNext ? "auto" : "none",
              opacity: canGoNext ? 1 : 0.5,
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
