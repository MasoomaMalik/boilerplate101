import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ThemeProvider } from "@mui/material";
import Heading from "../components/Heading";
import { getCategory, loginUser } from "../config/firebaseMethods";
import { Link, useNavigate } from "react-router-dom";
import MyInput from "../components/myInput";
import MyColorTheme from "../components/myColorTheme";
import MyButton from "../components/myButton";

const Login = () => {
  const [model, setModel] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const navigate = useNavigate();

  //login func
  const login = (e) => {
    e.preventDefault();
    setLoader(true);
    loginUser(model)
      .then((success) => {
        console.log(success.category);
        setLoader(false);
        switch (success.category) {
          case "admin": {
            console.log("admin");
            navigate(`/adminDashboard/${success.id}`);
            break;
          }

          case "user": {
            console.log("user");
            navigate(`/userScreen/${success.id}`);
            break;
          }
          default: {
            console.log("none");
            break;
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  //password reset
const resetUserPassword=()=>{

const auth = getAuth();
sendPasswordResetEmail(auth, "masoomamalik389@gmail.com")
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}


  const fillModel = (key, value) => {
    model[key] = value;
    console.log(model);
    setModel({ ...model });
  };

  return (
    <>
      <form onSubmit={login}>
        <Grid
          container
          sx={{
            backgroundColor: "#E2F0F9",
            width: "100vw",
            height: "100%",
            minHeight: "100vh",
            display: "flex",
            paddingX: 5,
            paddingY: 2,
            justifyContent: "center",
          }}
        >
          <Grid
            item
            md={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Heading
              title="Login"
              variant="h4"
              color="#292826"
              fontFamily="comfortaa"
            />
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <MyInput
              focused
              size={"large"}
              color={"secondary"}
              label={"Enter Email Address"}
              variant={"filled"}
              onChange={(e) => {
                fillModel("email", e.target.value);
              }}
            />
          </Grid>

          <Grid
            item
            md={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <MyInput
              focused
              size={"large"}
              color={"secondary"}
              label={"Enter Password"}
              type="password"
              variant={"filled"}
              onChange={(e) => {
                fillModel("password", e.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <MyButton
              width={225}
              height={50}
              variant="contained"
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              label="Login"
            />
            ;
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            sx={{
              margin: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography>Forgot Password? <Link to="/passwordreset"> Click Here</Link></Typography>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Login;
