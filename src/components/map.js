import React, { Component } from 'react';
import { BingProvider } from 'leaflet-geosearch';
import Papa from 'papaparse';
import myDataset from '../coffee_roasters_list.csv';
import { Map, CircleMarker, TileLayer, Tooltip, AttributionControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import "react-leaflet-markercluster/dist/styles.min.css";

// Provider for leaflet-geosearch plugin
const provider = new BingProvider({
    params: {
        key: process.env.REACT_APP_BING_MAPS_API_KEY
    },
});

class CoffeeMap extends Component {

    // Initial state
    constructor(props) {
        super(props);

        this.state = {
            dataMaps: []
        }
    }

    componentDidMount() {
        var self = this;
        Papa.parse(myDataset, {
            download: true,
            header: true,
            delimiter: ',',
            complete: async function (papaResult) {
                for (let index in papaResult.data) {
                    let city = papaResult.data[index].city;
                    console.log(city);

                    try {
                        let providerResult = await provider.search({ query: city + ', CA, United States' });
                        papaResult.data[index].coordinates = [providerResult[0].y, providerResult[0].x];
                        self.setState({ dataMaps: papaResult.data });
                    }
                    catch (e) {
                        console.log(e);
                    }
                }

                console.log(papaResult.data);
            }
        });
    }

    render() {

        /* console.log(this.state.dataMaps)
        console.log(this.state.dataMaps[1]) */

        if (this.state.dataMaps === null) {
            return null; //Or some other replacement component or markup
        }

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

                    <MarkerClusterGroup
                        spiderfyDistanceMultiplier={1}
                        showCoverageOnHover={false}
                        maxClusterRadius={35}
                    >
                        {this.state.dataMaps.filter(x => { return x.coordinates; }).map((dataItem, k) => {
                            let { city, coordinates, roaster, url } = dataItem;
                            return (
                                <CircleMarker onClick={() => { window.open(url) }}
                                    key={k}
                                    center={[coordinates[0], coordinates[1]]}
                                    position={[coordinates[0], coordinates[1]]}
                                >
                                    <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                                        <span><a href={url}>{roaster}</a></span>
                                        <span>{city}</span>
                                    </Tooltip>
                                </CircleMarker>);
                        })}
                    </MarkerClusterGroup>

                </Map>
            </div>
        );
    }
}

export default CoffeeMap;