
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'database.json');

export default function handler(req, res) {
  if (!fs.existsSync(filePath)) return res.status(200).json([]);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.status(200).json(data);
}
