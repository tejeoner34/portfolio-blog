#!/bin/bash

# Ensure WordPress is running locally
echo "Checking if WordPress is running locally..."
if ! curl -s http://localhost:8080 > /dev/null; then
  echo "Error: WordPress is not running at http://localhost:8080"
  echo "Please start your local WordPress instance before deploying"
  exit 1
fi

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Please check the errors above."
  exit 1
fi

# The static site is now in the 'out' directory
echo "Static site built successfully in the 'out' directory"
echo "You can now deploy the contents of the 'out' directory to any static hosting service"
echo ""
echo "Deployment options:"
echo "1. GitHub Pages: Push the 'out' directory to a GitHub repository"
echo "2. Netlify: Connect your repository and set the publish directory to 'out'"
echo "3. Vercel: Connect your repository and set the output directory to 'out'"
echo "4. Any other static hosting service that accepts static files"
echo ""
echo "For local testing, you can run: npx serve out" 