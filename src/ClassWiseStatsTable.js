import React, { useState, useEffect } from 'react';
import data from './Wine-Data.json';
function calculateStats(data) {
    const groupedData = {};
    
    // group the data by class of alcohol
    data.forEach(item => {
      const className = item.Alcohol;
      if (!groupedData[className]) {
        groupedData[className] = [];
      }
      groupedData[className].push(item.Flavanoids);
    });
    
    // calculate mean, median, and mode for each class
    const stats = Object.keys(groupedData).map(className => {
      const values = groupedData[className];
      const sum = values.reduce((acc, val) => acc + val, 0);
      const mean = sum / values.length;
      const sortedValues = values.sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedValues.length / 2);
      const median = sortedValues.length % 2 === 0 ? (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2 : sortedValues[middleIndex];
      const modeMap = {};
      let maxCount = 0;
      let mode = null;
      values.forEach(val => {
        if (!modeMap[val]) {
          modeMap[val] = 1;
        } else {
          modeMap[val]++;
        }
        if (modeMap[val] > maxCount) {
          maxCount = modeMap[val];
          mode = val;
        }
      });
      return {
        className,
        mean: mean.toFixed(2),
        median: median.toFixed(2),
        mode
      };
    });
    
    return stats;
  }

 

function ClassStatsTable() {
  const [stats, setStats] = useState([]);
  
  useEffect(() => {
    setStats(calculateStats(data));
  }, []);
  
  return (
    <div className="stats-table">
    <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
        <tbody>
        <td style={{ border: '1px solid black', borderCollapse: 'collapse' }}>    
                <th style={{ border: '1px solid black', borderCollapse: 'collapse' }}>Measures</th>
                <tr style={{ border: '1px solid black' , borderCollapse: 'collapse' }}>Mean</tr>
                <tr style={{ border: '1px solid black' , borderCollapse: 'collapse' }}>Median</tr>
                <tr style={{ border: '1px solid black' , borderCollapse: 'collapse' }}>Mode</tr>
              </td>
          { stats.map((row, index) => (
              
            <td key={index} style={{ border: '1px solid black' }}>
                
              <th style={{ border: '1px solid black', borderCollapse: 'collapse' }}>Class {row.className}</th>
              <tr style={{ border: '1px solid black', borderCollapse: 'collapse' }}>{row.mean}</tr>
              <tr style={{ border: '1px solid black' , borderCollapse: 'collapse'}}>{row.median}</tr>
              <tr style={{ border: '1px solid black' , borderCollapse: 'collapse' }}>{row.mode}</tr>
            </td>
            
          ))}
          
        </tbody>
      </table>

    </div>
  );
}

export default ClassStatsTable;