const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.static('.')); // To serve form.html or other static files

app.post('/update-pages', (req, res) => {
  // Extract inputs from form
  const {
    data1, data2, data3, 
    files // expecting a list of target file names from form (optional)
  } = req.body;

  // Define target files - you can send filenames from form or hardcode
  const targets = files ? files.split(',') : ['target1.html', 'target2.html'];

  try {
    targets.forEach(filename => {
      const filePath = path.join(__dirname, filename.trim());
      if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filename}`);
        return; // skip if file does not exist
      }
      
      let html = fs.readFileSync(filePath, 'utf8');

      // Example replacement: add new image line after a marker comment
      const insertText = `{ src: "images/${data1}", caption: "${data2}", searchQuery: "${data3}" },`;

      // Replace placeholder comment with new content
      html = html.replace('//ADD IMAGE', `//ADD IMAGE\n${insertText}`);

      // Write updated content back
      fs.writeFileSync(filePath, html, 'utf8');
    });

    res.send('Files updated successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating files');
  }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
