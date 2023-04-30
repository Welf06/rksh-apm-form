import React, { useState, useEffect } from "react";
import {
	GoogleMap,
	LoadScript,
	StandaloneSearchBox,
	Marker,
} from "@react-google-maps/api";
import styles from "@/styles/Form.module.css";

const containerStyle = {
	width: "100%",
	height: "inherit",
};

const center = {
	lat: 37.7749,
	lng: -122.4194,
};

const Map = ({ setLocation }) => {
	const [map, setMap] = useState(null);
	const [markers, setMarkers] = useState([]);
	const [currentLocation, setCurrentLocation] = useState(null);
	const [searchBox, setSearchBox] = useState(null);
	console.log(markers);
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

	const onLoad = (map) => {
		setMap(map);
	};

	const onPlacesChanged = () => {
		const places = searchBox.getPlaces();

		if (places.length === 0) return;

		const bounds = new window.google.maps.LatLngBounds();
		const newMarkers = [];

		places.forEach((place) => {
			if (!place.geometry) return;

			newMarkers.push(
				new window.google.maps.Marker({
					position: place.geometry.location,
					map,
				})
			);

			if (place.geometry.viewport) {
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		setLocation({
			lat: places[0].geometry.location.lat(),
			lng: places[0].geometry.location.lng(),
		});
		setMarkers(newMarkers);
		map.fitBounds(bounds);
	};

	const searchBoxOptions = {
		bounds: map && map.getBounds(),
	};
	const handleMapClick = (e) => {
		const newMarker = new window.google.maps.Marker({
			position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
			map,
		});
		setMarkers([newMarker]);
		setLocation({
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		});
	};
	return (
		<LoadScript
			googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
			libraries={["places"]}
		>
			<div style={{ height: "100%", width: "100%" }}>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={currentLocation || center}
					zoom={12}
					onLoad={onLoad}
					className={styles.mapContainer}
					onClick={handleMapClick}
				>
					{markers.map((marker) => (
                  console.log(markers),
						<Marker
							key={marker.getPosition().toString()}
							position={marker.getPosition()}
						/>
					))}
					<StandaloneSearchBox
						onLoad={(searchBox) => setSearchBox(searchBox)}
						onPlacesChanged={onPlacesChanged}
						options={searchBoxOptions}
					>
						<input
							placeholder="Search for a place"
							className={styles.mapSearchBox}
						/>
					</StandaloneSearchBox>
				</GoogleMap>
			</div>
		</LoadScript>
	);
};

export default Map;