import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculateCorrelation, getMidpoint } from '../../utils/calculations';

const CorrelationCalculation = ({ data, onBack }) => {
  const correlation = calculateCorrelation(data);
  
  const scatterData = data.map(row => ({
    x: getMidpoint(row.interval),
    y: row.frequency
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Correlation Coefficient Analysis</h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded space-y-2">
          <div><strong>Formula:</strong></div>
          <div>r = Σ(xy) - (Σx)(Σy )/n) / √[(Σx² - (Σx)²/n)(Σy² - (Σy)²/n)]</div>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">x</th>
              <th className="border p-2 text-left">y</th>
              <th className="border p-2 text-left">xy</th>
              <th className="border p-2 text-left">x²</th>
              <th className="border p-2 text-left">y²</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const x = getMidpoint(row.interval);
              const y = row.frequency;
              return (
                <tr key={index}>
                  <td className="border p-2">{x.toFixed(2)}</td>
                  <td className="border p-2">{y}</td>
                  <td className="border p-2">{(x * y).toFixed(2)}</td>
                  <td className="border p-2">{(x * x).toFixed(2)}</td>
                  <td className="border p-2">{(y * y).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mb-6 space-y-2">
          <div><strong>Results:</strong></div>
          <div>Correlation Coefficient (r) = {correlation.toFixed(4)}</div>
          <div className="mt-2">
            <strong>Interpretation:</strong>
            <div>{
              correlation > 0.7 ? "Strong positive correlation" :
              correlation > 0.3 ? "Moderate positive correlation" :
              correlation > -0.3 ? "Weak or no correlation" :
              correlation > -0.7 ? "Moderate negative correlation" :
              "Strong negative correlation"
            }</div>
          </div>
        </div>

        <ScatterChart width={600} height={300} className="mx-auto">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="x" name="x" />
          <YAxis type="number" dataKey="y" name="y" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Data Points" data={scatterData} fill="#8884d8" />
        </ScatterChart>

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

export default CorrelationCalculation;