import { v1 as uuid } from 'uuid';
import {
  NonSensitivePatientEntry,
  Patient,
  NewPatientEntry
} from '../types';
import patients from '../../data/patients';

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, dateOfBirth, name, gender, occupation }) => ({
    id,
    dateOfBirth,
    name,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};


export default {
  getNonSensitivePatientEntries,
  addPatient 
};
