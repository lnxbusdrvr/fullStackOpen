import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { HealthCheckEntry as HealthCheckEntryType, HealthCheckRating } from '../../types'; 

interface Props {
  entry: HealthCheckEntryType;
}

const HealthCheckEntry = ({ entry }: Props) => {

  const colorHeartPicker: Record<HealthCheckRating, string> = {
    [HealthCheckRating.Healthy]: 'green',
    [HealthCheckRating.LowRisk]: 'yellow',
    [HealthCheckRating.HighRisk]: 'orange',
    [HealthCheckRating.CriticalRisk]: 'red'
  };


  return (
    <div key={entry.id} className='entry' >
      <div>{entry.date} <LocalPharmacyIcon titleAccess='HealthCheck' /></div>
      <div>{entry.description}</div>
      <div><FavoriteIcon style={{ color: colorHeartPicker[entry.healthCheckRating] }} /></div>
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HealthCheckEntry;

