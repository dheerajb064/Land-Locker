import { ContractData, LoadingContainer } from "@drizzle/react-components";
import { DrizzleProvider } from "@drizzle/react-plugin";
import React, { Component } from "react";
import {
  ReactPDF,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
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
import getWeb3 from "../getWeb3";

const drizzleOptions = {
  contracts: [Land],
};

var verified;
var row = [];
var old_owner, new_owner,owner;
var old_seller, new_seller;
var area,pid,price;

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
        <Page>
          <Text style={{ fontSize: "20px", textAlign: "center" }}>
            {"\n\n"}Land Locker
          </Text>
          <Text style={{ textAlign: "center" }}>
            The property has been transferred from {old_owner} to {new_seller[0]}.
          </Text>
          <Text style={{fontSize: "15px"}}>Land details</Text>
          {/* <Text>Land Area: {area}</Text> */}
          {/* <Text>{pid}</Text> */}
          {/* <Text>Price : {price}</Text> */}
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
          //await this.state.LandInstance.methods.getArea(i).call()
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
          //await this.state.LandInstance.methods.getPrice(i).call()
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
        owner = await this.state.LandInstance.methods
          .getLandOwner(i + 1)
          .call();
        console.log(owner.toLowerCase());
        console.log(currentAddress);
        old_owner = await this.state.LandInstance.methods
          .getPrevious(i + 1)
          .call();
        new_owner = owner;
        // old_seller = await this.state.LandInstance.methods
        //   .getSellerDetails(old_owner)
        //   .call();
        new_seller = await this.state.LandInstance.methods
          .getSellerDetails(owner)
          .call();
          console.log(old_seller, new_seller);
        if (owner.toLowerCase() == currentAddress) {
          var same = await this.state.LandInstance.methods.isSame(i + 1).call();
          area=rowsArea[i];
          pid=rowsPID[i];
          price=rowsPrice[i];
          console.log(area);
          console.log({ old_owner, owner });
          // old_seller = await this.state.LandInstance.methods
          //   .getSellerDetails(old_owner)
          //   .call();
          // new_seller = await this.state.LandInstance.methods
          //   .getSellerDetails(owner)
          //   .call();
          //console.log(old_seller, new_seller);
          // this.setState({ amount: 500 });
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
                        disabled={!verified }
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
          console.log("loop", row.length);
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
    console.log("hey1");
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
    // if (!this.state.amount) console.log("hey2");
    //if(row.length!=0)
    console.log("length", row.length);
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

    //return <h1>abh</h1>
  }
}

export default OwnedLands;
