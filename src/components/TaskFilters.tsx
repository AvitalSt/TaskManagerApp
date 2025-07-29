import React from "react";

interface TaskFilter {
  completed?: boolean;
  level?: "low" | "medium" | "high";
  sortByDate?: "asc" | "desc";
}

interface TaskFiltersProps {
  filter: Partial<TaskFilter>;
  onFilterChange: (newFilter: Partial<TaskFilter>) => void;
  onApplyFilter: () => void;
}

export default function TaskFilters({filter,onFilterChange,onApplyFilter,}: TaskFiltersProps) {
  return (
    <div className="filters-container">
      <select
        value={filter.level || ""}
        onChange={(e) => {
          const value = e.target.value as "low" | "medium" | "high" | "";
          onFilterChange({ level: value === "" ? undefined : value });
        }}
      >
        <option value="">All Levels</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        value={filter.sortByDate || ""}
        onChange={(e) => {
          const value = e.target.value as "asc" | "desc" | "";
          onFilterChange({ sortByDate: value === "" ? undefined : value });
        }}
      >
        <option value="">Default</option>
        <option value="asc">Date ↑</option>
        <option value="desc">Date ↓</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={filter.completed === true}
          onChange={(e) =>
            onFilterChange({ completed: e.target.checked ? true : undefined })
          }
        />
        Show completed only
      </label>

      <button onClick={onApplyFilter}>Apply Filters</button>
    </div>
  );
}
