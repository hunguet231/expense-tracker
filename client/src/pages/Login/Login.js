import {
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import Alert from "@material-ui/lab/Alert";
import { login } from "../../actions/userActions";

function Login({ location, history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error } = userLogin;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  // check if user logged in
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const userInfo = userLogin.userInfo;
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userLogin, redirect]);

  // store in sessionStorage to show toaster
  sessionStorage.setItem("loginMsg", "1");

  // handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(username, password));

    // store in sessionStorage to show toaster
    sessionStorage.setItem("loginMsg", "1");
  };

  const handlePaswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className="login-left">
          <p className="slogan text-center">
            ETracker - Qu???n l?? chi ti??u c?? nh??n
          </p>
          <img className="login-img" src="/login.svg" alt="login" />{" "}
        </Grid>
        <Grid item xs={12} sm={6}>
          <h3 className="text-center">????ng nh???p</h3>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              autoComplete="username"
              label="T??n t??i kho???n"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon style={{ color: "gray" }} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                M???t kh???u
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlinedIcon style={{ color: "gray" }} />
                  </InputAdornment>
                }
                onChange={handlePaswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <Link
              to="/forgot-password"
              className="text-sm"
              style={{ marginTop: "8px", textDecoration: "underline" }}
            >
              B???n qu??n m???t kh???u?
            </Link>

            <button type="submit" className="submit-btn">
              ????ng nh???p{" "}
              {loading && (
                <CircularProgress style={{ color: "#fff" }} size={15} />
              )}
            </button>
          </form>
          <br />
          <p className="text-sm text-center">
            B???n ch??a c?? t??i kho???n?{" "}
            <Link
              style={{ color: "dodgerblue" }}
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              ????ng k??
            </Link>
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
