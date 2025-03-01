import { v1 as uuid } from 'uuid';
import {
  NonSensitivePatientEntry,
  Patient,
  NewPatientEntry,
  EntryWithoutId
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

/*                                                                                 if id not found */
const getPatientEntriesById = (id: string): Patient | undefined => {
  const patientById = patients.find(p => p.id === id);
  return patientById;
};

const addPatient = ( newData: NewPatientEntry ): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...newData,
    entries: []
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: EntryWithoutId): Patient => {
  const patient = patients.find(p => p.id === id);
  if (!patient)
    throw new Error('Patient not found');

  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);
  return patient;
};


export default {
  getNonSensitivePatientEntries,
  addPatient,
  getPatientEntriesById,
  addEntry
};
