import React, { useCallback, useEffect, useState } from 'react';
import TableComp from '../../components/table';
import { getSumaryApi } from '../../utils/api';

import { Skeleton } from '../../components/loading/Skeleton';
import './home.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const handleGetCountry = useCallback(async () => {
    try {
      const { data } = await getSumaryApi();
      const dataSort = data.Countries.sort((a, b) =>
        a.TotalConfirmed < b.TotalConfirmed ||
        a.TotalDeaths < b.TotalDeaths ||
        a.TotalRecovered > b.TotalRecovered
          ? 1
          : b.TotalConfirmed < a.TotalConfirmed ||
            b.TotalDeaths < a.TotalDeaths ||
            b.TotalRecovered > a.TotalRecovered
          ? -1
          : 0
      );
      setData(dataSort);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSort = (value) => {
    const newD = [...data];
    switch (value) {
      case '1':
        setData(newD.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed));
        break;
      case '2':
        setData(newD.sort((a, b) => b.TotalDeaths - a.TotalDeaths));
        break;
      case '3':
        setData(newD.sort((a, b) => a.TotalRecovered - b.TotalRecovered));
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    handleGetCountry();
  }, []);

  return (
    <div className='container'>
      {isLoading ? <Skeleton /> : <TableComp data={data} onSort={handleSort} />}
    </div>
  );
};

export default Home;
