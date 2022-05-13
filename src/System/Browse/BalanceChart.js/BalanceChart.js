import React from "react";
import {
  CategoryScale,
  LinearScale,
  Chart,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

const BalanceChart = (props) => {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip
  );

  return (
    <div>
      <Line data={props.dataChart} />
    </div>
  );
};

export default BalanceChart;
