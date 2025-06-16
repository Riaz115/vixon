import React from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

const DeleteCardModal = ({ open, handleClose, handleDelete,singlestamp,t }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="bg-white p-8 rounded-lg shadow-lg  mx-auto w-[80%] md:w-[60%]  lg:w-[40%] mt-32 relative">

        <Typography variant="h6" className="text-gray-900 text-lg  mb-4 font-bold">
          {t("Deletecard")}
        </Typography>
        <small  className="text-gray-700 mb-6">
          {t("deleteconfirm")}
        </small>
        <Typography sx={{
            marginTop:"15px"
        }} className="text-gray-700 mb-2 mt-4">
           {t("deleteconfirm")}
        </Typography>
        <Typography className="text-gray-700 mb-6">
          {singlestamp?.stampName}
        </Typography>
        <Box className="flex justify-start space-x-4 mt-2">
          <button
            onClick={handleDelete}
          
            className="bg-black text-white hover:bg-gray-800 px-6 py-2 text-sm rounded"
          >
          {t("remove")}
          </button>
          <Button
            onClick={handleClose}
            variant="outlined"
            className="text-gray-700 border-gray-300 hover:bg-gray-100 px-4 py-2 text-sm"
          >
          {t("cancel")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteCardModal;
