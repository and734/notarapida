

This is a NextJS starter in Firebase Studio, specifically configured for **Nota Rapida**, a simple and efficient note-taking application.

Nota Rapida is designed to provide a streamlined note-taking experience with a focus on speed and clarity.

## Features

*   **Create and Manage Notes:** Easily add, edit, and delete notes.
*   **Organized Note List:** View your notes in a clear and concise list.
*   **Rich Text Editing:** Utilize a simple text editor for formatting your notes.
*   **Mobile Responsiveness:** Designed to work well on both desktop and mobile devices.
*   **Theme Toggle:** Switch between light and dark themes for a personalized experience.

## Style Guidelines

Nota Rapida follows a clean and minimalist design philosophy.

*   **Color Palette:** Utilizes a limited and harmonious color scheme to maintain visual simplicity.
*   **Typography:** Employs readable and modern fonts for clear text presentation.
*   **Layout:** Features a clean and uncluttered layout with ample whitespace.
*   **Component Styling:** Uses Tailwind CSS for styling components, ensuring consistency and ease of customization. Shadcn UI components are integrated for pre-built, styled UI elements.

## Getting Started

1.  Clone this repository.
2.  Install dependencies: `npm install`
3.  Run the development server: `npm run dev`
4.  Open your browser to `http://localhost:3000`

To understand the core structure of the application, start by exploring `/src/app/page.tsx`. The note-taking functionality is primarily handled within the components located in `/src/components`.

## Project Structure

The project follows a standard Next.js structure. Key directories and files include:

*   `/src/app`: Contains the application's pages and layout.
*   `/src/components`: Houses reusable React components, including those for the note-taking interface and UI elements from Shadcn UI.
*   `/src/lib`: Includes utility functions and type definitions.
*   `/public`: Stores static assets like the favicon.
*   `/styles`: Contains global stylesheets (if any, although Tailwind handles most styling).

## Built With

*   Next.js
*   React
*   TypeScript
*   Tailwind CSS
*   Shadcn UI

## License

This project is licensed under the [MIT License](LICENSE).
