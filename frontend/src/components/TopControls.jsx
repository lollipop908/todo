import React from "react";
import "../styles/TopControls.css";

function TopControls({
  selectedCount,
  totalCount,
  onDelete,
  onToggleSelectAll,
  allSelected,
}) {
  return (
    <div className="top-controls">
      <button
        onClick={onDelete}
        className="top-delete-btn"
        disabled={selectedCount === 0}
        title={
          selectedCount === 0
            ? "No items selected"
            : `Delete ${selectedCount} item(s)`
        }
      >
        <img src="/deleteicon.png" alt="Delete" className="top-delete-icon" />
      </button>

      <div className="top-right">
        <span className="selected-status">
          {selectedCount === 0
            ? "None selected"
            : selectedCount === totalCount
            ? `All ${totalCount} items selected`
            : `${selectedCount} of ${totalCount} selected`}
        </span>
        <label className="top-checkbox">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleSelectAll}
          />
          <span className="circle-checkbox" />
        </label>
      </div>
    </div>
  );
}

export default TopControls;
