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
var owners = [];
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
            ownerData: [],
            ownerDataArray: []
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
            verified = await this.state.LandInstance.methods.isLandInspector(currentAddress).call();
            console.log(verified);
            this.setState({ verified: verified });

            count = await this.state.LandInstance.methods.getLandsCount().call();
            count = parseInt(count);
            console.log(typeof count);
            console.log(count);



            for (var i = 0; i < count; i++) {
                var ownCount = await this.state.LandInstance.methods.getOwnerCount(i + 1).call();
                var ownerDetail;
                var sellerHistory = [];
                this.setState({ownerData: []})
                for (var j = 0; j < ownCount; j++) {
                    ownerDetail = await this.state.LandInstance.methods.getOwnerDetails(i + 1, j).call();
                    sellerHistory = await this.state.LandInstance.methods.getSellerDetails(ownerDetail).call();
                    console.log(sellerHistory);
                    console.log(typeof sellerHistory)
                    var tempArray = [...this.state.ownerData]
                    tempArray.push(sellerHistory)

                    this.setState({ ownerData: tempArray });
                }

                console.log(this.state.ownerData);
                this.setState({ownerDataArray: [...this.state.ownerDataArray , this.state.ownerData]})
                data = await this.state.LandInstance.methods.getLandDetails(i + 1).call();
                this.setState({ landData: [...this.state.landData, data] });
            }
            console.log(this.state.landData.length);
            console.log(this.state.ownerDataArray)
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

        if (!this.state.verified) {
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
                <div>
                    <Grid item xs={12}>
                        <Paper sx={{ mt: '200px' }}>
                            <div className="card-sub">
                                <h3>Lands Info</h3>
                            </div>
                            <Divider />
                            <TableComponent historyData={this.state.ownerDataArray} landData={this.state.landData} />
                        </Paper>

                    </Grid>
                </div>
            </>
        );
    }
}

export default OwnedLands;
