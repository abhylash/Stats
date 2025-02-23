// Utility functions for statistical calculations
export const getMidpoint = (interval) => {
  if (interval.includes('-')) {
    const [min, max] = interval.split('-').map(Number);
    return (min + max) / 2;
  }
  return Number(interval);
};

export const calculateMean = (data) => {
  const sum = data.reduce((acc, row) => acc + (row.frequency * getMidpoint(row.interval)), 0);
  const totalFreq = data.reduce((acc, row) => acc + row.frequency, 0);
  return sum / totalFreq;
};

export const calculateMedian = (data, continuous = false) => {
  const totalFreq = data.reduce((acc, row) => acc + row.frequency, 0);
  const medianPosition = totalFreq / 2;
  let cumFreq = 0;
  
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const prevCumFreq = cumFreq;
    cumFreq += row.frequency;
    
    if (cumFreq >= medianPosition) {
      if (continuous) {
        const [lower, upper] = row.interval.split('-').map(Number);
        const classWidth = upper - lower;
        return lower + ((medianPosition - prevCumFreq) / row.frequency) * classWidth;
      } else {
        return getMidpoint(row.interval);
      }
    }
  }
  return null;
};

export const calculateMode = (data, continuous = false) => {
  const maxFreq = Math.max(...data.map(row => row.frequency));
  
  if (continuous) {
    const modalClass = data.find(row => row.frequency === maxFreq);
    if (modalClass) {
      const [lower, upper] = modalClass.interval.split('-').map(Number);
      const classWidth = upper - lower;
      const f0 = modalClass.frequency;
      const f1 = data[data.indexOf(modalClass) - 1]?.frequency || 0;
      const f2 = data[data.indexOf(modalClass) + 1]?.frequency || 0;
      return lower + ((f0 - f1) / (2 * f0 - f1 - f2)) * classWidth;
    }
  } else {
    const modes = data.filter(row => row.frequency === maxFreq);
    return modes.map(row => getMidpoint(row.interval));
  }
  return null;
};

export const calculateDeviations = (data, continuous = false) => {
  const mean = calculateMean(data);
  const deviations = data.map(row => {
    const x = getMidpoint(row.interval);
    const deviation = x - mean;
    const absDeviation = Math.abs(deviation);
    const squaredDeviation = deviation * deviation;
    return {
      ...row,
      x,
      deviation,
      absDeviation,
      squaredDeviation,
      fAbsDeviation: row.frequency * absDeviation,
      fSquaredDeviation: row.frequency * squaredDeviation
    };
  });
  
  const totalFreq = deviations.reduce((acc, row) => acc + row.frequency, 0);
  const meanDeviation = deviations.reduce((acc, row) => acc + row.fAbsDeviation, 0) / totalFreq;
  const variance = deviations.reduce((acc, row) => acc + row.fSquaredDeviation, 0) / totalFreq;
  const standardDeviation = Math.sqrt(variance);
  
  return { deviations, meanDeviation, standardDeviation, mean };
};

export const calculateMoments = (data) => {
  const mean = calculateMean(data);
  const totalFreq = data.reduce((acc, row) => acc + row.frequency, 0);
  
  const moments = data.map(row => {
    const x = getMidpoint(row.interval);
    const deviation = x - mean;
    return {
      ...row,
      x,
      deviation,
      m2: deviation * deviation * row.frequency,
      m3: Math.pow(deviation, 3) * row.frequency,
      m4: Math.pow(deviation, 4) * row.frequency
    };
  });
  
  const m2 = moments.reduce((acc, row) => acc + row.m2, 0) / totalFreq;
  const m3 = moments.reduce((acc, row) => acc + row.m3, 0) / totalFreq;
  const m4 = moments.reduce((acc, row) => acc + row.m4, 0) / totalFreq;
  
  const standardDeviation = Math.sqrt(m2);
  const skewness = m3 / Math.pow(standardDeviation, 3);
  const kurtosis = m4 / Math.pow(m2, 2);
  
  return { moments, standardDeviation, skewness, kurtosis, mean };
};

export const calculateCorrelation = (data) => {
  const n = data.length;
  const sumX = data.reduce((acc, row) => acc + getMidpoint(row.interval), 0);
  const sumY = data.reduce((acc, row) => acc + row.frequency, 0);
  const sumXY = data.reduce((acc, row) => acc + getMidpoint(row.interval) * row.frequency, 0);
  const sumX2 = data.reduce((acc, row) => acc + Math.pow(getMidpoint(row.interval), 2), 0);
  const sumY2 = data.reduce((acc, row) => acc + Math.pow(row.frequency, 2), 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - Math.pow(sumX, 2)) * (n * sumY2 - Math.pow(sumY, 2)));
  
  return numerator / denominator;
};

export const calculateRegression = (data, yOnX = true) => {
  const n = data.length;
  const sumX = data.reduce((acc, row) => acc + getMidpoint(row.interval), 0);
  const sumY = data.reduce((acc, row) => acc + row.frequency, 0);
  const sumXY = data.reduce((acc, row) => acc + getMidpoint(row.interval) * row.frequency, 0);
  const sumX2 = data.reduce((acc, row) => acc + Math.pow(getMidpoint(row.interval), 2), 0);
  
  const meanX = sumX / n;
  const meanY = sumY / n;
  
  let slope, intercept;
  
  if (yOnX) {
    slope = (n * sumXY - sumX * sumY) / (n * sumX2 - Math.pow(sumX, 2));
    intercept = meanY - slope * meanX;
  } else {
    const sumY2 = data.reduce((acc, row) => acc + Math.pow(row.frequency, 2), 0);
    slope = (n * sumXY - sumX * sumY) / (n * sumY2 - Math.pow(sumY, 2));
    intercept = meanX - slope * meanY;
  }
  
  return { slope, intercept, meanX, meanY };
};

export const calculateParabolicRegression = (data) => {
  const n = data.length;
  const x = data.map(row => getMidpoint(row.interval));
  const y = data.map(row => row.frequency);
  
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);
  const sumX3 = x.reduce((a, b) => a + b * b * b, 0);
  const sumX4 = x.reduce((a, b) => a + b * b * b * b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumX2Y = x.reduce((a, b, i) => a + b * b * y[i], 0);
  
  const matrix = [
    [n, sumX, sumX2],
    [sumX, sumX2, sumX3],
    [sumX2, sumX3, sumX4]
  ];
  
  const vector = [sumY, sumXY, sumX2Y];
  
  // Solve using Cramer's rule
  const det = (m) => {
    return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
         - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
         + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  };
  
  const d = det(matrix);
  const d1 = det([
    [vector[0], matrix[0][1], matrix[0][2]],
    [vector[1], matrix[1][1], matrix[1][2]],
    [vector[2], matrix[2][1], matrix[2][2]]
  ]);
  const d2 = det([
    [matrix[0][0], vector[0], matrix[0][2]],
    [matrix[1][0], vector[1], matrix[1][2]],
    [matrix[2][0], vector[2], matrix[2][2]]
  ]);
  const d3 = det([
    [matrix[0][0], matrix[0][1], vector[0]],
    [matrix[1][0], matrix[1][1], vector[1]],
    [matrix[2][0], matrix[2][1], vector[2]]
  ]);
  
  const a = d1 / d;
  const b = d2 / d;
  const c = d3 / d;
  
  return { a, b, c };
};