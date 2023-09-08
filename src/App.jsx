import React, { useState, useEffect } from 'react';


function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeId);
    };
  }, [value, delay]);

  return debouncedValue;
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 1000);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?limit=100`
      );

      const data = await response.json();
      setPosts(data);

    };

    fetchData();
  }, [debouncedInputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(debouncedInputValue.toLowerCase());
  });

  return (
    <div>
      <h1>OK</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />

      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;