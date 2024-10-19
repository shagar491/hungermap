// src/types/appTypes.ts

export interface Country {
  id: string;
  name: string;
}

export interface Header {
  id: number;
}

export interface RootState {
  header: Header;
  country: Country;
}

export interface AfricaShape {
  features: {
    properties: {
      admin: string;
    };
  }[];
}
