# Use the official PHP image as the base image
FROM php:latest

# Set the working directory to the web root directory
WORKDIR /var/www/html

# Copy static site files into the container's web root directory
COPY . /var/www/html/

# Expose port 80 to allow incoming HTTP requests
EXPOSE 90

# Start the PHP development server when the container starts
CMD ["php", "-S", "0.0.0.0:90"]
