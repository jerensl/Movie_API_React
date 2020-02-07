import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Container,
  CssBaseline,
} from "@material-ui/core/";

import { useFetch } from "../Controllers/useFetch";
import { useContextState, useContextDispatch } from "../Store";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 10,
  },
  ContainerCard: {
    marginTop: "20",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    height: 350,
    width: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
  skeleton: {
    marginTop: "8px",
  },
  skeletonGrid: {
    marginTop: "20px",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  const { setMovie } = useContextState();
  const dispatch = useContextDispatch();
  const [movieArray] = useFetch(setMovie);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Container className={classes.ContainerCard} maxWidth="md">
          <Grid container spacing={7}>
            {movieArray.map(({ imdbID, Poster, Title, Year, Type }) => (
              <Grid item key={imdbID} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={Poster}
                    title={Title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6">
                      {Title}
                    </Typography>
                    <Typography variant="body2">Year: {Year}</Typography>
                    <Typography variant="body2">Category: {Type}</Typography>
                  </CardContent>
                  <Button
                    value={imdbID}
                    onClick={e =>
                      dispatch({
                        type: "GET_MOVIE_DETAIL",
                        payload: e.currentTarget.value,
                      })
                    }
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    View
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
}
