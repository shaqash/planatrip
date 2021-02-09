
import React, { useState, useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FireContext } from '../App';
import useForm from '../hooks/useForm';

interface Link {
  title: string;
  href: string;
}
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
  details: string;
  links: Link[];
}

export default function Trip() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [tripData, setTripData] = useState<TripType | null>(null);
  const { id } = useParams<{ id: string }>();
  const firebase = useContext(FireContext);
  const [checkbox, setCheckbox] = useState(false);
  const [moreDetails, setMoreDetails] = useState(false);
  const { submit, handleFormChange, values: formData, setValues: setFormData } = useForm<TripParticipant>({
    name: '',
    driver: 0,
    brings: [],
    drivingWith: '',
  }, onSubmit, valueParser)

  function valueParser(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value as string;
    if (e.target.name === 'driver') return Number.isNaN(parseInt(value)) ? 0 : parseInt(value);
    else if (e.target.name === 'brings') return value.replace(' ', '').split(',');
    return value;
  }

  function calcStatus(data: TripType) {
    const seats = data.participants.reduce((acc, cur) => acc + cur.driver - 1, 0);

    return seats;
  }

  function formatItem(item: string, index: number) {
    return index === 0 ? item : `, ${item}`;
  }

  function getWeHave(data: TripType) {
    return data.participants
      .reduce((acc, cur) => acc.concat(cur.brings), [] as string[])
      .map(formatItem);
  }

  function onSubmit() {
    const newParticipants = tripData?.participants.flatMap(
      (person) => person.name === formData.name ? [] : [person]
    ).concat(formData);

    firebase?.storage.collection('trips').doc(id)
      .update({ participants: newParticipants })
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
      brings = [...brings.slice(0, itemIndex), ...brings.slice(itemIndex + 1)];
      return itemIndex === -1;
    }).map(formatItem) || 'Nothing more';
  }

  function changeCheckbox(current: boolean) {
    if (current) {
      setFormData((state) => ({
        ...state,
        driver: 0,
      }));
    }
    setCheckbox(!current);
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
                <i>{formatDate(tripData)}</i>
                <span>{calcStatus(tripData)} seats left</span>
                <p className="max">
                  {tripData.description}{' '}
                  <>
                    <span
                      className="App-link"
                      onClick={() => setMoreDetails(!moreDetails)}>
                      {!moreDetails ? 'More' : 'Less'} details/checklist
                    </span>

                  </>
                </p>
                {moreDetails && <TripDetails data={tripData} />}
                <span className="max"><strong>We need</strong>: {getWeNeed(tripData)}</span>
                <span className="max"><strong>We have</strong>: {getWeHave(tripData)}</span>
                <span className="max">
                  <strong>Going</strong>: {tripData.participants.map((item) => ` ${item.name}${getDriverTitle(item)}`).toString()}
                </span>
                <form onSubmit={submit}>
                  <div className="row">
                    <label><small>Name</small></label>
                    <input required onChange={handleFormChange} value={formData.name} name="name" type="text" placeholder="EYAL!" />
                  </div>
                  <div className="row">
                    <label><small>Brings</small></label>
                    <input required onChange={handleFormChange} value={formData.brings} name="brings" type="text" placeholder={`${tripData?.requirements.slice(0, 3)}...`} />
                  </div>
                  <div>
                    <span>Driver? </span>
                    <input name="driver" onChange={() => changeCheckbox(checkbox)} type="checkbox" />
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

function TripDetails({ data }: { data: TripType }) {

  return (
    <div className="max highlight f09">
      {data.details && <div className="max m-bottom-small">{data.details}</div>}
      <h4 className="left"><i>Links</i></h4>
      <ul className="left">
        {
          data.links.map((link) => <li key={JSON.stringify(link)}><a href={link.href}>{link.title}</a></li>)
        }
      </ul>
      <h4 className="left"><i>Checklist</i></h4>
      <ul className="left">
        {
          data.participants.map((person) => <li>
            <b>{person.name}: </b>{person.brings.toString()}
          </li>)
        }
      </ul>
    </div>
  )
}