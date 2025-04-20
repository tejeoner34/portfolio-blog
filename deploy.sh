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

# Check if 'out' directory exists
echo "Checking if 'out' directory exists..."
if [ ! -d "out" ]; then
  echo "ERROR: 'out' directory was not created."
  echo "Please check your build process."
  exit 1
fi

# Add 'out' directory to Git
echo "Adding 'out' directory to Git..."
git add out
git status

# Ask if user wants to commit and push
echo ""
echo "Do you want to commit and push these changes? (y/n)"
read commit_changes
if [ "$commit_changes" != "y" ]; then
  echo "Changes staged but not committed. You can commit manually later."
  exit 0
fi

# Get commit message
echo "Enter commit message (or press Enter for default):"
read commit_message
if [ -z "$commit_message" ]; then
  commit_message="Add static export for Vercel deployment"
fi

# Commit and push changes
echo "Committing changes..."
git commit -m "$commit_message"

echo "Pushing to GitHub..."
git push

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
echo ""
echo "Vercel Deployment Instructions:"
echo "1. Go to https://vercel.com/"
echo "2. Sign up or log in"
echo "3. Import your GitHub repository"
echo "4. Configure the project:"
echo "   - Set the framework preset to Next.js"
echo "   - Set the output directory to 'out'"
echo "   - Set the build command to 'npm run build'"
echo "5. Deploy"
echo ""
echo "Your site will be live in minutes with a URL like https://your-project.vercel.app" 