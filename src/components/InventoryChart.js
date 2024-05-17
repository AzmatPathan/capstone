// InventoryChart.js
import React from 'react';

const InventoryChart = ({ data }) => {
  // Implement your inventory chart component here
  return (
    <div>
      {/* Example: Display inventory data */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default InventoryChart;
