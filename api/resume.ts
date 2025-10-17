// /api/resume.ts
import fs from 'fs';
import path from 'path';

export default function handler(req: any, res: any) {
  // Use your actual filename in attached_assets
  const resumeFile = 'Bhuvaneshwaran_Resume _1760559845947.pdf';
  const abs = path.join(process.cwd(), 'attached_assets', resumeFile);

  if (!fs.existsSync(abs)) {
    res.status(404).json({ error: 'Resume not found' });
    return;
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Bhuvaneshwaran_Resume.pdf"');

  const stream = fs.createReadStream(abs);
  stream.on('error', () => res.status(500).end('Error reading file'));
  stream.pipe(res);
}
