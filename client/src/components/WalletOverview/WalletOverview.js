import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTransactions } from "../../actions/transactionActions";
import Chart from "../Chart/Chart";
import "./WalletOverview.css";

function WalletOverview() {
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const { transactions } = useSelector((state) => state.transactionList);

  const expensTotal = () => {
    return transactions.reduce((total, currTran) => {
      return total + (currTran.type === "Expense" ? currTran.amount : 0);
    }, 0);
  };

  const incomeTotal = () => {
    return transactions.reduce((total, currTran) => {
      return total + (currTran.type === "Income" ? currTran.amount : 0);
    }, 0);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(listTransactions(userInfo.user.UID));
    }
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className="wallet-wrapper">
        <div className="wallet-inner">
          <div className="wallet-info">
            <div className="heading">
              <img src="/wallet.svg" alt="wallet" />
              <h2>Ví của tôi</h2>
            </div>
            {transactions && (
              <>
                <p className="balance">
                  Số dư:{" "}
                  {(incomeTotal() - expensTotal())
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  VNĐ
                </p>
                <div className="total-each">
                  <p>
                    Tổng chi:{" "}
                    <span>
                      {" "}
                      {expensTotal()
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      VNĐ{" "}
                    </span>
                  </p>
                  <p>
                    Tổng thu:{" "}
                    <span>
                      {" "}
                      {incomeTotal()
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      VNĐ{" "}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="wallet-chart">
          <Chart totalExpense={expensTotal()} totalIncome={incomeTotal()} />
        </div>
      </div>
    </div>
  );
}

export default WalletOverview;
