import {
  ContractData, LoadingContainer
} from '@drizzle/react-components';
import { DrizzleProvider } from '@drizzle/react-plugin';
import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
// reactstrap components
import {
  Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table
} from "reactstrap";
import Land from "../artifacts/Land.json";
import "../card.css";
import getWeb3 from "../getWeb3";
import { Grid } from '@mui/material';
import { Container, Paper, Divider } from '@mui/material';
import "../index.css";




const drizzleOptions = {
  contracts: [Land]
}


var verified;
var row = [];
var countarr = [];
var userarr = [];
var reqsarr = [];

class SDash extends Component {
  constructor(props) {
    super(props)

    this.state = {
      LandInstance: undefined,
      account: null,
      web3: null,
      flag: null,
      verified: '',
      registered: '',
      count: 0,
      id: '',
    }
  }

  viewImage = (landId) => {
    alert(landId);
    this.props.history.push({
      pathname: '/viewImage',
    })
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
      window.location = window.location + '#loaded';
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
        deployedNetwork && deployedNetwork.address,
      );

      const currentAddress = await web3.currentProvider.selectedAddress;
      console.log('currentAdddress: ', currentAddress);
      this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });
      verified = await this.state.LandInstance.methods.isVerified(currentAddress).call();
      console.log(verified);
      this.setState({ verified: verified });
      var registered = await this.state.LandInstance.methods.isSeller(currentAddress).call();
      console.log(registered);
      this.setState({ registered: registered });

      var count = await this.state.LandInstance.methods.getLandsCount().call();
      count = parseInt(count);
      console.log(typeof (count));
      console.log(count);
      //this.setState({count:count});

      countarr.push(<ContractData contract="Land" method="getLandsCount" />);
      userarr.push(<ContractData contract="Land" method="getBuyersCount" />);
      reqsarr.push(<ContractData contract="Land" method="getRequestsCount" />);

      var rowsArea = [];
      var rowsCity = [];
      var rowsState = [];
      var rowsPrice = [];
      var rowsPID = [];
      var rowsSurvey = [];
      var dict = {}
      for (var i = 1; i < count + 1; i++) {
        var address = await this.state.LandInstance.methods.getLandOwner(i).call();
        dict[i] = address;
      }

      // console.log('dict', dict);
      // var succ=await this.state.LandInstance.methods.getSuccessor(currentAddress).call();
      // console.log("Successor :- ",succ);


      for (var i = 1; i < count + 1; i++) {
        rowsArea.push(<ContractData contract="Land" method="getArea" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        //rowsCity.push(<ContractData contract="Land" method="getCity" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsState.push(<ContractData contract="Land" method="getState" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsPrice.push(<ContractData contract="Land" method="getPrice" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsPID.push(<ContractData contract="Land" method="getPID" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsSurvey.push(<ContractData contract="Land" method="getSurveyNumber" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);

      }


      for (var i = 0; i < count; i++) {
        var requested = await this.state.LandInstance.methods.isRequested(i + 1).call();
        row.push(<tr><td>{i + 1}</td><td>{rowsArea[i]}</td><td>{rowsState[i]}</td><td>{rowsPrice[i]}</td><td>{rowsPID[i]}</td><td>{rowsSurvey[i]}</td>
          <td>
            <Button onClick={this.requestLand(dict[i + 1], i + 1)} disabled={!verified || requested || dict[i + 1].toLowerCase() == currentAddress} className="button-vote">
              Request Land
            </Button>
          </td>
        </tr>)

      }
      console.log(row);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
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
                    <h1>
                      You are not verified to view this page
                    </h1>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

        </div>
      );
    }


    return (
      // <>
      //   <div className="content">
      //     <DrizzleProvider options={drizzleOptions}>
      //       <LoadingContainer>
      //         <div className="main-section">
      //           <Row>
      //             <Col lg="4">
      //               <div class="dashbord ">
      //                 <div class="icon-section">
      //                   <i class="fa fa-users" aria-hidden="true"></i><br />
      //                   <medium>Total Buyers</medium><br />
      //                   <p> {userarr} </p>
      //                 </div>
      //                 <div class="detail-section"><br />
      //                 </div>
      //               </div>
      //             </Col>
      //             <Col lg="4">
      //               <div class="dashbord">
      //                 <div class="icon-section">
      //                   <i class="fa fa-landmark" aria-hidden="true"></i><br />
      //                   <medium>Registered Lands Count</medium><br />
      //                   <p>{countarr}</p>
      //                 </div>
      //                 <div class="detail-section"><br />
      //                 </div>
      //               </div>
      //             </Col>
      //             <Col lg="4">
      //               <div class="dashbord">
      //                 <div class="icon-section">
      //                   <i class="fa fa-bell" aria-hidden="true"></i><br />
      //                   <medium>Total Requests</medium><br />
      //                   <p>{reqsarr}</p>
      //                 </div>
      //                 <div class="detail-section">
      //                   <br />
      //                 </div>
      //               </div>
      //             </Col>
      //           </Row>
      //         </div>
      //       </LoadingContainer>
      //     </DrizzleProvider>
      //     <Row>
      //       <Col lg="4">
      //         <Card>
      //           <CardHeader>
      //             <h5 className="title">Wish to Add Land !</h5>
      //           </CardHeader>
      //           <CardBody>
      //             <div className="chart-area">

      //               <Button href="/Seller/AddLand" disabled={!this.state.verified} className="btn-fill" color="primary">
      //                 Add Land
      //               </Button>
      //             </div>
      //           </CardBody>
      //         </Card>
      //       </Col>
      //       <Col lg="4">
      //         <Card>
      //           <CardHeader>
      //             <h5 className="title">Profile</h5>
      //           </CardHeader>
      //           <CardBody>
      //             <div className="chart-area">

      //               <Button href="/seller/sellerProfile" className="btn-fill" color="primary">
      //                 View Profile
      //               </Button>
      //             </div>
      //           </CardBody>
      //         </Card>
      //       </Col>
      //       <Col lg="4">
      //         <Card>
      //           <CardHeader>
      //             <h5 className="title">Requests</h5>
      //           </CardHeader>
      //           <CardBody>
      //             <div className="chart-area">

      //               <Button href="/Seller/ApproveRequest" disabled={!this.state.verified} className="btn-fill" color="primary">
      //                 View all Land Requests
      //               </Button>
      //             </div>
      //           </CardBody>
      //         </Card>
      //       </Col>
      //       <Col lg="4">
      //         <div className='card-specific'>
      //           <Card>
      //             <CardHeader>
      //               <h5 className="title">Make Payments for Approved Land Requests</h5>
      //             </CardHeader>
      //             <CardBody>
      //               <div className="chart-area">

      //                 <Button href="/admin/MakePayment" className="btn-fill" disabled={!this.state.verified} color="primary">
      //                   Make Payment
      //                 </Button>
      //               </div>
      //             </CardBody>
      //           </Card>
      //         </div>
      //       </Col>
      //       <Col lg="4">
      //         <div className='card-specific'>
      //           <Card>
      //             <CardHeader>
      //               <h5 className="title">Owned Lands</h5>
      //             </CardHeader>
      //             <CardBody>
      //               <div className="chart-area">

      //                 <Button href="/admin/OwnedLands" className="btn-fill" color="primary">
      //                   View Your Lands
      //                 </Button>
      //               </div>
      //             </CardBody>
      //           </Card>
      //         </div>
      //       </Col>
      //       <Col lg="4">
      //         <div className='card-specific'>
      //           <Card>
      //             <CardHeader>
      //               <h5 className="title">View on Map</h5>
      //             </CardHeader>
      //             <CardBody>
      //               <div className="chart-area">

      //                 <Button href="/Seller/ViewMap" className="btn-fill" color="primary">
      //                   View Map
      //                 </Button>
      //               </div>
      //             </CardBody>
      //           </Card>
      //         </div>
      //       </Col>
      //     </Row>

      //     <DrizzleProvider options={drizzleOptions}>
      //       <LoadingContainer>
      //         <Row>
      //           <Col lg="12" md="12">
      //             <Card>
      //               <CardHeader>
      //                 <CardTitle tag="h4">Lands Info
      //                 </CardTitle>
      //               </CardHeader>
      //               <CardBody>
      //                 <Table className="tablesorter" responsive color="black">
      //                   <thead className="text-primary">
      //                     <tr>
      //                       <th>#</th>
      //                       <th>Area</th>
      //                       {/* <th>City</th> */}
      //                       <th>State</th>
      //                       <th>Price</th>
      //                       <th>Property PID</th>
      //                       <th>Survey Number</th>
      //                       <th>Actions</th>
      //                     </tr>
      //                   </thead>
      //                   <tbody>
      //                     {row}
      //                   </tbody>
      //                 </Table>
      //               </CardBody>
      //             </Card>
      //           </Col>
      //         </Row>
      //       </LoadingContainer>
      //     </DrizzleProvider>
      //     <Row>
      //       <Col lg="4">
      //         <Card>
      //           <CardHeader>
      //             <CardTitle>View Images of all Lands!</CardTitle>
      //           </CardHeader>
      //           <CardBody>
      //             <Button href="/Seller/viewImage" className="btn-fill" color="primary">
      //               View Images
      //             </Button>
      //           </CardBody>
      //         </Card>
      //       </Col>
      //     </Row>
      //   </div>
      // </>
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          <div className="content">
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    {/* <Chart /> */}
                    <div class="card">
                      <h3>Registered Lands</h3>
                      <h4>{countarr}</h4>
                      <div class="focus-content">
                        <Card>
                          <CardBody>
                            <div className="chart-area" style={{ textAlign: 'center' }}>
                              <Button href="/Seller/AddLand" disabled={!this.state.verified} className="btn-fill" color="primary">
                                Add Land
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <div class="card">
                      <h3>Total Requests</h3>
                      <h4>{reqsarr}</h4>
                      <div class="focus-content">
                        <Card>
                          <CardBody>
                            <div className="chart-area" style={{ textAlign: 'center' }}>

                              <Button href="/Seller/ApproveRequest" disabled={!this.state.verified} className="btn-fill" color="primary">
                                View Requests
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={3} direction="column" alignItems="center" justifyContent="center" >
                <Grid item xs={12} md={6} lg={6} p="40">
                  <Paper sx={{ mt: '20px' }}>
                    <div className="card-sub" style={{ padding: '20px' }}>
                      <h3>Make Payments for Approved Land Requests</h3>
                    </div>
                    <div className="chart-area" style={{ textAlign: 'center', marginBottom: '25px' }}>

                      <Button href="/admin/MakePayment" disabled={!this.state.verified} className="btn-fill" color="primary">
                        Make Payment
                      </Button>
                    </div>
                    <Divider />
                    {/* <TableComponent data={userinfo} /> */}
                  </Paper>

                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ mt: '20px' }}>
                  <div className="card-sub">
                    <h3>Lands Info</h3>
                  </div>
                  {/* <Divider /> */}
                  {/* <TableComponent data={userinfo} /> */}

                  
                  <Card>
                    <CardBody>
                      <Table className="tablesorter" responsive color="black">
                        <thead className="text-primary">
                          <tr>
                            <th>#</th>
                            <th>Area</th>
                            {/* <th>City</th> */}
                            <th>State</th>
                            <th>Price</th>
                            <th>Property PID</th>
                            <th>Survey Number</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Paper>

              </Grid>


            </Container>
            <div className="main-section">
              <Row>
              </Row>
            </div>
            <Row>
            </Row>
          </div>
        </LoadingContainer>
      </DrizzleProvider>
    );

  }
}

export default SDash;