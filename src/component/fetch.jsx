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


async function fetchData(param, offset) {
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=10af19ed528f4c92a0bf4526da1a5cfe&query=${param}&offset=${offset}`);
  const data = await response.json();
  return data;
}

  
  
function getData  ()  {
  const [foodData, setFoodData] = useState(null);
  const [searchQuery, setSearchquery] = useState('');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const getDataandSetState = async () => {
      try {
        const result = await fetchData(searchQuery, offset);
        setFoodData(result);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    getDataandSetState();
  }, [searchQuery, offset]);

  const formatFoodTitle = (title) => {
    return title.length > 20 ? title.substring(0, 20) + "..." : title;
  };

  const handleRefreshFood = () => {
    setOffset(offset + 10); 
  };

  return (
   
    <div className =' w-full flex flex-col items-center'>
      <Input className='hover:cursor-pointer hover:bg-green-500 hover:text-white'
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchquery(event.target.value)}
        placeholder="enter name food"
      />
      <button className='bg-green-800 rounded px-5 py-2 mt-5 hover:bg-green-500 text-white'>Search</button>
      
      {foodData ? (
        <div>
          <ul className="flex flex-wrap gap-10 mt-5">
            {foodData.results.map((food) => (
              <li key={food.id} className="flex flex-col items-center">
                <img src={food.image} alt={food.title} className="w-40 rounded h-30 my-auto mx-auto" />
                <p className="mt-5">ID- {food.id}</p>
                <p className="food-title">{formatFoodTitle(food.title)}</p>
              </li>
            ))}
          </ul>
          <button className='bg-green-800 rounded px-5 py-2 mt-6 hover:bg-green-500 text-white' onClick={handleRefreshFood}>Refresh food</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default getData;
