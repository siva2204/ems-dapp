import React from 'react'
import './Homestyle.css'
import logo from './abcd.jpg'
import img_a from './image1.png'
import img_b from './image2.jpg'
import img_c from './image3.jpg'
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      maxWidth:'100%',
      height:300,
      paddingTop: '5%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));

function Home (){

    const classes = useStyles();

    return(
        
        <div className="a">
          
          <div className="aa">
              <div className="aaa">
              
                <img src={logo} className="log"></img>
              
              </div>
          </div>

          <div className="ab">

                        
              <span>Election Proctor</span>          
              

          </div>

          <div className="abbb">

                        
              <span>Of, By And For the People</span>          


          </div>

          <hr></hr>

          <div className="ac">
 
             <div className="aca">

              <Card className="details">

                <CardMedia
                   image= {img_a} className={classes.media} />

          <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Our mission is to have a decentralized portal so that any person from any nook and corner can post any instance of cheating and unfair election, happening across any place here so that it gets a world wide reach. The posts are completely safe and cannot be tampered since its been implemented with blockchain which is decentralized
        </Typography>
      </CardContent>

              </Card>

              <div className="movingd">

                            
              <span>Decentralized</span>          
              
                     
              </div>

              </div>

              <div className="acb">

              <div className="movingd">

                           
              <span>Privacy</span>          
              
                     
              </div>
              
              
              <Card className="details" style={{marginLeft: '15vw'}}>

                <CardMedia
                   image= {img_b} className={classes.media} />

          <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Our vision is to become an proctor portal through which people around the world get to know about any unfair happenings around the elctions. The data of the person is completely private that even we dont know the detail of the person posted, thanks to blockchain technology
        </Typography>
      </CardContent>

              </Card>

              </div>

              <div className="acc" >


              <Card className="details">

                <CardMedia
                   image= {img_c} className={classes.media} />

          <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Our focus is to Have free and fair elections for people across the globe, and let people share the unfair practises they witness without any fear.
        </Typography>
      </CardContent>

              </Card>

              <div className="movingd">

                          
              <span>Free And Fair</span>          
              
                     
              </div>

              </div> 

          </div>

        </div>
    );
};

export default Home;