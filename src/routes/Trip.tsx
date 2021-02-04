
import React, { useState, useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FireContext } from '../App';

interface TripParticipant {
  driver: number;
  name: string;
  drivingWith: string;
  brings: string[];
};
interface TripType {
  participants: TripParticipant[];
  passphrase: string;
  title: string;
  description: string;
  requirements: string[];
  startDate: { toDate: () => Date };
  endDate: { toDate: () => Date };
}

export default function Trip() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [tripData, setTripData] = useState<TripType | null>(null);
  const { id } = useParams<{ id: string }>();
  const firebase = useContext(FireContext);
  const [checkbox, setCheckbox] = useState(false);
  const [formData, setFormData] = useState<TripParticipant>({
    name: '',
    driver: 0,
    brings: [],
    drivingWith: '',
  });

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    function parser(value: string) {
      if (e.target.name === 'driver') return parseInt(value);
      else if (e.target.name === 'brings') return value.replace(' ', '').split(',');
      return value;
    } 
    setFormData({
      ...formData,
      [e.target.name]: parser(e.target.value),
    });
  }

  function calcStatus(data: TripType) {
    const seats = data.participants.reduce((acc, cur) => acc + cur.driver - 1, 0);

    return seats;
  }

  function getWeHave(data: TripType) {
    return data.participants.reduce((acc, cur) => acc.concat(cur.brings), [] as string[]).toString();
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    firebase?.storage.collection('trips').doc(id)
      .update({ participants: tripData?.participants.concat(formData) })
      .finally(() => history.push('/thanks'));
  }

  const loadTrip = useCallback(() => {
    firebase?.storage.collection('trips')
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) throw new Error('No such trip')
        return doc;
      })
      .then((doc) => doc.data())
      .then((tripData) => {
        setTripData(tripData as TripType)
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [firebase?.storage, id]);

  function getDriverTitle(participant: TripParticipant) {
    return participant.driver > 0 ? '🚘' : '';
  }

  function formatDate(data: TripType) {
    if (data.startDate && data.endDate)
      return `${data.startDate.toDate().toLocaleDateString('he-IL')}-${data.endDate.toDate().toLocaleDateString('he-IL')}`;
    return '';
  }

  function getWeNeed(data: TripType) {
    let brings = data.participants.reduce((acc, cur) => acc.concat(cur.brings), [] as string[]);

    return data.requirements.filter((req) => { 
      const itemIndex = brings.findIndex((bring) => bring === req);
      brings = [...brings.slice(0, itemIndex), ...brings.slice(itemIndex+1)];
      return itemIndex === -1;
    }).toString() || 'Nothing more';
  }

  React.useEffect(() => loadTrip(), [loadTrip]);

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <p>Loading..</p>
        ) : (
            tripData && !error ? (
              <>
                <span className="chungus">{tripData.title}</span>
                <span>{calcStatus(tripData)} seats left</span>
                <p>
                  {tripData.description}
                  <br />
                  {formatDate(tripData)}
                  <br />
                  <strong>We have</strong>: {getWeHave(tripData)}
                  <br />
                  <strong>We need</strong>: {getWeNeed(tripData)}
                  <br />
                  <strong>Going</strong>: {tripData.participants.map((item) => ` ${item.name} ${getDriverTitle(item)}`).toString()}
                </p>
                <form onSubmit={submit}>
                  <div className="row">
                    <input required onChange={handleFormChange} value={formData.name} name="name" type="text" placeholder="Name" />
                  </div>
                  <div className="row">
                    <input required onChange={handleFormChange} value={formData.brings} name="brings" type="text" placeholder={`${tripData?.requirements.slice(0, 3)}...`} />
                  </div>
                  <div>
                    <span>Driver? </span>
                    <input name="driver" onChange={() => setCheckbox((state) => !state)} type="checkbox" />
                  </div>
                  <div className="row" style={{ visibility: !checkbox ? 'collapse' : 'visible' }}>
                    <input onChange={handleFormChange} name="driver" type="text" value={formData.driver !== 0 ? formData.driver : ''} placeholder="Passengers (number)" />
                  </div>
                  <div>
                    <button type="submit">You son of a bitch, I'm in! <span className="chungus">👈</span></button>
                  </div>
                </form>
              </>
            ) : <p>{error ? error : 'No such trip'}</p>
          )}
      </header>
    </div>
  );
}