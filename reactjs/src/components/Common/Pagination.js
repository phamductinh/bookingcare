import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({ totalPages, onPageChange }) => {
	const [currentPage, setCurrentPage] = useState(1);

	const handlePageClick = (pageNumber) => {
		setCurrentPage(pageNumber);
		onPageChange(pageNumber);
	};

	const handlePreviousClick = () => {
		const newPage = currentPage > 1 ? currentPage - 1 : 1;
		setCurrentPage(newPage);
		onPageChange(newPage);
	};

	const handleNextClick = () => {
		const newPage = currentPage < totalPages ? currentPage + 1 : totalPages;
		setCurrentPage(newPage);
		onPageChange(newPage);
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];
		const visiblePages = 2;

		for (let i = 1; i <= totalPages; i++) {
			const isCurrentPage = i === currentPage;
			const isNearCurrentPage = Math.abs(currentPage - i) <= visiblePages;

			if (isCurrentPage || isNearCurrentPage) {
				pageNumbers.push(
					<li
						key={i}
						className={`page-item ${isCurrentPage ? "active" : ""}`}
					>
						<a
							className="page-link"
							href="#"
							onClick={() => handlePageClick(i)}
						>
							{i}
						</a>
					</li>
				);
			} else if (
				(i === 1 && currentPage - visiblePages > 1) ||
				(i === totalPages && currentPage + visiblePages < totalPages)
			) {
				pageNumbers.push(
					<li key={i} className="page-item disabled">
						<span className="page-link">...</span>
					</li>
				);
			}
		}

		return pageNumbers;
	};

	return (
		<nav aria-label="Page navigation">
			<ul className="pagination">
				<li className="page-item">
					<a
						className="page-link"
						href="#"
						aria-label="Previous"
						onClick={handlePreviousClick}
					>
						<span aria-hidden="true">&laquo;</span>
						<span className="sr-only">Previous</span>
					</a>
				</li>
				{renderPageNumbers()}
				<li className="page-item">
					<a
						className="page-link"
						href="#"
						aria-label="Next"
						onClick={handleNextClick}
					>
						<span aria-hidden="true">&raquo;</span>
						<span className="sr-only">Next</span>
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
