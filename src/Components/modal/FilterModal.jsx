// components/FilterModal.jsx

import React, { useState } from "react";
import FilterConditionModal from "./FilterConditionModal";
import { Loader } from "../Loader/loader.jsx";
import toast from "react-hot-toast";
import { createFilter } from "../../api/filter.js";
import { useTranslation } from "react-i18next";

/**
 * Helper to display condition values in a friendly way.
 * e.g. arrays => "one, two"
 * e.g. date objects => "From mm/dd/yyyy to mm/dd/yyyy" or "On mm/dd/yyyy"
 */
function formatDisplayValue(value) {
  if (!value) return "";
  if (Array.isArray(value)) {
    // For multiple selected items
    return value.join(", ");
  }
  if (typeof value === "object") {
    // Date range or single date stored as { start, end }
    const { start, end } = value;
    if (start && end) {
      const startStr = new Date(start).toLocaleDateString();
      const endStr = new Date(end).toLocaleDateString();
      if (startStr === endStr) {
        // Single date, e.g. "On 1/12/2025"
        return `${startStr}`;
      }
      // Range, e.g. "From 1/12/2025 to 1/15/2025"
      return `From ${startStr} to ${endStr}`;
    }
    // If it's some other object, fallback
    return JSON.stringify(value);
  }
  // Simple string or number
  return String(value);
}

const FilterModal = ({ getdata, isOpen, setIsOpen, allstamp = [] }) => {
  const { t } = useTranslation("addfiltermodal");

  // An array of condition groups (up to two):
  //   0: AND group
  //   1: OR group (optional)
  const [conditionGroups, setConditionGroups] = useState([
    { type: "AND", conditions: [] },
  ]);

  // Whether the child condition modal is open
  const [conditionModalOpen, setConditionModalOpen] = useState(false);
  // Which group index we’re currently adding to
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const [filterName, setFilterName] = useState("");
  const [loading, setLoading] = useState(false);

  // ----- ADD / REMOVE conditions -----
  const handleAddCondition = (condObj) => {
    setConditionGroups((prev) => {
      return prev.map((group, index) => {
        if (index === activeGroupIndex) {
          return {
            ...group,
            conditions: [...group.conditions, condObj],
          };
        }
        return group;
      });
    });
  };

  const removeCondition = (groupIndex, condIndex) => {
    setConditionGroups((prev) => {
      const groups = [...prev];
      groups[groupIndex].conditions = groups[groupIndex].conditions.filter(
        (_, i) => i !== condIndex
      );
      return groups;
    });
  };

  // ----- OR Group Management -----
  const addOrGroup = () => {
    // Only add if we have exactly one group (the AND)
    if (conditionGroups.length === 1) {
      setConditionGroups((prev) => [...prev, { type: "OR", conditions: [] }]);
    }
  };

  const removeOrGroup = () => {
    setConditionGroups((prev) => prev.filter((g) => g.type === "AND"));
  };

  // ----- SUBMIT -----
  const sendFilter = async () => {
    if (!filterName.trim()) {
      toast.error("Please provide a filter name");
      return;
    }
    // Ensure there's at least one condition
    const hasConditions = conditionGroups.some((g) => g.conditions.length > 0);
    if (!hasConditions) {
      toast.error("Please add at least one condition.");
      return;
    }
    try {
      setLoading(true);

      // Convert conditionGroups into Andconditions / Orconditions arrays
      let Andconditions = [];
      let Orconditions = [];
      for (const group of conditionGroups) {
        if (group.type === "AND") {
          Andconditions = group.conditions;
        } else {
          Orconditions = group.conditions;
        }
      }

      await createFilter({
        filterName,
        Andconditions,
        Orconditions,
      });
      toast.success("Filters applied successfully");

      // Reset
      setFilterName("");
      setConditionGroups([{ type: "AND", conditions: [] }]);
      setIsOpen(false);
      getdata();
    } catch (error) {
      console.error("Error applying filters:", error);
      toast.error("Failed to apply filters");
    } finally {
      setLoading(false);
    }
  };

  // Don’t render if not open
  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-xl z-[9999] transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 h-full overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t("newfilter")}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Filter Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("filterName")}
          </label>
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., ‘VIP Customers’"
          />
        </div>

        {/* Render Condition Groups */}
        {conditionGroups.map((group, groupIndex) => {
          const isAnd = group.type === "AND";
          return (
            <div
              key={groupIndex}
              className="border p-3 rounded-md mb-4"
              style={{ backgroundColor: isAnd ? "#ebf8ff" : "#fffbea" }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">
                  {isAnd ? t("andConditions") : t("orConditions")}
                </h3>
                <div className="space-x-3">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setActiveGroupIndex(groupIndex);
                      setConditionModalOpen(true);
                    }}
                  >
                    {t("addcondition")}
                  </button>
                  {/* Only show “Remove OR” if this is the OR group */}
                  {!isAnd && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={removeOrGroup}
                    >
                      {t("removeor")}
                    </button>
                  )}
                </div>
              </div>

              {group.conditions.length === 0 && (
                <p className="text-gray-500">
                  {t("noConditionsAdded", { type: group.type })}
                </p>
              )}
              {group.conditions.map((cond, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow"
                >
                  <div>
                    <strong>{cond.name}</strong>
                    {cond.condition && (
                      <span className="ml-1 text-sm italic text-gray-600">
                        ({cond.condition})
                      </span>
                    )}
                    {/* User‐friendly value */}
                    {cond.value !== null && cond.value !== undefined && (
                      <span className="ml-2 text-sm text-gray-600">
                        {formatDisplayValue(cond.value)}
                      </span>
                    )}
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeCondition(groupIndex, idx)}
                  >
                    {t("remove")}
                  </button>
                </div>
              ))}
            </div>
          );
        })}

        {/* + Add OR Group (move it outside AND conditions) */}
        {conditionGroups.length === 1 && (
          <div className="mb-4 text-right">
            <button
              className="text-green-600 hover:text-green-800"
              onClick={addOrGroup}
            >
              {t("addorgroup")}
            </button>
          </div>
        )}

        {/* Apply & Reset */}
        <div className="flex justify-between mt-4">
          <button
            onClick={sendFilter}
            className="bg-black text-white py-2 px-4 rounded disabled:opacity-50"
            disabled={
              !filterName.trim() ||
              conditionGroups.every((g) => g.conditions.length === 0)
            }
          >
            {t("applyfilters")}
          </button>
          <button
            onClick={() => {
              setFilterName("");
              setConditionGroups([{ type: "AND", conditions: [] }]);
            }}
            className="bg-gray-200 text-black py-2 px-4 rounded"
          >
            {t("reset")}
          </button>
        </div>

        <Loader loading={loading} />
      </div>

      {/* Child Modal */}
      <FilterConditionModal
        t={t}
        open={conditionModalOpen}
        onClose={() => setConditionModalOpen(false)}
        onAddCondition={handleAddCondition}
        cardNames={allstamp.map((s) => s.stampName)}
      />
    </div>
  );
};

export default FilterModal;
