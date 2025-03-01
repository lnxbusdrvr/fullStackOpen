import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { apiBaseUrl } from '../../constants';
import { Patient } from "../types";

const SinglePatientPage = () => {
  const { id } = useParams<{id: string}>();  // get id from url
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(data);
      } catch (error) {
        console.error("Error occured when fetching patient data", error);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <p>Loading ...</p>;

  const chooseGenderSymbol = (gender: string) => {
    switch(gender) {
      case 'male':
        return <ManIcon titleAccess="Male" />;
      case 'female':
        return <WomanIcon titleAccess="Female" />;
      default:
        return <TransgenderIcon titleAccess="Other" />;
    }
  };

  return (
  <div>
    <h2>{patient.name} {chooseGenderSymbol(patient.gender)}</h2>
    <div>ssn: {patient.ssn}</div>
    <div>Occupation: {patient.occupation}</div>

    <h3>Entries</h3>
    {patient.entries && patient.entries.length > 0 ? (
      patient.entries.map((entry) => (
        <div key={entry.id}>
          <p>{entry.date}: {entry.description}</p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
        </div>
      ))
    ) : (
      <p>No entries available</p>
    )}
  </div>
  );
}


export default SinglePatientPage;

