import React, { useState } from 'react';

const DataInputPage = ({ onCalculate }) => {
  const [rowLimit, setRowLimit] = useState('');
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleAddRow = () => {
    if (!interval || !frequency || isNaN(frequency)) return;
    
    const newData = [...data, { interval, frequency: Number(frequency) }];
    setData(newData);
    setInterval('');
    setFrequency('');
  };

  const handleCalculate = () => {
    onCalculate(data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Statistical Data Input</h1>
        
        {data.length === 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Row Limit</label>
            <input
              type="number"
              value={rowLimit}
              onChange={(e) => setRowLimit(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter row limit"
            />
          </div>
        )}

        {rowLimit && data.length < parseInt(rowLimit) && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Class Interval</label>
              <input
                type="text"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., 10-20 or 10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Frequency</label>
              <input
                type="number"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter frequency"
              />
            </div>
          </div>
        )}

        {rowLimit && data.length < parseInt(rowLimit) && (
          <button
            onClick={handleAddRow}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Row
          </button>
        )}

        {data.length > 0 && (
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">Class Interval</th>
                <th className="border p-2 text-left">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="border p-2">{row.interval}</td>
                  <td className="border p-2">{row.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {data.length === parseInt(rowLimit) && (
          <button
            onClick={handleCalculate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Calculate
          </button>
        )}
      </div>
    </div>
  );
};

export default DataInputPage;