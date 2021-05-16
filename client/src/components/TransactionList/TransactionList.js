import React from "react";
import Transaction from "../Transaction/Transaction";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import "./TransactionList.css";

function TransactionList() {
  const transactions = [
    {
      id: 1,
      title: "ASD",
      amount: 1000,
      type: "Expense",
      description: "okok",
      modifiedDate: "20/4/2021",
    },
    {
      id: 2,
      title: "TERTER",
      amount: 35000,
      type: "Income",
      description: "okok",
      modifiedDate: "20/4/2021",
    },
    {
      id: 3,
      title: "QWE",
      amount: 380000,
      type: "Income",
      description: "okok",
      modifiedDate: "20/4/2021",
    },
    {
      id: 4,
      title: "NB",
      amount: 12000,
      type: "Expense",
      description: "okok",
      modifiedDate: "20/4/2021",
    },
    {
      id: 5,
      title: "KHFGJ",
      amount: 1000,
      type: "Expense",
      description: "okok",
      modifiedDate: "20/4/2021",
    },
  ];
  return (
    <div className="wrapper">
      <div className="transaction-list">
        <div className="top">
          <div className="heading">
            <ListAltOutlinedIcon />
            <h3> Tất cả giao dịch</h3>
          </div>
          <div className="add-tran-button">Thêm GD</div>
        </div>
        {transactions.map((tran) => (
          <Transaction key={tran.id} transaction={tran} />
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
