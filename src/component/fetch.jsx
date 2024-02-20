import { useState, useEffect } from 'react';
import styled from 'styled-components';


const Input = styled.input`
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  width: 300px;
  background-color: green;
  align-items: center;

  &::placeholder {
    color: white;
  }
`;





async function fetchData(param) {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=10af19ed528f4c92a0bf4526da1a5cfe&query=${param}`);
    const data = await response.json();
    return data;
  }
  
  
  
  
  
  function getData() {
  
   const [foodData, setFoodData] = useState(null)
   const[searchQuery, setSearchquery] = useState('');
    useEffect(() => {
      const getDataandSetState = async () => {
        try {
          const result = await fetchData(searchQuery);
          setFoodData(result);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
  
      getDataandSetState();
    }, [searchQuery]);
    return (
     
     <div>
      <Input type="text" value={searchQuery} onChange={((event)=> setSearchquery(event.target.value))} placeholder='enter name food'  />
      {foodData ? (
        <ul style={{ listStyle: 'none' }}>
          {foodData.results.map((food) =>(
            <li key={food.id}>
              <img src={food.image} alt={food.title} style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px', margin: '10px'}} />
              <p style={{border: '1px solid black', borderRadius: '10px', padding: '10px',backgroundColor: 'green'}}>ID : {food.id}
              - <span>{food.title}</span></p>
              
            </li>
            
            ) )}
        </ul>
      ) : (
        <p>Loading...</p>
      )
      }
      </div>
      
    );
  }
  
  export default getData
  