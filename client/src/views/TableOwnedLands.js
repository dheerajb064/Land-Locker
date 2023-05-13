import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

  


function Row(props) {
    const { row } = props;
    const {historyData} = props;
    console.log(historyData)
    const [open, setOpen] = React.useState(false);
    return (
        // <TableContainer>
        //     <Table aria-label="simple table">
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell>#</TableCell>
        //                 <TableCell align="right">Area</TableCell>
        //                 <TableCell align="right">City</TableCell>
        //                 <TableCell align="right">State</TableCell>
        //                 <TableCell align="right">Price</TableCell>
        //                 <TableCell align="right">Property ID</TableCell>
        //                 <TableCell align="right">Survey Number</TableCell>
        //                 <TableCell align="right">Ownership History</TableCell>
        //                 <TableCell align="right">Reciept</TableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {console.log(landData.length)}
        //             {landData.map((ele) => (
        //                 <TableRow key={ele[0]}>
        //                     <TableCell component="th" scope="row">
        //                         {ele[0]}
        //                     </TableCell>
        //                     <TableCell align="right">{ele[1]}</TableCell>
        //                     <TableCell align="right">{ele[2]}</TableCell>
        //                     <TableCell align="right">{ele[3]}</TableCell>
        //                     <TableCell align="right">{ele[4]}</TableCell>
        //                     <TableCell align="right">{ele[5]}</TableCell>
        //                     <TableCell align="right">{ele[6]}</TableCell>
        //                     <TableCell align="right">{ele[7]}</TableCell>
        //                     <TableCell align="right">{ele[8]}</TableCell>
        //                 </TableRow>
        //             ))}
        //         </TableBody>
        //     </Table>
        // </TableContainer>
        <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell component="th" scope="row">
           
        </TableCell> */}
        <TableCell align="right">{row[1]}</TableCell>
        <TableCell align="right">{row[2]}</TableCell>
        <TableCell align="right">{row[3]}</TableCell>
        <TableCell align="right">{row[4]}</TableCell>
        <TableCell align="right">{row[5]}</TableCell>
        <TableCell align="right">{row[6]}</TableCell>
        <TableCell align="right">{row[7]}</TableCell>
        <TableCell align="right">{row[8]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h4" gutterBottom component="div">
                History
              </Typography>
              <Table  aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell align="right">Aadhar Number</TableCell>
                    <TableCell align="right">Pan Number</TableCell>
                    <TableCell align="right">Number of Lands</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyData.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow[0]}
                      </TableCell>
                      <TableCell>{historyRow[1]}</TableCell>
                      <TableCell align="right">{historyRow[2]}</TableCell>
                      <TableCell align="right">{historyRow[3]}</TableCell>
                      <TableCell align="right">{historyRow[4]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      </React.Fragment>
    );
}



  export default function CollapsibleTable(props) {
    const historyData = props.historyData
    const landData = props.landData
    console.log(historyData , landData)
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">Area</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Property ID</TableCell>
              <TableCell align="right">Survey Number</TableCell>
              {/* <TableCell align="right">Ownership History</TableCell> */}
              <TableCell align="right">Reciept</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {landData.map((row) => (
              <Row key={row[0]} row={row} historyData={historyData} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }