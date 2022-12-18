/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import './table.css';
import { RowComp } from '../row';
import { Modal } from '../modal';
import { SortComp } from '../sort';

function TableComp({ data, onSort }) {
  const [isModal, setIsmMdal] = useState(false);
  const [code, setCode] = useState(false);

  const handleDetail = (code) => {
    setIsmMdal(!isModal);
    setCode(code);
  };

  return (
    <div className='container'>
      <div className='sort-container'>
        <SortComp onSort={onSort} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Country Code</th>
            <th>New Confirmed</th>
            <th>Total Confirmed</th>
            <th>New Deaths</th>
            <th>Total Deaths</th>
            <th>New Recovered</th>
            <th>Total Recovered</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <RowComp item={item} key={i} onDetail={handleDetail} />
          ))}
        </tbody>
      </table>
      {isModal && <Modal onDetail={handleDetail} code={code} />}
    </div>
  );
}
export default memo(TableComp);
TableComp.propTypes = {
  data: PropTypes.any,
};
