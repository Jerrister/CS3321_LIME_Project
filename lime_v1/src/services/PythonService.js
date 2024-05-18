const express = require('express');
const { PythonShell } = require('python-shell');
const cors = require('cors');
const app = express();
const port = 7688;

app.use(cors());

const runPythonScript = (options) => {
  return new Promise((resolve, reject) => {
    PythonShell.run('src\\python_utils\\hello.py', options, function (err, results) {
      if (err) {
        reject({ error: err.toString(), output: err.stdout });
      } else {
        resolve(results);
      }
    });
  });
};


app.get('/run-python', async (req, res) => {
  let options = {
    scriptPath: '.',
    args: ['--folder', 'C:\\Users\\li_jiaxin\\Desktop\\X-LENCE\\Audio_Generation'],
    pythonOptions: ['-u'] // 确保Python输出是实时的
  };

  try {
    console.log("Calling Python script...");
    const results = await runPythonScript(options);
    console.log("Script executed successfully. Raw results:", results);

    try {
      const data = JSON.parse(results.join('')); // 解析 JSON 字符串
      res.json({ output: data });
      console.log("Parsed data:", data);
    } catch (error) {
      console.log("Error parsing results:", error);
      res.status(500).send({ error: error.toString(), output: results.join('') });
    }
  } catch (err) {
    console.log("Error occurred:", err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
