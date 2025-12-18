---
description: Deploy TriPhase to the web using Netlify (Free & Easy)
---

This workflow will guide you through deploying your Habit Tracker to the public web using Netlify's drag-and-drop feature.

1.  **Build the Project**
    We need to create a production-ready version of your app.
    // turbo
    ```bash
    npm run build
    ```

2.  **Locate the Output Folder**
    The build process created a new folder named `dist` in your project directory:
    `c:\Users\HP-GUEST\Antigravity Projects\Habit Tracker\dist`
    
    This folder contains your entire website optimized for the web.

3.  **Deploy to Netlify**
    1.  Open your web browser and go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
    2.  If you aren't logged in, sign up (it's free).
    3.  Once logged in, you will see a box that says "Drag and drop your site output folder here".
    4.  Drag the `dist` folder from your file explorer into that box.

4.  **You're Live!**
    Netlify will upload your files and give you a live URL (e.g., `https://random-name-12345.netlify.app`) in seconds.
    You can rename this in "Site Settings" -> "Change site name" to something like `triphase-habits.netlify.app`.

5.  **Share**
    Send the link to your friends! Note that since this app uses `localStorage`, their data will be private to their own browser.
