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

Papa.parse(myDataset, {
    download: true,
    header: true,
    delimiter: ',',
    complete: async function (results) {
        for (let index in results.data) {
            let city = results.data[index].city;
            console.log(city);
            try {
                let result = await provider.search({ query: city + ', CA, United States' })
                    .then(result => results.data[index].coordinates = [result[0].y, result[0].x]);
            }
            catch (e) {
                console.log(e);
            }
        }

        console.log(results.data);

    }
});

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

                    {results.data.map((dataItem, k) => {
                        let { coordinates, company, url, loc } = dataItem;
                        return (
                            <CircleMarker onClick={() => { window.open(url) }}
                                key={k}
                                center={[coordinates[0], coordinates[1]]}
                                position={[coordinates[0], coordinates[1]]}
                            >
                                <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                                    <span><a href={url}>{company}</a></span>
                                    <span>{loc}</span>
                                </Tooltip>
                            </CircleMarker>);
                    })}

                </Map>
            </div>
        );
    }
}

export default CoffeeMap;