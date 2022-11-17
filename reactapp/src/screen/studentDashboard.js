import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { checkUser, logout } from "../config/firebaseMethods";
import MyQuiz from "./studentDashboardScreens/myQuizzes";
import MyProfile from "./studentDashboardScreens/myProfile";
import MyResult from "./studentDashboardScreens/myResult";
import MyCourses from "./studentDashboardScreens/myCourses";
import Heading from "../components/Heading";
import StudentForm from "./studentDashboardScreens/studentForm";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const StudentDashboard = (props) => {
  const drawerWidth = 200;
  // const [userId, setUserId]= useState("")
  const [isUser, setIsUser] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);

  useEffect(() => {
    checkUser()
      .then((res) => {
        console.log(res);
        if (params.id === res) {
          console.log("same");
          setIsUser(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLogOut = ()=>{
    logout()

    .then((res)=>{console.log(res)
    navigate("/login")
    })
    .catch((err)=>{console.log(err)});
  }
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [selectedCategory,setSelectedCategory]=useState("")
  const { userId } = props;
  //   console.log(userId)
  const sideBarArr = [
    {
      label: "Quizzes",
      // route: `/adminDashboard/${userId}/usersRecord`,
      route: "myQuizzes",
    },
    {
      label: "Courses",
      route: "myCourses",
    },
    {
      label: "Result",
      route: "myResult",
    },
    {
      label: "My Profile",
      route: "myProfile",
    },
    {
      label: "Student Form",
      route: "studentForm",
    },
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {sideBarArr.map((value, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText
                primary={value.label}
                onClick={() => {
                  navigate(value.route);
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // const classes = useStyles();
  return (
    <>
      {/* <ThemeProvider
           theme={zIndexTheme}
           > */}

      <Box
      //  className={classes.root}
      >
        <CssBaseline />

        {/* <ThemeProvider theme={zIndexTheme}> */}
        <AppBar
          component="nav"
          position="fixed"
          // zIndex=2000
          // className={classes.appBar}
          style={{ zIndex: 1251, backgroundColor: "#292826" }}
          sx={{
            // width: { sm: `calc(100% - ${drawerWidth}px)` },
            width: "100vw",
            ml: { sm: `${drawerWidth}px` },

            flexGrow: 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                // mr: 2,
                display: { sm: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Heading
                title="My Dashboard"
                variant="h6"
                color="#E2F0F9"
                fontFamily="comfortaa"
              />
            </Box>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{handleClose(); userLogOut();}}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        {/* </ThemeProvider> */}

        <Box
          component="nav"
          sx={{
            border: 2,
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          {/* <ThemeProvider theme={zIndexTheme}> */}

          <Drawer
            variant="permanent"
            // className={classes.drawer}
            // style={{ zIndex: 1250 }}
            // className={classes.drawer}
            sx={{
              // marginTop:5,
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
          {/* </ThemeProvider> */}
        </Box>
        <Box
          component="main"
          sx={{
            // backgroundColor:"pink"
          }}
        >
          <Routes>
            <Route path="myQuizzes" element={<MyQuiz />} />
            <Route path="myProfile" element={<MyProfile />} />
            <Route path="myResult" element={<MyResult />} />
            <Route path="myCourses" element={<MyCourses />} />
            <Route path="studentForm" element={<StudentForm />} />
          </Routes>
        </Box>
      </Box>
      {/* </ThemeProvider> */}

    </>
  );
};
StudentDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

//   return (
//     <>
//   {
//       isUser?<StudentDashboard
//       userId={params.id}

//       />: null
//     }
//     </>
//   )

export default StudentDashboard;
