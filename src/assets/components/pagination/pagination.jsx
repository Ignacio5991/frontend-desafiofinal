import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageItems = () => {
    const items = [];
    for (let page = 1; page <= totalPages; page++) {
      items.push(
        <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageClick(page)}>
          {page}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageClick(1)} />
      <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1} />
      {renderPageItems()}
      <Pagination.Next onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => handlePageClick(totalPages)} />
    </Pagination>
  );
}

export default PaginationComponent;
