import {
  Breadcrumbs,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import HomeIcon from "@material-ui/icons/Home";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import readNumber from "read-vn-number";
import { useDispatch, useSelector } from "react-redux";
import {
  transactionDetails,
  updateTransaction,
} from "../../actions/transactionActions";
import "./EditTranForm.css";
import Spinner from "../Spinner/Spinner";

function EditTranForm({ match, history }) {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const {
    transaction,
    loading: loadingDetails,
    error: errorDetails,
  } = useSelector((state) => state.transactionDetails);

  const { loading: loadingUpdate, error: errorUpdate } = useSelector(
    (state) => state.transactionUpdate
  );

  const handleAmountChange = (e) => {
    const addCommas = (num) =>
      num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

    setAmount(addCommas(removeNonNumeric(e.target.value)));
  };

  useEffect(() => {
    dispatch(transactionDetails(match.params.id));
  }, [dispatch]);

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setType(transaction.type);
      setTitle(transaction.title);
      setDescription(transaction.description);
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTransaction(
        match.params.id,
        parseInt(amount.toString().split(".").join("")),
        type,
        title,
        description
      )
    );
    history.push("/dashboard");
  };
  return (
    <>
      <Breadcrumbs
        className="breadcrumbs"
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          color="inherit"
          to="/"
          style={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon style={{ marginRight: "5px", width: "20", height: "20" }} />
          Trang chủ
        </Link>

        <Link color="inherit" to="/dashboard">
          Tất cả giao dịch
        </Link>

        <Typography className="text-breadcrumbs" color="textPrimary">
          Sửa đổi
        </Typography>
      </Breadcrumbs>

      <div className="wrapper">
        <div className="edit-wrapper">
          <div className="heading">
            <RateReviewOutlinedIcon />
            <h3>Sửa đổi giao dịch</h3>
          </div>
          {!loadingDetails && amount ? (
            <div className="tran-details">
              <form onSubmit={handleSubmit}>
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
                  value={amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  type="text"
                  fullWidth
                />
                <p className="amount-text">
                  Giá bằng chữ:{" "}
                  <span>
                    {amount
                      ? `${readNumber(
                          parseInt(amount.toString().split(".").join(""))
                        )} đồng`
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
                <button type="submit" className="submit-btn">
                  <SaveOutlinedIcon />
                  Ghi nhận{" "}
                  {loadingUpdate && (
                    <CircularProgress
                      style={{ color: "#fff", marginLeft: "5px" }}
                      size={15}
                    />
                  )}
                </button>
              </form>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
}

export default EditTranForm;
