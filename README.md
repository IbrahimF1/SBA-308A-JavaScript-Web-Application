# SBA 308A: JavaScript Web Application

## Accomplishments

I built a fully functional "Article Discovery" engine. The application currently allows a user to browse headlines, click to expand them, and automatically generates unique, formatted content using Google Gemini.

### 1. Backend Infrastructure (Node/Express)
*   Initialized a **TypeScript** backend using Express.js.
*   Configured **Gemini API** integration to generate content dynamically.
*   Created a proxy API endpoint (`/api/generate`) to secure the API key and handle data processing server-side.
*   Implemented `cors` and static file serving to host the frontend.

### 2. Frontend Architecture (TypeScript)
*   Implemented a Modular Architecture using ES Modules.
*   Built a dynamic DOM generation system that renders cards based on data arrays.
*   Integrated the **Marked.js** library to parse raw AI text into HTML.

### 3. User Experience (UX)
*   **Interactive Cards:** Articles start as small summaries and expand to fill the screen upon interaction.
*   **Loading States:** Visual feedback ("Generating article...") ensures the user knows data is being fetched.
*   **Error Handling:** Graceful error messages if the API fails.

---

## SBA 308A Requirement Fulfillment

| Requirement | How We Implemented It | File Location |
| :--- | :--- | :--- |
| **Modular Code** | Split the frontend into three distinct modules:<br>1. `data.ts` (Content)<br>2. `api.ts` (Networking)<br>3. `main.ts` (DOM Logic) | `frontend/modules/` |
| **Fetch / Axios** | Utilized the browser's native `fetch()` API to send POST requests to our backend, passing the article title and subheading. | `frontend/modules/api.ts` |
| **Async / Await** | Use `async/await` to handle the Promise-based nature of the OpenAI/Gemini API and the browser Fetch API, ensuring the UI waits for data before rendering. | `backend/server.ts`<br>`frontend/modules/main.ts` |
| **External API** | The backend communicates with Gemini API to create article content. | `backend/server.ts` |
| **User Interaction** | The app features a gallery of clickable cards. Clicking a card triggers a specific API request based on that card's data. | `frontend/modules/main.ts` |
| **HTML/CSS UX** | Used advanced CSS features like `grid-template-columns`, `fixed` positioning for the modal overlay, and CSS transitions. | `frontend/style.css` |
| **Event Loop** | Demonstrated understanding of the event loop by ensuring the UI remains responsive (using Loading text) while the asynchronous network request is pending in the background. | `frontend/modules/main.ts` |

---

## How to Launch the Project Locally

Follow these steps to run the application on your PC.

### 1. Prerequisites
*   **Node.js** installed.
*   An **API Key** from [Google AI Studio](https://aistudio.google.com/api-keys).

### 2. Installation
Open your terminal in the folder where you want the project to live.

```bash
npm install
```

### 3. Configuration
Create a file named `.env` in the root directory.
Paste your API key inside:

```env
API_KEY = Your_Gemini_API_Key
```

### 4. Build
Because browsers cannot understand TypeScript files directly, you must compile them into JavaScript.

```bash
npx tsc
```

### 5. Run
Start the development server.

```bash
npm start
```

### 6. Access
Open your web browser and navigate to:
**http://localhost:3000**
