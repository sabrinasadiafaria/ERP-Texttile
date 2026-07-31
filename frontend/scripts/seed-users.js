import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ROLES = [
  'Director',
  'Admin',
  'Merchandiser',
  'Yarn Manager',
  'Inventory & Store Manager',
  'Knitting PM',
  'Knitting APM',
  'Linking PM',
  'Linking APM',
  'Cutting & Trimming PM',
  'Cutting & Trimming APM',
  'Production PM',
  'Production APM'
];

async function seed() {
  console.log('Seeding users...');
  
  for (const role of ROLES) {
    const emailPrefix = role.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    const email = `${emailPrefix}@testtile.com`;
    const password = 'Texttile@123';
    
    console.log(`Creating ${email}...`);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `Test ${role}`,
        }
      }
    });

    if (error) {
      console.error(`Error creating ${email}:`, error.message);
    } else {
      console.log(`Successfully created ${email}`);
    }
  }
  
  console.log('Finished seeding.');
}

seed();
