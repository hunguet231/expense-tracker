import React from "react";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { DateTime } from "luxon";
import "./Transaction.css";
import { IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Confirm } from "react-st-modal";
import { useDispatch } from "react-redux";
import {
  deleteTransaction,
  listTransactions,
} from "../../actions/transactionActions";

function Transaction({ transaction, match }) {
  const { TID, amount, type, title, description, createdDate, TRANUID } =
    transaction;

  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteTransaction(TID));

    swal({
      title: "Đã xoá",
      icon: "success",
    });

    await dispatch(listTransactions(TRANUID));
  };

  const handleClickDelete = async () => {
    const isConfirm = await Confirm("Bạn có chắc chắn muốn xoá?");

    if (isConfirm) {
      handleDelete();
    }
  };

  return (
    <div className="transaction">
      <div className="info">
        <p className="title">{title}</p>
        <div className="description">{description}</div>
        <div className="date">
          <ScheduleOutlinedIcon />
          <p>
            {DateTime.fromISO(createdDate).toLocaleString(
              DateTime.DATETIME_MED
            )}
          </p>
        </div>
      </div>
      <div className="amount">
        {type === "Expense" ? (
          <p className="expense">
            -{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ₫
          </p>
        ) : (
          <p className="income">
            +{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ₫
          </p>
        )}
      </div>
      <div className="action">
        <Tooltip title="Chi tiết">
          <Link to={`/transactions/${TID}/view`}>
            <IconButton size="small">
              <VisibilityIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Sửa đổi">
          <Link to={`/transactions/${TID}/edit`}>
            <IconButton size="small">
              <EditOutlinedIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Xoá">
          <IconButton size="small" onClick={handleClickDelete}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default Transaction;
