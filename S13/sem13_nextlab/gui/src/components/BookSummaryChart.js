import React from 'react';
import { Chart } from 'primereact/chart';

const BookSummaryChart = ({ books }) => {
    let short = 0;  
    let medium = 0; 
    let long = 0;   
    let unknown = 0; 

    if (books && books.length > 0) {
        books.forEach(book => {
            const pages = book.pageCount ? parseInt(book.pageCount) : null;

            if (pages === null || isNaN(pages)) {
                unknown++;
            } else if (pages < 100) {
                short++;
            } else if (pages >= 100 && pages <= 300) {
                medium++;
            } else {
                long++;
            }
        });
    }

    const chartData = {
        labels: ['Short (<100)', 'Medium (100-300)', 'Long (>300)', 'Unknown'],
        datasets: [
            {
                data: [short, medium, long, unknown],
                backgroundColor: [
                    '#42A5F5', 
                    '#66BB6A', 
                    '#FFA726', 
                    '#CFD8DC'  
                ],
                hoverBackgroundColor: [
                    '#64B5F6',
                    '#81C784',
                    '#FFB74D',
                    '#B0BEC5'
                ]
            }
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true
                },
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Distribution by Page Count Range',
                font: {
                    size: 16
                }
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Chart type="pie" data={chartData} options={chartOptions} style={{ position: 'relative', width: '60%' }} />
        </div>
    );
}

export default BookSummaryChart;