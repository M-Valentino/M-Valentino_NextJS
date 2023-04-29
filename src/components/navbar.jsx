import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";


function NavBar() {



  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Link href="/home"><Button color="inherit">Home</Button></Link>
        <Button color="inherit">Projects</Button>
        <Link href="/portfolio"><Button color="inherit">Portfolio</Button></Link>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
