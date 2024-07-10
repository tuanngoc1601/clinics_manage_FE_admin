import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const Paginate = ({ total, page, setPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(total / 10); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-end gap-2 items-center mt-4">
            <button
                type="button"
                className="px-4 py-2 border rounded"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
            >
                <GrFormPrevious />
            </button>
            <div className="flex space-x-2">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => setPage(number)}
                        className={`px-4 py-2 border rounded ${
                            page === number ? "bg-zinc-200" : ""
                        }`}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <button
                type="button"
                className="px-4 py-2 border rounded"
                disabled={page === total}
                onClick={() => setPage((prev) => prev + 1)}
            >
                <GrFormNext />
            </button>
        </div>
    );
};

export default Paginate;
