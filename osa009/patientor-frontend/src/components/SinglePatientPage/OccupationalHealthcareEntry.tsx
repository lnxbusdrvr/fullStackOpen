import BuildCircleIcon from '@mui/icons-material/BuildCircle';

interface Props {
  entry: {
    id: string;
    date: string; 
    description: string;
    specialist: string;
    employerName: string;
    sickLeave?: {
      startDate: string;
      endDate: string;
    }
  }
};


const OccupationalHealthcareEntry = ({ entry }: Props) => {


  return (
    <div key={entry.id} className='entry' >
      <div>{entry.date} <BuildCircleIcon titleAccess='occupation' /> {entry.employerName}</div>
      <div>{entry.description}</div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};


export default OccupationalHealthcareEntry;
