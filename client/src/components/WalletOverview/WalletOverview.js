import React from "react";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import "./WalletOverview.css";
import { IconButton } from "@material-ui/core";

function WalletOverview() {
  const balance = 20000;
  return (
    <div className="wrapper">
      <div className="wallet-wrapper">
        <div className="wallet-inner">
          <img src="/wallet.svg" alt="wallet" />
          <div className="wallet-info">
            <h3>Ví của tôi</h3>
            <p>
              Số dư:{" "}
              <span>
                {" "}
                {balance
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ{" "}
              </span>
            </p>
          </div>
        </div>
        <div className="wallet-setting">
          <IconButton size="small">
            <SettingsOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default WalletOverview;
