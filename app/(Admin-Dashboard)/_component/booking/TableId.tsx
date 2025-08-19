import React from 'react'

function TableId({currentPage, itemsPerPage, index}: {currentPage: number, itemsPerPage: number, index: number}) {
    const num = ((currentPage - 1) * itemsPerPage) + index + 1;
        return String(num).padStart(2, '0');
}

export default TableId
