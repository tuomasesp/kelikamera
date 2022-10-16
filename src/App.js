import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const URL = 'https://tie.digitraffic.fi/api/v1/data/camera-data';
function App() {
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([])
  
  useEffect(() => {
    
    const address = URL
    
    axios.get(address)
      .then((response) => { 
        setError(null);
        setIsLoaded(true);
        setItems(response.data.cameraStations[565].cameraPresets)
      }).catch(error => {
        console.log(error)
        alert("Joku vika jossakin.")
      })
  }, [])
  
  
  if (error) {
    return <p>{error.message} </p>
  }
  else if (!isLoaded) {
    return <p>Loading...</p>
  }
  else { 
    return (
    <div className="content">
    <h1>Vartiuksen kelikamerat</h1>
      {items.map(item => ( 
        <div key={item.id}>
          <h3>{item.id} {item.presentationName}</h3>
          <img src={item.imageUrl} alt=''></img>
        </div>
      ))}
    </div>
    );
  }
}

export default App;
