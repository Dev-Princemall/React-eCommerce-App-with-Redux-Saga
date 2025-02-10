import React from "react";
import { Star } from "lucide-react";
import "../styles/StarDistribution.css";

const estimateStarDistribution = (rate, count) => {
  let distribution;

  if (rate >= 4.5) {
    distribution = [3, 5, 12, 30, 50];
  } else if (rate >= 3.5) {
    distribution = [5, 10, 25, 35, 25];
  } else if (rate >= 2.5) {
    distribution = [10, 20, 30, 25, 15];
  } else if (rate >= 1.5) {
    distribution = [20, 30, 25, 15, 10];
  } else {
    distribution = [40, 30, 15, 10, 5];
  }

  const starCounts = distribution.map((percent) =>
    Math.round((percent / 100) * count)
  );
  const starPercentages = starCounts.map((value) =>
    ((value / count) * 100).toFixed(1)
  );

  return starPercentages;
};

const StarDistribution = ({ rate, count }) => {
  const starPercentages = estimateStarDistribution(rate, count);

  return (
    <div className="rating-card">
      <h3 className="rating-title">Customer Ratings</h3>

      <div className="rating-summary">
        <span className="rating-value">{rate.toFixed(1)}</span>
        <Star className="rating-star" />
        <span className="rating-count">({count} reviews)</span>
      </div>

      <div className="rating-bars">
        {starPercentages.reverse().map((percentage, index) => (
          <div key={index} className="rating-row">
            <span className="rating-label">{5 - index}★</span>
            <div className="rating-bar">
              <div
                className="rating-fill"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="rating-percent">{percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Usage example:
// <StarDistribution rate={3.9} count={120} />
export default StarDistribution;
