import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import style from './Dashboard.module.css';

const Dashboard = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [secondChartData, setSecondChartData] = useState({});
    const [secondChartOptions, setSecondChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Sales',
                    data: [540, 325, 702, 620],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Quarterly Sales'
                }
            }
        };

        const secondData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        };

        const secondOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Revenue'
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
        setSecondChartData(secondData);
        setSecondChartOptions(secondOptions);
    }, []);

    return (
        <div>
            <div className={style.cardBar}>
                <h5>Quarterly Sales</h5>
                <Chart type="bar" data={chartData} options={chartOptions} />
            </div>
            <div className={style.cardGraph}>
                <h5>Monthly Revenue</h5>
                <Chart type="line" data={secondChartData} options={secondChartOptions} />
            </div>
        </div>
    );
}

export default Dashboard;