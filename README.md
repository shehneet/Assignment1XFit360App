# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



Overview of the App:
XFit360 is a fitness application designed to provide users with a comprehensive experience that includes workout tracking, goal setting, and personalized workout recommendations. It allows users to track their workout progress, view detailed workout information, and navigate through the app's features easily.
The app leverages Firebase services, including Firestore for database management, Firebase Authentication for user management, and Firebase Storage for handling any media if necessary. The app also integrates Firebase Crashlytics for crash monitoring and Firebase Analytics to track user activities.
________________________________________
App Screens:
1. Login Screen (Login.tsx)
•	Purpose: This screen allows users to log in to the app or create a new account. It handles user authentication with Firebase..
•	Main Functionality:
a.	Allows user login via Firebase Authentication.
b.	Allows user registration.
c.	Allows users to log out or delete their account.
d.	Uses Firebase Authentication functions such as signInWithEmailAndPassword, createUserWithEmailAndPassword, and signOut

2. Profile Screen (Profile.tsx)
•	Purpose: This screen displays and manages user profile data, including name, bio, goals, fitness level, and email. It also provides an option to update the profile information.
•	Main Functionality:
a.	Displays the user's profile information.
b.	Allows users to edit their profile (name, bio, goals, and fitness level).
c.	Updates the profile data in Firestore using updateUserProfile.
d.	Allows users to sign out.

3. Workout Library Screen (WorkoutLibrary.tsx)
•	Purpose: This screen displays a list of all available workouts fetched from Firestore. Each workout is presented in a card format with key details like title, category, difficulty, and duration.
•	Main Functionality:
a.	Fetches all workouts from Firestore using fetchWorkouts.
b.	Displays each workout as a clickable card.
c.	Clicking on a workout navigates to the detailed workout screen, showing more information and allowing users to interact (e.g., like the workout, add feedback).

4. Workout Details 
•	Purpose: This screen displays detailed information about a selected workout, including title, category, description, instructions, steps, feedback, and likes.
•	Main Functionality:
a.	Displays detailed information about the selected workout.
b.	Allows users to submit feedback and likes.
c.	Displays the number of likes and feedback associated with the workout.
d.	Updates the likes and feedback in Firestore when a user interacts with them.

5. Progress Screen (ProgressTracker.tsx)
Purpose:
The Progress screen serves as a personalized dashboard for users to visualize their fitness journey. It provides motivational feedback, milestone tracking, and activity summaries to help users stay engaged and consistent in achieving their workout goals.
Main Functionalities:
1.	Workout Summary:
Displays the total number of workouts completed by the user to date.
2.	Dynamic Badges:
a.	Shows a collection of achievement badges.
b.	Each badge is dynamically unlocked based on progress (e.g., completing 1, 5, 10, or 20 workouts).
c.	Badges are tappable to expand and reveal detailed descriptions and progress bars.
d.	Includes URL-based icons for visual engagement and uses simple animation on interaction.
3.	Steps & Heart Points Button:
a.	A visually appealing, clickable button displays simulated daily fitness metrics (steps, heart points, distance).
b.	When tapped, it reveals embedded detailed stats directly within the same screen—no navigation needed.
4.	Animated & Engaging UI:
a.	Smooth transitions and layout animations make the experience more interactive and rewarding.

6. Maps Screen (Maps.tsx)
•	Purpose: This screen displays a map view with markers for fitness locations near the user. The user’s current location is shown on the map, and additional fitness locations (e.g., gyms) are marked for easy access.
•	Main Functionality:
a.	Shows the user's location on a map.
b.	Displays markers for fitness locations nearby, such as gyms and fitness centers.
c.	Provides the user with information about each fitness location by tapping on a marker.

Firebase Integration:
•	Authentication: The app uses Firebase Authentication to manage user sign-up, login, and sign-out. Firebase Auth is used across all screens that require user authentication.
•	Firestore: Firestore is used to store and retrieve data for workouts, user profiles, progress tracking, likes, and feedback. All data, such as workout details and user progress, are fetched from Firestore and displayed in the app.
•	Firebase Crashlytics: Firebase Crashlytics is integrated into the app to monitor crashes and issues in production, ensuring stability.
________________________________________
Technical Details:
•	State Management: We use the useState hook for managing local state, such as form inputs, workout data, user profile data, and progress stats.
•	Data Fetching: Data is fetched from Firestore using the getDocs and getDoc methods. The fetched data is stored in state using the setState method, which triggers re-rendering when the data changes.
•	Navigation: React Navigation is used to navigate between screens. We use stack navigation to move from the WorkoutLibrary screen to the WorkoutDetails screen and other screens.
•	Conditional Rendering: We use conditional rendering (if/else, ternary operators) to display loading indicators, workout details, and user feedback based on the current state of the data.
________________________________________
Summary:
The XFit360 app is well-integrated with Firebase services for authentication, and real-time updates. The app is built using React Native with modern hooks for efficient state management and React Navigation for a smooth user experience. Firebase Firestore powers the core of the app’s data handling, providing users with workout data, progress tracking, and interactive features like liking workouts and leaving feedback.
The app is organized into multiple screens that each serve specific purposes, from logging in and managing user profiles to tracking workout progress and viewing detailed workout information.

