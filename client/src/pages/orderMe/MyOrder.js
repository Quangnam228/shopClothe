import "./myOrder.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, deleteOrder } from "../../redux/apiCalls";
import { format } from "timeago.js";
import Navbar from "../../components/Navbar";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function MyOrder() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.user.currentUser?.user);
  const [isOrder, setIsOrder] = useState([]);
  const count = order.length;

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => setOpen(false);

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
      if (orderStatus._id === id && orderStatus.status === "pending") {
        setOpen(false);
        deleteOrder(id, dispatch);
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
                onClick={() => handleOpen(params.row._id)}
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
        <Modal open={open} onClose={handleClose}>
          <FormGroup sx={style}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "55ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <Grid container>
                <Grid item xs={8}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h6"
                  >
                    Are you sure you want to delete?
                  </Typography>
                </Grid>
              </Grid>
              <Stack spacing={2} direction="row" sx={style2}>
                <Button variant="outlined" onClick={() => handleDelete(id)}>
                  Yes
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  No
                </Button>
              </Stack>
            </Box>
          </FormGroup>
        </Modal>
      </div>
    </>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  display: "flex",
  justifyContent: "center",
};
