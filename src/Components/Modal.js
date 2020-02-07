import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Typography } from "@material-ui/core/";
import Rating from "@material-ui/lab/Rating";
import { useSpring, animated } from "react-spring/web.cjs";

import { useContextState, useContextDispatch } from "../Store";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: "60vh",
  },
  cardMedia: {
    height: 160,
    width: 100,
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SimpleModal() {
  const classes = useStyles();
  const dispatch = useContextDispatch();
  const { handleModal, fullMovie } = useContextState();

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
        open={handleModal}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={handleModal}>
          <div className={classes.paper}>
            <Typography variant="h5">{fullMovie.Title}</Typography>
            <br />
            <br />
            <Rating
              name="read-only"
              value={fullMovie.imdbRating}
              max={10}
              readOnly
            />
            <Typography variant="h6">Genre: {fullMovie.Genre}</Typography>
            <Typography variant="h6">Released: {fullMovie.Released}</Typography>
            <Typography variant="h6">Awards: {fullMovie.Awards}</Typography>
            <br />
            <Typography variant="body1">Plot: {fullMovie.Plot}</Typography>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
