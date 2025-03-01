import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, MenuItem } from '@mui/material';

import { apiBaseUrl } from '../../constants';
import { Patient } from '../types';
import { HealthCheckRating } from '../../types';

const HealthCheckEntryPageForm = () => {
  const { id } = useParams<{ id: string }>();  
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [patient, setPatient] = useState<Patient | null>(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(data);
      } catch {
        setError('Error when fetching patient data');
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <p>Error: Patient not found</p>;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newHealthCheckEntry = {
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes: diagnosisCodes.split(',').map(diagCode => diagCode.trim()),
      type: 'HealthCheck', 
    };

    try {
      await axios.post(`${apiBaseUrl}/patients/${id}/entries`, newHealthCheckEntry);
      navigate(-1);
    } catch {
      setError('Error when submitting new entry');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div>
      <h3>New HealthCheck entry</h3>
    {error && (<div style={{color: 'red'}}>{error}</div>)}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label='Description'
          margin='dense'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          label='Date'
          type='date'
          margin='dense'
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          fullWidth
          label='Specialist'
          margin='dense'
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <TextField
          fullWidth
          select
          label="HealthCheck Rating"
          margin="dense"
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(e.target.value)}
        >
          {Object.values(HealthCheckRating)
            .filter(value => typeof value === "number")
            .map(value => (
              <MenuItem key={value} value={value}>
                {HealthCheckRating[value as number]} {/* Show strings to user*/}
              </MenuItem>
            ))
          }
        </TextField>
        <TextField
          fullWidth
          label='Diagnosis codes (comma separated)'
          margin='dense'
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
        />
        <Button variant='contained' color='primary' type='submit'>
          add
        </Button>
        <Button variant='contained' color='secondary' onClick={() => navigate(-1)}>
          cancel
        </Button>
      </form>
    </div>
  );
};

export default HealthCheckEntryPageForm;

