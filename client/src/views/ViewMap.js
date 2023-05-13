import { ContractData, LoadingContainer } from "@drizzle/react-components";
import { DrizzleProvider } from "@drizzle/react-plugin";
import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
import { Spinner } from "react-bootstrap";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";
import Land from "../artifacts/Land.json";
import "../card.css";
import getWeb3 from "../getWeb3";
import "../index.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker.webp";
import { Icon, L } from "leaflet";
//import img from '../assets/img/marker.webp';
import "leaflet/dist/leaflet.css";
import img from "../assets/img/logo.jpg";
import Cardd from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Buttonn from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchField from "./SearchField"

const drizzleOptions = {
  contracts: [Land],
};

var verified;
var landTemp;
var ownerTemp;

const pos = [8.546681270365871, 76.90561508993028];
const position = [10.520700198490545, 77.66484554595232];

const markerIcon = new Icon({
  iconUrl: markerIconPng,
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});

class ViewMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      LandInstance: undefined,
      account: null,
      web3: null,
      flag: null,
      verified: "",
      registered: "",
      count: 0,
      id: "",
      landInfo:[],
      ownerInfo:[],
      currentAddr:null,
    };
  }


  requestLand = (seller_address, land_id) => async () => {

    console.log(seller_address);
    console.log(land_id);
    // this.setState({requested: true});
    // requested = true;
    await this.state.LandInstance.methods.requestLand(
      seller_address,
      land_id
    ).send({
      from: this.state.account,
      gas: 2100000
    }).then(response => {
      this.props.history.push("#");
    });

    //Reload
    window.location.reload(false);

  }

  componentDidMount = async () => {
    //For refreshing page only once
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }

    try {
      //Get network provider and web3 instance
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Land.networks[networkId];
      const instance = new web3.eth.Contract(
        Land.abi,
        deployedNetwork && deployedNetwork.address
      );

      const currentAddress = await web3.currentProvider.selectedAddress;
      console.log("currentAdddress: ", currentAddress);
      this.setState({
        LandInstance: instance,
        web3: web3,
        account: accounts[0],
        currentAddr:currentAddress,
      });

      verified = await this.state.LandInstance.methods
        .isVerified(currentAddress)
        .call();
      console.log(verified);
      this.setState({ verified: verified });
      var registered = await this.state.LandInstance.methods
        .isSeller(currentAddress)
        .call();
      console.log(registered);
      this.setState({ registered: registered });

      var count = await this.state.LandInstance.methods.getLandsCount().call();
      count = parseInt(count);
      //console.log(typeof count);
      console.log(count);
      //this.setState({count:count});
      for (var i = 1; i < count + 1; i++){
          landTemp= await this.state.LandInstance.methods.getLandDetails(i).call();
          this.setState({landInfo:[...this.state.landInfo,landTemp]});
          ownerTemp=await this.state.LandInstance.methods.getLandOwner(i).call();
          this.setState({ownerInfo:[...this.state.ownerInfo,ownerTemp]});
      }
      console.log(this.state.landInfo);
      console.log(this.state.ownerInfo,this.state.currentAddr);

 
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return (
        <div>
          <div className="">
            <img src={img} className="" />
            <div className="">
              <div className="">Land Locker</div>
            </div>
          </div>
          <div className="">
            <div className="">
              <div>
                <div>
                  <h1>
                    {/* <Spinner animation="border" variant="warning" /> */}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <MapContainer
        center={position}
        zoom={8}
        style={{
          width: "80vw",
          height: "80vh",
          marginTop: "100px",
          marginLeft: "300px",
        }}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=Y311psylXUqBwBy3QYh4"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        
        <SearchField/>
        {
        
        this.state.landInfo.map(element=>
        <Marker key={element[0]} position={new Array(element[5],element[6])} icon={markerIcon}>
          <Popup>
              <Cardd sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="land images"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Land
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price:  Rs:{element[4]}<br/>
                  Area:  {element[1]} sq.m
                </Typography>
              </CardContent>
              <CardActions>
                <Buttonn size="small" onClick={this.requestLand(this.state.ownerInfo[(element[0]-1)], element[0])} disabled={!verified || this.state.ownerInfo[(element[0]-1)] && this.state.ownerInfo[(element[0]-1)].toLowerCase()== this.state.currentAddr}>Buy</Buttonn>
                
              </CardActions>
            </Cardd>
          </Popup>
        </Marker>)}
      </MapContainer>
    );
  }
}

export default ViewMap;
