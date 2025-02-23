import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculateDeviations } from '../../utils/calculations';

const DiscreteDeviationCalculation = ({ data, onBack }) => {
  const { deviations, meanDeviation, standardDeviation, mean } = calculateDeviations(data, false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Mean Deviation & Standard Deviation (Discrete Data)</h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded space-y-2">
          <div><strong>Formulas:</strong></div>
          <div>Mean Deviation = Σ(f|x - x̄|) / Σf</div>
          <div>Standard Deviation = √(Σ(f(x - x̄)²) / Σf)</div>
        </div>

        <div className="mb-4">
          <strong>Mean (x̄) = {mean.toFixed(4)}</strong>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">Value (x)</th>
              <th className="border p-2 text-left">f</th>
              <th className="border p-2 text-left">x - x̄</th>
              <th className="border p-2 text-left">|x - x̄|</th>
              <th className="border p-2 text-left">f|x - x̄|</th>
              <th className="border p-2 text-left">(x - x̄)²</th>
              <th className="border p-2 text-left">f(x - x̄)²</th>
            </tr>
          </thead>
          <tbody>
            {deviations.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">{row.x.toFixed(2)}</td>
                <td className="border p-2">{row.frequency}</td>
                <td className="border p-2">{row.deviation.toFixed(4)}</td>
                <td className="border p-2">{row.absDeviation.toFixed(4)}</td>
                <td className="border p-2">{row.fAbsDeviation.toFixed(4)}</td>
                <td className="border p-2">{row.squaredDeviation.toFixed(4)}</td>
                <td className="border p-2">{row.fSquaredDeviation.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-6 space-y-2">
          <div><strong>Results:</strong></div>
          <div>Mean Deviation = {meanDeviation.toFixed(4)}</div>
          <div>Standard Deviation = {standardDeviation.toFixed(4)}</div>
        </div>

        <BarChart width={600} height={300} data={deviations} className="mx-auto">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="absDeviation" fill="#8884d8" name="Absolute Deviation" />
          <Bar dataKey="squaredDeviation" fill="#82ca9d" name="Squared Deviation" />
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

export default DiscreteDeviationCalculation;