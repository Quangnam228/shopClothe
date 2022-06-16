import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  AttachMoney,
  DynamicFeed,
  ChatBubbleOutline,
  DeleteSweep,
} from "@material-ui/icons";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin/home" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Dashboard
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/admin/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/admin/orders" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Order
              </li>
            </Link>
            <Link to="/admin/delivery" className="link">
              <li className="sidebarListItem">
                <MotorcycleIcon className="sidebarIcon" />
                Delivery
              </li>
            </Link>
            <Link to="/admin/reviewProduct" className="link">
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Review
              </li>
            </Link>
            {/* <Link to="/trash" className="link">
              <li className="sidebarListItem">
                <DeleteSweep className="sidebarIcon" />
                trash
              </li>
            </Link> */}
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link to="/messenger" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </Link>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
