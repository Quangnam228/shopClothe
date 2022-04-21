import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest, publicRequest } from "../../requestMethods";
import { Link } from "react-router-dom";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [total, setTotal] = useState(0);
  // const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.users.users);
  const order = useSelector((state) => state.order.orders);

  // const order = order.filter((od) => {
  //   return od.status === "approved";
  // });
  // console.log(order);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await publicRequest.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };

    getIncome();
    const TotalPrice = async () => {
      let total = 0;
      order.forEach((od) => {
        if (od.status === "approved") {
          total += od.amount;
        }
      });
      setTotal(total);
    };
    TotalPrice();
  }, [order]);

  function compare(a, b) {
    if (a._id > b._id) {
      return 1;
    } else {
      return -1;
    }
  }

  income.sort(compare);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">User</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{user.length}</span>
          <span className="featuredMoneyRate"></span>
        </div>
        <Link to="users">
          <span className="featuredSub">see all user</span>
        </Link>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Product</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{products.length}</span>
          <span className="featuredMoneyRate"></span>
        </div>
        <Link to="products">
          <span className="featuredSub">see all product</span>
        </Link>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Price</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${total}</span>
        </div>
      </div>
    </div>
  );
}
