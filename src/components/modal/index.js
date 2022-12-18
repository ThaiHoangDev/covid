import React, { useEffect, useState } from 'react';
import { getDetailApi } from '../../utils/api';
import './modal.css';
export const Modal = ({ onDetail, code }) => {
  const [dataCountry, setDataCountry] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getDetail = async () => {
    try {
      const { data } = await getDetailApi(code);
      setDataCountry(data[0]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, [code]);

  const handleClose = () => {
    onDetail();
  };

  if (isLoading) {
    <div>Loading...</div>;
  }

  return (
    <div id='myModal' class='modal'>
      <div class='modal-content'>
        <span class='close' onClick={handleClose}>
          ×
        </span>
        <div className='text'>
          Name Country:
          <span>
            {dataCountry?.name?.common}
            {dataCountry?.flag}
          </span>
        </div>
        <div className='text'>
          Population: <span>{dataCountry.population}</span>
        </div>
        <div className='text'>
          Region: <span>{dataCountry.region}</span>
        </div>
        <div className='text'>
          Subregion: <span>{dataCountry.subregion}</span>
        </div>
      </div>
    </div>
  );
};
