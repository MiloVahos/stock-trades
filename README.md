# STOCK TRADES

## Description

This backend app was made with the stack Express - Mongo using Mongoose ORM. The app has the following endpoints

- POST _/trades_ add a new trade 
- GET _/trades_ get all the trades
- GET _/trades/users/:id_ get all the trades of the user with _id_
- DELETE _/erase_ delete all trades
- GET _/stocks/:symbol/trades?type={TradeType}&start={StartDate}&end={EndDate}_ get all trades between start and end date that have symbol and type
- GET _/stocks/:symbol/price?start={StartDate}&end={EndDate}_ get the **highest** and the **lowest** price between start and end date for symbol 

## HOW TO USE

1. The app needs a mongodb instance with a database called **stock**
2. The database must have a collection called **trades**
3. run cmd: npm install
4. run cmd: npm start
5. You should see Listening on port 3000 in your terminal