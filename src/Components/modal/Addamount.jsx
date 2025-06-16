import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
const ConfirmationModal = ({
  designformData,
  open,
  handleClose,
  userName,
  updatepoint,
  updateredeem,
  section,
  points,
  handleupdatediscount,
  totaldata,
  handleupdatdcoupon,
}) => {
  const { t } = useTranslation("addamount");
  const [purchaseAmount, setPurchaseAmount] = useState();
  const [comment, setComment] = useState("");
  const handleAdd = () => {
    if (section === "point") {
      if (designformData?.cardType === "Discount") {
        // //console.log(designformData?.cardType)
        if (
          (designformData?.purchaseAmountIsRequiredSwitch && purchaseAmount) ||
          designformData?.purchaseAmountIsRequiredSwitch === false
        ) {
          handleupdatediscount(totaldata);
        } else {
          toast.error("Purchase amount must be positive");
        }
      } else if (designformData?.cardType === "Coupon") {
        if (
          (designformData?.purchaseAmountIsRequiredSwitch && purchaseAmount) ||
          designformData?.purchaseAmountIsRequiredSwitch === false
        ) {
          handleupdatdcoupon({
            Amount: purchaseAmount,
          });
        } else {
          toast.error("Purchase amount must be positive");
        }
      } else {
        if (
          (designformData?.purchaseAmountIsRequiredSwitch && purchaseAmount) ||
          designformData?.purchaseAmountIsRequiredSwitch === false
        ) {
          updatepoint(
            {
              amount: purchaseAmount,
              comment: setComment,
            },
            section
          );
        } else {
          toast.error("Purchase amount must be positive");
        }
      }
    } else {
      if (
        (designformData?.purchaseAmountIsRequiredSwitch && purchaseAmount) ||
        designformData?.purchaseAmountIsRequiredSwitch === false
      ) {
        updateredeem(
          {
            amount: purchaseAmount,
            comment: setComment,
            cardType: designformData?.cardType,
            earnPointsWhenRedeemReward:
              designformData?.earnPointsWhenRedeemReward,
          },
          section
        );
      } else {
        toast.error("Purchase amount must be positive");
      }
    }
  };

  const returnheading = () => {
    if (designformData?.cardType === "Stamp") {
      if (section === "point") {
        return `Stamps add ${points} a ${userName}`;
      } else {
        return `Stamps redeem to ${userName} ${designformData?.selectedNumber}`;
      }
    } else if (designformData?.cardType === "Reward") {
      if (section === "point") {
        return `You want to add ${points} points to  ${userName}`;
      } else {
        return `Points  redeem to ${userName} ${points}`;
      }
    } else if (designformData?.cardType === "Coupon") {
      return `Coupon redeem to  ${userName}`;
    } else {
      if (section === "point") {
        return `Discount redeem to  ${userName}`;
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle className="text-center font-bold text-lg">
        {t("Confirmation")}
      </DialogTitle>
      <DialogContent>
        <p className="text-center mb-6">{returnheading()}</p>
        <TextField
          label="Purchase amount"
          type="number"
          fullWidth
          variant="outlined"
          value={purchaseAmount}
          onChange={(e) => setPurchaseAmount(e.target.value)}
          sx={{ mb: 4 }}
          inputProps={{ min: 0 }} // Setting minimum value to 0
        />
        <TextField
          label="Comment (optional)"
          multiline
          fullWidth
          variant="outlined"
          value={comment}
          rows={4}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <hr />
      <DialogActions className="flex justify-between">
        <button
          onClick={handleClose}
          className="w-full border-gray-400 text-gray-700 p-2 "
        >
          {t("cancel")}
        </button>
        <button
          onClick={handleAdd}
          className="w-full bg-black text-white hover:bg-gray-800 p-2"
        >
          {t("add")}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
