import React, { Component } from "react";
// import { Modal, Button, Tabs } from "antd";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   BarChart,
//   Bar,
//   Legend,
//   PieChart,
//   Pie,
//   Cell
// } from "recharts"; // or var ReactEcharts = require('echarts-for-react');
// const TabPane = Tabs.TabPane;
// const data = [
//   {
//     name: "food",
//     uv: 2000,
//     pv: 2013,
//     amt: 4500,
//     time: 1,
//     uvError: [100, 50],
//     pvError: [110, 20]
//   },
//   {
//     name: "cosmetic",
//     uv: 3300,
//     pv: 2000,
//     amt: 6500,
//     time: 2,
//     uvError: 120,
//     pvError: 50
//   },
//   {
//     name: "storage",
//     uv: 3200,
//     pv: 1398,
//     amt: 5000,
//     time: 3,
//     uvError: [120, 80],
//     pvError: [200, 100]
//   },
//   {
//     name: "digital",
//     uv: 2800,
//     pv: 2800,
//     amt: 4000,
//     time: 4,
//     uvError: 100,
//     pvError: 30
//   },
//   {
//     name: "digital2",
//     uv: 2800,
//     pv: 2800,
//     amt: 4000,
//     time: 4,
//     uvError: 100,
//     pvError: 30
//   },
//   {
//     name: "digital3",
//     uv: 2800,
//     pv: 2800,
//     amt: 4000,
//     time: 4,
//     uvError: 100,
//     pvError: 30
//   }
// ];

// const data1 = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 }
// ];
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };
class BusinessStatisticModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
      // <Modal
      //   title={this.props.title}
      //   visible={this.props.visible}
      //   closable={false}
      //   onCancel={this.props.handleOk}
      //   footer={[
      //     <Button key="OK" type="primary" onClick={this.props.handleOk}>
      //       OK
      //     </Button>
      //   ]}
      //   width="76%"
      // >
      //   <div className="card-container">
      //     <Tabs>
      //       <TabPane tab="柱状图" key="1">
      //         <BarChart width={680} height={300} data={data}>
      //           <CartesianGrid strokeDasharray="3 3" />
      //           <XAxis dataKey="name" />
      //           <YAxis />
      //           <Tooltip />
      //           <Legend />
      //           <Bar dataKey="pv" fill="#8884d8" />
      //           <Bar dataKey="uv" fill="#82ca9d" />
      //         </BarChart>
      //       </TabPane>
      //       <TabPane tab="饼图" key="2">
      //         <PieChart width={680} height={300} onMouseEnter={this.onPieEnter}>
      //           <Pie
      //             dataKey="value"
      //             data={data1}
      //             cx={300}
      //             cy={120}
      //             labelLine={false}
      //             label={renderCustomizedLabel}
      //             outerRadius={80}
      //             fill="#8884d8"
      //           >
      //             {data.map((entry, index) => (
      //               <Cell key={index} fill={COLORS[index % COLORS.length]} />
      //             ))}
      //           </Pie>
      //         </PieChart>
      //       </TabPane>
      //     </Tabs>
      //   </div>
      // </Modal>
    );
  }
}

export default BusinessStatisticModal;
