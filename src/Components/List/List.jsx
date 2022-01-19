import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import Details from '../Details/Details';
import useStyles from './Styles.js';
import { Place } from '@material-ui/icons';

const List = ({locations, childClicked, isLoading, type, setType, rating, setRating}) => {

  const styles = useStyles();
  //console.log(childClicked);
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(locations?.length).fill().map((_,i) =>elRefs[i] || createRef());

    setElRefs(refs);
  }, [locations])
  return (
    <div className={styles.container}>
      <Typography variant='h5'>
        Restraunts, Hotels, and Attractions near search
      </Typography>
      {isLoading? (
        <div className={styles.loading}>
          <CircularProgress
            size='5rem'
          />
        </div>
      ):(
        <> 
      <FormControl className={styles.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value = 'restaurants'>Restaurants</MenuItem>
          <MenuItem value = 'hotels'>Hotels</MenuItem>
          <MenuItem value = 'attractions'>Attractions</MenuItem>
        </Select>
      </FormControl>      
      <FormControl className={styles.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value = {0}>All</MenuItem>
          <MenuItem value = {3}>Above 3.0</MenuItem>
          <MenuItem value = {4}>Above 4.0</MenuItem>
          <MenuItem value = {4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={styles.list}>
        {locations?.map((location, i)=> (
          <Grid ref = {elRefs[i]} item key={i} xs={12}>
            <Details 

            location = {location}
            selectd = {Number(childClicked) === i}
            refProp = {elRefs[i]}
            />
          </Grid>
        ))}
      </Grid>
      
      
      </>
      )}
    </div>
  )
}

export default List
