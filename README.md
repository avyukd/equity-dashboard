# Equity Dashboard

A personal dashboard to help me keep track of my investments. Built with FastAPI and React. Backend here: https://github.com/avyukd/equity-dashboard-backend. 

To run locally: 
- frontend: yarn start
- backend: uvicorn main:app

## Motivation

A lot of my personal investment research (valuations, company notes, portfolio size, charts, etc.) was disorganized and hard to find and manage. To solve this problem, I'm building the Equity Dashboard, a centralized platform that helps me manage my investments. 

## Features
- Semantic search over bookmarked investment research (using OpenAI GPT-3)
- Dashboards for various investment themes. Each dashboard includes a number of equities which are updated daily against their valuations from the backend
- General market indicators updated daily (shiller PE, margin debt YOY, fear/greed index, SP500/DOW/NASDAQ movement)
- Commodities supply/demand model (currently only for Uranium)
- Watchlist (currently stored in SQLite, migrating to MongoDB)

### Working on adding...
- Functioning cache
- Note taking space for individual equities (using Draft.js)
- Auto-updated bookmarking (using chrome extension)
- More investment themes and supply/demand models (oil, china tech) 
- Sign-in + deployment to share with others

## Walk-through
