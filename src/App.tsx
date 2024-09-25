import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import StockOrderContainer from "./components/stockOrder/stockOrderContainer";

const headingStyles = {
  color: "#fff",
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00c4ff",
    },
    secondary: {
      main: "#1f233c",
      light: "#2e314d",
    },
    background: {
      default: "#13131d",
    },
  },
  typography: {
    h1: headingStyles,
    h2: headingStyles,
    h3: headingStyles,
    h4: headingStyles,
    h5: headingStyles,
    body1: {
      color: "#fff",
    },
    body2: {
      color: "#ffffff73",
    },
  },
});

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <StockOrderContainer />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

