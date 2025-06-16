// CustomersTable.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  Paper,
  Box,
  Toolbar,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Button,
} from "@mui/material";

import { IoSearch } from "react-icons/io5";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SendNotificationModal from "../modal/SendNotificationModal.jsx";
import { Loader } from "../../Components/Loader/loader";

// ORIGINAL LOGIC IMPORTS
import { useDispatch } from "react-redux";
import { createcustomer, deletecustomer } from "../../api/createstamp";
import { AddNewcustomer, deletecustomerdata } from "../../redux/customerSlice";

// POPUPS
import AddCumsterPopup from "../../pages/customer/AddCumsterPopup";
import Selecttemplete from "../../pages/customer/Selecttemplete";
import { sendMessageToSelectedCustomers } from "../../api/custompush.js";

function CustomersTable({ cardcustomers = [], allstamp = [], t }) {
  const dispatch = useDispatch();

  // States for the new layout
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [openSendNotification, setOpenSendNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  // States for "Add Customer" logic
  const [open, setOpen] = useState(false); // For AddCumsterPopup
  const [opentemplete, setOpentemplete] = useState(false); // For Selecttemplete popup
  const [templete, settemplete] = useState(""); // Template (stamp) selected

  // Customer object for creating/editing
  const [customer, setCustomer] = useState({
    date_of_birth: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  // Create Customer Function
  const newCustomer = async () => {
    try {
      // Find the stamp card by 'templete' ID
      const card = allstamp?.find((item) => item._id === templete);

      // Call API with full original payload
      const response = await createcustomer({
        ...customer,
        stamp: templete,
        businessId: card?.businessId,
      });

      // Check status and show messages
      if (response.status === 201 || response.status === 200) {
        toast.success(
          response?.data?.message || t("customerCreatedSuccessfully")
        );
        // Add to Redux store
        dispatch(AddNewcustomer(response?.data?.customer));
        // Close template popup
        setOpentemplete(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(t("failedToCreate"));
    }
  };

  // Delete Customers Function
  const handleDeleteCustomers = async () => {
    try {
      if (selectedCustomerIds.length === 0) {
        toast.error(t("noCutomerSelectForDelete"));
        return;
      }

      // Confirmation Prompt
      if (
        !window.confirm(
          t("deleteConfirmation", { count: selectedCustomerIds.length })
        )
      ) {
        return;
      }

      // Batch deletion for efficiency
      const deletePromises = selectedCustomerIds.map((customerId) =>
        deletecustomer(customerId)
      );

      const responses = await Promise.all(deletePromises);

      // Dispatch deletions to Redux store based on successful responses
      responses.forEach((response, idx) => {
        if (response.status === 200 || response.status === 204) {
          dispatch(deletecustomerdata(selectedCustomerIds[idx]));
        } else {
          toast.error(t("deleteFailed", { id: selectedCustomerIds[idx] }));
        }
      });

      // Clear selection
      setSelectedCustomerIds([]);
      toast.success(t("deletedSuccess"));
    } catch (error) {
      console.error("Failed to delete customers:", error);
      toast.error(t("failedDelete"));
    }
  };

  // Handlers for the new layout
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  // Handle selecting/deselecting a single row by customer ID
  const handleSelectRow = (customerId) => {
    setSelectedCustomerIds((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  // Handle selecting/deselecting all rows on the current page
  const handleSelectAllCurrentPage = (checked) => {
    if (checked) {
      const newSelected = [
        ...new Set([
          ...selectedCustomerIds,
          ...paginatedCustomers.map((cust) => cust._id),
        ]),
      ];
      setSelectedCustomerIds(newSelected);
    } else {
      // On uncheck: Deselect all across all pages
      setSelectedCustomerIds([]);
      toast.info(t("cusDeSelected"));
    }
  };

  // Handle selecting/deselecting all across all pages
  const handleSelectAllAcrossPages = () => {
    if (selectedCustomerIds.length === cardcustomers.length) {
      // All customers are already selected; deselect all
      setSelectedCustomerIds([]);
      toast.info(t("cusDeSelected"));
    } else {
      // Select all customers
      const allCustomerIds = cardcustomers.map((cust) => cust._id);
      setSelectedCustomerIds(allCustomerIds);
      toast.success(t("cusSelected"));
    }
  };

  // Filtering & Sorting
  const processedCustomers = useMemo(() => {
    if (!cardcustomers.length) return [];
    let filtered = [...cardcustomers];

    // Existing search logic
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((cust) => {
        const fullName = `${cust.first_name} ${cust.last_name}`.toLowerCase();
        return fullName.includes(lowerSearch);
      });
    }

    // Sorting logic
    if (sortField) {
      filtered.sort((a, b) => {
        let aField = a[sortField];
        let bField = b[sortField];
        if (sortField === "first_name" || sortField === "last_name") {
          aField = String(aField).toLowerCase();
          bField = String(bField).toLowerCase();
        } else if (sortField === "createdAt" || sortField === "date_of_birth") {
          aField = new Date(aField);
          bField = new Date(bField);
        }
        if (aField < bField) return sortOrder === "asc" ? -1 : 1;
        if (aField > bField) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [cardcustomers, searchTerm, sortField, sortOrder]);

  // Pagination
  const totalPages = useMemo(() => {
    return Math.ceil(processedCustomers.length / itemsPerPage) || 1;
  }, [processedCustomers.length, itemsPerPage]);

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [processedCustomers, currentPage, itemsPerPage]);

  // Compute if all current page customers are selected
  const isSelectAll = useMemo(() => {
    if (!paginatedCustomers.length) return false;
    return paginatedCustomers.every((cust) =>
      selectedCustomerIds.includes(cust._id)
    );
  }, [paginatedCustomers, selectedCustomerIds]);

  // Compute if some (but not all) current page customers are selected
  const isIndeterminate = useMemo(() => {
    if (!paginatedCustomers.length) return false;
    const selectedCount = paginatedCustomers.filter((cust) =>
      selectedCustomerIds.includes(cust._id)
    ).length;
    return selectedCount > 0 && selectedCount < paginatedCustomers.length;
  }, [paginatedCustomers, selectedCustomerIds]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  // Handler to send notifications
  const handleSendNotification = async (messageBody) => {
    if (!selectedCustomerIds.length) {
      toast.error(t("noSelect"));
      return;
    }

    setLoading(true);

    // Build "userData" array with userId, title, messageBody for each selected user
    const userData = selectedCustomerIds.map((id) => {
      const user = cardcustomers.find((u) => u._id === id);
      // Suppose each "user" might have a "cards" array
      // We'll guess the "companyName" is on the first card or stored somewhere
      // If you have your own logic, replace accordingly:
      const userCard = user?.cards?.[0];
      const companyName =
        allstamp.find((item) => item._id === userCard?.cardId)?.companyName ||
        t("vixonCard");

      return {
        userId: id,
        title: companyName,
        messageBody,
      };
    });
    console.log(userData);

    const payload = {
      userData, // an array of objects
      isSchedule: false, // or true, if you have scheduling
      intervalTime: null, // set if scheduling
    };

    try {
      const response = await sendMessageToSelectedCustomers(payload);
      toast.success(
        response.data.message ||
          t("sentToCustomers", { count: selectedCustomerIds.length })
      );
    } catch (err) {
      console.error("Failed to send notifications:", err);
      toast.error(t("failNotification"));
    } finally {
      setLoading(false);
    }

    // Close modal, clear selection
    setOpenSendNotification(false);
    setSelectedCustomerIds([]);
  };

  const handleCloseSendNotification = () => {
    setOpenSendNotification(false);
  };

  // Render
  return (
    <Paper elevation={3} sx={{ width: "100%", p: 2, mt: 2 }}>
      {/* Toolbar with Action Buttons and Search */}
      <Toolbar
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {/* Create Customer Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            {t("createcustomer")}
          </Button>

          {/* Delete Customers Button */}
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteCustomers}
            disabled={selectedCustomerIds.length === 0}
          >
            {t("deleteCustomer")}
          </Button>

          {/* Send Notification Button */}
          <Button
            variant="contained"
            color="success"
            disabled={selectedCustomerIds.length === 0}
            onClick={() => setOpenSendNotification(true)}
          >
            {t("sendNotification")}
          </Button>

          {/* Select/Deselect All Across All Pages Button */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSelectAllAcrossPages}
            sx={{ minWidth: "150px" }}
          >
            {selectedCustomerIds.length === cardcustomers.length
              ? t("deSelect")
              : t("selectAll")}
          </Button>
        </Box>

        {/* Search Field */}
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            placeholder={t("searchByName")}
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: <IoSearch size={20} style={{ color: "#888" }} />,
            }}
          />
        </Box>
      </Toolbar>

      {/* Display Selected Contacts Count */}
      <Box sx={{ mb: 2, px: 2.5, minHeight: "32px" }}>
        {selectedCustomerIds.length > 0 && (
          <Typography variant="subtitle1" color="primary">
            {selectedCustomerIds.length} {t("conSelected")}
          </Typography>
        )}
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small" sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  p: 1,
                  borderBottom: 1,
                  borderColor: "grey.300",
                  width: "50px",
                }}
              >
                <Checkbox
                  checked={isSelectAll}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAllCurrentPage(e.target.checked)}
                  inputProps={{
                    "aria-label": t("selectAllCus"),
                  }}
                />
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  p: 1,
                  borderBottom: 1,
                  borderColor: "grey.300",
                  cursor: "pointer",
                  width: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                onClick={() => handleSort("first_name")}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {t("userName")}
                  <Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
                    {sortField === "first_name" ? (
                      sortOrder === "asc" ? (
                        <FaSortUp size={12} />
                      ) : (
                        <FaSortDown size={12} />
                      )
                    ) : (
                      <Box sx={{ width: "12px", height: "12px" }} /> // Placeholder
                    )}
                  </Box>
                </Box>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  p: 1,
                  borderBottom: 1,
                  borderColor: "grey.300",
                  cursor: "pointer",
                  width: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                onClick={() => handleSort("createdAt")}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {t("created")}
                  <Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
                    {sortField === "createdAt" ? (
                      sortOrder === "asc" ? (
                        <FaSortUp size={12} />
                      ) : (
                        <FaSortDown size={12} />
                      )
                    ) : (
                      <Box sx={{ width: "12px", height: "12px" }} /> // Placeholder
                    )}
                  </Box>
                </Box>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  p: 1,
                  borderBottom: 1,
                  borderColor: "grey.300",
                  width: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {t("birthday")}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  p: 1,
                  borderBottom: 1,
                  borderColor: "grey.300",
                  width: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {t("phone")}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  p: 1,
                  borderBottom: 1,
                  borderColor: "grey.300",
                  width: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {t("device")}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  p: 1,
                  borderBottom: 1,
                  borderColor: "grey.300",
                  width: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {t("customerCard")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCustomers && paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((cust) => (
                <TableRow key={cust._id} hover>
                  <TableCell
                    align="center"
                    sx={{ p: 1, borderLeft: 1, borderColor: "grey.300" }}
                  >
                    <Checkbox
                      checked={selectedCustomerIds.includes(cust._id)}
                      onChange={() => handleSelectRow(cust._id)}
                      inputProps={{
                        "aria-label": `select ${cust.first_name} ${cust.last_name}`,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      p: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Link
                      to={`/customer/profile/${cust._id}`}
                      style={{ textDecoration: "none", color: "#333" }}
                    >
                      {cust.first_name} {cust.last_name}
                    </Link>
                  </TableCell>
                  <TableCell
                    sx={{
                      p: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cust.createdAt &&
                      new Date(cust.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    sx={{
                      p: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cust.date_of_birth
                      ? new Date(cust.date_of_birth).toLocaleDateString()
                      : "--"}
                  </TableCell>
                  <TableCell
                    sx={{
                      p: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cust.phone || "--"}
                  </TableCell>
                  <TableCell
                    sx={{
                      p: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cust.cards?.map((card, i) => (
                      <Chip
                        key={i}
                        label={card.device || "N/A"}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell
                    sx={{
                      p: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cust.cards?.map((card, i) => (
                      <Chip
                        key={i}
                        label={
                          allstamp.find((item) => item._id === card.cardId)
                            ?.stampName || t("na")
                        }
                        size="small"
                        color="primary"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="textSecondary">
                    {t("noCusFound")}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination & Items Per Page Controls */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="textSecondary">
            {t("show")}
          </Typography>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body2" color="textSecondary">
            {t("perPage")}
          </Typography>
        </Box>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          color="primary"
          size="small"
        />
        <Typography variant="body2" color="textSecondary">
          {t("showing")} {paginatedCustomers.length} {t("of")}
          {processedCustomers.length} {t("customers")}
        </Typography>
      </Box>

      {/* Popups */}
      <AddCumsterPopup
        open={open}
        setOpen={setOpen}
        customer={customer}
        setcustomer={setCustomer}
        setOpentemplete={setOpentemplete}
      />
      <Selecttemplete
        open={opentemplete}
        setOpen={setOpentemplete}
        templete={templete}
        settemplete={settemplete}
        allstamps={allstamp} // Ensure this is correctly passed
        newCustomer={newCustomer}
      />

      <SendNotificationModal
        open={openSendNotification}
        onClose={handleCloseSendNotification}
        onSend={handleSendNotification}
        selectedCount={selectedCustomerIds.length}
      />
      <Loader loading={loading} />
    </Paper>
  );
}

export default CustomersTable;
