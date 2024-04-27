# File Upload and Download Server

This project creates a simple HTTP server in Node.js to upload and download files. It uses `multiparty` to handle file uploads and stores uploaded files in a designated folder with a unique filename to prevent collisions. The server supports uploading files via POST requests and retrieving files via GET requests.

## Project Structure
- **Server.js**: The main server code that handles HTTP requests, file uploads, and file serving.
- **Uploads Directory**: The folder where uploaded files are stored. This directory is created at runtime if it doesn't already exist.

## Installation
To set up this project, ensure you have Node.js and npm installed. Then, install the required dependencies:

```bash
# Initialize the project (if needed)
npm init -y

# Install multiparty
npm install multiparty
```

## Usage
You can start the server with the following command:
```bash
node server.js
```

By default, the server listens on a port specified by the PORT environment variable. If not specified, the server uses a default port (like 3000).

## Uploading Files
To upload a file, send a POST request to /upload with the form-data containing the key file and the file to upload. You can use tools like Postman or curl for testing.

Example using curl:
```bash
curl -X POST -F "file=@path/to/your/file" http://localhost:3000/upload
```

## Downloading Files
To download a file, send a GET request to /files/{filename}, where {filename} is the name of the uploaded file. The server will return the file as a downloadable response.

Example using curl:
```bash
curl http://localhost:3000/files/{filename} -o downloaded_file
```

## Error Handling
The server returns appropriate HTTP status codes for different scenarios:

`404 Not Found`: When a requested file does not exist.
`400 Bad Request`: When there's an error parsing form data.
`200 OK`: When a file is successfully uploaded or retrieved.

## Security Considerations
Since this server is designed for simplicity, additional security measures (like authentication, HTTPS, etc.) should be considered for production use.
Ensure proper permissions and access controls to avoid unauthorized access to uploaded files. For now I've used CORS only.

## Contributing
If you find issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.