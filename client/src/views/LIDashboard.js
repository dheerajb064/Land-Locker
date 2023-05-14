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
import { Container, Paper, Divider } from '@mui/material';
import TableComponent from "./Table";
import { CssBaseline } from '@material-ui/core';




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
var userinfo = [];



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
        console.log("Inside perfrom succession", deadAddress)
        await this.state.LandInstance.methods.AfterDeath(deadAddress).send({ from: this.state.account, gas: 2100000 }).then(response => { console.log('success') })

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
                if (await this.state.LandInstance.methods.getAlive(userarr[i]).call()) {
                    userDetails = await this.state.LandInstance.methods.getSellerDetails(userarr[i]).call();
                    userDetails = { ...userDetails, 6: i + 1, };
                    userDetails = {
                        ...userDetails, 7: <Button className="button-vote" onClick={this.performSuccession(userarr[i])}>
                            Confirm
                        </Button>
                    }
                    console.log('userDetails', userDetails);
                    userinfo.push(userDetails);
                    row.push(<tr><td>{i + 1}</td><td>{userDetails[0]}</td><td>{userDetails[1]}</td><td>{userDetails[2]}</td><td>{userDetails[3]}</td><td>{userDetails[4]}</td>
                        <td>
                            <Button className="button-vote" onClick={this.performSuccession(userarr[i])}>
                                Confirm
                            </Button>
                        </td>
                    </tr>)
                }
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
                                            <h3>New Requests</h3>
                                            <h4>{reqsarr}</h4>
                                            <div class="focus-content">
                                                <Card>
                                                    <CardBody>
                                                        <div className="chart-area" style={{ textAlign: 'center' }}>
                                                            <Button href="/LI/TransactionInfo" className="btn-fill" color="primary">
                                                                Approve Land Transactions
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
                                            <h3>Total Users</h3>
                                            <h4>{sellerarr}</h4>
                                            <div class="focus-content">
                                                <Card>
                                                    <CardBody>
                                                        <div className="chart-area" style={{ textAlign: 'center' }}>

                                                            <Button href="/LI/SellerInfo" className="btn-fill" color="primary">
                                                                Verify Users
                                                            </Button>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{ mt: '20px' }}>
                                    <div className="card-sub">
                                        <h3>User Info</h3>
                                    </div>
                                    <Divider />
                                    <TableComponent data={userinfo} />
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

export default LIDashboard;
