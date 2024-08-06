import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function globalSetup(config: FullConfig) {
  console.log('GOOGLE_EMAIL:', process.env.GOOGLE_EMAIL);
  console.log('GOOGLE_PASSWORD:', process.env.GOOGLE_PASSWORD);
}

export default globalSetup;
