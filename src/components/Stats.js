import React, { useState, useEffect } from 'react';

function Stats() {
  const [month, setMonth] = useState('3'); 
  const [trans, setTrans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  

  async function loadTrans(){
    try {
      const response = await fetch(
        `https://rox-48n5.onrender.com/api/data/fetch`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      
      const filtTrans = data.filter((trns) => {
        const transactionMonth = new Date(trns.dateOfSale).getMonth() + 1; 
        return transactionMonth.toString() === month;
      });

    
      const schTrans = filtTrans.filter((trns) => {
        return (
          trns.title.toLowerCase().includes(searchText.toLowerCase()) ||
          trns.description.toLowerCase().includes(searchText.toLowerCase()) ||
          trns.price.toString().includes(searchText)
        );
      });

      setTrans(schTrans);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };
  useEffect(() => {
    loadTrans();
  }, [month, currentPage]); 
  
  function handleSearch(event){
    setSearchText(event.target.value);
  };

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  };
  function handleMonth(event){
    setMonth(event.target.value);
  };

  function handlePrevPage(){
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{paddingLeft:'24%'}} className='maincontainer'>
      <h1 style={{marginLeft:'40%',backgroundColor:"white",borderRadius:"100%",width:"200px",height:"155px",paddingTop:"100px"}} >Transactions Dashboard</h1>
      <input style={{marginLeft:"80%",position:'absolute',marginLeft:"15%"}}
        type="text"
        placeholder="Search Transaction"
        value={searchText}
        onChange={handleSearch}
      />
       <select style={{width:"200px",position:'relative'}} value={month} onChange={handleMonth}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={(i + 1).toString()}>
            {new Date(0, i).toLocaleString('default', { month: 'long' })}
          </option>
          
        ))}
        
      </select>
    
      <table>
        <thead>
          <tr style={{backgroundColor:"black"}}>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
            <th>Ordered At</th>
          </tr>
        </thead>
        <tbody>
          {trans.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>
                <img src={transaction.image} alt={transaction.title} />
              </td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>{transaction.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className='buttontable'  onClick={handleNextPage}>Next</button>
        <button className='buttontable' onClick={handlePrevPage}>Previous</button>
      </div>
    </div>
  );
}

export default Stats;