import React, {useState} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "../../node_modules/@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from '@material-ui/core/styles';
import AppDrawer from "./AppDrawer.component";
import {AuthConsumer} from "../auth/AuthContext";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function DefaultAppBar(props) {
  const { classes } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>Goals</Typography>
            <AuthConsumer>
              {({logout}) => <Button color="inherit" onClick={logout}>Log out</Button>}
            </AuthConsumer>
          </Toolbar>
        </AppBar>
      </div>
      <AppDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </div>
  );
}

export default withStyles(styles)(DefaultAppBar);