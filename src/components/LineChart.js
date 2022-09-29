import { Line } from 'react-chartjs-2';
import { Chart as Chart } from "chart.js/auto";
import "./LineChart.css"

function LineChart({chartData}) {

    return (
        <div className="chart">
            <Line data={chartData}/>
        </div>
        )
}

export default LineChart;