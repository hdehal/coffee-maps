import React, { Component } from 'react';
import { Map, CircleMarker, TileLayer, Tooltip, AttributionControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from "./mapData"

/* Adapted from https://github.com/afzalsayed96/bubbles-map by Afzal Sayed  */
/* Map tiles proudly from Stamen Design in San Francisco https://stamen.com/maps/ */
/* Additional help from http://leaflet-extras.github.io/leaflet-providers/preview/ */

class CoffeeMap extends Component {

    render() {

        return (
            <div>
                <Map
                    style={{ height: "480px", width: "100%", opacity: "0.9" }}
                    zoom={8}
                    maxZoom={20}
                    center={[37.5970132, -122.5310677]}
                    attributionControl={false}>
                    <TileLayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                        attribution="Map by <a href='http://stamen.com' target='_blank'>Stamen Design</a> | &copy; <a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> contributors"
                    />
                    {/* <TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png"
                        attribution="Map by <a href='https://wikimediafoundation.org/wiki/Maps_Terms_of_Use' target='_blank'>Wikimedia</a> | &copy; <a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> contributors"
                    /> */}

                    <AttributionControl position="bottomright" prefix={false} />

                    {data.city.map((city, k) => {
                        return (
                            <CircleMarker
                                key={k}
                                center={[city["coordinates"][1], city["coordinates"][0]]}
                                radius={20 * Math.log(city["population"] / 10000000)}
                                fillOpacity={0.5}
                                stroke={false}>
                                <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                                    {/* Fix Unexpected string concatenation of literals  no-useless-concat error */}
                                    {/* <span>{city["name"] + ": " + "Population" + " " + city["population"]}</span> */}
                                    <span>`${city["name"] | "Population" | city["population"]}`</span>
                                </Tooltip>
                            </CircleMarker>)
                    })
                    }
                </Map>
            </div>
        );
    }
}

export default CoffeeMap;