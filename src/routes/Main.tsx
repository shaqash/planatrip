import React, { useState, useContext } from 'react';
import { FireContext } from '../App';

export default function Main() {
  const [input, setInput] = useState('');
  const firebase = useContext(FireContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async function getTrip() {
      const trip = await firebase?.storage.collection('trips')
        .doc(input)
        .get()
        .then((res) => res.data());
      console.log(trip)
    })();

  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>Join the trip</code>
        </p>
        <div className="row">
          <form onSubmit={submit}>
            <input onChange={handleChange} value={input} placeholder="Trip ID" type="text" />
            <button>Go!</button>
          </form>
        </div>
      </header>
    </div>
  );
}