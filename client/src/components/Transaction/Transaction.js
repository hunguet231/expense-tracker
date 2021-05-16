import React from "react";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import "./Transaction.css";
import { IconButton, Tooltip } from "@material-ui/core";

function Transaction({ transaction }) {
  const { amount, type, title, description, modifiedDate } = transaction;
  return (
    <div className="transaction">
      <div className="info">
        <p className="title">{transaction.title}</p>
        <div className="description">{description}</div>
        <div className="date">
          <ScheduleOutlinedIcon />
          <p>{modifiedDate}</p>
        </div>
      </div>
      <div className="amount">
        {type == "Expense" ? (
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
        <Tooltip title="Sửa đổi">
          <IconButton size="small">
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xoá">
          <IconButton size="small">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default Transaction;
