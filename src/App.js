import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {},          // Shows the InfoWindow to the selected place upon a markers
    longitud: {},
    latitud: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  llamadaBackend(){

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request' })
    };

    fetch('http://localhost:9000/users/latitudGanado', requestOptions)
        .then(res => res.json())
        .then((data) => {
          this.setState({ latitud: data});
    });

    fetch('http://localhost:9000/users/longitudGanado', requestOptions)
        .then(res => res.json())
        .then((data) => {
          this.setState({ longitud: data});
    });
  }

  componentDidMount(){
    this.llamadaBackend();
  }

  render() {

    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        initialCenter={
          {
            lat: 42.16983474239765,
            lng: -8.68245011564502
          }
        }
      >
      <Marker
          onClick={this.onMarkerClick}
          title={'Gateway 1 LUADA - Rotonda'}
          name={'Gateway1'}
          position={{lat: 42.17242766052489, lng: -8.676862545159361}}
      />
      <Marker
          onClick={this.onMarkerClick}
          title={'Gateway 2 LUADA - Deportes'}
          name={'Gateway2'}
          position={{lat: 42.17284113386385, lng: -8.683870620349603}} 
      />
      <Marker
          onClick={this.onMarkerClick}
          title={'Gateway 3 LUADA - CITEXVI'}
          name={'Gateway3'}
          position={{lat: 42.16733853541521, lng: -8.682424371415232}} 
      />
      <Marker
          onClick={this.onMarkerClick}
          title={'Gateway 4 LUADA - Teleco'}
          name={'Gateway4'}
          position={{lat: 42.17054700488735, lng: -8.687827280440308}} 
      />
      <Marker
          onClick={this.onMarkerClick}
          title={'Última posición da peza de gando'}
          name={'GANDO001'}
          position={{lat: this.state.latitud.msg, lng: this.state.longitud.msg}}
          icon={{
            url: "https://i.ibb.co/tPR6ZwN/cow.png",
            //anchor: new google.maps.Point(5, 58),
            scaledSize:  new this.props.google.maps.Size(40,40)
          }}
      />
          
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            <h4>{this.state.latitud.msg}</h4>
            <h4>{this.state.longitud.msg}</h4>
          </div>
        </InfoWindow>  
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDls96qjhZ2UgqWq8H8xDSjfDKAjqhZPXM'
})(MapContainer);