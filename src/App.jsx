import React, { useState } from 'react';
import DataInputPage from './components/DataInputPage';
import CalculationsPage from './components/CalculationsPage';
import DiscreteCalculation from './components/calculations/DiscreteCalculation';
import ContinuousCalculation from './components/calculations/ContinuousCalculation';
import DiscreteDeviationCalculation from './components/calculations/DiscreteDeviationCalculation';
import ContinuousDeviationCalculation from './components/calculations/ContinuousDeviationCalculation';
import SkewnessKurtosisCalculation from './components/calculations/SkewnessKurtosisCalculation';
import CorrelationCalculation from './components/calculations/CorrelationCalculation';
import RegressionCalculation from './components/calculations/RegressionCalculation';
import ParabolicRegressionCalculation from './components/calculations/ParabolicRegressionCalculation';
import './index.css';

const App = () => {
  const [page, setPage] = useState('input');
  const [selectedMeasure, setSelectedMeasure] = useState(null);
  const [inputData, setInputData] = useState([]);

  const handleCalculate = (data) => {
    setInputData(data);
    setPage('measures');
  };

  const handleSelectMeasure = (measureId) => {
    setSelectedMeasure(measureId);
    setPage('calculation');
  };

  const renderCalculation = () => {
    switch(selectedMeasure) {
      case 1:
        return <DiscreteCalculation data={inputData} onBack={() => setPage('measures')} />;
      case 2:
        return <ContinuousCalculation data={inputData} onBack={() => setPage('measures')} />;
      case 3:
        return <DiscreteDeviationCalculation data={inputData} onBack={() => setPage('measures')} />;
      case 4:
        return <ContinuousDeviationCalculation data={inputData} onBack={() => setPage('measures')} />;
      case 5:
        return <SkewnessKurtosisCalculation data={inputData} onBack={() => setPage('measures')} />;
      case 6:
        return <CorrelationCalculation data={inputData} onBack={() => setPage('measures')} />;
      case 7:
        return <RegressionCalculation data={inputData} onBack={() => setPage('measures')} yOnX={true} />;
      case 8:
        return <RegressionCalculation data={inputData} onBack={() => setPage('measures')} yOnX={false} />;
      case 9:
        return <RegressionCalculation data={inputData} onBack={() => setPage('measures')} yOnX={true} />;
      case 10:
        return <ParabolicRegressionCalculation data={inputData} onBack={() => setPage('measures')} />;
      case 11:
      case 12:
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Curve Fitting</h2>
              <p className="mb-4">This calculation type is coming soon.</p>
              <button 
                onClick={() => setPage('measures')}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Back to Measures
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {page === 'input' && <DataInputPage onCalculate={handleCalculate} />}
      {page === 'measures' && (
        <CalculationsPage 
          onBack={() => setPage('input')}
          onSelectMeasure={handleSelectMeasure}
        />
      )}
      {page === 'calculation' && renderCalculation()}
    </div>
  );
};

export default App;