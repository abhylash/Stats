import React from 'react';

const measures = [
  { id: 1, title: "Mean, Median & Mode (Discrete Data)" },
  { id: 2, title: "Median & Mode (Continuous Data)" },
  { id: 3, title: "Mean Deviation & Standard Deviation (Discrete Data)" },
  { id: 4, title: "Mean Deviation & Standard Deviation (Continuous Data)" },
  { id: 5, title: "Skewness & Kurtosis" },
  { id: 6, title: "Correlation Coefficient Calculation & Analysis" },
  { id: 7, title: "Regression Analysis (Line of Regression of Y on X)" },
  { id: 8, title: "Regression Analysis (Line of Regression of X on Y)" },
  { id: 9, title: "Fit a Straight Line (X as Independent Variable)" },
  { id: 10, title: "Fit a Parabola (X as Independent Variable)" },
  { id: 11, title: "Fit a Curve (First Method)" },
  { id: 12, title: "Fit a Curve (Second Method)" }
];

const CalculationsPage = ({ onBack, onSelectMeasure }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Select Statistical Measure</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {measures.map(measure => (
            <button
              key={measure.id}
              onClick={() => onSelectMeasure(measure.id)}
              className="p-4 border rounded-lg hover:bg-gray-50 text-left"
            >
              {measure.title}
            </button>
          ))}
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Back to Input
        </button>
      </div>
    </div>
  );
};

export default CalculationsPage;