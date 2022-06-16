import "./widgetLg.css";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  const user = useSelector((state) => state.users.users);
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await userRequest.get("orders/?new=true");
        setOrder(res.data);
      } catch (error) {}
    };
    getOrder();
  }, []);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <img
                src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">
                {user.map((u) => {
                  if (order.userId === u._id) {
                    return u.username;
                  }
                })}
              </span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">{order.amount}</td>
            <td className="widgetLgStatus">
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
