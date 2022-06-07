import React, {useCallback, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { useAuth } from "./contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { signInGoogle, currentUser, signout } = useAuth();
  const [auth, setAuth] = useState(currentUser);

  const navigate = useNavigate();

  const handleGoogle = useCallback(async (event) => {
    event.preventDefault();
    await signInGoogle();
    navigate('/');
  });

  const logout = () => {
    signout();
  };

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ background: '#141623' }}>
        <Toolbar>
          <Link href='/' style={{ textDecoration: 'none' }}>
            <Typography variant="h4" component="div" sx={{ ml: 10, color: 'white' }}>
              DropTables
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {auth && (
            <div>
              <Button
                variant='contained'
                onClick={logout}
                sx={{ mr: 5, backgroundColor: '#00966b', fontWeight: 'bold' }}
              >
                Logout
              </Button>
            </div>
          )}
          {!auth && (
            <div>
              <Box component='form' noValidate>
                <GoogleLoginButton
                  onClick={handleGoogle}
                  style={{ width: 250 }}
                />
              </Box>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}