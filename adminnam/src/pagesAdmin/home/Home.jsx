import Chart from "../../componentsAdmin/chart/Chart";
import FeaturedInfo from "../../componentsAdmin/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../componentsAdmin/widgetSm/WidgetSm";
import WidgetLg from "../../componentsAdmin/widgetLg/WidgetLg";
import { useState, useMemo, useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const [orderMonths, setOrderMonths] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  function compare(a, b) {
    if (a._id > b._id) {
      return 1;
    } else {
      return -1;
    }
  }

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.sort(compare);
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "new User": item.total },
          ])
        );
      } catch (error) {}
    };
    getStats();
    const getOrder = async () => {
      try {
        const res = await userRequest.get("/orders/stats");
        res.data.sort(compare);
        res.data.map((item) =>
          setOrderMonths((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Revenue: item.total },
          ])
        );
      } catch (error) {}
    };
    getOrder();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="newUser Analytics"
        grid
        dataKey="new User"
      />
      <Chart
        data={orderMonths}
        title="Revenue Analytics"
        grid
        dataKey="Revenue"
      />

      <div className="homeWidgets">
        {/* <WidgetSm /> */}
        <WidgetLg />
      </div>
    </div>
  );
}
