import React, { Component } from 'react';
import { Map, Marker, TileLayer, Tooltip, AttributionControl } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import "react-leaflet-markercluster/dist/styles.min.css";

// Leaflet custom marker
const myIcon = new L.Icon({
    // Coffee bean attribution -- Thanks! https://commons.wikimedia.org/wiki/File:Coffee_bean_symbol.svg
    iconUrl: require('../bean.svg'),
    iconSize: new L.Point(25, 25),
    className: 'leaflet-bean-icon'
});

class CoffeeMap extends Component {

    // Initial state
    constructor(props) {
        super(props);

        this.state = {
            dataMaps: []
        }
    }

    render() {
        return (
            <div>
                <Map
                    style={{ height: "89vh", width: "100%" }}
                    zoom={9}
                    maxZoom={20}
                    center={[37.6, -122.5]}
                    attributionControl={false}>
                    <TileLayer url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                        attribution="&copy; <a href='https://stadiamaps.com/'>Stadia Maps</a>, &copy; and <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors"
                    />

                    <AttributionControl position="bottomright" prefix={false} />

                    <MarkerClusterGroup
                        spiderfyDistanceMultiplier={1}
                        showCoverageOnHover={false}
                        maxClusterRadius={35}
                    >
                        {this.props.dataMapsProp.filter(x => { return x.coordinates; }).map((dataItem, k) => {
                            let { city, coordinates, roaster, url } = dataItem;
                            return (
                                <Marker onClick={() => { window.open(url) }}
                                    icon={myIcon}
                                    key={k}
                                    center={[coordinates[0], coordinates[1]]}
                                    position={[coordinates[0], coordinates[1]]}
                                >
                                    <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                                        <span><a href={url}>{roaster}</a></span>
                                        <span>{city}, CA</span>
                                    </Tooltip>
                                </Marker>);
                        })}
                    </MarkerClusterGroup>
                </Map>
            </div>
        );
    }
}

export default CoffeeMap;