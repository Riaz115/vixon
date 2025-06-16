// components/FilterConditionModal.jsx
import React, { useState } from "react";
import { FILTER_DEFINITIONS } from "../../utils/filterDefinitions";
import { Chip, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FilterConditionModal({
  open,
  onClose,
  onAddCondition,
  cardNames = [],
  t,
}) {
  const [selectedFilterKey, setSelectedFilterKey] = useState("");
  const [selectedConditionKey, setSelectedConditionKey] = useState("");
  const [overrideName, setOverrideName] = useState("");

  // Value states
  const [multiValues, setMultiValues] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [singleDate, setSingleDate] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // 1) If we have no stamps (cardNames array is empty), remove "card_name" from the available filters
  let definitionsToShow = FILTER_DEFINITIONS;
  if (!Array.isArray(cardNames) || cardNames.length === 0) {
    definitionsToShow = FILTER_DEFINITIONS.filter(
      (def) => def.key !== "card_name"
    );
  }

  // 2) Identify the chosen filter + condition from definitions
  const selectedFilter = definitionsToShow.find(
    (f) => f.key === selectedFilterKey
  );
  const selectedCondition = selectedFilter?.conditions.find(
    (c) => c.key === selectedConditionKey
  );

  const handleClose = () => {
    onClose();
    // reset everything
    setSelectedFilterKey("");
    setSelectedConditionKey("");
    setOverrideName("");
    setMultiValues([]);
    setDateRange([null, null]);
    setSingleDate(null);
    setInputValue("");
  };

  if (!open) return null;

  const handleConfirm = () => {
    if (!selectedFilter || !selectedCondition) return;

    let finalValue = null;

    if (selectedCondition.needsMultipleValues) {
      finalValue = multiValues; // array
    } else if (selectedCondition.needsDateRange) {
      finalValue = { start: dateRange[0], end: dateRange[1] };
    } else if (
      selectedFilter.type === "date" &&
      selectedCondition.needsValue &&
      !selectedCondition.needsDateRange
    ) {
      // single date scenario
      if (singleDate) {
        // Convert the JS date to a "YYYY-MM-DD" string
        const dateStr = toYyyyMmDd(singleDate);
        finalValue = { start: dateStr, end: dateStr };
      } else if (inputValue) {
        // Fallback if user typed date as text, maybe store it as "YYYY-MM-DD" directly
        finalValue = { start: inputValue, end: inputValue };
      }
    } else if (selectedCondition.needsDateRange) {
      // "Between"
      if (dateRange[0] && dateRange[1]) {
        const startStr = toYyyyMmDd(dateRange[0]);
        const endStr = toYyyyMmDd(dateRange[1]);
        finalValue = { start: startStr, end: endStr };
      }
    }

    // Helper to convert a JS Date to "YYYY-MM-DD"
    function toYyyyMmDd(date) {
      if (!date) return "";
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }

    const conditionObj = {
      type: selectedFilter.label, // e.g. "Registration date"
      condition: selectedCondition.key, // e.g. "week", "empty", "includes"
      conditionLabel: selectedCondition.label,
      value: finalValue,
      name: overrideName.trim() || selectedFilter.label,
    };

    onAddCondition(conditionObj);
    handleClose();
  };

  const handleImmediateApply = (filter, condition) => {
    const conditionObj = {
      type: filter.label,
      condition: condition.key,
      conditionLabel: condition.label,
      value: null,
      name: filter.label,
    };
    onAddCondition(conditionObj);
    handleClose();
  };

  const handleMultiSelect = (option) => {
    setMultiValues((prev) =>
      prev.includes(option)
        ? prev.filter((x) => x !== option)
        : [...prev, option]
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white p-6 rounded-md w-full max-w-lg relative flex flex-col"
        style={{ maxHeight: "90vh" }}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
          aria-label="Close Modal"
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

        <h2 className="text-2xl font-semibold mb-4">{t("addfiltercond")}</h2>

        {/* Step 1: Choose Filter */}
        {!selectedFilterKey && (
          <div>
            <h3 className="text-lg font-medium mb-2">
              {t("selectfiltertype")}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {definitionsToShow.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilterKey(filter.key)}
                  className="w-full text-left px-4 py-3 border rounded-md hover:bg-gray-100"
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Condition */}
        {selectedFilterKey && !selectedConditionKey && selectedFilter && (
          <div>
            <h3 className="text-lg font-medium mb-2">
              {selectedFilter.label} {t("selectcondition")}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {selectedFilter.conditions.map((c) => {
                const requiresInput =
                  c.needsValue || c.needsMultipleValues || c.needsDateRange;
                return (
                  <button
                    key={c.key}
                    onClick={() => {
                      if (!requiresInput) {
                        handleImmediateApply(selectedFilter, c);
                      } else {
                        setSelectedConditionKey(c.key);
                      }
                    }}
                    className="w-full text-left px-4 py-3 border rounded-md hover:bg-gray-100 flex justify-between items-center"
                  >
                    {c.label}
                    {requiresInput && (
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Back Button */}
            <button
              onClick={() => setSelectedFilterKey("")}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              {t("back")}
            </button>
          </div>
        )}

        {/* Step 3: Provide Input (if any) */}
        {selectedFilterKey &&
          selectedConditionKey &&
          selectedFilter &&
          selectedCondition && (
            <div>
              <h3 className="text-lg font-medium mb-4">
                {selectedFilter.label} - {selectedCondition.label}
              </h3>

              {/* If multiple-values (chips) */}
              {selectedCondition.needsMultipleValues && (
                <div className="mb-4">
                  <p className="text-sm mb-1">{t("selectoneormore")}</p>
                  <div className="flex flex-wrap gap-2">
                    {(selectedFilter.key === "card_name"
                      ? cardNames // if filter key=card_name, use cardNames
                      : selectedCondition.options
                    ) // else use static options
                      ?.map((opt, i) => (
                        <Chip
                          key={i}
                          label={opt}
                          onClick={() => handleMultiSelect(opt)}
                          color={
                            multiValues.includes(opt) ? "primary" : "default"
                          }
                          variant="outlined"
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* If it's a date range */}
              {selectedCondition.needsDateRange && (
                <div className="mb-4">
                  <p className="text-sm mb-1">{t("selstartenddate")}</p>
                  <DatePicker
                    selectsRange
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={(dates) => setDateRange(dates)}
                    isClearable
                    className="border border-gray-300 p-2 rounded w-full"
                    placeholderText={t("daterange")}
                    showMonthYearDropdown
                  />
                </div>
              )}

              {/* If it's a single date condition */}
              {selectedFilter.type === "date" &&
                selectedCondition.needsValue &&
                !selectedCondition.needsDateRange && (
                  <div className="mb-4">
                    <p className="text-sm mb-1">{t("selectDate")}</p>
                    <DatePicker
                      selected={singleDate}
                      onChange={(date) => setSingleDate(date)}
                      className="border border-gray-300 p-2 rounded w-full"
                      placeholderText="Select a date"
                      showMonthYearDropdown
                      isClearable
                    />
                  </div>
                )}

              {/* If numeric or text input */}
              {selectedCondition.needsValue &&
                selectedFilter.type !== "date" &&
                !selectedCondition.needsMultipleValues && (
                  <div className="mb-4">
                    <p className="text-sm mb-1">Enter Value:</p>
                    <input
                      type={
                        selectedFilter.type === "number" ? "number" : "text"
                      }
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="border border-gray-300 px-4 py-2 rounded w-full"
                      placeholder={`Enter ${selectedFilter.label}`}
                    />
                  </div>
                )}

              {/*/!* Optional "override name" *!/*/}
              {/*<div className="mb-4">*/}
              {/*  <p className="text-sm mb-1">Override Display Name (optional):</p>*/}
              {/*  <input*/}
              {/*    type="text"*/}
              {/*    value={overrideName}*/}
              {/*    onChange={(e) => setOverrideName(e.target.value)}*/}
              {/*    className="border border-gray-300 px-4 py-2 rounded w-full"*/}
              {/*    placeholder={`e.g. "My ${selectedFilter.label} condition"`}*/}
              {/*  />*/}
              {/*</div>*/}

              {/* Step Controls */}
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    // Go back
                    setSelectedConditionKey("");
                    setOverrideName("");
                    setMultiValues([]);
                    setDateRange([null, null]);
                    setSingleDate(null);
                    setInputValue("");
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  {t("back")}
                </button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirm}
                  disabled={
                    (selectedCondition.needsMultipleValues &&
                      multiValues.length === 0) ||
                    (selectedCondition.needsDateRange &&
                      (!dateRange[0] || !dateRange[1])) ||
                    (selectedFilter.type === "date" &&
                      selectedCondition.needsValue &&
                      !selectedCondition.needsDateRange &&
                      !singleDate &&
                      !inputValue) ||
                    (selectedCondition.needsValue &&
                      !selectedCondition.needsMultipleValues &&
                      selectedFilter.type !== "date" &&
                      !inputValue)
                  }
                >
                  {t("apply")}
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default FilterConditionModal;
