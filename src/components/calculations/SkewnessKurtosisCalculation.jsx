import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculateMoments } from '../../utils/calculations';

const SkewnessKurtosisCalculation = ({ data, onBack }) => {
  const { moments, standardDeviation, skewness, kurtosis, mean } = calculateMoments(data);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Skewness & Kurtosis</h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded space-y-2">
          <div><strong>Formulas:</strong></div>
          <div>Skewness = m₃/σ³</div>
          <div>Kurtosis = m₄/σ⁴</div>
          <div>Where:</div>
          <div>m₃ = Σ(f(x - x̄)³)/Σf</div>
          <div>m₄ = Σ(f(x - x̄)⁴)/Σf</div>
          <div>σ = Standard Deviation</div>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">x</th>
              <th className="border p-2 text-left">f</th>
              <th className="border p-2 text-left">x - x̄</th>
              <th className="border p-2 text-left">f(x - x̄)²</th>
              <th className="border p-2 text-left">f(x - x̄)³</th>
              <th className="border p-2 text-left">f(x - x̄)⁴</th>
            </tr>
          </thead>
          <tbody>
            {moments.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">{row.x.toFixed(2)}</td>
                <td className="border p-2">{row.frequency}</td>
                <td className="border p-2">{row.deviation.toFixed(4)}</td>
                <td className="border p-2">{row.m2.toFixed(4)}</td>
                <td className="border p-2">{row.m3.toFixed(4)}</td>
                <td className="border p-2">{row.m4.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-6 space-y-2">
          <div><strong>Results:</strong></div>
          <div>Mean (x̄) = {mean.toFixed(4)}</div>
          <div>Standard Deviation (σ) = {standardDeviation.toFixed(4)}</div>
          <div>Skewness = {skewness.toFixed(4)}</div>
          <div>Kurtosis = {kurtosis.toFixed(4)}</div>
          <div className="mt-2">
            <strong>Interpretation:</strong>
            <div>Skewness: {
              skewness < -0.5 ? "Negatively skewed" :
              skewness > 0.5 ? "Positively skewed" :
              "Approximately symmetric"
            }</div>
            <div>Kurtosis: {
              kurtosis < 3 ? "Platykurtic (flatter than normal)" :
              kurtosis > 3 ? "Leptokurtic (more peaked than normal)" :
              "Mesokurtic (normal distribution)"
            }</div>
          </div>
        </div>

        <LineChart width={600} height={300} data={moments} className="mx-auto">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="frequency" stroke="#8884d8" name="Frequency Distribution" />
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

export default SkewnessKurtosisCalculation;