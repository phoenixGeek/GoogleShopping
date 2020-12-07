import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './mapContainer.scss';

export class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedPlace: {
                name: 'China'
            },
            center: {},
            places: ['art_gallery', 'bicycle_store', 'book_store', 'clothing_store', 'convenience_store', 'department_store', 'drugstore', 'electronics_store', 'jewelry_store', 'home_goods_store', 'hardware_store', 'shop', 'shopping_mall', 'store', 'supermarket']
        }
        this.fetchPlaces = this.fetchPlaces.bind(this)
    }

    fetchPlaces(mapProps, map) {

        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);
        const infoWindow = new this.props.google.maps.InfoWindow();

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                this.setState({
                    center: {
                        lat: pos.lat,
                        lng: pos.lng
                    }
                })

                infoWindow.setPosition(pos);

                service.nearbySearch(
                    { location: pos, radius: 5000, type: "store" },
                    (results, status) => {
                        if (status !== "OK") return;
                        createMarkers(results, map);

                    }
                );
                infoWindow.setContent('"Location found."');
                infoWindow.open(map);
                map.setCenter(pos);
            });

        function createMarkers(places, map) {

            const bounds = new google.maps.LatLngBounds();

            for (let i = 0, place; (place = places[i]); i++) {
                const image = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25),
                };
                new google.maps.Marker({
                    map,
                    icon: image,
                    title: place.name,
                    position: place.geometry.location,
                });

                bounds.extend(place.geometry.location);
            }
            // map.setMapTypeId(google.maps.MapTypeId.HYBRID);
            map.fitBounds(bounds);
        }
    }

    render() {

        return (
            <Map google={this.props.google} zoom={8} className="map-container" onReady={this.fetchPlaces}>
                <Marker onClick={this.onMarkerClick} name={'Current location'} position={this.state.center} />
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyB0xw4tDGGBK7HsVjrMwqCQULfcxkdQEAU')
})(MapContainer)