import * as React from 'react'
import LandContract from "./artifacts/Land.json"
import getWeb3 from "./getWeb3"
import { pinFileToIPFS } from './upload_ipfs.js'
import img from '../src/assets/img/logo.jpg';
// import { Form,FormGroup, FormControl, Spinner, FormFile } from 'react-bootstrap'
// import Container from 'react-bootstrap/Container';
// import './index.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/material/styles';
import { Spinner, FormFile ,FormGroup} from 'react-bootstrap';
//import Navigation from './Navigation'

const theme = createTheme();





class RegisterSeller extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            name: '',
            age: '',
            city: 'kochi',
            email: '',
            aadharNumber: '',
            panNumber: '',
            landsOwned: '',
            isVerified: false,
            fileUrl: '',
            File:null,
            succ: null
        }
        this.captureDoc = this.captureDoc.bind(this);
        this.onUpload=this.onUpload.bind(this);

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
            const deployedNetwork = LandContract.networks[networkId];
            const instance = new web3.eth.Contract(
                LandContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });


        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    onUpload = async (e) => {
        /* upload image to IPFS */
        // const file = e.target.files[0]
        try {
            const url = await pinFileToIPFS(this.state.File);

            // const url = `https://ipfs.infura.io/ipfs/${added.path}`
            console.log(url, " fileURL")
            this.setState({fileUrl:url});
            console.log(url, " URL")
            //alert(`fileURL: ${this.state.fileUrl}`)

        } catch (error) {
            <inputs
                type="file"
                name="Asset"
                className="my-4"
                onChange={this.captureDoc}
            />
            console.log('Error uploading file: ', error)
        }
    }

    registerSeller = async () => {
        //this.addDoc();
        // alert('After add image')
        console.log("Registered user");
        await new Promise(resolve => setTimeout(resolve, 10000));
        if (this.state.name == '' || this.state.age == '' || this.state.aadharNumber == '' || this.state.panNumber == '' || this.state.landsOwned == '' || this.state.email == '') {
            alert("All the fields are compulsory!");
        } else if (!Number(this.state.aadharNumber) || this.state.aadharNumber.length != 12) {
            alert("Aadhar Number should be 12 digits long!");
        } else if (this.state.panNumber.length != 10) {
            alert("Pan Number should be a 10 digit unique number!");
        } else if (!Number(this.state.age) || this.state.age < 21) {
            alert("Your age must be a number");
        } else {
            console.log("Successor:", this.state.succ);
            await this.state.LandInstance.methods.registerUser(
                this.state.name,
                this.state.age,
                this.state.city,
                this.state.aadharNumber,
                this.state.panNumber,
                this.state.landsOwned,
                this.state.fileUrl,
                this.state.email
            )
                .send({
                    from: this.state.account,
                    gas: 2100000
                }).then(response => {
                    this.props.history.push("/Seller/SellerDashboard");
                });

            //Reload

            window.location.reload(false);
        }
    }

    updateName = event => (
        this.setState({ name: event.target.value })
    )
    updateAge = event => (
        this.setState({ age: event.target.value })
    )
    updateAadhar = event => (
        this.setState({ aadharNumber: event.target.value })
    )
    updatePan = event => (
        this.setState({ panNumber: event.target.value })
    )
    updateOwnedLands = event => (
        this.setState({ landsOwned: event.target.value })
    )
    updateEmail = event => (
        this.setState({ email: event.target.value })
    )
    // updateSucc = event => (
    //     this.setState({ succ: event.target.value })
    // )

    captureDoc= event =>{
        const file = event.target.files[0];
        const inp = this.state;
        inp.File = file;
        this.setState(inp)
        console.log(this.state.File);
        this.onUpload(event)
    }

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

            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://bernardmarr.com/img/What%20Is%20Blockchain%20A%20Super%20Simple%20Guide%20Anyone%20Can%20Understand.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                {/* <LockOutlinedIcon /> */}
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1, alignItems: 'center' }} >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Name"
                                    name="Name"
                                    autoFocus
                                    value={this.state.name}
                                    onChange={this.updateName}
                                    sx={{ ml: '0px !important' }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Age"
                                    label="Age"
                                    name="Age"
                                    value={this.state.age}
                                    onChange={this.updateAge}
                                    sx={{ ml: '0px !important' }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={this.updateEmail}
                                    sx={{ ml: '0px !important' }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="aadhar"
                                    label="Aadhar Number (12 digits)"
                                    type="text"
                                    id="aadhar"
                                    value={this.state.aadharNumber}
                                    onChange={this.updateAadhar}
                                    sx={{ ml: '0px !important' }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="PAN"
                                    label="PAN (10 digits)"
                                    type="text"
                                    id="PAN"
                                    value={this.state.panNumber}
                                    onChange={this.updatePan}
                                    sx={{ ml: '0px !important' }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="owned"
                                    label="Owned Lands"
                                    type="text"
                                    id="owned"
                                    value={this.state.landsOwned}
                                    onChange={this.updateOwnedLands}
                                    sx={{ ml: '0px !important' }}
                                />
                                <FormGroup>
                                    <label>Insert Adhar card document</label>
                                    <FormFile
                                        id="File2"
                                        onChange={this.captureDoc}
                                    />
                                </FormGroup>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    onClick={this.registerSeller}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Register
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

export default RegisterSeller;