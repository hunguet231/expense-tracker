import {
  Breadcrumbs,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import HomeIcon from "@material-ui/icons/Home";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import KeyboardArrowLeftOutlinedIcon from "@material-ui/icons/KeyboardArrowLeftOutlined";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import readNumber from "read-vn-number";
import { useDispatch, useSelector } from "react-redux";
import { transactionDetails } from "../../actions/transactionActions";
import Spinner from "../Spinner/Spinner";
import "./TranDetails.css";
import { DateTime } from "luxon";

function TranDetails({ match, history }) {
  const dispatch = useDispatch();

  const {
    transaction,
    loading: loadingDetails,
    error: errorDetails,
  } = useSelector((state) => state.transactionDetails);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(transactionDetails(match.params.id));
    }
  }, [dispatch]);

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
          Chi tiết
        </Typography>
      </Breadcrumbs>

      <div className="wrapper">
        <div className="edit-wrapper">
          <div className="heading">
            <RateReviewOutlinedIcon />
            <h3>Chi tiết giao dịch</h3>
            <Link
              to={`/transactions/${match.params.id}/edit`}
              className="edit-tran-button"
            >
              <div>Chỉnh sửa</div>
            </Link>
          </div>
          {!loadingDetails && transaction && transaction.amount ? (
            <div className="tran-details">
              <form>
                <TextField
                  name="title"
                  value={transaction.title}
                  margin="dense"
                  label="Tiêu đề"
                  type="text"
                  fullWidth
                />
                <TextField
                  name="amount"
                  margin="dense"
                  label="Số lượng(VNĐ)"
                  value={transaction.amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  type="text"
                  fullWidth
                />
                <p className="amount-text">
                  Giá bằng chữ:{" "}
                  <span>
                    {`${readNumber(
                      parseInt(
                        transaction.amount.toString().split(".").join("")
                      )
                    )} đồng`}
                  </span>
                </p>
                <FormControl component="fieldset">
                  <FormLabel>Loại giao dịch</FormLabel>
                  <RadioGroup row value={transaction.type}>
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
                  value={transaction.description}
                  margin="dense"
                  label="Mô tả"
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                />
                <p>
                  Thời gian tạo:{" "}
                  {DateTime.fromISO(transaction.createdDate).toLocaleString(
                    DateTime.DATETIME_MED
                  )}
                </p>
                {transaction.modifiedDate ? (
                  <p>
                    Cập nhật lúc:{" "}
                    {DateTime.fromISO(transaction.modifiedDate).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </p>
                ) : (
                  <p>Cập nhật lúc: N/A</p>
                )}
                <Link to="/dashboard" style={{ marginTop: "20px" }}>
                  <div className="add-tran-button">
                    <KeyboardArrowLeftOutlinedIcon />
                    Quay lại{" "}
                  </div>
                </Link>
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

export default TranDetails;
