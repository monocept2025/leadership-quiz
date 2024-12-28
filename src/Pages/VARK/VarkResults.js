import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toPng } from 'html-to-image';

const VARKResults = () => {
  const location = useLocation();
  const { answers } = location.state;
  const chartRef = useRef(null);

  // Categorize answers
  const categories = { Visual: 0, Auditory: 0, ReadingWriting: 0, Kinesthetic: 0 };

  answers.forEach(answer => {
    if (answer.includes("Youtube") || answer.includes("illustrations") || answer.includes("pictures")) categories.Visual++;
    else if (answer.includes("Podcasts") || answer.includes("Audiobooks") || answer.includes("explains")) categories.Auditory++;
    else if (answer.includes("Books") || answer.includes("Reading") || answer.includes("Writing")) categories.ReadingWriting++;
    else if (answer.includes("Social Gatherings") || answer.includes("mindmap") || answer.includes("puzzles")) categories.Kinesthetic++;
  });

  const totalAnswers = answers.length;
  const data = [
    { name: 'Visual', value: categories.Visual, percentage: (categories.Visual / totalAnswers) * 100 },
    { name: 'Auditory', value: categories.Auditory, percentage: (categories.Auditory / totalAnswers) * 100 },
    { name: 'Reading/Writing', value: categories.ReadingWriting, percentage: (categories.ReadingWriting / totalAnswers) * 100 },
    { name: 'Kinesthetic', value: categories.Kinesthetic, percentage: (categories.Kinesthetic / totalAnswers) * 100 },
  ];

  // Ensure the percentages add up to 100%
  const totalPercentage = data.reduce((acc, curr) => acc + curr.percentage, 0);
  data.forEach(item => {
    item.percentage = (item.percentage / totalPercentage) * 100;
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleDownload = () => {
    if (chartRef.current === null) {
      return;
    }

    toPng(chartRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'vark-results.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Failed to download image', err);
      });
  };

  const renderCustomLabel = ({ name, percentage }) => {
    return `${name}: ${percentage.toFixed(1)}%`;
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <h2>VARK Quiz Results</h2>
      <div ref={chartRef} style={{ width: '100%', height: '80%' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="percentage"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <button onClick={handleDownload}>Download Chart</button>
    </div>
  );
};

export default VARKResults;
