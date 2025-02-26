import { NonLatinDiagnosesEntries } from '../types';
import diagnoses from '../../data/diagnoses';

const getNonLatinDiagnosesEntries = (): NonLatinDiagnosesEntries => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name
  }));
};

export default {
  getNonLatinDiagnosesEntries 
};
