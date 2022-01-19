import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './Components/Header/Header';
import List from './Components/List/List';
import Map from './Components/Map/Map';
import {getLocationData} from './ApiControl'
const App = () =>{
  const [locations, setLocations] = useState([]);
  const [childClicked, setChildClicked] = useState(null)
  const [coords, setCoords] = useState()
  const [boundries, setBoundries] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      //console.log(position.coords.latitude)
      setCoords({lat: position.coords.latitude, lng: position.coords.longitude})
    })
  }, [])

  useEffect(() => {
    const filteredLocations = locations.filter((location) => location?.rating > rating)
    setFilteredPlaces(filteredLocations);
  }, [rating])

  useEffect(() => {
    if(boundries.sw && boundries.ne) {
    setIsLoading(true)
    getLocationData(type, boundries.sw, boundries.ne).then((data) =>{
        setLocations(data?.filter((location) => location.name && location.num_reviews > 0));
        setFilteredPlaces([])
        setIsLoading(false)
      })
    }
  }, [type, boundries])

  return(
  <>
    <CssBaseline/>
    <Header setCoords = {setCoords}/>
    <Grid container spacing={0} style={{width: '100%'}}>
      <Grid item xs={12} md={5}>
        <List
        locations = {filteredPlaces.length ? filteredPlaces : locations}
        childClicked = {childClicked}
        isLoading = {isLoading}
        type={type}
        setType={setType}
        rating={rating}
        setRating={setRating}
        />
      </Grid>      
      <Grid item xs={12} md={7} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Map
         setCoords = {setCoords}
         setBoundries = {setBoundries}
         coords = {coords}
         locations = {filteredPlaces.length ? filteredPlaces : locations}
         setChildClicked = {setChildClicked}
        />
      </Grid>
    </Grid>
  </>
  )
}



export default App