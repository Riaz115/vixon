// SendNotificationModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
  Popover,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Import Emoji Picker and Emoji Icon
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { useTranslation } from "react-i18next";

function SendNotificationModal({ open, onClose, onSend, selectedCount }) {
  const { t } = useTranslation("sendnotification");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  // State for Popover (Emoji Picker)
  const [anchorEl, setAnchorEl] = useState(null);

  // Handler to send the notification
  const handleSend = () => {
    if (message.trim() === "") {
      setError(true);
      return;
    }
    onSend(message);
    setMessage("");
    setError(false);
    handleClosePopover();
  };

  // Handler to cancel and close the modal
  const handleCancel = () => {
    onClose();
    setMessage("");
    setError(false);
    handleClosePopover();
  };

  // Handler for emoji selection
  const handleEmojiClick = (emojiData, event) => {
    setMessage((prev) => prev + emojiData.emoji);
    setError(false);
    handleClosePopover();
  };

  // Open Popover when emoji icon is clicked
  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close Popover
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? "emoji-popover" : undefined;

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>{t("sendNotifications")}</DialogTitle>
      <DialogContent>
        {/* Notification Count */}
        <Box mb={2}>
          <Typography variant="body1">
            {t("bodymsg")}
            <Box
              component="span"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {selectedCount} {t("customer")}
              {selectedCount > 1 ? "s" : ""}.
            </Box>{" "}
          </Typography>
        </Box>

        {/* Preview Section */}
        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            {t("preview")}
          </Typography>
          <Box
            sx={{
              borderRadius: "16px",
              padding: "16px",
              backgroundColor: "rgba(0,0,0,0.75)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            {/* Icon */}
            <NotificationsIcon
              sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
            />
            {/* Notification Content */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "semibold" }}>
                {t("companyname")}
              </Typography>
              <Typography variant="body2">{message || t("msgbdy")}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Message Input with Emoji Picker */}
        <Box sx={{ position: "relative" }}>
          <TextField
            label={t("msg")}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (e.target.value.trim() !== "") {
                setError(false);
              }
            }}
            placeholder={t("typemsg")}
            error={error}
            helperText={error ? t("emptymsg") : ""}
          />

          {/* Emoji Picker Icon */}
          <BsEmojiSmile
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              fontSize: "1.25rem",
              color: "gray",
              cursor: "pointer",
            }}
            onClick={handleOpenPopover}
          />

          {/* Emoji Picker Popover */}
          <Popover
            id={popoverId}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </Popover>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, justifyContent: "flex-end" }}>
        <Button
          onClick={handleCancel}
          variant="contained"
          sx={{
            backgroundColor: red[500],
            color: "#fff",
            "&:hover": {
              backgroundColor: red[700],
            },
            mr: 2, // Margin to separate buttons
          }}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={handleSend}
          variant="contained"
          sx={{
            backgroundColor: green[500],
            color: "#fff",
            "&:hover": {
              backgroundColor: green[700],
            },
          }}
        >
          {t("send")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SendNotificationModal;
