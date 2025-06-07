
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'database.json');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { number } = req.body;

  if (!number) return res.status(400).json({ error: 'Number is required' });

  const isValid = /^628\d{8,13}$/.test(number);
  const status = isValid ? 'active' : 'not active';

  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  if (data.find(item => item.number === number)) {
    return res.status(409).json({ error: 'Number already exists' });
  }

  data.push({ number, status });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return res.status(201).json({ number, status });
}
