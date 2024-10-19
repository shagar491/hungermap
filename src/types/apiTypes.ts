// src/types/apiTypes.ts

export interface IPCPeak {
  iso3: string;
  country_name: string;
  analysis_type: string;
  analysis_date: string;
  analysis_period_from: string;
  analysis_period_to: string;
  analyzed_population_number: number;
  phase_3_number: number;
  phase_3_percent: number;
  phase_4_number: number;
  phase_4_percent: number;
  phase_5_number: number;
  phase_5_percent: number;
  phase_3_plus_number: number;
  phase_4_plus_number: number;
  source: string;
}

export interface IPCResponse {
  statusCode: string;
  ipc_peaks: IPCPeak[];
}

export interface HazardResponse {
  // Define the structure of the Hazard response here
}

export interface CountryInfo {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
}

export interface Population {
  number: number;
  year: string;
  source: string;
}

export interface IncomeGroup {
  level: string;
}

export interface CountryData {
  country: CountryInfo;
  population: Population;
  chronic_hunger: any; // Adjust type as needed
  malnutrition: any; // Adjust type as needed
  income_group: IncomeGroup;
}

export interface InfoResponse {
  statusCode: string;
  body: {
    countries: CountryData[];
  };
}
