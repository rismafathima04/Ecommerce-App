import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function AdminDashboard() {

  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [avgOrder, setAvgOrder] = useState(0);

  // ⭐ Chart toggle
  const [chartType, setChartType] = useState("bar");

  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <h2 style={{ padding: "40px" }}>Access Denied</h2>;
  }

  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);

    const totalRevenue = savedOrders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    setRevenue(totalRevenue);

    const avg = savedOrders.length
      ? (totalRevenue / savedOrders.length).toFixed(2)
      : 0;

    setAvgOrder(avg);

  }, []);

  // ⭐ Chart Data
  const chartData = orders.map((order, index) => ({
    name: "Order " + (index + 1),
    revenue: order.total
  }));

  return (
    <div style={{ display: "flex" }}>

      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#111",
          color: "white",
          height: "100vh",
          padding: "20px"
        }}
      >
        <h2>Admin</h2>

        <div style={{ marginTop: "30px" }}>
          <p>Dashboard</p>
          <p>Orders</p>
          <p>Products</p>
          <p>Users</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div style={{ padding: "40px", flex: 1 }}>

        <h1>Admin Dashboard</h1>

        {/* KPI Tiles */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap"
          }}
        >

          <div
            style={{
              padding: "20px",
              background: "#f5f5f5",
              borderRadius: "10px",
              width: "200px"
            }}
          >
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>

          <div
            style={{
              padding: "20px",
              background: "#f5f5f5",
              borderRadius: "10px",
              width: "200px"
            }}
          >
            <h3>Total Revenue</h3>
            <p>₹{revenue}</p>
          </div>

          <div
            style={{
              padding: "20px",
              background: "#f5f5f5",
              borderRadius: "10px",
              width: "200px"
            }}
          >
            <h3>Avg Order</h3>
            <p>₹{avgOrder}</p>
          </div>

        </div>

        {/* Trends */}
        <div style={{ marginTop: "40px" }}>
          <h3>Trends</h3>

          <div
            style={{
              padding: "20px",
              background: "#e8f5e9",
              borderRadius: "10px",
              marginTop: "10px"
            }}
          >
            Orders are increasing 📈
          </div>

          <div
            style={{
              padding: "20px",
              background: "#e3f2fd",
              borderRadius: "10px",
              marginTop: "10px"
            }}
          >
            Revenue growing 💰
          </div>

        </div>

        {/* ⭐ Analytics Section */}
        <div style={{ marginTop: "40px" }}>

          <h3>Analytics</h3>

          {/* Toggle Button */}
          <button
            onClick={() =>
              setChartType(chartType === "bar" ? "line" : "bar")
            }
            style={{
              padding: "10px 20px",
              marginTop: "10px",
              border: "none",
              background: "#6C63FF",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Toggle Chart
          </button>

          <div style={{ width: "100%", height: 300, marginTop: "20px" }}>

            <ResponsiveContainer>

              {chartType === "bar" ? (

                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="revenue"
                    fill="#6C63FF"
                    animationDuration={800}
                  />
                </BarChart>

              ) : (

                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6C63FF"
                    strokeWidth={3}
                    animationDuration={800}
                  />
                </LineChart>

              )}

            </ResponsiveContainer>

          </div>

        </div>

        {/* Recent Orders */}
        <div style={{ marginTop: "40px" }}>
          <h3>Recent Orders</h3>

          {orders.length === 0 && <p>No orders yet</p>}

          {orders.slice(-5).map((order) => (
            <div
              key={order.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                background: "#f9f9f9",
                marginTop: "8px",
                borderRadius: "6px"
              }}
            >
              <span>Order #{order.id}</span>
              <span>₹{order.total}</span>
              <span>{order.status}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;