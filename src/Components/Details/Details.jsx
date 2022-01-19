import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import useStyles from './Styles.js';
import { Place } from '@material-ui/icons';
import './bStyles.css'
import TravelExploreIcon from '@material-ui/icons/Public';
import Tripadvisor from '@material-ui/icons/Flight'

const Details = ({location, refProp, selectd}) => {
  const styles = useStyles();
  if(!location.photo) return(<div></div>)
  if(selectd) refProp?.current?.scrollIntoView({behavior: "smooth", block:"start"})
  return (
    <Card elevation={10} style={{borderRadius: 20}}>
      <CardMedia
      style={{height: 350}}
      image={location?.photo ? location.photo.images.large.url : 'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/9/2/8/5/235829-6-eng-GB/Feed-Test-SIC-Feed-20142_news_large.jpg'}
      title={location.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>{location.name}</Typography>
        <Box
          display = 'flex' 
          justifyContent='space-between'>
          <Rating name="read-only" value={Number(location.rating)} readOnly />
          <Typography gutterBottom variant='subtitle1'> Out of {location.num_reviews} reviews</Typography>
        </Box>           
        <Box
         display = 'flex' 
         justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{location.price_level}</Typography>
        </Box>        
        <Box
         display = 'flex' 
         justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking </Typography>
          <Typography gutterBottom variant='subtitle1'>{location.ranking}</Typography>
        </Box>
          {location?.awards?.slice(0, 3).map((award, i) => (
            <Box key={i} my={1}display='flex' 
            justifyContent='space-between'>
              <img src={award.images.small} alt={award.display_name}/>
             <Typography variant='subtitle2' color='textSecondary'>
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {location?.cuisine?.map(({name})=>(
          <Chip key={name} size='small' label={name} className={styles.chip}/>
        ))
        }

      </CardContent>
      <div className='multi-button'>
        <button className='ActionButton' size='small' color ='primary' onClick={
          ()=>window.open(`tel:${location.phone}`, '_self')
        }>
          <PhoneIcon/>
        </button>        
        <button size='small' color ='primary' onClick={
          ()=>window.open(`http://maps.google.com/?q=${location.address}`, '_blank')
        }>
          <LocationOnIcon/>
        </button>        
        <button  size='small' color ='primary' onClick={
          ()=>window.open(location.web_url, '_blank')
        }>
          <Tripadvisor/>
        </button>        
        <button className='ActionButtonRight' size='small' color ='primary' onClick={
          ()=>window.open(location.website, '_blank')
        }>
          <TravelExploreIcon/>
        </button>
      </div>
    </Card>
  )
}

export default Details
