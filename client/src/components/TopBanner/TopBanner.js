import { Grid } from "@material-ui/core";
import React from "react";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import "./TopBanner.css";
import { Link } from "react-router-dom";

function TopBanner() {
  return (
    <div className="wrapper">
      <div className="top-banner">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img src="/top-banner.png" alt="top-banner" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <h1>ETracker - Hệ thống quản lý chi tiêu cá nhân</h1>
            <p className="sub-heading">
              ETracker là dịch vụ cho phép bạn quản lý các giao dịch chi tiêu
              hàng ngày, thống kê và mô tả trực quan. Từ đó bạn sẽ có kế hoạch
              tài chính cho riêng mình.
            </p>
            <Link to="/dashboard">
              <div className="button">
                <p>Thử ngay</p>
                <ArrowRightAltOutlinedIcon />
              </div>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default TopBanner;
