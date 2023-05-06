import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
const CountUp = dynamic(() => import('react-countup'), { ssr: false })

import {
   GoogleMap,
   LoadScript,
   StandaloneSearchBox,
   Marker,
} from "@react-google-maps/api";

import styles from "@/styles/Apm.module.css";
import formstyles from "@/styles/Form.module.css"
import getAllDocuments from "../../firebase/firestore/getAllDocuments";
import Head from 'next/head'

const containerStyle = {
   width: "100%",
   height: "inherit",
};

const center = {
   lat: 12.9716,
   lng: 77.5946,
};

const libraries = ["places"];

export default function ApmMap() {
   const [map, setMap] = useState(null);
   const [markers, setMarkers] = useState(null);
   const [currentLocation, setCurrentLocation] = useState(null);
   const [searchBox, setSearchBox] = useState(null);
   const [count, setCount] = useState(0);

   useEffect(() => {
      const geolocation = navigator.geolocation;

      if (geolocation) {
         geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
               lat: position.coords.latitude,
               lng: position.coords.longitude,
            });
         });
      }
   }, []);

   const onLoad = async (map) => {
      const data = await getAllDocuments();
      setMap(map);
      const locationArray = data.map((item) => {
         return item.location;
      });
      console.log(locationArray);
      // const newMarkers = locationArray.forEach((location) => {
      //    new window.google.maps.Marker({
      //       position: location,
      //       map,
      //    });
      // });
      setCount(locationArray.length - 1);
      setMarkers(locationArray);
   };

   const onPlacesChanged = () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) return;

      const bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
         if (!place.geometry) return;
         if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
         } else {
            bounds.extend(place.geometry.location);
         }
      });
      map.fitBounds(bounds);
   };

   const searchBoxOptions = {
      bounds: map && map.getBounds(),
   };

   const clearMarkers = () => {
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);
   };
   return (
      <>
         <Head>
            <title>APM Requests</title>
            <meta name="description" content="APM Signal Request" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <div className={`${formstyles.heading} ${styles.marginTop}`}>APM Signal Requests</div>
            <div>
               {count > 0 && (
                  <div className={styles.count}>
                     <CountUp start={1} end={count} delay={0}>
                        {({ countUpRef }) => (
                           <div>
                              <span className={styles.countNumber} ref={countUpRef}></span>
                              {/* <span className={styles.countNumber}>+</span> */}
                     <span className={styles.countText}> Signal Requests </span>
                           </div>
                        )}
                     </CountUp>
                   

                  </div>)
               }
            </div>
            <div className={styles.mapContainer}>
               <LoadScript
                  googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                  libraries={libraries}
               >
                  <div style={{ height: "100%", width: "100%" }}>
                     <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={currentLocation || center}
                        zoom={12}
                        onLoad={onLoad}
                        className={styles.mapContainer}
                     >
                        {markers && markers.map((location, index) => (
                           <Marker
                              key={index}
                              position={location}
                              icon={{
                                 url: '/images/ApmLogo.png',
                                 scaledSize: new window.google.maps.Size(40, 40), // Adjust the size of the icon as per your requirement
                              }}
                           />
                        ))}
                        <StandaloneSearchBox
                           onLoad={(searchBox) => setSearchBox(searchBox)}
                           onPlacesChanged={onPlacesChanged}
                           options={searchBoxOptions}
                        >
                           <input
                              placeholder="Search for a place"
                              className={formstyles.mapSearchBox}
                           />
                        </StandaloneSearchBox>
                     </GoogleMap>
                  </div>
               </LoadScript>
            </div>
         </main>
      </>
   );
}