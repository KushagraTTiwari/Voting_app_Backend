# Voting App

## Overview
The **Voting App** is a full-stack application designed to provide a secure and user-friendly voting platform. Users can sign up, log in, and cast votes for their preferred candidates. The app also includes an admin panel for managing candidates and monitoring voting activities.

## Features
### User Features
- **Signup and Login**: New users can register, and existing users can log in.
- **Voting**: Logged-in users can vote for their preferred candidates.
- **Vote Tracking**: Users can view the vote count for each candidate.
- **Profile Management**: Users can view and update their profile, including changing their password.

### Admin Features
- **Candidate Management**: Admins can add, update, and delete candidate profiles.

### Authentication
- **Secure Access**: Only logged-in users can vote or access their profile.
- **Admin Access**: Only admins have the ability to manage candidates.
- **JWT (JSON Web Token)**: Used for secure user authentication and authorization.

## Technology Stack
The application is built using the following technologies:

### Backend
- **Node.js**: For server-side programming.
- **Express.js**: For handling API requests.

### Database
- **MongoDB**: For data storage.

### Security
- **JWT (JSON Web Token)**: For secure user authentication and authorization.

## Routes

### User Activity
- **Signup**: POST `/user/signup`
- **Login**: POST `/user/login`
- **Profile**: GET `/user/profile` (requires token)
- **Update Password**: GET `/user/profile/password` (requires token)
- **Vote Candidate**: POST `/candidate/vote/:candidateId` (requires token)
- **Vote Count**: GET `/candidate/vote/count` (requires token)

### Admin Activity
- **Add Candidate**: POST `/candidate/` (requires token)
- **Update Candidate**: PUT `/candidate/:candidateId` (requires token)
- **Delete Candidate**: DELETE `/candidate/:candidateId` (requires token)

## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/KushagraTTiwari/Voting_app_Backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd voting_app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

5. Start the MongoDB server:
   ```bash
   mongod
   ```

6. Start the application:
   ```bash
   node server.js
   ```

7. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## How to Use
### For Users
1. **Sign Up**: Create a new account on the signup page.
2. **Log In**: Log in with your credentials to access the app.
3. **Vote**: Cast your vote for a candidate of your choice.
4. **View Results**: See the vote count for each candidate.
5. **Profile Management**: Update your profile details and change your password if needed.

### For Admins
1. **Add Candidates**: Create new candidate profiles.
2. **Update Candidates**: Modify candidate information.
3. **Delete Candidates**: Remove candidate profiles as needed.



## Contact
For any inquiries, reach out at: kushagratiwari811@gmail.com

