import React, {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './Styles'

export const Header = ({setCoords}) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);
  const onLoad = (autoC)=> setAutocomplete(autoC);
   
  const onPlaceChanged = () =>{
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoords({lat, lng});
  }

  return (
    <AppBar style={{ backgroundColor: 'black' }} position='static'>
      <Toolbar className = {classes.toolbar}>
        <Typography variant='h5' className = {classes.title}>
          Travel Guide App
        </Typography>
        <Box display='flex'>
          {/* <Typography variant='h6' className = {classes.title}>
            Explore!
          </Typography> */}
          {/* <Autocomplete> */}
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
              placeholder='Search '
              style={{ color: 'white' }}
              classes={
                {root: classes.inputRoot, 
                root: classes.inputInput
                }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default Header
