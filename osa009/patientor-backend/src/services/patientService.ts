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

/*                                                                                 if id not found */
const getPatientEntriesById = (id: string): Patient | undefined => {
  /*
  const patientById = patients.find(p => p.id === id);
  return patientById  ? {
    id: patientById.id,
    name: patientById.name,
    dateOfBirth: patientById.dateOfBirth,
    ssn: patientById.ssn,
    gender: patientById.gender,
    occupation: patientById.occupation,
    entries: patientById.entries
  } : undefined;
  */
  const patientById = patients.find(p => p.id === id);
  return patientById;
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: []
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};


export default {
  getNonSensitivePatientEntries,
  addPatient,
  getPatientEntriesById
};
