import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "../../node_modules/@material-ui/icons/Add";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import React from "react";

const styles = {
  list: {
    width: 250,
  },
};

function AppDrawer(props) {
  const {drawerOpen, setDrawerOpen, classes} = props;

  return (
    <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <div tabIndex={0} role="button" onClick={() => setDrawerOpen(false)} onKeyDown={() => setDrawerOpen(false)}>
        <div className={classes.list}>
          <List>
            <ListItem button onClick={() => {props.history.push(`/goals/new`)}}>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="Add new goal" />
            </ListItem>
          </List>
        </div>
      </div>
    </Drawer>
  );
}

export default withStyles(styles)(withRouter(AppDrawer));