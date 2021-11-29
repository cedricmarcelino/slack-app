import {useState} from 'react';
import JSONDATA from '../MOCK_DATA.json'

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    
  return (
    <div className="wala pa">
      <input type="text" placeholder="Search..." onChange={event=>{setSearchTerm(event.target.value)}}/>
      {JSONDATA.map((item, index)=> {
          if (searchTerm == '') {
              return null
          }
          else if (item.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return <div key = {index}>{item.first_name}</div>
          }
      })
      }
    </div>
  );
}

export default SearchBar