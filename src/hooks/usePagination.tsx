import { useMemo } from "react"
import getRange from "@/utils/getRange"

type UsePagination = {
  totalPages: number
  currentPage: number
  siblings?: number
}

export const DOTS = "..."

const FIRST_CURRENT_LAST_PAGE = 3
const DOTS_ON_EACH_SIDE = 1

function usePagination({
  totalPages,
  currentPage = 1,
  siblings = 1
}: UsePagination) {
  const paginationRange = useMemo(() => {
    // Determine the total number of page numbers to display, including siblings and dots
    const totalPageNumbers =
      FIRST_CURRENT_LAST_PAGE + 2 * DOTS_ON_EACH_SIDE + 2 * siblings

    // Return the range if the number of pages is less than the total number of page numbers
    if (totalPageNumbers >= totalPages) {
      return getRange(1, totalPages)
    }

    // Calculate the indices for left and right siblings
    const leftSiblingIndex = Math.max(currentPage - siblings, 1)
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPages)

    // Determine whether to show left and right dots
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    // Display pages without left dots and with right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = FIRST_CURRENT_LAST_PAGE + 2 * siblings
      const leftRange = getRange(1, leftItemCount)

      return [...leftRange, DOTS, lastPageIndex]
    }

    // Display pages with left dots and without right dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = FIRST_CURRENT_LAST_PAGE + 2 * siblings
      const rightRange = getRange(totalPages - rightItemCount + 1, totalPages)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    // Display pages with both left and right dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = getRange(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    return []
  }, [totalPages, currentPage, siblings])

  return paginationRange
}

export default usePagination
