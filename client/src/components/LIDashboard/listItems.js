import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardCustomizeTwoToneIcon from '@mui/icons-material/DashboardCustomizeTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';
import routes from '../../routesLI';

export const mainListItems = (
    // <React.Fragment>
    //     <ListItemButton>
    //         <ListItemIcon>
    //             <DashboardIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="Dashboard" />
    //     </ListItemButton>
    //     <ListItemButton>
    //         <ListItemIcon>
    //             <ShoppingCartIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="Users" />
    //     </ListItemButton>
    //     <ListItemButton>
    //         <ListItemIcon>
    //             <BarChartIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="Transactions" />
    //     </ListItemButton>
    // </React.Fragment >
    <React.Fragment>
        <ListItemButton href="/LI/LIDashboard">
            <ListItemIcon>
                <DashboardCustomizeTwoToneIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="DASHBOARD" />
        </ListItemButton>
        <ListItemButton href="/LI/SellerInfo">
            <ListItemIcon>
                <PersonOutlineTwoToneIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="USERS" />
        </ListItemButton>
        <ListItemButton href="/LI/TransactionInfo">
            <ListItemIcon>
                <PaidTwoToneIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="TRANSACTIONS" />
        </ListItemButton>
        <ListItemButton href="/LI/ViewLands">
            <ListItemIcon>
                <PaidTwoToneIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="VIEW LANDS" />
        </ListItemButton>
    </React.Fragment >

);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);