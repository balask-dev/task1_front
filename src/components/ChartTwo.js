import React, { useState, useEffect } from 'react';


function ChartTwo() {
  const [month, setMonth] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState([]);
  const [totalSold, setTotalSold] = useState(0);
  const [notSold, setNotSold] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(){
    try {
      const response = await fetch('https://rox-48n5.onrender.com/api/data/fetch');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
    calculateStatistics(e.target.value);
  };

  const calculateStatistics = (month) => {
    let totalAmount = 0;
    let totalSold = 0;
    let NotSold = 0;

    data.forEach((transaction) => {
      const transactionMonth = new Date(transaction.dateOfSale).toLocaleString('default', { month: 'long' });
      if (transactionMonth === month) {
        totalAmount += transaction.price;
        if (transaction.sold) {
          totalSold++;
        } else {
          NotSold++;
        }
      }
    });

    setTotalAmount(totalAmount.toFixed(2));
    setTotalSold(totalSold);
    setNotSold(NotSold);
  };

  return (
    <div style={{marginLeft:'25%'}} className="mainStatistics ">
      <h1 className='Statisticsh1'>Transaction Statistics</h1>
      <div>
         <select  value={month} onChange={handleMonth}>
          <option  value="">Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <div className="statistics">
           <h2 className='statisticsh2'>Total Sales</h2>
          <h3>{totalAmount}</h3>
            <h2 className='statisticsh2'>Total Sold</h2>
          <h3>{totalSold}</h3>
            <h2 className='statisticsh2'> stocked Items </h2>
          <h3>{notSold}</h3>
       </div>
    </div>
  );
}

export default ChartTwo;