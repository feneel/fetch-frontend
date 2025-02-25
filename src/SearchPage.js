import React, { useState, useEffect } from 'react';
const API_BASE_URL = "https://frontend-take-home-service.fetch.com";


export function SearchPage({ user }) {
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [dogs, setDogs] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [pagination, setPagination] = useState({ next: null, prev: null, total: 0, from: 0 });
    const pageSize = 25;
    

    
    useEffect(() => {
      fetch(`${API_BASE_URL}/dogs/breeds`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setBreeds(data))
        .catch(err => console.error("Error fetching breeds:", err));
    }, []);
  
    
    const fetchDogs = (from = 0) => {
      let query = new URLSearchParams();
      if (selectedBreed) {
        query.append('breeds', selectedBreed);
      }
      query.append('size', pageSize);
      query.append('from', from);
      query.append('sort', `breed:${sortOrder}`);
  
      fetch(`${API_BASE_URL}/dogs/search?${query.toString()}`, { credentials: 'include' })
        .then(res => res.json())
        .then(async (data) => {
          
          setPagination({ next: data.next, prev: data.prev, total: data.total, from });
          
          const dogsResponse = await fetch(`${API_BASE_URL}/dogs`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data.resultIds)
          });
          const dogsData = await dogsResponse.json();
          setDogs(dogsData);
        })
        .catch(err => console.error("Error fetching dogs:", err));
    };
  
    
    useEffect(() => {
      fetchDogs();
    }, [selectedBreed, sortOrder]);
  
    const handleBreedChange = (e) => {
      setSelectedBreed(e.target.value);
    };
  
    const toggleFavorite = (dogId) => {
      setFavorites(prev =>
        prev.includes(dogId) ? prev.filter(id => id !== dogId) : [...prev, dogId]
      );
    };
  
    const handleMatch = async () => {
      if (favorites.length === 0) {
        alert("Please select at least one dog as a favorite to generate a match.");
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/dogs/match`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(favorites),
        });
        if (res.ok) {
          const data = await res.json();
          
          alert(`You've been matched with dog ID: ${data.match}`);
        } else {
          alert("Error generating match. Please try again.");
        }
      } catch (err) {
        console.error("Match error:", err);
        alert("Error generating match. Please try again.");
      }
    };
  
    
    const handlePagination = (direction) => {
      if (direction === 'next' && pagination.next) {
        const params = new URLSearchParams(pagination.next);
        const newFrom = Number(params.get('from') || 0);
        fetchDogs(newFrom);
      } else if (direction === 'prev' && pagination.prev) {
        const params = new URLSearchParams(pagination.prev);
        const newFrom = Number(params.get('from') || 0);
        fetchDogs(newFrom);
      }
    };
  
    return (
      <div className="search-container">
        <h2>Welcome, {user.name}</h2>
        <div className="filters">
          <label>
            Filter by Breed:
            <select value={selectedBreed} onChange={handleBreedChange}>
              <option value="">All</option>
              {breeds.map((breed, index) => (
                <option key={index} value={breed}>{breed}</option>
              ))}
            </select>
          </label>
          <label>
            Sort by Breed:
            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
        <div className="dog-list">
          {dogs.map(dog => (
            <div key={dog.id} className="dog-card">
              <img src={dog.img} alt={dog.name} />
              <div className="dog-info">
                <h3>{dog.name}</h3>
                <p>Breed: {dog.breed}</p>
                <p>Age: {dog.age}</p>
                <p>ZIP Code: {dog.zip_code}</p>
                <button onClick={() => toggleFavorite(dog.id)}>
                  {favorites.includes(dog.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {pagination.prev && <button onClick={() => handlePagination('prev')}>Previous</button>}
          {pagination.next && <button onClick={() => handlePagination('next')}>Next</button>}
        </div>
        <div className="match-section">
          <button onClick={handleMatch}>Generate Match</button>
        </div>
      </div>
    );
  }
  