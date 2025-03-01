import { NewPatientEntry,
  Gender,
  HealthCheckRating,
  EntryWithoutId  } from './types';
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }).optional(),
});

/*
const HealthCheckRating = z.object({
  Healty: z.string(),
  LowRisk: z.string(),
  HighRisk: z.string(),
  CriticalRisk: z.string()
});
*/

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

const EntrySchema = z.union([
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

export const toNewEntry = (object: unknown): EntryWithoutId => {
  return EntrySchema.parse(object);
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};

