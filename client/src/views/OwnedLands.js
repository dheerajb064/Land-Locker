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
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 10
  },
});

const drizzleOptions = {
  contracts: [Land],
};

var verified;
var row = [];
var old_owner, new_owner;
var old_seller, new_seller;
var data = [];
var owners= [];
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
      ownerData :[] ,
    };
  }

  MyDoc = () => {
    return (
      <Document>
        <Page style={{ borderColor: "black", borderWidth: "7px", borderStyle: "solid" }}>
          <Image 
            style={styles.image}
            src={Logo}
          />
          <Text style={{ fontSize: "20px", color: "blue", textAlign: "center", marginTop:"5px" }}>
            {"\n\n"}Land Locker
          </Text>
          <Text style={{ fontSize: "12px", color: "black", textAlign: "center", marginTop:"2px" }}>
            {"\n\n"}Receipt generated on: {Date()}
          </Text>
          <Text style={{ fontSize: "15px", color: "green", textAlign: "left" ,marginLeft: "50"}}>
            {"\n\n"}Land Details:
            {/* The property has been transferred from {old_seller[0]}{"\n\n"}
            with ID {old_owner} to {new_seller[0]} with ID {new_owner} */}
            <Text style={{ fontSize: "10px", color: "black" }}>
              {"\n\n"}land_id: {data[0]}
              {"\n\n"}area: {data[1]}
              {"\n\n"}land price: {data[4]}
              {"\n\n"}latitude: {data[5]}
              {"\n\n"}longitude: {data[6]}
            </Text>
          </Text>
          <Text style={{ fontSize: "15px", color: "green", textAlign: "left" ,marginLeft: "50"}}>
            {"\n\n"}Transferred from:
            {/* The property has been transferred from {old_seller[0]}{"\n\n"}
            with ID {old_owner} to {new_seller[0]} with ID {new_owner} */}
            <Text style={{ fontSize: "10px", color: "black" }}>
              {"\n\n"}Name: {old_seller[0]}
              {"\n\n"}Age: {old_seller[1]}
              {"\n\n"}Aadhar number: {old_seller[2]}
              {"\n\n"}Public Key: {old_owner}
            </Text>
          </Text>
          <Text style={{ fontSize: "15px", color: "green", textAlign: "left" ,marginLeft: "50"}}>
            {"\n\n"}Transferred to:
            {/* The property has been transferred from {old_seller[0]}{"\n\n"}
            with ID {old_owner} to {new_seller[0]} with ID {new_owner} */}
            <Text style={{ fontSize: "10px", color: "black" }}>
              {"\n\n"}Name: {new_seller[0]}
              {"\n\n"}Age: {new_seller[1]}
              {"\n\n"}Aadhar number: {new_seller[2]}
              {"\n\n"}Public Key: {new_owner}
            </Text>
          </Text>
        </Page>
      </Document>
    );
  };

  downloadReciept = (landid) => async () => {
    console.log("hello");
    console.log({ old_owner, new_owner });
    this.setState({ amount: 500 });
    console.log(this.state.amount);
    console.log("Success");
  };

  viewImage = (landId) => {
    alert(landId);
    this.props.history.push({
      pathname: "/viewImage",
    });
  };

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

      // for (var i = 1; i < count + 1; i++) {
      //   rowsArea.push(
      //     <ContractData
      //       contract="Land"
      //       method="getArea"
      //       methodArgs={[
      //         i,
      //         { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
      //       ]}
      //     />
      //   );
      //   rowsCity.push(
      //     <ContractData
      //       contract="Land"
      //       method="getCity"
      //       methodArgs={[
      //         i,
      //         { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
      //       ]}
      //     />
      //   );
      //   rowsState.push(
      //     <ContractData
      //       contract="Land"
      //       method="getState"
      //       methodArgs={[
      //         i,
      //         { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
      //       ]}
      //     />
      //   );
      //   rowsPrice.push(
      //     <ContractData
      //       contract="Land"
      //       method="getPrice"
      //       methodArgs={[
      //         i,
      //         { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
      //       ]}
      //     />
      //   );
      //   rowsPID.push(
      //     <ContractData
      //       contract="Land"
      //       method="getPID"
      //       methodArgs={[
      //         i,
      //         { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
      //       ]}
      //     />
      //   );
      //   rowsSurvey.push(
      //     <ContractData
      //       contract="Land"
      //       method="getSurveyNumber"
      //       methodArgs={[
      //         i,
      //         { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
      //       ]}
      //     />
      //   );
      // }

      for (var i = 0; i < count; i++) {
        var owner = await this.state.LandInstance.methods
          .getLandOwner(i + 1)
          .call();
        console.log(owner.toLowerCase());
        console.log(currentAddress);
        if (owner.toLowerCase() == currentAddress) {
          data = await this.state.LandInstance.methods.getLandDetails(i + 1).call();
          var same = await this.state.LandInstance.methods.isSame(i + 1).call();
          old_owner = await this.state.LandInstance.methods
            .getPrevious(i + 1)
            .call();
          new_owner = await this.state.LandInstance.methods
            .getLandOwner(i + 1)
            .call();
          console.log({ old_owner, new_owner });
          old_seller = await this.state.LandInstance.methods
            .getSellerDetails(old_owner)
            .call();
          new_seller = await this.state.LandInstance.methods
            .getSellerDetails(new_owner)
            .call();
          console.log(old_seller[0], new_seller[0]);
          
          // getting ownership history
          var ownCount=await this.state.LandInstance.methods.getOwnerCount(i + 1).call();
          var row;
          for(var j=0;j<ownCount;j++)
          {
            row=await this.state.LandInstance.methods.getOwnerDetails(i+1,j).call();
            row=await this.state.LandInstance.methods.getSellerDetails(row).call();
            console.log(row);
            this.setState({ ownerData: [...this.state.ownerData , row] });
          }
          
          console.log(this.state.ownerData);

          data = await this.state.LandInstance.methods.getLandDetails(i + 1).call();
          // data[7] = <Button href="/Seller/history">
          //     View History
          // </Button>
          data[7] = <PDFDownloadLink
            document={this.MyDoc()}
            fileName="somename.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button
                  className="button-vote"
                >
                  Loading Document...
                </Button>
              ) : (
                <Button
                disabled={!verified || same}
                  className="button-vote"
                >
                  Download
                </Button>
              )
            }
          </PDFDownloadLink>
          this.setState({ landData: [...this.state.landData, data] });
          // row.push(
          //   <tr>
          //     <td>{i + 1}</td>
          //     <td>{rowsArea[i]}</td>
          //     <td>{rowsCity[i]}</td>
          //     <td>{rowsState[i]}</td>
          //     <td>{rowsPrice[i]}</td>
          //     <td>{rowsPID[i]}</td>
          //     <td>{rowsSurvey[i]}</td>
          //     <td>
          //       <PDFDownloadLink
          //         document={this.MyDoc()}
          //         fileName="somename.pdf"
          //       >
          //         {({ loading }) =>
          //           loading ? (
          //             <Button
          //               disabled={!verified || same}
          //               className="button-vote"
          //             >
          //               Loading Document...
          //             </Button>
          //           ) : (
          //             <Button
          //               disabled={!verified || same}
          //               className="button-vote"
          //             >
          //               Download
          //             </Button>
          //           )
          //         }
          //       </PDFDownloadLink>
          //     </td>
          //   </tr>
          // );
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
              <TableComponent historyData={this.state.ownerData} landData = {this.state.landData} />
            </Paper>

          </Grid>
        </div>
      </>
    );
  }
}

export default OwnedLands;
