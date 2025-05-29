const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.static('.')); // To serve form.html or other static files

app.post('/update-pages', (req, res) => {
  // Extract inputs from form
  let {
    data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15,
    files // expecting a list of target file names from form (optional)
  } = req.body;
  files = `${files}.html`;
  if (data1 && data1.trim() !== "") {
  data1 = `<a href="${data1}.html">`;
  data9 = `${data9}</a>`;
  } 
  if (data2 && data2.trim() !== "") {
  data2 = `<a href="${data2}.html">`;
  data10 = `${data10}</a>`;
  } 
  if (data3 && data3.trim() !== "") {
  data3 = `<a href="${data3}.html">`;
  data11 = `${data11}</a>`;
  } 
  if (data4 && data4.trim() !== "") {
  data4 = `<a href="${data4}.html">`;
  data12 = `${data12}</a>`;
  } 
  if (data5 && data5.trim() !== "") {
  data5 = `<a href="${data5}.html">`;
  data13 = `${data13}</a>`;
  } 
  if (data6 && data6.trim() !== "") {
  data6 = `<a href="${data6}.html">`;
  data14 = `${data14}</a>`;
  } 
  if (data7 && data7.trim() !== "") {
  data7 = `<a href="${data7}.html">`;
  data15 = `${data15}</a>`;
  } 

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
      const insertText = `if(currentZoomedImage.getAttribute('src') === "images/${data8}"){  
        document.getElementById("keywords").innerHTML=\`
        <div>${data1}${data9}</div>
        <div>${data2}${data10}</div>
        <div>${data3}${data11}</div>
        <div>${data4}${data12}</div>
        <div>${data5}${data13}</div>
        <div>${data6}${data14}</div>
        <div>${data7}${data15}</div>\`}`;

      // Replace placeholder comment with new content
      html = html.replace('//ADD TAG', `//ADD TAG\n${insertText}`);

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
