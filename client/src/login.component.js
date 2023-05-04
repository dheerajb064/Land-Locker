import React, { Component } from "react";
import { Button } from "react-bootstrap";
import LandContract from "./artifacts/Land.json";
import getWeb3 from "./getWeb3";
import './index.css';
import img from '../src/assets/img/logo.jpg';
import Typewriter from 'typewriter-effect';






export default class Login extends Component {


    constructor() {
        super();
        this.state = {
            role: 'Seller',
            redirect: '/RegisterSeller',
            landInspector: '',
            seller: '',
            buyer: '',
            color1: "secondary",
            color2: "secondary"
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount = async () => {
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }

        try {
            //Get network provider and web3 instance
            const web3 = await getWeb3();

            const accounts = await web3.eth.getAccounts();

            const networkId = await web3.eth.net.getId();
            console.log("Network ID ", networkId)
            const deployedNetwork = LandContract.networks[networkId];

            console.log("Deployed network address ", deployedNetwork)

            const instance = new web3.eth.Contract(
                LandContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            const currentAddress = await web3.currentProvider.selectedAddress;
            console.log("Current address :- ", currentAddress);
            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });
            var seller = await this.state.LandInstance.methods.isSeller(currentAddress).call();
            console.log(seller);
            this.setState({ seller: seller });
            var buyer = await this.state.LandInstance.methods.isBuyer(currentAddress).call();
            console.log(buyer);
            this.setState({ buyer: buyer });
            var landInspector = await this.state.LandInstance.methods.isLandInspector(currentAddress).call();
            console.log(landInspector);
            this.setState({ landInspector: landInspector });

        } catch (error) {
            alert(
                error,
            );
            console.error(error);
        }
    };

    handleInputChange(event) {
        if (event.target.value == 'Seller') {
            this.setState({
                color2: "primary",
                color1: "secondary"
            })
        }
        else {
            this.setState({
                color1: "primary",
                color2: "secondary"
            })
        }
        this.setState({
            role: event.target.value,
            redirect: "/Register" + event.target.value,
        });

    }
    submit() {

        this.props.history.push(this.state.redirect);
        window.location.reload(false);

    }

    render() {
        if (this.state.seller || this.state.buyer || this.state.landInspector) {
            if (this.state.landInspector) {
                this.props.history.push('/LI/LIdashboard');
                window.location.reload(false);
            }
            else {
                this.props.history.push('/Seller/SellerDashboard');
                window.location.reload(false);
            }
            return (

                // <div className="bodyC">
                //     <div className="img-wrapper">
                //         <img src={img} className="logo" />
                //         <div className="wine-text-container">
                //             <div className="site-title">Land Locker</div>
                //         </div>
                //     </div>
                //     <div className="auth-wrapper">
                //         <div className="auth-inner">
                //             <h1>You are already registered.</h1>
                //             <Button href="/Seller/SellerDashboard" disabled={!this.state.seller || !this.state.buyer} className="btn-block" style={{ margin: "2px", backgroundColor: "peru" }} >User Dashboard</Button>
                //             <br />
                //             <Button href="/LI/LIdashboard" disabled={!this.state.landInspector} className="btn-block" style={{ margin: "2px", backgroundColor: "peru" }}>Land Inspector Dashboard</Button>
                //         </div>
                //     </div>
                // </div>
                <div>your page is being redirected</div>
            );

        }

        return (
            // <div className="bodyC">
            //     <div className="img-wrapper">
            //         <img src={img} className="logo" />
            //         <div className="wine-text-container">
            //             <div className="site-title">Land Locker</div>
            //         </div>
            //     </div>
            //     <div className="auth-wrapper">
            //         <div className="auth-inner">
            //             <div>


            //                 <div>
            //                     <button onClick={() => this.submit()} className="btn btn-primary btn-block" style={{ marginBottom: "10px", marginTop: "10px" }}>Register</button>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <div className="bg">
                <div className="home-text">
                    <h1>Land Locker</h1>
                    <div className="typewriter">
                        {/* Trustable, Transparent and Digitized Platform
            <br />
            Open for all! Register Now. */}
                        <Typewriter
                            options={{
                                strings: ['Blockchain Based Land Registry App.', 'Register Now !'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                    <hr
                        style={{
                            border: "8px solid #fff",
                            width: "400px",
                            marginLeft: "0px",
                        }}
                    />
                </div>
                <div className="home-button">
                    <button
                        style={{ marginRight: "50px" }}
                        onClick={() => {
                            this.props.history.push("/RegisterSeller");
                            window.location.reload(false);
                        }}
                    >
                        Register
                    </button>
                </div>
            </div >
        );
    }
}