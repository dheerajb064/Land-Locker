import { ContractData, LoadingContainer } from "@drizzle/react-components";
import { DrizzleProvider } from "@drizzle/react-plugin";
import React, { Component } from "react";
import Logo from "./logo.jpg"
import Sumesh from "./Sumesh-Divakarannew.jpg"
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
var old_owner, new_owner;
var old_seller ,new_seller;

// const MyDoc = () => (
//   // old_owner=await this.state.LandInstance.methods.getPrevious(landid).call();
//   // new_owner=await this.state.LandInstance.methods.getLandOwner(landid).call();
//   // console.log({old_owner,new_owner});
//   // console.log("mydoc");
//     <Document>
//       <Page>
//         <Text>hi hello</Text>
//       </Page>
//     </Document>
// );

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
    };
  }

  MyDoc = () => {
    //this.downloadReciept(landid);
    // old_owner= this.state.LandInstance.methods.getPrevious(landid).call();
    // new_owner= this.state.LandInstance.methods.getLandOwner(landid).call();
    // console.log({old_owner,new_owner});
    // console.log("mydoc");
    return (
      <Document>
        <Page style={{borderColor:"orange", borderWidth:"5px", borderStyle:"solid"}}>
          <Image
            style={styles.image}
            src={Logo}
          /> 
          <Text style={{ fontSize: "20px",color:"blue", textAlign: "center" }}>
            {"\n\n"}Land Locker
          </Text>
          <Text style={{ fontSize: "15px",color:"green", textAlign: "center" }}>
           {"\n\n"}Transferred from:
            {/* The property has been transferred from {old_seller[0]}{"\n\n"}
            with ID {old_owner} to {new_seller[0]} with ID {new_owner} */}
            <Text style={{fontSize: "10px",color:"red"}}>
              {"\n\n"}Name: {old_seller[0]}
              {"\n\n"}Public Key: {old_owner}
            </Text>
          </Text>
          <Text style={{ fontSize: "15px", color:"green", textAlign: "center" }}>
           {"\n\n"}Transferred to:
            {/* The property has been transferred from {old_seller[0]}{"\n\n"}
            with ID {old_owner} to {new_seller[0]} with ID {new_owner} */}
            <Text style={{fontSize: "10px",color:"red"}}>
              {"\n\n"}Name: {new_seller[0]}
              {"\n\n"}Public Key: {new_owner}
            </Text>
          </Text>
        </Page>
      </Document>
    );
  };

  downloadReciept = (landid) => async () => {
    console.log("hello");
    // old_owner = await this.state.LandInstance.methods
    //   .getPrevious(landid)
    //   .call();
    // new_owner = await this.state.LandInstance.methods
    //   .getLandOwner(landid)
    //   .call();
    console.log({ old_owner, new_owner });
    //await ReactPDF.renderToStream(this.MyDoc(landid));
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

      const currentAddress = await web3.currentProvider.selectedAddress;
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

      var count = await this.state.LandInstance.methods.getLandsCount().call();
      count = parseInt(count);
      console.log(typeof count);
      console.log(count);
      //this.setState({count:count});

      var rowsArea = [];
      var rowsCity = [];
      var rowsState = [];
      var rowsPrice = [];
      var rowsPID = [];
      var rowsSurvey = [];
      var rowsIpfs = [];

      for (var i = 1; i < count + 1; i++) {
        rowsArea.push(
          <ContractData
            contract="Land"
            method="getArea"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
        rowsCity.push(
          <ContractData
            contract="Land"
            method="getCity"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
        rowsState.push(
          <ContractData
            contract="Land"
            method="getState"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
        rowsPrice.push(
          <ContractData
            contract="Land"
            method="getPrice"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
        rowsPID.push(
          <ContractData
            contract="Land"
            method="getPID"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
        rowsSurvey.push(
          <ContractData
            contract="Land"
            method="getSurveyNumber"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
      }

      for (var i = 0; i < count; i++) {
        var owner = await this.state.LandInstance.methods
          .getLandOwner(i + 1)
          .call();
        console.log(owner.toLowerCase());
        console.log(currentAddress);
        if (owner.toLowerCase() == currentAddress) {
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
          console.log(old_seller[0],new_seller[0]);
          row.push(
            <tr>
              <td>{i + 1}</td>
              <td>{rowsArea[i]}</td>
              <td>{rowsCity[i]}</td>
              <td>{rowsState[i]}</td>
              <td>{rowsPrice[i]}</td>
              <td>{rowsPID[i]}</td>
              <td>{rowsSurvey[i]}</td>
              <td>
                {/* <Button onClick={this.downloadReciept(i+1)} disabled={!verified || same } className="button-vote">
              Download
            </Button> */}
                <PDFDownloadLink
                  document={this.MyDoc()}
                  fileName="somename.pdf"
                >
                  {({ loading }) =>
                    loading ? (
                      <Button
                        disabled={!verified || same}
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
              </td>
            </tr>
          );
        }
      }
      console.log(row);
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
        <div className="content">
          <DrizzleProvider options={drizzleOptions}>
            <LoadingContainer>
              <Row>
                <Col lg="12" md="12">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Owned Lands</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Table className="tablesorter" responsive color="black">
                        <thead className="text-primary">
                          <tr>
                            <th>#</th>
                            <th>Area</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Price</th>
                            <th>Property PID</th>
                            <th>Survey Number</th>
                            <th>Reciept</th>
                          </tr>
                        </thead>
                        <tbody>{row}</tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </LoadingContainer>
          </DrizzleProvider>
        </div>
      </>
    );
  }
}

export default OwnedLands;
