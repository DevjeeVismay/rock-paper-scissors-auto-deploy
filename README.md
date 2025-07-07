# Rock Paper Scissors Game - CI/CD Project

A simple Rock Paper Scissors game with automated deployment to AWS S3 using GitHub Actions.

![Deploy to S3](https://github.com/DevjeeVismay/rock-paper-scissors-auto-deploy/actions/workflows/deploy.yml/badge.svg)

## Project Overview

This project demonstrates a complete CI/CD pipeline for a static website. It automatically deploys code changes to AWS S3 whenever updates are pushed to the main branch.

**Live Demo:** [Play the Game](https://devjeevismay--rock-paper-scissors.s3.us-east-1.amazonaws.com/index.html)

**Full CodeLabs Document** [CodeLabs Preview](https://codelabs-preview.appspot.com/?file_id=1c1XN2pZ49c6IWnvlXmYWhfAcWPpJl36hFfPPksEWbtI/)

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Version Control:** Git, GitHub
- **Cloud Storage:** AWS S3
- **CI/CD:** GitHub Actions

## Repository Structure

    project-root/
    ├── .github/
    │   └── workflows/
    │       └── deploy.yml      # GitHub Actions workflow for S3 deployment
    ├── index.html              # Main HTML file for the Rock Paper Scissors game
    ├── style.css               # CSS styling for the game
    ├── app.js                  # JavaScript game logic
    └── README.md               # Project documentation


## How It Works

1. Static website files are stored in this GitHub repository
2. GitHub Actions workflow is triggered on every push to the main branch
3. The workflow authenticates with AWS using IAM credentials
4. Files are synchronized to an S3 bucket configured for static website hosting
5. The website is immediately updated with the latest changes

## Implementation Steps

### 1. Website Development
- Created a Rock Paper Scissors game using HTML, CSS, and JavaScript
- Designed responsive user interface with game logic

### 2. AWS S3 Configuration
- Created an S3 bucket with static website hosting enabled
- Configured bucket policy to allow public read access
- Set up proper object ownership settings

### 3. CI/CD Pipeline Setup
- Created an IAM user with S3 access permissions
- Added GitHub repository secrets for secure AWS authentication
- Configured GitHub Actions workflow file to automate deployment

## Lessons Learned

- AWS S3 static website hosting capabilities
- GitHub Actions workflow configuration
- Secure credential management using GitHub Secrets
- Automating deployment processes for web applications

## Setup Instructions

If you want to create a similar project, follow these steps:

1. Clone this repository
2. Create an AWS S3 bucket with static website hosting enabled
3. Set up an IAM user with S3 access
4. Add the following secrets to your GitHub repository:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_S3_BUCKET`
   - `AWS_REGION`
5. Push changes to your repository to trigger automatic deployment

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*This project was created as a learning exercise for implementing CI/CD pipelines with GitHub Actions and AWS.*
