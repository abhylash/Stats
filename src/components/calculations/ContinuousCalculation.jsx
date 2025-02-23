import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculateMedian, calculateMode, getMidpoint } from '../../utils/calculations';

const ContinuousCalculation = ({ data, onBack }) => {
  const median = calculateMedian(data, true);
  const mode = calculateMode(data, true);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Median & Mode (Continuous Data)</h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded space-y-2">
          <div><strong>Formulas:</strong></div>
          <div>Median = L + ((N/2 - F)/f) × h</div>
          <div>Mode = L + ((f1 - f0)/(2f1 - f0 - f2)) × h</div>
          <div>Where:</div>
          <div>L = Lower boundary of median/modal class</div>
          <div>h = Class interval width</div>
          <div>F = Cumulative frequency before median/modal class</div>
          <div>f = Frequency of median/modal class</div>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">Class Interval</th>
              <th className="border p-2 text-left">Frequency</th>
              <th className="border p-2 text-left">Midpoint</th>
              <th className="border p-2 text-left">Cumulative Frequency</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const cumFreq = data
                .slice(0, index + 1)
                .reduce((acc, r) => acc + r.frequency, 0);
              return (
                <tr key={index}>
                  <td className="border p-2">{row.interval}</td>
                  <td className="border p-2">{row.frequency}</td>
                  <td className="border p-2">{getMidpoint(row.interval)}</td>
                  <td className="border p-2">{cumFreq}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mb-6 space-y-2">
          <div><strong>Results:</strong></div>
          <div>Median = {median?.toFixed(2)}</div>
          <div>Mode = {mode?.toFixed(2)}</div>
        </div>

        <LineChart width={600} height={300} data={data} className="mx-auto">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="interval" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="frequency" stroke="#8884d8" name="Frequency" />
        </LineChart>

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

export default ContinuousCalculation;