import React, { Component } from 'react';
import { Map, CircleMarker, TileLayer, Tooltip, AttributionControl } from "react-leaflet";
import { BingProvider } from 'leaflet-geosearch';
import "leaflet/dist/leaflet.css";
// import data from "./mapData"
import Papa from 'papaparse';
import myDataset from '../coffee_roasters_list.csv';

// Provider for leaflet-geosearch plugin
const provider = new BingProvider({
    params: {
        key: process.env.REACT_APP_BING_MAPS_API_KEY
    },
});

// Convert "City, State" or "ZIP" to lat/long coordinates using leaflet-geosearch plugin 
provider
    .search({ query: 'Los Angeles' })
    .then(function (result) {
        // Result should look like this for Los Angeles:
        // 34.0536909,-118.2427666
        console.log(result[0].y + ',' + result[0].x);
    });

Papa.parse(myDataset, {
    download: true,
    header: true,
    delimiter: ',',
    complete: function (results) {
        for (let index in results.data) {
            let city = results.data[index].city;
            console.log(city);
            try {
                let result = provider.search({ query: city });
                if (result && result.length > 0) {
                    console.log(result[0].y + ',' + result[0].x);
                    // results.data[index].coordinates = [result[0].y, result[0].x];
                }
            }
            catch (e) {
                console.log(e);
            }
        }

        console.log(results.data);
        console.log(results.data[0].city);
    }
});

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


                </Map>
            </div>
        );
    }
}

export default CoffeeMap;