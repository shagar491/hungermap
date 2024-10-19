// src/types/componentTypes.ts

import { Country } from "./appTypes";

export interface MapProps {
  onClick: (country: string) => void;
  africaMap: string[];
}
export interface DashboardProps {
  country: string;
}
