import axios from "axios";

// /** 
export const getLocationData = async (type, sw, ne) => {
  try {
    const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
      }
    });
    //console.log(data)
    return data
    
  } catch (error) {
    console.log(error)
  }
}
// */
 /** 
export const getLocationData = async (sw, ne) => {
  try {
    const {data} = await axios.get('https://run.mocky.io/v3/30a1a695-62bf-4dfc-acda-8f7a23aeaf64', {

    });
    console.log(data)
    return data
    
  } catch (error) {
    console.log(error)
  }
}

 */
