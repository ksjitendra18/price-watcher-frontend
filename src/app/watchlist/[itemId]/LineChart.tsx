// import Chart from "chart.js/auto";
// import { Chart as ChartJS } from "chart.js/auto";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
import { Line } from "react-chartjs-2";

function LineChart({ chartData }: { chartData: any }) {
  // return <Line data={chartData} options={} />;
  return (
    <Line
      data={chartData}
      // options={{
      //   responsive: true,
      //   scales: {
      //     xAxes: [
      //       {
      //         type: "time",
      //         time: {
      //           displayFormats: {
      //             hour: "MMM D hA",
      //           },
      //         },
      //         scaleLabel: {
      //           display: true,
      //           labelString: "Time",
      //         },
      //       },
      //     ],
      //     yAxes: [
      //       {
      //         ticks: {
      //           beginAtZero: true,
      //         },
      //         scaleLabel: {
      //           display: true,
      //           labelString: "Price",
      //         },
      //         type: "linear",
      //       },
      //     ],
      //   },
      //   title: {
      //     display: true,
      //     text: `Price Fluctuation for Item `,
      //   },
      //   legend: {
      //     display: true,
      //   },
      // }}

      // options={{
      //   scales: {
      //     x: {
      //       beginAtZero: true,
      //       ticks: {},
      //     },
      //   },
      // }}
    />
  );
}

export default LineChart;
