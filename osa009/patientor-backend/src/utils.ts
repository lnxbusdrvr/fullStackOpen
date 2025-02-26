import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation))
    throw new Error('Incorrect occupation');

  return occupation;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender))
    throw new Error('Incorrect or missing gender:' + gender);

  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn))
    throw new Error('Incorrect ssn');

  return ssn;
};

const isDateOfBirth = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDateOfBirth(dateOfBirth))
    throw new Error('Incorrect date:' + dateOfBirth);

  return dateOfBirth;
};

const parseName = (name: unknown): string => {
  if (!isString(name))
    throw new Error('Incorrect name: ' + name);

  return name;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object')
    throw new Error('Incorrect or missing data');

  if ('occupation' in object && 'gender' in object
    && 'ssn' in object && 'dateOfBirth' in object && 'name' in object) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };
    return newEntry;
  };
  throw new Error('Incorrect data: some field are missing');
};
