import "./myOrder.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, deleteOrder } from "../../redux/apiCalls";
import { format } from "timeago.js";
import Navbar from "../../components/Navbar";

export default function MyOrder() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.user.currentUser?.user);
  const [isOrder, setIsOrder] = useState([]);

  let ItIsOrderMe = [];

  useEffect(() => {
    const getMyOrder = () => {
      order.map((item) => {
        if (user._id === item.userId) {
          ItIsOrderMe.push(item);
        }
      });
      setIsOrder(ItIsOrderMe);
    };
    getMyOrder();
    getOrders(dispatch);
  }, [dispatch, order, isOrder]);

  const handleDelete = (id) => {
    deleteOrder(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },

    { field: "amount", headerName: "amount", width: 200 },
    {
      field: "status",
      headerName: "status",
      width: 160,
    },
    {
      field: "createdAt",
      headerName: "date",
      width: 160,
      renderCell: (params) => {
        return <>{format(params.row.createdAt)}</>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="myOrderListEdit">View</button>
            </Link>
            <DeleteOutline
              className="myOrderListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="myOrderList">
        <div className="myOrderTitleContainer">
          <h1 className="myOrderTitle">Order</h1>
        </div>
        <DataGrid
          rows={isOrder}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      </div>
    </>
  );
}
