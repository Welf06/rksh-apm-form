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
	height: "30rem",
   marginBottom: "2rem",
};

const center = {
	lat: 12.9716,
	lng: 77.5946,
};

const libraries = ["places"];

const Map = ({ setLocation }) => {
	const [map, setMap] = useState(null);
	const [markers, setMarkers] = useState(null);
	const [currentLocation, setCurrentLocation] = useState(null);
	const [searchBox, setSearchBox] = useState(null);
	// console.log(markers);
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
		if (markers) clearMarkers();
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
		if (markers) clearMarkers();
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

	const clearMarkers = () => {
		markers.forEach((marker) => marker.setMap(null));
		setMarkers([]);
	};

	return (
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
					onClick={handleMapClick}
				>
					{markers && (
						<Marker
							className="map-icon"
							key={markers[0].getPosition().toString()}
							position={markers[0].getPosition()}
						/>
					)}
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
