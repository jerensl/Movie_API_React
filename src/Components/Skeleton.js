import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core/";

const useStyles = makeStyles(() => ({
  ContainerCard: {
    marginTop: "20",
  },
  skeleton: {
    marginTop: "8px",
  },
  skeletonGrid: {
    marginTop: "20px",
  },
}));

export default function SkeletonItem() {
  const classes = useStyles();
  const skeletonCard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <Container className={classes.ContainerCard} maxWidth="md">
        <Grid container spacing={7}>
          {skeletonCard.map(skeletonCard => (
            <Grid
              item
              className={classes.skeletonGrid}
              key={skeletonCard}
              xs={12}
              sm={6}
              md={4}
            >
              <Skeleton variant="rect" width={261} height={350} />
              <Skeleton
                variant="text"
                width="65%"
                height="6%"
                className={classes.skeleton}
              />
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" width="35%" />
              <Skeleton variant="text" width="100%" height="10%" />
            </Grid>
          ))}
        </Grid>
      </Container>
      )
    </div>
  );
}
