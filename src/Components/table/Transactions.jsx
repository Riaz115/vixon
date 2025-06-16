import React, { useState, useMemo, useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Find the matching card (from customerId.cards) that corresponds to this transaction.
 */
function getMatchingCustomerCard(transaction) {
  if (!transaction?.cardId || !transaction?.customerId?.cards) return null;
  const cardId =
    transaction.cardId._id || transaction.cardId.id || transaction.cardId;
  return transaction.customerId.cards.find((c) => c.cardId === cardId);
}

/**
 * Build the dynamic details string for a given transaction.
 *
 * This function uses transaction data directly:
 * - For "reward" transactions, it uses transaction.Balance.
 * - For "stamp" or "stamps", it looks into the matching card in customerId.cards.
 * - For "discount", it shows the tier (from cardId.tiers) and transaction.Balance.
 * - For "coupon", it looks into the matching card for couponstatus.
 */
function getDetailsForAll(transaction) {
  const type = transaction?.cardId?.cardType?.toLowerCase() || "";

  // console.log(transaction, "this is transaction")
  if (type === "reward") {
    const balance = transaction?.Balance ?? 0;
    const addedPoints = transaction?.addedStamps ?? 0;
    return `Reward Balance: ${balance} Points, Added: ${addedPoints}`;
  } else if (type === "stamp" || type === "stamps") {
    const remaining = transaction?.remainingStamps ?? "—";
    const total = transaction?.totalStamps ?? "—";
    const addedStamps = transaction?.addedStamps ?? "—";
    return `Stamps - Remaining: ${remaining}, Total: ${total}, Added: ${addedStamps}`;
  } else if (type === "coupon") {
    const card = getMatchingCustomerCard(transaction);
    const status = card ? card.couponstatus : "N/A";
    return `Coupon Status: ${status}`;
  } else if (type === "discount") {
    // Use the snapshot Balance stored in the transaction (NOT the live data from the customer's card)
    const transactionAmount = transaction?.Transactionamount || 0;
    const currentBalance = transaction?.Balance || 0; // snapshot of the discount balance at the time of transaction

    // Make sure the tiers exist and are a nonempty array
    const tiers = transaction?.cardId?.tiers;
    if (!tiers || tiers.length === 0) {
      return `Tier: N/A, Until next Tier: —, Total Balance: ${currentBalance}`;
    }

    // Sort tiers in ascending order based on the spendToAchieve property
    const sortedTiers = [...tiers].sort(
      (a, b) => a.spendToAchieve - b.spendToAchieve
    );

    // Determine the current tier by finding the highest tier for which
    // the currentBalance is greater than or equal to the required spend
    let currentTier = sortedTiers[0].tierName;
    for (let i = 0; i < sortedTiers.length; i++) {
      if (currentBalance >= sortedTiers[i].spendToAchieve) {
        currentTier = sortedTiers[i].tierName;
      }
    }

    // Find the "next tier" that has a spendToAchieve greater than currentBalance.
    const nextTierObj = sortedTiers.find(
      (tier) => currentBalance < tier.spendToAchieve
    );
    const untilNext = nextTierObj
      ? nextTierObj.spendToAchieve - currentBalance
      : 0;

    // Return details which now include:
    //   - The current tier
    //   - How many points until next tier (if any)
    //   - The total discount balance (snapshot)
    return `Tier: ${currentTier}, Until next Tier: ${untilNext}, Total Balance: ${currentBalance}`;
  } else {
    return "—";
  }
}

function Transactions({ cardtransation, setCsvdata }) {
  // State for search, sort, pagination, and card type filtering.
  const { t } = useTranslation("passsetting");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCardType, setSelectedCardType] = useState(t("all")); // Allowed: All, Stamps, Reward, Discount, Coupon
  const [sortField, setSortField] = useState(""); // "username" or "createdAt"
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // --------------------
  // Handlers
  // --------------------
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const handleCardTypeChange = (e) => {
    setSelectedCardType(e.target.value);
    setCurrentPage(1);
  };

  // --------------------
  // Filter and sort transactions.
  // --------------------
  const filteredAndSortedTransactions = useMemo(() => {
    console.log(selectedCardType, "this is selectedCardType");
    console.log(cardtransation, "this is cardtransation");
    if (!cardtransation) return [];
    // Filter initial transactions
    let txs = cardtransation.filter((tx) => {
      if (searchTerm) {
        const fullName = (
          (tx?.customerId?.first_name || "") +
          " " +
          (tx?.customerId?.last_name || "")
        ).toLowerCase();
        if (!fullName.includes(searchTerm.toLowerCase())) return false;
      }
      if (tx?.event && tx.event.toLowerCase().includes("coupon")) {
        // keep them, no matter selectedCardType
        return true;
      }
      console.log(tx?.cardId?.cardType, "this is tx?.cardId?.cardType");
      if (!tx?.cardId?.cardType) return false;
      return true; // <-- Now keep everything
    });

    // if (selectedCardType !== "All") {
    //   txs = txs.filter((tx) => {
    //     // If the transaction is a discount transaction (by event),
    //     // then match it if the selected type is "discount"
    //     if (tx?.event && tx.event.toLowerCase().includes("discount")) {
    //       return selectedCardType.toLowerCase() === "discount";
    //     }
    //     const cardType = tx.cardId.cardType.toLowerCase();
    //     const selected = selectedCardType.toLowerCase();
    //     if (selected === "stamps") {
    //       return cardType === "stamp" || cardType === "stamps";
    //     } else if (selected === "coupon") {
    //       return cardType === "coupon";
    //     }
    //     return cardType === selected;
    //   });
    // }

    if (sortField) {
      txs.sort((a, b) => {
        let fieldA, fieldB;
        if (sortField === "username") {
          fieldA = `${a?.customerId?.first_name || ""} ${
            a?.customerId?.last_name || ""
          }`.toLowerCase();
          fieldB = `${b?.customerId?.first_name || ""} ${
            b?.customerId?.last_name || ""
          }`.toLowerCase();
        } else if (sortField === "createdAt") {
          fieldA = new Date(a.createdAt);
          fieldB = new Date(b.createdAt);
        }
        if (sortOrder === "asc") return fieldA > fieldB ? 1 : -1;
        return fieldA < fieldB ? 1 : -1;
      });
    }
    return txs;
  }, [cardtransation, searchTerm, selectedCardType, sortField, sortOrder]);

  // --------------------
  // Pagination
  // --------------------
  const totalPages =
    Math.ceil(filteredAndSortedTransactions.length / itemsPerPage) || 1;
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedTransactions.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredAndSortedTransactions, currentPage, itemsPerPage]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // --------------------
  // Build CSV data using common fields plus the dynamic DETAILS column.
  // --------------------
  const csvData = filteredAndSortedTransactions.map((tx) => ({
    Username: `${tx?.customerId?.first_name || ""} ${
      tx?.customerId?.last_name || ""
    }`,
    Date: tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : "—",
    Phone: tx?.customerId?.phone || "—",
    Device: (tx?.customerId?.cards || []).map((c) => c.device).join(", "),
    Event: tx?.event || "—",
    "Transaction Amount":
      tx?.Transactionamount !== undefined ? `${tx.Transactionamount}€` : "—",
    Details: getDetailsForAll(tx),
  }));

  useEffect(() => {
    setCsvdata(csvData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredAndSortedTransactions]);

  // --------------------
  // Render table header (common columns plus one dynamic "DETAILS" column).
  // --------------------
  const renderHeader = () => {
    const headers = [
      t("username"),
      t("date"),
      t("phone"),
      t("device"),
      t("event"),
      t("transactionAmount"),
      t("details"),
    ];
    return (
      <TableRow>
        {headers.map((h) => (
          <TableCell
            key={h}
            sx={{
              cursor: h === "USERNAME" || h === "DATE" ? "pointer" : "default",
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
            onClick={
              h === "USERNAME"
                ? () => handleSort("username")
                : h === "DATE"
                ? () => handleSort("createdAt")
                : undefined
            }
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">{h}</Typography>
              {((h === "USERNAME" && sortField === "username") ||
                (h === "DATE" && sortField === "createdAt")) &&
                (sortOrder === "asc" ? (
                  <FaSortUp size={16} />
                ) : (
                  <FaSortDown size={16} />
                ))}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    );
  };

  // --------------------
  // Render each row.
  // --------------------
  const renderRow = (tx, idx) => (
    <TableRow key={idx}>
      <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
        <Link
          to={`/customer/profile/${tx?.customerId?._id?.toString()}`}
          style={{ textDecoration: "none", color: "#333" }}
        >
          {`${tx?.customerId?.first_name || ""} ${
            tx?.customerId?.last_name || ""
          }`}
        </Link>
      </TableCell>
      <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
        {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : "—"}
      </TableCell>
      <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
        {tx?.customerId?.phone || "—"}
      </TableCell>
      <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
        {(tx?.customerId?.cards || []).map((c) => c.device).join(", ") || "—"}
      </TableCell>
      <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
        {tx?.event || "—"}
      </TableCell>
      <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
        {tx?.Transactionamount !== undefined ? `${tx.Transactionamount}€` : "—"}
      </TableCell>
      <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
        {getDetailsForAll(tx)}
      </TableCell>
    </TableRow>
  );

  return (
    <Paper elevation={3} sx={{ width: "100%", p: 2, mt: 2 }}>
      {/* Toolbar: Search and Card Type Filter */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            placeholder={t("searchbyName")}
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              endAdornment: <IoSearch size={20} style={{ color: "#888" }} />,
            }}
          />
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 2, overflowX: "auto" }}>
        <Table size="small" sx={{ width: "100%" }}>
          <TableHead>{renderHeader()}</TableHead>
          <TableBody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx, idx) => renderRow(tx, idx))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {t("notransactionfound")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination & Items per Page Controls */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="textSecondary">
            {t("show")}
          </Typography>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="small"
        />
        <Typography variant="body2" color="textSecondary">
          {t("shown")} {paginatedTransactions.length} {t("outOf")}
          {filteredAndSortedTransactions.length}
        </Typography>
      </Box>
    </Paper>
  );
}

export default Transactions;
