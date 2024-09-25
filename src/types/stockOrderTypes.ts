export interface StockDetails {
  stockSymbol: string;
  price: number;
}

export interface ValidationErrors {
  shares?: string;
  customPrice?: string;
}

