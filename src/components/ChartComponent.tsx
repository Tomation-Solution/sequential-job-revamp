import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export type ChartComponentProp ={
    info:{
        data:number[],
        labels:string[],
        backgroundColor:string[]
    }
}
const ChartComponent = ({info}:{info:ChartComponentProp})=> {
    const data = {
      labels:info.info.labels,
      datasets: [
        {
          label: 'Job Bar Chart',
          data:info.info.data,
          backgroundColor:info.info.backgroundColor,
        },
    
      ],
    };
  return <Bar options={options} data={data} />;
}


export default ChartComponent