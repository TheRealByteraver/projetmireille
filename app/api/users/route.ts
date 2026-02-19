import { NextResponse } from 'next/server';
// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import Database from 'better-sqlite3';

export const GET = async (): Promise<NextResponse> =>
  // const sqlite = new Database(process.env.DATABASE_URL as string);
  // const db = drizzle({ client: sqlite });
  // db.run('select 1');
  NextResponse.json({ message: 'Hello from the API!' });
