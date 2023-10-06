import express, { Request, Response } from 'express';
import ffmpeg from 'fluent-ffmpeg';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post('/vid-process', (req: Request, res: Response) => {
  const { inputFilePath, outputFilePath } = req.body;

  if (!inputFilePath) {
    res
      .status(400)
      .json({ error: `input file path is: ${inputFilePath} which is invalid` });
  }
  if (!outputFilePath) {
    res.status(400).json({
      error: `output file path is: ${outputFilePath} which is invalid`,
    });
  }

  ffmpeg(inputFilePath)
    .outputOptions('-vf', 'scale=-1:360') // 360p
    .on('end', () => {
      res.status(200).json({ msg: 'file is processed successfully' });
    })
    .on('error', (err) => {
      console.error(`An error occurred: err.message`);
      res.status(500).json({ error: 'internal server error' });
    })
    .save(outputFilePath);
});

app.listen(PORT, () => {
  console.log(`Server started and listening at http://localhost:${PORT}`);
});
