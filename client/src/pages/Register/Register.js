import {
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  MenuItem,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Register.css";
import Alert from "@material-ui/lab/Alert";
import { register } from "../../actions/userActions";

function Register({ location, history }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo, loading, error } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);

  const { loading: loadingRegister } = userRegister;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  // check if user logged in
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, userRegister, redirect]);

  // handle register
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      register(
        firstName,
        lastName,
        birthday,
        sex,
        address,
        balance,
        username,
        password
      )
    );

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
          <img className="login-img" src="/register.svg" alt="register" />{" "}
        </Grid>
        <Grid item xs={12} sm={6}>
          <h3 className="text-center">????ng k??</h3>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="name">
              <TextField
                type="text"
                variant="outlined"
                label="T??n"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
              />
              <TextField
                type="text"
                variant="outlined"
                label="H???"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
              />
            </div>
            <TextField
              id="date"
              label="Ng??y sinh"
              type="date"
              defaultValue="2001-01-23"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl component="fieldset">
              <small>Gi???i t??nh</small>
              <RadioGroup
                row
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <FormControlLabel
                  name="type"
                  value="Male"
                  control={<Radio color="primary" />}
                  label="Nam"
                />
                <FormControlLabel
                  name="type"
                  value="Female"
                  control={<Radio color="primary" />}
                  label="N???"
                />
                <FormControlLabel
                  name="type"
                  value="Other"
                  control={<Radio color="primary" />}
                  label="Kh??c"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              type="text"
              variant="outlined"
              label="?????a ch???"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
            <TextField
              type="number"
              variant="outlined"
              label="S??? d??"
              onChange={(e) => {
                setBalance(e.target.value);
              }}
              required
            />
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
              ????ng k??{" "}
              {loadingRegister && (
                <CircularProgress style={{ color: "#fff" }} size={15} />
              )}
            </button>
          </form>
          <br />
          <p className="text-sm text-center">
            B???n ???? c?? t??i kho???n?{" "}
            <Link style={{ color: "dodgerblue" }} to={"/login"}>
              ????ng nh???p ngay
            </Link>
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default Register;
