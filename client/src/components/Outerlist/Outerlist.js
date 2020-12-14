import React from "react";
import "./outerlist.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 675,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Outerlist({ title, location, upVote, downVote, id }) {
  const classes = useStyles();

  return (
    <div className="a">
      <div className="aa">
        <Card className={classes.root}>
          <Link className="link-1" to={`/feed/${id}`}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {location}
              </Typography>
              <Typography variant="body2" component="p">
                No of Likes: {upVote} ---- No of Dislikes : {downVote}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}

export default Outerlist;
