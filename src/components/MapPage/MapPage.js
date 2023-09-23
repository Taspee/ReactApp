// MapPage

import React, { Component, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Box, Container, CssBaseline, Paper, Stack, styled} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import SpinnerOfDoom from "../HomePage/SpinnerOfDoom";
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => (
    <div
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: 'red',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {text}
    </div>
  );
  
const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

const AnyReactComponent = ({ text }) => <div style={{
  width: '20px',
  height: '20px',
  backgroundColor: 'red',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}}>{text}</div>;

export default function SimpleMap(){
  const [inputValue, setInputValue] = useState("");
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };
  const _onClick = ({x, y, lat, lng, event}) => console.log(x, y, lat, lng, event)
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Actualiza el estado con el valor del campo de entrada
  };
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [markerCoordinates, setMarkerCoordinates] = useState({ lat: 0, lng: 0 });
  const searchPlace = async (placeName, apiKey) => {
    try {
      // Make a request to the Google Maps Geocoding API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          placeName
        )}&key=${apiKey}`
      );
  
      if (!response.ok) {
        throw new Error('Error fetching data from Google Maps API');
      }
  
      const data = await response.json();
  
      if (data.status === 'OK' && data.results.length > 0) {
        // Extract latitude and longitude from the API response
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error('Place not found');
      }
    } catch (error) {
      console.error('Error while searching for place:', error);
      return null; // Handle the error in your component
    }
  };
  const handleSearch = async () => {
    const coordinates = await searchPlace(inputValue, 'AIzaSyAPyGOWZ1-ueNAFG34JbSGM_rJyubmNwtI');
    if (coordinates) {
      // Set the map center to the coordinates
      setMapCenter(coordinates);
      setMarkerCoordinates(coordinates);
    }
  };
  
  
  return (
    <div style={{ height: '100vh', width: '100%', marginTop:'85px' }}>
      <h1>Add Destination</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Escribe algo..."
      />
      <button onClick={handleSearch}>SEARCH</button>
      <GoogleMapReact
        center={mapCenter}
        bootstrapURLKeys={{ key: "AIzaSyAPyGOWZ1-ueNAFG34JbSGM_rJyubmNwtI" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onClick={_onClick} 
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <AnyReactComponent
          lat={markerCoordinates.lat}
          lng={markerCoordinates.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}