import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculateMean, calculateMedian, calculateMode } from '../../utils/calculations';

const DiscreteCalculation = ({ data, onBack }) => {
  const mean = calculateMean(data);
  const median = calculateMedian(data, false);
  const mode = calculateMode(data, false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Mean, Median & Mode (Discrete Data)</h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded space-y-2">
          <div><strong>Formulas:</strong></div>
          <div>Mean = Σ(fx) / Σf</div>
          <div>Median = Middle value after arranging in ascending order</div>
          <div>Mode = Value with highest frequency</div>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">Value (x)</th>
              <th className="border p-2 text-left">Frequency (f)</th>
              <th className="border p-2 text-left">fx</th>
              <th className="border p-2 text-left">Cumulative Frequency</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const x = Number(row.interval);
              const cumFreq = data
                .slice(0, index + 1)
                .reduce((acc, r) => acc + r.frequency, 0);
              return (
                <tr key={index}>
                  <td className="border p-2">{x}</td>
                  <td className="border p-2">{row.frequency}</td>
                  <td className="border p-2">{x * row.frequency}</td>
                  <td className="border p-2">{cumFreq}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mb-6 space-y-2">
          <div><strong>Results:</strong></div>
          <div>Mean = {mean.toFixed(2)}</div>
          <div>Median = {median?.toFixed(2)}</div>
          <div>Mode = {Array.isArray(mode) ? mode.join(', ') : mode?.toFixed(2)}</div>
        </div>

        <BarChart width={600} height={300} data={data} className="mx-auto">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="interval" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="frequency" fill="#8884d8" name="Frequency" />
        </BarChart>

        <button 
          className="mt-6 px-4 py-2 border rounded hover:bg-gray-50"
          onClick={onBack}
        >
          Back to Measures
        </button>
      </div>
    </div>
  );
};

export default DiscreteCalculation;