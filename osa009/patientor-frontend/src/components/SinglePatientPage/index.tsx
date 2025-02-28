import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        return <span title="male">&#9794;</span>; // ♂️ (U+2642)
      case 'female':
        return <span title="female">&#9792;</span>; // ♀️ (U+2640)
      default:
        return <span title="other">&#9893;</span>; // ⚧️ (U+26A7)
    }
  };

  return (
    <div>
      <h2>{patient.name} {chooseGenderSymbol(patient.gender)}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
    </div>
  );
};

export default SinglePatientPage;

