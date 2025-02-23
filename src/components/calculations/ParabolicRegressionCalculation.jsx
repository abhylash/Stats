import React from 'react';
import { ScatterChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculateParabolicRegression, getMidpoint } from '../../utils/calculations';

const ParabolicRegressionCalculation = ({ data, onBack }) => {
  const { a, b, c } = calculateParabolicRegression(data);
  
  const scatterData = data.map(row => ({
    x: getMidpoint(row.interval),
    y: row.frequency
  }));

  // Generate parabola points
  const minX = Math.min(...scatterData.map(d => d.x));
  const maxX = Math.max(...scatterData.map(d => d.x));
  const step = (maxX - minX) / 50;
  const curveData = Array.from({ length: 51 }, (_, i) => {
    const x = minX + i * step;
    return {
      x,
      y: a + b * x + c * x * x
    };
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Parabolic Regression</h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded space-y-2">
          <div><strong>Formula:</strong></div>
          <div>Y = a + bX + cX²</div>
          <div>Using normal equations:</div>
          <div>Σy = na + bΣx + cΣx²</div>
          <div>Σxy = aΣx + bΣx² + cΣx³</div>
          <div>Σx²y = aΣx² + bΣx³ + cΣx⁴</div>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">X</th>
              <th className="border p-2 text-left">Y</th>
              <th className="border p-2 text-left">XY</th>
              <th className="border p-2 text-left">X²</th>
              <th className="border p-2 text-left">X²Y</th>
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
                  <td className="border p-2">{(x * x * y).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mb-6 space-y-2">
          <div><strong>Results:</strong></div>
          <div>a = {a.toFixed(4)}</div>
          <div>b = {b.toFixed(4)}</div>
          <div>c = {c.toFixed(4)}</div>
          <div>Parabolic Equation: Y = {a.toFixed(2)} + {b.toFixed(2)}X + {c.toFixed(2)}X²</div>
        </div>

        <ScatterChart width={600} height={300} className="mx-auto">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="x" name="X" />
          <YAxis type="number" dataKey="y" name="Y" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Data Points" data={scatterData} fill="#8884d8" />
          <Line
            name="Parabolic Curve"
            data={curveData}
            type="monotone"
            dataKey="y"
            stroke="#ff7300"
            dot={false}
          />
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

export default ParabolicRegressionCalculation;