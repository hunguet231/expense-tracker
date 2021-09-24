import React, { useEffect, useState } from "react";
import Transaction from "../Transaction/Transaction";
import Spinner from "../Spinner/Spinner";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import "./TransactionList.css";
import { useDispatch, useSelector } from "react-redux";
import { listTransactions } from "../../actions/transactionActions";
import Alert from "@material-ui/lab/Alert";
import SortIcon from "@material-ui/icons/Sort";
import AddTranForm from "../AddTranForm/AddTranForm";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

function TransactionList(props) {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const transactionList = useSelector((state) => state.transactionList);

  const { transactions, loading, error } = transactionList;

  const { transactionEdit } = useSelector((state) => state.transactionUpdate);

  // check if user logged in
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (!userInfo) {
      props.history.push("/login");
    } else {
      dispatch(listTransactions(userInfo.user.UID));
    }
  }, [dispatch, props.history, userInfo, transactionEdit]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangeOpenRef = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="wrapper">
      <div className="transaction-list">
        <div className="top">
          <div className="heading">
            <ListAltOutlinedIcon />
            <h3> Tất cả giao dịch</h3>
          </div>
          <div className="filter">
            <div className="d-flex-r">
              <span>Sắp xếp theo </span>
            </div>
            <div className="filter-list">
              <FormControl>
                <Select
                  variant="filled"
                  displayEmpty
                  value={sort}
                  onChange={handleChange}
                >
                  <MenuItem value="">Mặc định</MenuItem>
                  <MenuItem value="max">SL (cao xuống thấp)</MenuItem>
                  <MenuItem value="min">SL (thấp lên cao)</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="add-tran-button" onClick={handleClick}>
            Thêm GD
          </div>
        </div>
        {!loading && transactions ? (
          <>
            {transactions.length === 0 ? (
              <div className="empty">
                <img src="/empty.svg" alt="" />
                <div className="text-empty">Bạn không có giao dịch nào!</div>
              </div>
            ) : (
              <>
                {transactions.map((tran) => (
                  <Transaction key={tran.TID} transaction={tran} {...props} />
                ))}
              </>
            )}
          </>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Spinner />
        )}
        {userInfo && (
          <AddTranForm
            openRef={open}
            handleChangeOpenRef={handleChangeOpenRef}
            userId={userInfo.user.UID}
          />
        )}
      </div>
    </div>
  );
}

export default TransactionList;
