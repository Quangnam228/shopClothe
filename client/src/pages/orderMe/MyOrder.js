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
  const count = order.length;

  let ItIsOrderMe = [];

  const getMyOrder = () => {
    order.map((item) => {
      if (
        user._id === item.userId
        // && item.status === "pending"
      ) {
        ItIsOrderMe.push(item);
      }
    });
    setIsOrder(ItIsOrderMe);
  };

  useEffect(() => {
    getMyOrder();
    getOrders(dispatch);
  }, [dispatch, count]);

  const handleDelete = (id) => {
    isOrder.map((orderStatus) => {
      console.log(orderStatus.status);
      if (orderStatus._id === id && orderStatus.status === "pending") {
        deleteOrder(id, dispatch);
        console.log(1);
      }
      // else if (orderStatus._id === id && orderStatus.status === "approved") {
      //   alert("order này ko thể xóa");
      // }
    });
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
            {/* <Link to={"/orderDetail/" + params.row._id}>
              <button className="myOrderListEdit">View</button>
            </Link> */}
            {params.row.status === "pending" ? (
              <DeleteOutline
                className="myOrderListDelete"
                onClick={() => handleDelete(params.row._id)}
              />
            ) : (
              <DeleteOutline className="myOrderNoDelete" />
            )}
          </>
        );
      },
    },
  ];

  const rows = [];

  isOrder &&
    isOrder.forEach((item) => {
      item.userId === user._id &&
        rows.push({
          _id: item._id,
          userName: user.username,
          amount: item.amount,
          status: item.status,
          createdAt: item.createdAt,
        });
    });

  return (
    <>
      <Navbar />
      <div className="myOrderList">
        <div className="myOrderTitleContainer">
          <h1 className="myOrderTitle">Order</h1>
        </div>
        <DataGrid
          rows={rows}
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
