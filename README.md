# Algorithm Visualizer

An interactive web application that visualizes sorting algorithms in real-time. This project helps users understand how different sorting algorithms work by providing step-by-step visualizations.

## Features

- **Real-time Algorithm Visualization**: Watch sorting algorithms execute step-by-step with visual feedback
- **Multiple Sorting Algorithms**: Support for various sorting algorithms starting from Bubble Sort
- **Interactive UI**: User-friendly interface built with React for smooth interactions
- **RESTful API**: Backend API for handling sorting requests and algorithm logic
- **Responsive Design**: Works seamlessly across different screen sizes
- **Step-by-Step Execution**: Pause, play, and step through algorithm execution
- **Performance Metrics**: Track algorithm performance with time complexity visualizations

## Technologies Used

### Backend
- **Framework**: Spring Boot 3.5.11
- **Language**: Java 17
- **Build Tool**: Maven
- **Additional Libraries**: 
  - Spring Web Starter (REST APIs)
  - Lombok (reduce boilerplate code)
  - Spring Boot DevTools (development experience)

### Frontend
- **Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.0
- **Linter**: ESLint 9.39.4
- **Language**: JavaScript (ES modules)

## Installation

### Prerequisites
- Java 17 or higher
- Node.js 16+ and npm
- Maven (or use the included `mvnw` script)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd algovisual
   ```

2. Build the project using Maven:
   ```bash
   ./mvnw clean install
   # or on Windows
   mvnw.cmd clean install
   ```

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend server will start at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

4. For production build:
   ```bash
   npm run build
   ```

## Project Structure

```
Algorithm Visualizer/
├── README.md                          # Project documentation
├── .gitignore                         # Git ignore rules
├── algovisual/                        # Backend (Spring Boot)
│   ├── pom.xml                        # Maven configuration
│   ├── mvnw & mvnw.cmd               # Maven wrapper scripts
│   ├── src/
│   │   ├── main/java/com/algorithmvisualizer/algovisual/
│   │   │   ├── AlgovisualApplication.java          # Main Spring Boot app
│   │   │   ├── algorithm/
│   │   │   │   └── BubbleSort.java                # Bubble Sort algorithm implementation
│   │   │   ├── controller/
│   │   │   │   └── SortingController.java         # REST API endpoints
│   │   │   ├── model/
│   │   │   │   ├── SortRequest.java               # Request DTO
│   │   │   │   └── SortStep.java                  # Sorting step representation
│   │   │   └── service/
│   │   │       └── SortingService.java            # Business logic for sorting
│   │   └── resources/
│   │       ├── application.properties             # Spring configuration
│   │       ├── static/                            # Static resources
│   │       └── templates/                         # Template files
│   └── target/                        # Compiled output (Maven build)
│
└── frontend/                          # Frontend (React + Vite)
    ├── package.json                   # npm dependencies
    ├── vite.config.js                # Vite configuration
    ├── eslint.config.js              # ESLint rules
    ├── index.html                    # Entry HTML file
    ├── src/
    │   ├── main.jsx                  # React entry point
    │   ├── App.jsx                   # Root component
    │   ├── index.css                 # Global styles
    │   ├── components/               # Reusable React components
    │   ├── hooks/                    # Custom React hooks
    │   ├── pages/
    │   │   └── SortingPage.jsx       # Main sorting visualization page
    │   └── services/                 # API services
    ├── public/                        # Public assets
    └── dist/                          # Production build output (Vite)
```

## What Has Been Done Till Now

### ✅ Project Initialization
- ✅ Created monorepo structure with separate backend and frontend
- ✅ Set up Spring Boot 3.5.11 backend with Java 17
- ✅ Set up React 19.2.4 frontend with Vite build system
- ✅ Configured Maven for backend builds
- ✅ Configured npm and Vite for frontend builds

### ✅ Backend Development
- ✅ Created Spring Boot application (`AlgovisualApplication.java`)
- ✅ Implemented BubbleSort algorithm (`BubbleSort.java`)
- ✅ Created SortingController with REST endpoints
- ✅ Defined data models:
  - `SortRequest.java` - For incoming sort requests
  - `SortStep.java` - For representing sorting steps
- ✅ Implemented SortingService for business logic
- ✅ Configured Spring Boot application properties

### ✅ Frontend Development
- ✅ Created React application structure with Vite
- ✅ Set up routing with SortingPage component
- ✅ Configured ESLint for code quality
- ✅ Established project structure for components, hooks, and services
- ✅ Created service layer for API communication

### ✅ DevOps & Configuration
- ✅ Created `.gitignore` file for both backend and frontend
- ✅ Configured Maven wrapper for easy builds
- ✅ Set up Vite development server configuration
- ✅ Configured ESLint for code linting

### 🔄 Development Status
- **Backend**: Core structure ready, algorithm implementations started
- **Frontend**: Project scaffolding complete, component structure established
- **API Integration**: Service layer ready for backend integration

## API Endpoints

### Sorting Endpoints
- `POST /api/sort/bubble` - Execute bubble sort on provided array
  - Request body: `{ array: [number, ...] }`
  - Response: Array of sorting steps with state changes

## Running Both Services

For development with both services running:

1. **Terminal 1 - Backend**:
   ```bash
   cd algovisual
   ./mvnw spring-boot:run
   ```

2. **Terminal 2 - Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

Then open `http://localhost:5173` in your browser to access the application.

## Future Enhancements

- [ ] Add more sorting algorithms (Quick Sort, Merge Sort, Heap Sort, etc.)
- [ ] Implement algorithm comparison view
- [ ] Add time and space complexity analysis
- [ ] Implement custom array input and visualization speed control
- [ ] Add sound effects for algorithm steps
- [ ] Implement dark mode
- [ ] Add tutorial system
- [ ] Deploy to cloud (Azure, AWS, Heroku)

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Last Updated**: March 2026
