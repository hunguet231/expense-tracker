import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import readNumber from "read-vn-number";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./AddTranForm.css";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  createTransaction,
  listTransactions,
} from "../../actions/transactionActions";

export default function AddTranForm({ openRef, handleChangeOpenRef, userId }) {
  const [open, setOpen] = useState(openRef);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(openRef);
  }, [openRef]);

  const handleClose = () => {
    setOpen(!open);
    handleChangeOpenRef();
  };

  const handleAmountChange = (e) => {
    const addCommas = (num) =>
      num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

    setAmount(addCommas(removeNonNumeric(e.target.value)));
  };

  const handleAdd = async () => {
    setLoading(true);

    await dispatch(
      createTransaction(
        parseInt(amount.split(".").join("")),
        type,
        title,
        description
      )
    );

    await dispatch(listTransactions(userId));

    setLoading(false);

    setOpen(!open);
    handleChangeOpenRef();

    // store in sessionStorage to show toaster
    sessionStorage.setItem("addTran", "1");

    setAmount("");
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Thêm giao dịch</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="dense"
            label="Tiêu đề"
            type="text"
            fullWidth
          />
          <TextField
            name="amount"
            margin="dense"
            label="Số lượng(VNĐ)"
            onChange={handleAmountChange}
            value={amount}
            type="text"
            fullWidth
          />
          <p className="amount-text">
            Giá bằng chữ:{" "}
            <span>
              {amount
                ? `${readNumber(parseInt(amount.split(".").join("")))} đồng`
                : ""}
            </span>
          </p>
          <FormControl component="fieldset">
            <FormLabel>Loại giao dịch</FormLabel>
            <RadioGroup
              row
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <FormControlLabel
                name="type"
                value="Expense"
                control={<Radio color="primary" />}
                label="Chi"
              />
              <FormControlLabel
                name="type"
                value="Income"
                control={<Radio color="primary" />}
                label="Thu"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="dense"
            label="Mô tả"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huỷ
          </Button>
          <Button onClick={handleAdd} color="primary">
            Thêm {loading && <CircularProgress color="primary" size={15} />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
