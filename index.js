const http = require('http');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const uploadDirectory = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://thetimelesstutor.com'); // Allow only this origin
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow only this origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow these HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/upload') {
    const form = new multiparty.Form({ uploadDir: uploadDirectory });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error parsing form data' }));
        return;
      }

      const file = files.file[0]; // Assuming a single file is uploaded
      const randomString = crypto.randomBytes(8).toString('hex'); // 16-character random string
      const extension = path.extname(file.originalFilename);

      const newFileName = `${randomString}${extension}`;
      const newFilePath = path.join(uploadDirectory, newFileName);

      fs.renameSync(file.path, newFilePath);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'File uploaded successfully',
          fileName: newFileName,
        })
      );
    });
  } else if (req.method === 'GET' && req.url.startsWith('/files/')) {
    // Serve files
    const fileName = req.url.split('/files/')[1];
    const filePath = path.join(uploadDirectory, fileName);

    if (fs.existsSync(filePath)) {
      res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'File not found' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
