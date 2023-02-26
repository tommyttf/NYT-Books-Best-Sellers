import {
  AppBar,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  TextFieldProps,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { NytApiKeyContext } from '../context/nytApiKey';
import { routes } from './route';
import { pathToTitle } from '../utils';
import { MenuBook } from '@mui/icons-material';

export const TopBar = () => {
  const { setApiKey } = useContext(NytApiKeyContext);
  const apiKeyInputRef = useRef<TextFieldProps>(null);

  const setKey = () => {
    if (
      typeof apiKeyInputRef.current?.value === 'string' &&
      apiKeyInputRef.current.value !== ''
    ) {
      setApiKey(apiKeyInputRef.current.value);
    }
  };

  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          columns={{ md: 12 }}
        >
          <Grid item xs={6}>
            <Typography>
              <IconButton onClick={toggleSlider}>
                <MenuIcon />
              </IconButton>

              <MenuBook
                style={{ verticalAlign: 'middle', marginRight: '0.2em' }}
              />
              <Link to="/" style={{ color: '#000' }}>
                NYT Books Best Sellers
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Grid container justifyContent="end" alignItems="center">
              <Grid item>
                <TextField
                  type="text"
                  variant="standard"
                  label="api-key"
                  inputRef={apiKeyInputRef}
                />
              </Grid>

              <Grid item>
                <Button
                  style={{ color: '#ffffff', backgroundColor: '#000066' }}
                  onClick={setKey}
                >
                  Set Api Key
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Drawer open={open} anchor="left" onClose={toggleSlider}>
          <Box component="div">
            <List>
              {routes
                .filter(({ path }) => path !== undefined && path !== '*')
                .map(({ path }) => (
                  <ListItem key={path}>
                    <Link to={path!} style={{ color: '#000' }}>
                      {pathToTitle(path!)}
                    </Link>
                  </ListItem>
                ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
