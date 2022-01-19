import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './Styles.js';

const Map = ({coords, setBoundries, setCoords, locations, setChildClicked}) => {
  const styles = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');
  //const temp_coordinates = {lat: 26.271193, lng: -80.270607};
  
  return (
    <div className={styles.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter = {coords}
        center = {coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange = {(e) => {
          //console.log(e)
          setCoords({lat: e.center.lat, lng: e.center.lng})
          setBoundries({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
        }}
        onChildClick={(child) => setChildClicked(child)}
        >

          {locations?.map((location, i) =>(
            <div 
              className={styles.markerContainer}
              lat = {Number(location.latitude)}
              lng = {Number(location.longitude)}
              key={i}
            >
              {
                !isDesktop ? (
                  <LocationOnOutlinedIcon color='primary' fontSize='large'/>

                ):(
                  location.photo ?
                  (
                  <Paper elevation={3} className= {styles.paper}>
                    <Typography 
                    className={styles.typography}
                    variant='subtitle2'
                    gutterBottom
                    >
                      {location.name}
                    </Typography>
                    <img
                      className= {styles.pointer}
                      src={location?.photo ? location.photo.images.large.url : 'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/9/2/8/5/235829-6-eng-GB/Feed-Test-SIC-Feed-20142_news_large.jpg'}    
                      alt={location.name}           
                    />
                    <Rating name="read-only" size="small" value={Number(location.rating)} readOnly />

                  </Paper>):
                  <div></div>
                )
              }

            </div>
          ))}


      </GoogleMapReact>
    </div>
  )
}

export default Map
