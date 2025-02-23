import React from 'react';
import { ScatterChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculateRegression, getMidpoint } from '../../utils/calculations';

const RegressionCalculation = ({ data, onBack, yOnX = true }) => {
  const { slope, intercept, meanX, meanY } = calculateRegression(data, yOnX);
  
  const scatterData = data.map(row => ({
    x: getMidpoint(row.interval),
    y: row.frequency
  }));

  // Generate line points
  const minX = Math.min(...scatterData.map(d => d.x));
  const maxX = Math.max(...scatterData.map(d => d.x));
  const lineData = yOnX ? [
    { x: minX, y: slope * minX + intercept },
    { x: maxX, y: slope * maxX + intercept }
  ] : [
    { x: slope * Math.min(...scatterData.map(d => d.y)) + intercept, y: Math.min(...scatterData.map(d => d.y)) },
    { x: slope * Math.max(...scatterData.map(d => d.y)) + intercept, y: Math.max(...scatterData.map(d => d.y)) }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          Regression Analysis ({yOnX ? 'Y on X' : 'X on Y'})
        </h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded space-y-2">
          <div><strong>Formula:</strong></div>
          {yOnX ? (
            <div>Y = a + bX, where b = Σ(xy) - nx̄ȳ / Σx² - nx̄²</div>
          ) : (
            <div>X = a + bY, where b = Σ(xy) - nx̄ȳ / Σy² - nȳ²</div>
          )}
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">X</th>
              <th className="border p-2 text-left">Y</th>
              <th className="border p-2 text-left">XY</th>
              <th className="border p-2 text-left">X²</th>
              <th className="border p-2 text-left">Y²</th>
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
          <div>Slope (b) = {slope.toFixed(4)}</div>
          <div>Intercept (a) = {intercept.toFixed(4)}</div>
          <div>Mean X = {meanX.toFixed(4)}</div>
          <div>Mean Y = {meanY.toFixed(4)}</div>
          <div>Regression Equation: {yOnX ? 
            `Y = ${intercept.toFixed(2)} + ${slope.toFixed(2)}X` :
            `X = ${intercept.toFixed(2)} + ${slope.toFixed(2)}Y`
          }</div>
        </div>

        <ScatterChart width={600} height={300} className="mx-auto">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="x" name="X" />
          <YAxis type="number" dataKey="y" name="Y" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Data Points" data={scatterData} fill="#8884d8" />
          <Line
            name="Regression Line"
            data={lineData}
            type="linear"
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

export default RegressionCalculation;