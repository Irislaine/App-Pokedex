import React, { useState } from 'react'
import './pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='pagination'>
      {
        [...Array(totalPages).keys()].map((index) => {
          const pageNumber = index + 1
          const isCurrentPage = currentPage == pageNumber
          return (
            <button
              key={index}
              className={`pagination-btn ${isCurrentPage && 'btn-active'}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })
      }
    </div>
  )
}

export default Pagination