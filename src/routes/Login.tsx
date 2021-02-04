
import React, { useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FireContext } from '../App';

interface TripType {
  participants: {
    driver: number;
    name: string;
    drivingWith: string;
  };
  passphrase: string;
  title: string;
  description: string;
}

export default function Trip() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [tripData, setTripData] = useState<TripType | null>(null);
  const { id } = useParams<{ id: string }>();
  const firebase = useContext(FireContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    firebase?.storage.collection('trips')
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) throw new Error('No such trip')
        return doc;
      })
      .then((doc) => doc.data())
      .then((tripData) => {
        if (tripData?.passphrase !== input) throw new Error('Bad secret')
        setTripData(tripData as TripType)
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <p>Loading..</p>
        ) : (
            <>
              <p>
                <code>Enter your passphrase</code> 🙈
              </p>
              <div className="row">
                <form onSubmit={submit}>
                  <input onChange={handleChange} value={input} placeholder="Secret" type="password" />
                  <button>Go!</button>
                </form>
              </div>
            </>
          )}
      </header>
    </div>
  );
}