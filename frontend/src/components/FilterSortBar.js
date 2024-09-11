import React from 'react';

const FilterBar = ({ filter, setFilter, sortOption, setSortOption }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <input
                type="text"
                placeholder="Search feedback..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
            />
            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
            >
                <option value="">Sort by</option>
                <option value="dueDateAsc">Due Date (Ascending)</option>
                <option value="dueDateDesc">Due Date (Descending)</option>
            </select>
        </div>
    );
};

export default FilterBar;
