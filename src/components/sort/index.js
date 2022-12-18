import React from 'react';
import './sort.css';

export const SortComp = ({ onSort }) => {
  const handleChange = (e) => {
    onSort(e.target.value);
  };
  return (
    <div class='select'>
      <select onChange={handleChange}>
        <option value='0'>Select</option>
        <option value='1'>TotalConfirmed (desc)</option>
        <option value='2'>TotalDeaths (desc)</option>
        <option value='3'>TotalRecovered (asc)</option>
      </select>
    </div>
  );
};
