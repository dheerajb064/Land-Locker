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
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Land from "../artifacts/Land.json";
import "../card.css";
import getWeb3 from "../getWeb3";
import '../index.css';
import { Grid } from '@mui/material';




const drizzleOptions = {
    contracts: [Land]
}


var verified;
var row = [];
var buyerarr = [];
var sellerarr = [];
var reqsarr = [];
var userarr = [];
var userDetails;



class LIDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            verified: '',
        }
    }

    performSuccession = (deadAddress) => async () => {
        console.log(deadAddress)
        // await this.state.LandInstance.methods.AfterDeath(deadAddress).call()

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

            const currentAddress = await web3.currentProvider.selectedAddress;
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Land.networks[networkId];
            const instance = new web3.eth.Contract(
                Land.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });

            var verified = await this.state.LandInstance.methods.isLandInspector(currentAddress).call();
            this.setState({ verified: verified });

            sellerarr.push(<ContractData contract="Land" method="getSellersCount" />);
            buyerarr.push(<ContractData contract="Land" method="getBuyersCount" />);
            reqsarr.push(<ContractData contract="Land" method="getRequestsCount" />);

            userarr = await this.state.LandInstance.methods.getSeller().call();
            console.log('userAddress: ', userarr)

            for (var i = 0; i < userarr.length; i++) {
                userDetails = await this.state.LandInstance.methods.getSellerDetails(userarr[i]).call();
                console.log('userDetails', userDetails)
                row.push(<tr><td>{i + 1}</td><td>{userDetails[0]}</td><td>{userDetails[1]}</td><td>{userDetails[2]}</td><td>{userDetails[3]}</td><td>{userDetails[4]}</td>
                    <td>
                        <Button className="button-vote" onClick={this.performSuccession(userarr[i])}>
                            Confirm
                        </Button>
                    </td>
                </tr>)
            }


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

        if (!this.state.verified) {
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
            <DrizzleProvider options={drizzleOptions}>
                <LoadingContainer>
                    <div className="content">
                        <div className="main-section">
                            <Row>
                                {/* <Col lg="4">
                                    <div class="dashbord dashbord-skyblue">
                                        <div class="icon-section">
                                            <i class="fa fa-users" aria-hidden="true"></i><br />
                                            <medium>Total Buyers</medium><br />
                                            <p> {buyerarr} </p>
                                        </div>
                                        <div class="detail-section"><br />
                                        </div>
                                    </div>
                                </Col> */}
                                <Col lg="4">
                                    <div class="dashbord dashbord-blue">
                                        <div class="icon-section">
                                            {/* <i class="fa fa-bell" aria-hidden="true"></i><br /> */}
                                            <medium>Total Requests</medium><br />
                                            <p>{reqsarr}</p>
                                        </div>
                                        <div class="detail-section">
                                            <br />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4">
                                    <div class="dashbord dashbord-orange">
                                        <div class="icon-section">
                                            {/* <i class="fa fa-users" aria-hidden="true"></i><br /> */}
                                            <medium>Total Users</medium><br />
                                            <p>{sellerarr}</p>
                                        </div>
                                        <div class="detail-section"><br />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            {/* <Col lg="4">
                                <div className='card-specific'>
                                    <Card >
                                        <CardHeader>
                                            <h5 className="title">Buyers Information</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="chart-area">

                                                <Button href="/LI/BuyerInfo" className="btn-fill" color="primary">
                                                    Verify Buyers
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Col> */}
                            <Col lg="4">
                                <div className='card-specific'>
                                    <Card>
                                        <CardHeader>
                                            <h5 className="title">Land Transfer Requests</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="chart-area">

                                                <Button href="/LI/TransactionInfo" className="btn-fill" color="primary">
                                                    Approve Land Transactions
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className='card-specific'>
                                    <Card>
                                        <CardHeader>
                                            <h5 className="title">User's Information</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="chart-area">

                                                <Button href="/LI/SellerInfo" className="btn-fill" color="primary">
                                                    Verify Users
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Col>
                        </Row>


                        <DrizzleProvider options={drizzleOptions}>
                            <LoadingContainer>
                                <Row>
                                    <Col lg="12" md="12">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle tag="h4">User Info
                                                </CardTitle>
                                            </CardHeader>
                                            <CardBody>
                                                <Table className="tablesorter" responsive color="black">
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Age</th>
                                                            <th>Aadhar Number</th>
                                                            <th>Pan Number</th>
                                                            <th>Lands Owned</th>
                                                            <th>Deceased</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {row}
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </LoadingContainer>
                        </DrizzleProvider>

                    </div>
                </LoadingContainer>
            </DrizzleProvider>
        );

    }
}

export default LIDashboard;
