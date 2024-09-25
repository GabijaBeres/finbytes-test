import { useQuery } from "@tanstack/react-query";

type Props = {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  latest_trading_day: string;
  previous_close: string;
  change: string;
  change_percent: string;
};

type AlphaVantageResponse = {
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  };
};

//The API does not support websockets, so used polling instead for "real-time" fetching experience, however it would be not efficient for bigger apps
export default function useFetchStock() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const { error, data, isLoading } = useQuery<Props>({
    queryKey: ["stockData"],
    queryFn: async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${apiKey}`
      );
      const json: AlphaVantageResponse = await response.json();

      const globalQuote = json["Global Quote"];

      const transformedData: Props = {
        symbol: globalQuote["01. symbol"],
        open: globalQuote["02. open"],
        high: globalQuote["03. high"],
        low: globalQuote["04. low"],
        price: globalQuote["05. price"],
        latest_trading_day: globalQuote["07. latest trading day"],
        previous_close: globalQuote["08. previous close"],
        change: globalQuote["09. change"],
        change_percent: globalQuote["10. change percent"],
      };

      return transformedData;
    },
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  return { error, data, isLoading };
}

