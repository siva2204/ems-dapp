import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth:400
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        marginTop:20,
        fontSize:20
    },
});


function Outerlist() {

    const classes = useStyles();

    return (

        <div className="a">

            <div className="aa">

                <Card className={classes.root}>
                        <CardContent>                   
                        <Typography variant="h5" component="h2">
                            Title -- ascsacdsv fbfdvsdvjh vbvjdvjksdnvjks bfeunbjkn jdf vurejbd  jdf  kjfnb dj kjdfnf 
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Date: 13/12/20
                        </Typography>
                        <Typography variant="body2" component="p">
                            <span> <ThumbUpIcon className="asd"></ThumbUpIcon> <p>15</p></span>

                            <span> <ThumbDownIcon className="asd"></ThumbDownIcon> <p>20</p> </span> 
                        </Typography>
                        </CardContent>
                </Card>

            </div>

        </div>

    );
}

export default Outerlist;
