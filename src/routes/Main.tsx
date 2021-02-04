import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Main() {
  const [input, setInput] = useState('');
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/trip/${input}`)
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