# Playwright API Tests with Allure Report

This project demonstrates how to use Playwright for API testing and generate an Allure report for test results. It includes a Docker setup to run the tests in a containerized environment.

## Prerequisites

- Docker
- Node.js (if running locally without Docker)

## Project Structure

- `Dockerfile`: Docker configuration file to build the test environment.
- `tests/api-tests.spec.js`: Playwright test specification file.
- `data.json`: Configuration file containing test data.
- `package.json`: Node.js dependencies and scripts.

## Getting Started

### Running Tests with Docker

1. **Build the Docker image**:
    ```sh
    docker build -t my-playwright-tests .
    ```

2. **Run the Docker container**:
    ```sh
    docker run -p 8080:8080 my-playwright-tests
    ```

3. **View the Allure Report**:
    - After running the container, note the URL provided in the terminal output (e.g., `http://172.17.0.3:8080/`).
    - Open your web browser and navigate to the provided URL to view the Allure report.

### Running Tests Locally

1. **Install dependencies**:
    ```sh
    npm install
    ```

2. **Run the tests**:
    ```sh
    npx playwright test
    ```

3. **Generate the Allure Report**:
    ```sh
    allure generate allure-results --clean -o allure-report
    ```

4. **Open the Allure Report**:
    ```sh
    allure open allure-report
    ```

## Dockerfile Explanation

The `Dockerfile` is configured to:

1. Use the official Playwright image as the base image.
2. Set the working directory to `/app`.
3. Copy `package.json` and `package-lock.json` to the working directory.
4. Install Node.js dependencies.
5. Copy the rest of the application code to the working directory.
6. Install Playwright dependencies and browsers.
7. Run the Playwright tests.
8. Generate the Allure report and start a web server to serve the report.

## Troubleshooting

- **Issue with installing Playwright dependencies**: Ensure you are using the correct Playwright base image and the necessary dependencies are installed.
- **Allure report not opening automatically**: You can manually open the report by navigating to the provided URL after running the Docker container.


