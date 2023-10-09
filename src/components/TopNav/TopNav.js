import React, { useState } from "react";
import './TopNav.css';
import { Avatar, Box, Button, Container, Menu, MenuItem } from "@mui/material";
import { Rectangle } from "@mui/icons-material";

function TopNav(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedImage, setSelectedImage] = useState(null);
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
  const handlePicture = () => {
    const port = 3000;
    const apiUrl = `http://localhost:${port}/api/v1/upload-photo`;
  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        video.srcObject = stream;

        video.onloadedmetadata = function (e) {
          video.play();

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageDataURL = canvas.toDataURL('image/jpeg'); 
          video.pause();
          stream.getTracks().forEach((track) => track.stop());

          setSelectedImage(imageDataURL);
        };
      })
      .catch(function (err) {
        console.error('Error al acceder a la cámara:', err);
      });
  } else {
    console.error('El navegador no admite la captura de imágenes desde la cámara.');
  }
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
          <Avatar alt="Travis Howard" src={selectedImage || "/static/images/avatar/2.jpg"} left={0} position={"absolute"} />
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
          <MenuItem onClick={handlePicture}>Change Profile Picture</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        <Button
          onClick={handleLogout} 
          sx={{ position: 'absolute', top: '16px', right: '16px' }} 
        >
          Cerrar Sesión
        </Button>
      </Container>
    </Box>
  );
}

export default TopNav;
