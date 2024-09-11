# Test car dealer app

This project is a web application that allows users to search and view results for vehicles by make and year.

Vehicle Search Application
Key Features

Vehicle Filter: Allows users to select a vehicle make and model year.
Dynamic Search: Uses selected parameters to search for specific vehicle models.
Results Display: Shows a list of vehicle models matching the search criteria.
Error Handling: Provides feedback to the user in case of search issues or if no results are found.
Responsive Design: Adapts to different screen sizes (mobile, tablet, desktop).

Architecture
Frontend

Framework: Next.js (App Router)
Language: JavaScript/React
Styling: Tailwind CSS

File Structure
Copyapp/
  results/
    [makeId]/
      [year]/
        page.js
  components/
    Filter.js
Main Components

Filter: Client-side component for make and year selection.
ResultPage: Server-side component to display search results.

Routes

/: Main page with the filter component
/results/[makeId]/[year]: Dynamic results page

API Integration

Uses the NHTSA (National Highway Traffic Safety Administration) API to fetch vehicle data.
Endpoints used:

Get vehicle makes: https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car
Get models by make and year: https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}



Technical Features

Static Parameter Generation: Uses generateStaticParams to pre-render common make and year combinations.
Server-Side Rendering: The results page is rendered on the server to improve SEO and initial performance.
Client-Side Navigation: Uses useRouter for navigation between pages without full reloads.
State Management: Uses React hooks (useState, useEffect) to manage local state and side effects.
Input Validation: Disables the search button until both make and year are selected.

Application Flow

The user selects a vehicle make and year on the main page.
Clicking "Next" navigates to the results page with the selected parameters.
The results page fetches data from the NHTSA API and displays the corresponding models.
If no models are found or there's an error, an appropriate message is shown to the user.

Potential Areas for Improvement

Implement result caching to improve performance.
Add pagination to handle large result sets.
Implement unit and integration tests.
Add more filters (such as vehicle type, specific features, etc.).
Improve UI accessibility.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
