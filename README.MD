# Frontend Task Essentially AI

## Steps to run the project
1. Clone the repo
2. Fill proper env variables in `.env` file in client and server folder, take a look at `.env.example` for reference
3. install all dependencies on client and server side
4. Run both client's and server's server

## Overview
The task is to build a webpage to display the trade statistics (Open, High, Low, Close, Volume) of a particular stock for a particular day. You should use Polygon free tier API for this task (https://polygon.io/)

## Server side task
1. Basic setup of the server was already there, I used Axios to fetch data from `polygon.io`.
2. Fetching relevant data from API provided as a response from /api/fetchStockDetails to the client

## Client side task
1. Made a form which takes stock symbol and date of which we need to find information of
2. submit calls our backend and fetches the data and show it on screen below the form

## Edge cases handled and Better UX
1. If form empty no request is been send
2. showing error and success flash messages on screen
3. handled proper status and message from backend side
