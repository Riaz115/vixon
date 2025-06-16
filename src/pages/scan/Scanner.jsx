import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CustomerdetailView from "../customer/CustomerdetailView";
import { Addcustomer, selectcustomers } from "../../redux/customerSlice";
import { selectBusinesses } from "../../redux/businessSlice";
import { getallcustomers, getalltransaction } from "../../api/createstamp";
import { Addtransaction } from "../../redux/transactionSlice";
import { Loader } from "../../Components/Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import ResponsiveBouncingComponent from "./ResponsiveBouncingComponent";

// Import react-hot-toast
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

// --------------------------------------------------------------------
// 1) HiddenInputScanner: always-listening approach for hardware scanning
// --------------------------------------------------------------------
function HiddenInputScanner({ onScanned }) {
  const inputRef = useRef(null);
  const [tempValue, setTempValue] = useState("");

  useEffect(() => {
    focusInput();
  }, []);

  function focusInput() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function handleChange(e) {
    setTempValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = tempValue.trim();
      if (trimmed) {
        onScanned(trimmed);
      }
      setTempValue("");
    }
  }

  function handleBlur() {
    // Re-focus after a short delay when blurred.
    setTimeout(() => focusInput(), 100);
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={tempValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      style={{
        position: "absolute",
        left: -9999,
        width: 0,
        height: 0,
        opacity: 0,
      }}
      autoFocus
    />
  );
}

// --------------------------------------------------------------------
// 2) MAIN Scanner Component
// --------------------------------------------------------------------
export default function Scanner() {
  const { t } = useTranslation("scannerscreen");
  const { barcodeData, setBarCodeData } = useOutletContext();
  const businessdata = useSelector(selectBusinesses);
  const dispatch = useDispatch();
  const customers = useSelector(selectcustomers);

  // For loading spinner and modal handling.
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = t("title");
  }, []);

  // Fetch transactions if no barcode data is present.
  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        const resp = await getalltransaction({
          businessId: businessdata?.activeLocation,
        });
        if (resp.status === 200 || resp.status === 201) {
          dispatch(Addtransaction(resp.data?.data?.transactions));
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    }
    if (!barcodeData) {
      fetchTransactions();
    }
  }, [barcodeData, businessdata, dispatch]);

  // Fetch customers if no barcode data is present.
  useEffect(() => {
    async function fetchCustomers() {
      try {
        setLoading(true);
        const resp = await getallcustomers({
          businessId: businessdata?.activeLocation,
        });
        if (resp.status === 200 || resp.status === 201) {
          dispatch(Addcustomer(resp.data?.data?.customers));
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    }
    if (!barcodeData) {
      fetchCustomers();
    }
  }, [barcodeData, businessdata, dispatch]);

  // Compute the customer matching the scanned barcode.
  const foundCustomer =
    barcodeData && customers.length > 0
      ? customers.find((c) => c._id === barcodeData)
      : null;

  // When a barcode has been scanned and customers are loaded:
  // - If no customer is found, show a toast error and clear the barcode.
  useEffect(() => {
    if (barcodeData && customers.length > 0 && !foundCustomer) {
      toast.error("Customer not found, please try again.", {
        duration: 3000,
      });
      setBarCodeData(null);
    }
  }, [barcodeData, customers, foundCustomer, setBarCodeData]);

  // Handler for scanned input.
  function handleScanResult(scanned) {
    console.log("Scanned =>", scanned);
    setBarCodeData(scanned);
  }

  // Open/close manual search modal.
  function handleSearchClick() {
    setModalOpen(true);
  }
  function handleCloseModal() {
    setModalOpen(false);
  }

  return (
    <>
      {barcodeData && foundCustomer ? (
        // If a barcode is scanned *and* a matching customer was found, render the detail view.
        <CustomerdetailView
          data={barcodeData}
          setBarCodeData={setBarCodeData}
        />
      ) : (
        // Otherwise, render the scanning UI.
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed top-0 left-0 w-screen h-screen overflow-auto flex flex-col"
        >
          {/* Include the hidden scanner input when the modal is not open */}
          {!modalOpen && <HiddenInputScanner onScanned={handleScanResult} />}

          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white">
            <div className="text-center mb-8">
              <p>{t("youlogedinas")}</p>
              <p className="font-semibold">{businessdata?.userName}</p>
            </div>

            {/* Responsive bouncing area with shadows and rounded borders */}
            <div className="w-full flex justify-center mb-6">
              <ResponsiveBouncingComponent />
            </div>

            <p
              className="text-[16px] text-[#36C6FA] text-center mt-4 cursor-pointer underline"
              onClick={handleSearchClick}
            >
              {t("searchcus")}
            </p>
          </div>

          {/* Render the search modal when open */}
          {modalOpen && (
            <SearchCustomerModal
              t={t}
              onClose={handleCloseModal}
              onScan={setBarCodeData}
            />
          )}

          <Loader loading={loading} />
        </motion.div>
      )}
    </>
  );
}

// --------------------------------------------------------------------
// 3) Minimal and Responsive SearchCustomerModal Component
// --------------------------------------------------------------------
function SearchCustomerModal({ onClose, onScan, t }) {
  const customers = useSelector(selectcustomers);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter customers as the user types (case-insensitive)
  const filteredCustomers = customers.filter((c) => {
    const fullName = `${c.first_name} ${c.last_name}`.toLowerCase();
    const term = searchTerm.toLowerCase();
    return (
      fullName.includes(term) ||
      (c.email || "").toLowerCase().includes(term) ||
      (c.phone || "").includes(searchTerm) ||
      (c._id || "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <h2 className="text-xl font-bold text-center mb-4">{t("searchcus")}</h2>
        <input
          type="text"
          placeholder="Type name, email or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
          className="w-full p-3 border border-gray-300 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#36C6FA]"
        />

        <div className="overflow-y-auto max-h-60 border-t pt-2">
          {filteredCustomers.length ? (
            filteredCustomers.map((c) => (
              <CustomerResultCard
                key={c._id}
                customer={c}
                onScan={onScan}
                onClose={onClose}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">
              {t("nomatchcus")}
            </p>
          )}
        </div>

        <button
          className="mt-4 w-full py-2 rounded-full bg-[#36C6FA] text-white font-semibold hover:bg-[#5ACFFF] transition"
          onClick={onClose}
        >
          {t("close")}
        </button>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------
// 4) Individual Customer Result Card
// --------------------------------------------------------------------
function CustomerResultCard({ customer, onScan, onClose }) {
  // When a result is clicked, use the customer's ID as the scanned data and close the modal.
  function handleClick() {
    onScan(customer._id.toString());
    onClose();
  }

  return (
    <div
      className="p-3 my-2 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition shadow-md"
      onClick={handleClick}
    >
      <p className="font-semibold">
        {customer.first_name} {customer.last_name}
      </p>
      <p className="text-xs text-gray-500">{customer.phone}</p>
      <p className="text-xs text-gray-500">{customer.email}</p>
      <p className="text-xs text-gray-400">{customer._id}</p>
    </div>
  );
}
