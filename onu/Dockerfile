# Base image
FROM python:3.11

# Set working directory
WORKDIR /onu

# Copy requirements.txt
COPY requirements.txt .

# Install dependencies including Gunicorn
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application with Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "onu.wsgi:application"]
