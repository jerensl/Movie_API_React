import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Typography,
  InputBase,
  Grid,
  CssBaseline,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import { useContextDispatch } from "../Store";

const useStyles = makeStyles(theme => ({
  formSubmit: {
    margin: "10px",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "inherit",
    backgroundColor: "rgba(255, 255, 255, .2)",
    width: "300px",
    borderRadius: "12px",
  },
  iconButton: {
    padding: 10,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const dispatch = useContextDispatch();

  return (
    <AppBar position="static">
      <Grid container direction="row" justify="center" alignItems="center">
        <CssBaseline />
        <Grid item>
          <Typography className={classes.title} variant="h6" noWrap>
            Find your Favorite Movie
          </Typography>
        </Grid>
        <Grid item>
          <form
            className={classes.formSubmit}
            onSubmit={e => {
              e.preventDefault();
              dispatch({ type: "FETCH", payload: search });
            }}
          >
            <InputBase
              className={classes.input}
              required
              onChange={e => setSearch(e.target.value)}
              value={search}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </form>
        </Grid>
      </Grid>
    </AppBar>
  );
}
