import React, { useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const StockLineChart = () => {
  const [symbol, setSymbol] = useState('');
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePredict = async () => {
    if (!symbol) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://backend-dot-capstone-c242-ps555.et.r.appspot.com/predictStock',
        { symbol }
      );

      console.log('API Response:', response.data);

     
      const formattedChartData = [
        ['Day', 'Predicted Price'],
        ...response.data.map((item, index) => [
          `Day ${index + 1}`,
          Number(item.predicted_price.replace('Rp', '').trim()), 
        ]),
      ];

      
      const formattedTableData = response.data.map((item, index) => ({
        day: `Day ${index + 1}`,
        change: item.change,
        trend: item.trend,
        predicted_price: convertToRupiah(Number(item.predicted_price.replace('Rp', '').trim())), 
      }));

      console.log('Formatted Chart Data:', formattedChartData);
      console.log('Formatted Table Data:', formattedTableData);

      setChartData(formattedChartData);
      setTableData(formattedTableData);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const chartOptions = {
    title: `Predicted Prices for ${symbol.toUpperCase()}`,
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: { title: 'Days' },
    vAxis: { title: 'Price (Rp)' },
  };

  const convertToRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Stock Price Prediction</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 text-lg"
          placeholder="Enter Stock Symbol"
        />
        <button
          onClick={handlePredict}
          className="ml-4 bg-[#2DD4BF] text-white py-2 px-6 rounded-full text-lg"
        >
          Predict
        </button>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {chartData.length > 0 && (
        <div className="grid grid-cols-1 gap-8 mt-8">
          
          <div>
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={chartData}
              options={chartOptions}
            />
          </div>

          <div className="overflow-x-auto mt-8">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Day</th>
                  <th className="py-2 px-4 border">Change</th>
                  <th className="py-2 px-4 border">Trend</th>
                  <th className="py-2 px-4 border">Predicted Price</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border text-center">{row.day}</td>
                    <td className="py-2 px-4 border text-center">{row.change}</td>
                    <td className="py-2 px-4 border text-center">{row.trend}</td>
                    <td className="py-2 px-4 border text-center">{row.predicted_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockLineChart;
