# FinBytes task

### `npm install`

To intall all needed packages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### How it works

The stock order app allows users to place Market, Limit, or Stop orders for a stock. It uses a form to collect inputs like number of shares and custom price (for Limit/Stop orders). The app monitors the stock price in "real-time" and instantly simulates execution for Market orders. For Limit and Stop orders, it waits and should automatically execute the order only when the specified price conditions are met. It displays notifications for pending orders (limit and stop) and a modal for market order.

