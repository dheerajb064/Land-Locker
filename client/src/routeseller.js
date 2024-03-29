import SellerDashboard from "./views/SellerDashboard";
import AddLand from "./views/AddLand";
import OwnedLands from "./views/OwnedLands";
import ApproveRequest from "./views/ApproveRequest";
import sellerProfile from "./views/sellerProfile";
import viewImage from "./views/viewImage";
import updateSeller from "./views/updateSeller";
import viewMap from "./views/ViewMap";
import ownHistory from "./views/ownHistory";
import Help from "./Help";

// var routes = [
//   {
//     path: "/SellerDashboard",
//     name: "Dashboard",
//     rtlName: "لوحة القيادة",
//     icon: "tim-icons icon-chart-pie-36",
//     component: SellerDashboard,
//     layout: "/Seller",
//   },
//   {
//     path: "/AddLand",
//     name: "Add Land",
//     rtlName: "الرموز",
//     icon: "tim-icons icon-world",
//     component: AddLand,
//     layout: "/Seller",
//   },
//   {
//     path: "/sellerProfile",
//     name: "Seller Profile",
//     rtlName: "الرموز",
//     icon: "tim-icons icon-single-02",
//     component: sellerProfile,
//     layout: "/Seller",
//   },
//   {
//     path: "/ApproveRequest",
//     name: "Land Requests",
//     rtlName: "الرموز",
//     icon: "tim-icons icon-badge",
//     component: ApproveRequest,
//     layout: "/Seller",
//   },
//   {
//     path: "/viewImage",
//     name: "Land Gallery",
//     rtlName: "الرموز",
//     icon: "tim-icons icon-image-02",
//     component: viewImage,
//     layout: "/Seller",
//   },
//   {
//     path: "/Help",
//     name: "Help",
//     rtlName: "الرموز",
//     icon: "tim-icons icon-image-02",
//     component: Help,
//     layout: "/Seller",
//   },
//   {
//     path: "/updateSeller",
//     name: "Update",
//     rtlName: "الرموز",
//     icon: "tim-icons",
//     component: updateSeller,
//     layout: "/Seller",
//   },
//   {
//     path: "/ViewMap",
//     name: "View Map",
//     rtlName: "الرموز",
//     icon: "tim-icons",
//     component: viewMap,
//     layout: "/Seller",
//   },
// ];


var routes = [
  {
    path: "/SellerDashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: SellerDashboard,
    layout: "/Seller",
  },
  {
    path: "/sellerProfile",
    name: "Seller Profile",
    rtlName: "الرموز",
    icon: "tim-icons icon-single-02",
    component: sellerProfile,
    layout: "/Seller",
  },
  {
    path: "/OwnedLands",
    name: "View Land",
    rtlName: "الرموز",
    icon: "tim-icons icon-single-02",
    component: OwnedLands,
    layout: "/admin",
  },
  {
    path: "/ViewMap",
    name: "View Map",
    rtlName: "الرموز",
    icon: "tim-icons",
    component: viewMap,
    layout: "/Seller",
  },
  {
    path: "/AddLand",
    name: "Add Land",
    rtlName: "الرموز",
    icon: "tim-icons",
    component: AddLand,
    layout: "/Seller",
  },
  {
    path: "/ApproveRequest",
    name: "Approve Request",
    rtlName: "الرموز",
    icon: "tim-icons",
    component: ApproveRequest,
    layout: "/Seller",
  },
  {
    path: "/history",
    name: "",
    rtlName: "الرموز",
    icon: "tim-icons",
    component: ownHistory,
    layout: "/Seller",
  },
];
export default routes;
