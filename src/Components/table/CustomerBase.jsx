import React, { useState, useEffect, useMemo } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import { IoSearch } from "react-icons/io5";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SmallTextAvatar = styled(Avatar)({
  height: 33,
  width: 33,
  backgroundColor: "black",
  fontSize: "12px",
});

function CustomerBase({ customer }) {
  const { t } = useTranslation("customerbase");

  // State variables for pagination & sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Sort logic
  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  // Search logic
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Filter & sort
  const filteredAndSortedCustomer = useMemo(() => {
    if (!customer) return [];
    let filtered = customer.filter((data) => {
      const fullName = `${data.first_name} ${data.last_name}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let fieldA = a[sortField];
        let fieldB = b[sortField];

        // For 'username', compare fullName
        if (sortField === "username") {
          fieldA = `${a.first_name} ${a.last_name}`.toLowerCase();
          fieldB = `${b.first_name} ${b.last_name}`.toLowerCase();
        } else if (sortField === "createdAt") {
          fieldA = new Date(a.createdAt);
          fieldB = new Date(b.createdAt);
        }

        if (sortOrder === "asc") return fieldA > fieldB ? 1 : -1;
        else return fieldA < fieldB ? 1 : -1;
      });
    }
    return filtered;
  }, [customer, searchTerm, sortField, sortOrder]);

  // Total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredAndSortedCustomer.length / itemsPerPage);
  }, [filteredAndSortedCustomer, itemsPerPage]);

  // Make sure currentPage doesn’t exceed totalPages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Current page data
  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCustomer.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredAndSortedCustomer, currentPage, itemsPerPage]);

  // Items Per Page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Paper elevation={3} sx={{ width: "100%", p: 2, mt: 2 }}>
      {/* Top toolbar area: search, etc. */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 300 }}>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            placeholder={t("searchbyname")}
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              endAdornment: <IoSearch size={20} style={{ color: "#888" }} />,
            }}
          />
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          // Remove horizontal scroll; allow wrapping inside cells:
          overflowX: "visible",
        }}
      >
        <Table
          size="small"
          sx={{
            tableLayout: "auto",
            width: "100%",
          }}
        >
          <TableHead>
            <TableRow>
              {/* USERNAME column */}
              <TableCell
                sx={{
                  cursor: "pointer",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
                onClick={() => handleSort("username")}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">{t("username")}</Typography>
                  {sortField === "username" && sortOrder === "asc" ? (
                    <FaSortUp size={18} />
                  ) : (
                    <FaSortDown size={18} />
                  )}
                </Box>
              </TableCell>

              {/* CREATED column */}
              <TableCell
                sx={{
                  cursor: "pointer",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
                onClick={() => handleSort("createdAt")}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">{t("created")}</Typography>
                  {sortField === "createdAt" && sortOrder === "asc" ? (
                    <FaSortUp size={18} />
                  ) : (
                    <FaSortDown size={18} />
                  )}
                </Box>
              </TableCell>

              <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                {t("birthdate")}
              </TableCell>
              <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                {t("phone")}
              </TableCell>
              <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                {t("email")}
              </TableCell>
              <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                {t("device")}
              </TableCell>
              <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                {t("cardStatus")}
              </TableCell>

              {/*<TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>*/}
              {/*  VISITS LEFT*/}
              {/*</TableCell>*/}
              {/*<TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>*/}
              {/*  VISITS SOLD*/}
              {/*</TableCell>*/}
              {/*<TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>*/}
              {/*  VISITS USED*/}
              {/*</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.length > 0 ? (
              currentPageData.map((data, index) => (
                <TableRow key={data._id || index}>
                  {/* USERNAME */}
                  <TableCell
                    sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                  >
                    <Link
                      to={`/customer/profile/${data?._id}`}
                      style={{ textDecoration: "none", color: "#333" }}
                    >
                      {`${data?.first_name} ${data?.last_name}`}
                    </Link>
                  </TableCell>

                  {/* CREATED */}
                  <TableCell
                    sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                  >
                    {new Date(data?.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* BIRTHDATE */}
                  <TableCell
                    sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                  >
                    {data?.date_of_birth
                      ? new Date(data.date_of_birth).toLocaleDateString()
                      : "--"}
                  </TableCell>

                  {/* PHONE */}
                  <TableCell
                    sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                  >
                    {data?.phone || "--"}
                  </TableCell>

                  {/* EMAIL */}
                  <TableCell
                    sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                  >
                    {data?.email || "--"}
                  </TableCell>

                  {/* DEVICE */}
                  <TableCell
                    sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                  >
                    {data?.cards?.map((item, idx) => (
                      <span
                        key={idx}
                        className="border border-[#1F1E1F] px-2 py-1 rounded mr-1"
                      >
                        {item?.device || "N/A"}
                      </span>
                    ))}
                  </TableCell>

                  {/* CARD STATUS */}
                  <TableCell
                    sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                  >
                    {data?.cards?.map((item, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded ${
                          item?.status === "installed"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {item?.status}
                      </span>
                    ))}
                  </TableCell>

                  {/*/!* VISITS LEFT *!/*/}
                  {/*<TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>*/}
                  {/*  {data?.visitLeft || 0}*/}
                  {/*</TableCell>*/}

                  {/*/!* VISITS SOLD *!/*/}
                  {/*<TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>*/}
                  {/*  {data?.visitSold || 0}*/}
                  {/*</TableCell>*/}

                  {/*/!* VISITS USED *!/*/}
                  {/*<TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>*/}
                  {/*  {data?.visitUsed || 0}*/}
                  {/*</TableCell>*/}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  {t("nofound")}
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
        {/* Items Per Page */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="textSecondary">
            {t("show")}
          </Typography>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Page Navigation via MUI Pagination */}
        <Pagination
          count={totalPages || 1}
          page={currentPage}
          onChange={(_, page) => handlePageChange(page)}
          color="primary"
          size="small"
        />

        {/* Status */}
        <Typography variant="body2" color="textSecondary">
          {t("shown")}
          {currentPageData.length} {t("from")}{" "}
          {filteredAndSortedCustomer.length}
        </Typography>
      </Box>
    </Paper>
  );
}

export default CustomerBase;
