# Use the official Playwright image as the base image
FROM mcr.microsoft.com/playwright:focal

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Allure command line tool globally
RUN npm install -g allure-commandline

# Install Java
RUN apt-get update && \
    apt-get install -y openjdk-11-jdk && \
    apt-get clean;

# Set JAVA_HOME environment variable
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:${PATH}"

# Command to run tests and generate the Allure report
CMD ["sh", "-c", "npx playwright test && allure generate allure-results --clean -o allure-report && allure open -p 8080 allure-report"]
