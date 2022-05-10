import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, deleteOrder } from "../../redux/apiCalls";
import { format } from "timeago.js";

export default function Approved() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.orders);
  const [orderStatus, setOrderStatus] = useState([]);
  const users = useSelector((state) => state.users.users);

  let orders = JSON.parse(JSON.stringify(order));

  let orderS = [];

  useEffect(() => {
    orders.map((item) => {
      if (item.status !== "pending") {
        orderS.push(item);
      }
    });
    setOrderStatus(orderS);
  }, [order]);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteOrder(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "userName",
      headerName: "Name customer",
      width: 200,
    },
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
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  const rows = [];

  orderStatus &&
    orderStatus.forEach((item) => {
      users.forEach((user) => {
        item.userId === user._id &&
          rows.push({
            _id: item._id,
            userName: user.username,
            amount: item.amount,
            status: item.status,
            createdAt: item.createdAt,
          });
      });
    });

  const [sortModel, setSortModel] = useState([
    {
      field: "createdAt",
      sort: "desc",
    },
  ]);

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Order</h1>
      </div>
      <DataGrid
        // sortingOrder={["desc", "asc"]}
        // sortModel={sortModel}
        // onSortModelChange={(model) => setSortModel(model)}
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
