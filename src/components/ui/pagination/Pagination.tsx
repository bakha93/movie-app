import React, { FC } from "react"
import usePagination, { DOTS } from "@/hooks/usePagination"
import s from "./Pagination.module.css"

interface IPagination {
  totalPages: number
  currentPage: number
  siblings?: number
  onPageChange: (page: number) => void
}

const Pagination: FC<IPagination> = ({
  totalPages,
  currentPage,
  siblings,
  onPageChange
}) => {
  const paginationRange = usePagination({ totalPages, currentPage, siblings })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const handlePrev = () => {
    onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    onPageChange(currentPage + 1)
  }

  return (
    <nav className={s.container}>
      <button
        type="button"
        className={s.textButton}
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        Prev
      </button>

      <div className={s.numberButtonsContainer}>
        {paginationRange.map((page, i) => (
          <React.Fragment key={i}>
            {page !== DOTS ? (
              <button
                style={{
                  backgroundColor: `${
                    page === currentPage
                      ? "var(--primary-color)"
                      : "var(--card-color)"
                  }`
                }}
                className={s.numberButton}
                onClick={() => onPageChange(Number(page))}
              >
                {page}
              </button>
            ) : (
              <span className={s.dots}>{DOTS}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        type="button"
        className={s.textButton}
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination
