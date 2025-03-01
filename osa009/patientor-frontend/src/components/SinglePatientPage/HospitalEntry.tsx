import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';


interface Props {
  entry: {
    id: string;
    date: string; 
    description: string;
    specialist: string;
    discharge: {
      date: string;
      criteria: string;
    }
  }
};


const HospitalEntry = ({ entry }: Props) => {
  return (
    <div key={entry.id} className='entry'>
      <p>
        {entry.date} <LocalPharmacyIcon titleAccess="Hospital" /><LocalHotelIcon titleAccess="Hospital" />
      </p>
      <p>
        {entry.description}
      </p>
    </div>
  );
};


export default HospitalEntry;
