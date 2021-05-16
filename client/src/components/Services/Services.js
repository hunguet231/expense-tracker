import { Grid } from "@material-ui/core";
import React from "react";
import "./Services.css";

function Services() {
  return (
    <div className="wrapper">
      <div className="services">
        <h2 className="text-center">Vì sao chọn ETracker?</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <div className="box">
              <img src="/service-1.svg" alt="" />
              <h3>Dễ quản lý</h3>
              <div className="sub-title">
                Dễ dàng quản lý các giao dịch trong giây lát.
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="box">
              <img src="/service-2.svg" alt="" />
              <h3>Trực quan</h3>
              <div className="sub-title">
                Minh hoạ trực quan, giao diện thân thiện với người dùng.
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="box">
              <img src="/service-3.svg" alt="" />
              <h3>Tiện ích khác</h3>
              <div className="sub-title">
                Đi kèm các tiện ích khác như: Xem lịch, tin tức,...
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Services;
