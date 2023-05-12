import { ContractData, LoadingContainer } from "@drizzle/react-components";
import { DrizzleProvider } from "@drizzle/react-plugin";
import React, { Component } from "react";
import Logo from "./logo.jpg"
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Grid, Paper, Divider } from "@material-ui/core";
import {
  ReactPDF,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Spinner } from "react-bootstrap";
// reactstrap components
import {
  Button,
  ButtonToggle,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import './pdf.css';
import TableComponent from '../views/TableOwnedLands'

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
  },
});

const drizzleOptions = {
  contracts: [Land],
};

var verified;
var row = [];
var data = [];
var landData = [];
var count;
var currentAddress;



class OwnedLands extends Component {
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
      amount: 0,
      landData: [],
    };
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

      currentAddress = await web3.currentProvider.selectedAddress;
      console.log(currentAddress);
      this.setState({
        LandInstance: instance,
        web3: web3,
        account: accounts[0],
      });
      verified = await this.state.LandInstance.methods
        .isVerified(currentAddress)
        .call();
      console.log(verified);
      this.setState({ verified: verified });
      var registered = await this.state.LandInstance.methods
        .isBuyer(currentAddress)
        .call();
      console.log(registered);
      this.setState({ registered: registered });

      count = await this.state.LandInstance.methods.getLandsCount().call();
      count = parseInt(count);
      console.log(typeof count);
      console.log(count);

      for (var i = 0; i < count; i++) {
        var owner = await this.state.LandInstance.methods
          .getLandOwner(i + 1)
          .call();
        console.log(owner.toLowerCase());
        console.log(currentAddress);
        if (owner.toLowerCase() == currentAddress) {
          data = await this.state.LandInstance.methods.getLandDetails(i + 1).call();
          
          // data = await this.state.LandInstance.methods.getLandDetails(i + 1).call();
          
          this.setState({ landData: [...this.state.landData, data] });
        }
      }
      console.log(row);
      console.log(this.state.landData.length);
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
          <div>
            <h1>
              <Spinner animation="border" variant="primary" />
            </h1>
          </div>
        </div>
      );
    }

    if (!this.state.registered) {
      return (
        <div className="content">
          <div>
            <Row>
              <Col xs="6">
                <Card className="card-chart">
                  <CardBody>
                    <h1>You are not verified to view this page</h1>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      );
    }

    return (
      <>
        <div style={{ paddingTop: '200px' }}>
          <Grid item xs={12}>
            <Paper sx={{ mt: '200px' }}>
              <div className="card-sub">
                <h3>User Info</h3>
              </div>
              <Divider />
              <TableComponent data={this.state.landData} />
            </Paper>

          </Grid>
        </div>
      </>
    );
  }
}

export default OwnedLands;
