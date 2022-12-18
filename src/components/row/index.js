import React from 'react';

export const RowComp = ({ item, onDetail }) => {
  const {
    Country,
    CountryCode,
    NewConfirmed,
    TotalConfirmed,
    NewDeaths,
    TotalDeaths,
    NewRecovered,
    TotalRecovered,
  } = item;

  return (
    <tr className='row-container' onClick={() => onDetail(CountryCode)}>
      <td>{Country}</td>
      <td>{CountryCode}</td>
      <td>{NewConfirmed}</td>
      <td>{TotalConfirmed}</td>
      <td>{NewDeaths}</td>
      <td>{TotalDeaths}</td>
      <td>{NewRecovered}</td>
      <td>{TotalRecovered}</td>
    </tr>
  );
};
