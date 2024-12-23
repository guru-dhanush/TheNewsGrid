# News Aggregator Website - Case study

## Overview
This application is a frontend implementation for a news aggregator website, allowing users to customize and explore news articles from multiple sources in a clean and mobile-responsive interface. The application is built using React.js and utilizes three APIs to fetch news data: The Guardian, The New York Times, and NewsAPI.org.

---

## Features

### 1. Article Search and Filtering
- Users can search for articles by keywords with a 3-second debounce to optimize performance.
- Filter search results by date range, category, or source using a dynamic filter panel.

### 2. Personalized News Feed
- Users can select their preferred news sources, categories, and authors via a preferences panel.
- Preferences are saved in local storage and applied across sessions.
- Ability to reset individual preferences or all preferences at once.

### 3. Mobile-Responsive Design
- The application is fully optimized for mobile devices, ensuring a seamless user experience on any screen size.

### 4. Dark/Light Mode
- The application supports dark and light themes for enhanced user accessibility.
- Users can toggle between dark and light modes, and their preference is saved in local storage.

### 5. News Display
- Headlines are shown in a slider carousel. Clicking a headline redirects the user to the full article in a new tab.
- A discover section displays news articles in cards with a "Read More" button to access the full story.

---

## Tech Stack

### Frontend
- **React.js**: Main framework for building the user interface.
- **React Router**: For navigation and routing.
- **Redux Toolkit**: For state management.
- **Tailwind CSS**: For styling the application.

### APIs Used
- [The Guardian API](https://open-platform.theguardian.com/documentation/)
- [The New York Times API](https://developer.nytimes.com/docs/articlesearch-product/1/overview)
- [NewsAPI.org](https://newsapi.org/docs)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dhnuz/news-aggregator-website.git
   cd news-aggregator-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up API keys:
   - Create a `.env` file in the root directory.
   - Add your API keys for The Guardian, The New York Times, and NewsAPI.org:
     ```env
     VITE_APP_GUARDIAN_API_KEY=<your_guardian_api_key>
     VITE_APP_NYT_API_KEY=<your_nyt_api_key>
     VITE_APP_NEWSAPI_KEY=<your_newsapi_key>
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## Docker Setup
### Commands to Build and Run

1. Build the Docker image:
   ```bash
   docker build -t news-aggregator-website .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 news-aggregator-website
   ```

3. Open the application in your browser at `http://localhost:3000`.

---

## Future Scope

1. **User Authentication**:
   - Implement user login functionality to store preferences on the cloud, allowing users to access them from any device.

2. **Push Notifications**:
   - Introduce notifications to alert users about breaking news or updates in their chosen categories.

3. **Additional APIs**:
   - Expand the range of news sources by integrating more APIs.

4. **Offline Mode**:
   - Enable caching of news articles to provide offline access.

5. **Pagination**:
   - Add pagination to efficiently display larger datasets.

6. **Section for News Without Images**:
   - Create a dedicated section to present articles that lack accompanying images.


**Issues I faced during the assignment**
I came across a number of issues and questions while developing this assignment.

1. **Limited Data Sources**:
   Below three apis had clear documentation and easy to implement  
   - **NewsAPI**
   - **The Guardian**
   - **New York Times**
   
   Below apis had some challenges such has no clear documentation or lacked reliable resources
   - **Open News**
   - **Newscred**
   - **BBC News**

2. **Filter by Author**:
   - After extensive searches, I discovered that filtering by author was not directly supported in the APIs used (Guardian API, News API, and NY Times API). Hence, as a workaround implemented frontend filtering with fetched data.

3. **Dynamic Query Handling**:
   - Each API had distinct query parameters, requiring dynamic API calls and data normalization. Hence constructed dynamic query for these APIs.

4. **Category and Source Filtering**:
   - APIs like NewsAPI, The Guardian, and NY Times had different implementations for filtering by category and sources, which needed to be unified dynamically for consistent results.

5. **Rate Limits**:
   - Developer APIs had a limit of 100 calls per day, which added some constraints on testing and development flexibility.

