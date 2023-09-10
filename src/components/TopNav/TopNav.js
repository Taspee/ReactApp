import React, { useState } from "react";
import './TopNav.css';
import { Avatar, Box, Button, Container, Menu, MenuItem } from "@mui/material";
import { Rectangle } from "@mui/icons-material";

function TopNav(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Llama a la función de cierre de sesión proporcionada en las props
    props.onLogout();
    handleClose(); // Cierra el menú después de hacer clic en "Logout"
  };

  return (
    <Box className={"BoxNav"}>
      <Container sx={{ width: '100%', height: '85px', position: 'fixed', top: 0, left: 0 }}>
        <p className={"AppName"} style={{ textAlign: 'center', lineHeight: '85px' }}>Travel Log</p>
        <Button
          id="profile-button"
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ position: 'absolute', top: '16px', left: '16px' }}
        >
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" left={0} position={"absolute"} />
        </Button>

        <Menu
          id="profile-menu"
          spacing={2}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'profile-button',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          {/* Llama a handleLogout cuando se hace clic en "Logout" */}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        <Button
          onClick={handleLogout} // Llama a la función de cierre de sesión cuando se hace clic
          sx={{ position: 'absolute', top: '16px', right: '16px' }} // Ajusta la ubicación del botón
        >
          Cerrar Sesión
        </Button>
      </Container>
    </Box>
  );
}

export default TopNav;
