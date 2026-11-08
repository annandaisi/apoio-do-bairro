import { writeFile } from 'node:fs/promises';

const url = process.env.SUPABASE_URL ?? '';
const publicKey = process.env.SUPABASE_PUBLIC_KEY ?? '';

const source = `export const environment = {\n  production: true,\n  supabaseUrl: ${JSON.stringify(url)},\n  supabasePublicKey: ${JSON.stringify(publicKey)},\n};\n`;

await writeFile(new URL('../src/environments/environment.ts', import.meta.url), source);
