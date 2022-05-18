import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";

const App = () => {
  const [anouncements, setAnouncements] = useState([]);
  const [newAnouncement, setNewAnouncement] = useState("");

  const sortedAnouncements = anouncements.sort((a, b) => b.id - a.id);

  useEffect(() => {
    axios.get("http://localhost:8080/anouncements").then(response => {
      setAnouncements(response.data);
    })
  }, [])

  const addAnouncement = (anouncement) => {
    if (newAnouncement !== "") {
      axios.post("http://localhost:8080/anouncements", { id: Date.now(), title: anouncement })
        .then(response => {
          setAnouncements([...anouncements, response.data]);
          setNewAnouncement("");
        });

    }
  };

  const deleteAnouncement = (id) => {
    axios.delete(`http://localhost:8080/anouncements/${id}`)
      .then(response => {
        setAnouncements(anouncements.filter((item) => item.id !== id));
      });

  };

  const applyFilter = (e) => {
    const interval = e.target.dataset.interval;

    axios.get(`http://localhost:8080/anouncements/${interval}`)
      .then(response => {
        setAnouncements(response.data);
      });
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Announcement Board</h1>
        <div className="adding_form">
          <input
            value={newAnouncement}
            onChange={(e) => setNewAnouncement(e.target.value)}
            placeholer="Add to the list"
          />
          <button
            onClick={() => {
              addAnouncement(newAnouncement);
            }}
          >
            Add Text
          </button>
        </div>
      </div>
      <div>
        <button data-interval="all" onClick={applyFilter}>All</button>
        <button data-interval="1" onClick={applyFilter}>Today</button>
        <button data-interval="7" onClick={applyFilter}>Last 7 Days</button>
        <button data-interval="30" onClick={applyFilter}>Last 30 Days</button>
      </div>
      <div className="list">
        {sortedAnouncements.map((item) => (
          <div key={item.id}>
            <div>
              {item.title}
            </div>
            <button
              onClick={() => {
                deleteAnouncement(item.id);
              }}
              className="clean"
            >
              Delete
            </button>
          </div>

        ))}
      </div>

    </div>
  );
};

export default App;