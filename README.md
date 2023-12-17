# Student LMS with Gamification, Recommendation, and Personalized Learning Path

<video src="client\public\hackverse.mp4" controls title="Student LMS"></video>

## Introduction

Welcome to the Student Learning Management System (LMS) project! This comprehensive platform incorporates gamification, personalized learning paths, and a recommendation system to enhance the overall learning experience. The project consists of two main components: the Node.js server with MongoDB (running on port 8000) serving as the main backend, and the Flask API (running on port 5000) providing course recommendations to the React client.

## Backend (Node.js Server with MongoDB)

### Features

- **Courses Management**: Create, retrieve, update, and delete courses.
- **User Authentication**: Secure user authentication using JWT tokens.
- **Student Profiles**: Store and manage student profiles with detailed information.
- **Enrollment Tracking**: Track course progress, completion status, and student interests.
- **Event Management**: Events and workshops management/registration for students

### Gamification

- **Rating and Reviews**: Allow students to rate and review courses.
- **Completion Tracking**: Monitor and celebrate course completion achievements.
- **Points System**: Implement a points-based system for gamification rewards.

### Recommendation System

- **Intelligent Course Suggestions**: Recommend courses based on student interests, enhancing the learning experience.
- **Personalized Learning Paths**: Tailor learning paths based on individual preferences and progress.
- **Cosine Similarity Algorithm**: Utilize cosine similarity to calculate course relevance.

### Usage

1. Install Node.js and npm: [Node.js Downloads](https://nodejs.org/en/download/)
2. Navigate to the Node.js server directory.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the Node.js server:

   ```bash
   npm start
   ```

   The Node.js server runs on `http://localhost:8000` by default.

### Recommendations 

1. Navigate to the recommendations directory
2. Create virtual environment

    ```bash
    cd recommendations

    python -m venv venv
    .venv/Scripts/activate

    pip install -r requirements.txt
    ```

3. Run the Flask API on 5000 port:
    ```bash
    python course_recommender.py
    ```

4. The API returns the recommendations of the courses based on the interests provided by the user

    ```bash
    GET http://127.0.0.1:5000/recommendations?user_email=testuser@gmail.com
    ```

    ```bash
    {"recommendedCourses": [{"_id": "657dfd8327bd4eeac3b160de", "title": "Web Development for Begineers", "description":
    "This is a brand new web dev course for beginners", "slug": "web-development-for-begineers", "domain": "web
    development", "owner": "657d96853c49dea888c6e47d", "coverImage":
    "https://s3.ap-south-1.amazonaws.com/assets.advantagecommunity.in/course/1702755707016.jpg", "instructors": [], "price":
    0, "totalLectures": 20, "enrolledStudents": [], "sections": [], "ratings": [], "createdAt":
    "2023-12-16T19:41:55.196000", "updatedAt": "2023-12-16T19:41:55.196000", "__v": 0}]}
    ```

### Connecting to React Client

Ensure that your React client is configured to make API requests to both the Node.js server (running on `http://localhost:8000`) and the Flask API (running on `http://localhost:5000`). The Flask API provides course recommendations to the React client.

## Frontend (React Client)

### Features

- **User Authentication**: Secure user login and registration using JWT tokens.
- **Course Exploration**: Browse and view available courses with detailed information.
- **Enrollment**: Enroll in courses and track progress.
- **Profile Management**: Update and manage user profiles with educational information and interests.

### Gamification

- **Rating and Reviews**: Provide ratings and reviews for completed courses.
- **Points Display**: Showcase accumulated points and gamification rewards.

### Recommendations Integration

- **Course Recommendations Display**: Dynamically display course recommendations based on user interests.
- **Recommendation Refresh**: Periodically update recommendations for enhanced accuracy.

### Personalized Learning Path Integration (Not Provided)

- **Learning Path Display**: Showcase personalized learning paths generated using OpenAI's GPT-3.5 Turbo.
- **User Query Submission**: Allow users to submit queries for learning path generation.

### Usage

1. Install Node.js and npm: [Node.js Downloads](https://nodejs.org/en/download/)
2. Navigate to the React client directory.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the React application:

   ```bash
   npm start
   ```

   The React client runs on `http://localhost:3000` by default.

### Additional Notes

- **Backend CORS**: If CORS issues arise, make sure to configure the Node.js server and Flask API to allow requests from the React client's origin.

- **Learning Path Integration**: Uncomment and integrate the learning path endpoint in the Node.js server to enable learning path generation based on user queries using OpenAI's GPT-3.5 Turbo.

---
