import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toPng } from "html-to-image";

export const amiable = [
  "Good-natured",
  "Docile",
  "Loyal",
  "Even-tempered",
  "Willing",
  "Agreeable",
  "Obliging",
  "Sympathetic",
  "Tolerant",
  "Respectful",
  "Generous",
  "Considerate",
  "Kind",
  "Patient",
  "Trusting",
  "Peaceful",
  "Cordial",
  "Lenient",
  "Satisfied",
  "Companionable",
];

export const driver = [
  "Aggressive",
  "Dogged",
  "Determined",
  "Strong-willed",
  "Confident",
  "Assertive",
  "Restless",
  "Persistent",
  "Competitive",
  "Unconquerable",
  "Brave",
  "Argumentative",
  "Self-reliant",
  "Adventurous",
  "Vigorous",
  "Decisive",
  "Outspoken",
  "Audacious",
];

export const analytical = [
  "Cautious",
  "Precise",
  "Disciplined",
  "Accurate",
  "Fussy",
  "Timid",
  "Nonchalant",
  "Moderate",
  "Controlled",
  "Conventional",
];

export const expressive = [
  "Persuasive",
  "Open-minded",
  "Charming",
  "High-spirited",
  "Animated",
  "Cheerful",
  "Spontaneous",
  "Pioneering",
  "Jovial",
  "Influential",
  "Optimistic",
  "Inspiring",
  "Adaptable",
  "Lighthearted",
  "Positive",
  "Receptive",
  "Good mixer",
  "Talkative",
  "Popular",
  "Polished",
];

function Results() {
  const location = useLocation();
  const { answers } = location.state;
  const chartRef = useRef();

  // Categorize answers
  const categories = { amiable: 0, driver: 0, analytical: 0, expressive: 0 };

  answers.forEach((answer) => {
    if (amiable.includes(answer)) categories.amiable++;
    else if (driver.includes(answer)) categories.driver++;
    else if (analytical.includes(answer)) categories.analytical++;
    else if (expressive.includes(answer)) categories.expressive++;
  });

  const totalAnswers = answers.length;
  const data = [
    {
      name: "Amiable",
      value: categories.amiable,
      percentage: (categories.amiable / totalAnswers) * 100,
    },
    {
      name: "Driver",
      value: categories.driver,
      percentage: (categories.driver / totalAnswers) * 100,
    },
    {
      name: "Analytical",
      value: categories.analytical,
      percentage: (categories.analytical / totalAnswers) * 100,
    },
    {
      name: "Expressive",
      value: categories.expressive,
      percentage: (categories.expressive / totalAnswers) * 100,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const handleDownload = () => {
    if (chartRef.current === null) {
      return;
    }

    toPng(chartRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "quiz-results.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to download image", err);
      });
  };

  const renderCustomLabel = ({ name, value, percentage }) => {
    return `${name}: ${value} (${percentage.toFixed(2)}%)`;
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h2>Quiz Results</h2>
      <div ref={chartRef} style={{ width: "100%", height: "80%" }}>
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
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
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
}

export default Results;
