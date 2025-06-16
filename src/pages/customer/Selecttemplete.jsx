import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";

export default function Selecttemplete({
  setOpen,
  open,
  templete,
  settemplete,
  allstamps,
  newCustomer,
}) {
  const [templateerror, setTempleteerror] = useState();
  const handleChange = (event) => {
    settemplete(event.target.value);
  };

  const Submitdata = () => {
    if (!templete) {
      setTempleteerror("please select templete");
      return null;
    }
    {
      newCustomer();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex justify-between items-center">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Card enrollment
                </DialogTitle>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <CgClose size={24} />
                </button>
              </div>
              <div className="mt-4">
                <Select
                  value={templete}
                  onChange={handleChange}
                  displayEmpty
                  fullWidth
                  variant="outlined"
                  className="text-gray-500 bg-white border-gray-300 rounded-md"
                  error={templateerror}
                  // aria-errormessage={templateerror}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#D1D5DB",
                      },
                      "&:hover fieldset": {
                        borderColor: "#6B7280",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000000",
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select template</em>
                  </MenuItem>
                  {allstamps?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item?.stampName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex gap-3 sm:px-6">
              <button
                type="button"
                onClick={Submitdata}
                className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
