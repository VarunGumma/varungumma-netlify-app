import { randomUUID } from 'crypto';
import { getStore } from '@netlify/blobs';

const COOKIE_NAME = 'vg_visitor_id';
const STORE_NAME = 'visitor-count';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const context = process.env.CONTEXT || process.env.NETLIFY_ENV || 'dev';
const storeName = context === 'production' ? STORE_NAME : `${STORE_NAME}-${context}`;
const store = getStore(storeName, { consistency: 'strong' });

const parseCookies = (header = '') =>
  header.split(';').reduce((acc, part) => {
    const [k, v] = part.trim().split('=');
    if (k && v) acc[k] = decodeURIComponent(v);
    return acc;
  }, {});

const buildCookie = (id) => [
  `${COOKIE_NAME}=${encodeURIComponent(id)}`,
  'Path=/',
  `Max-Age=${ONE_YEAR_SECONDS}`,
  'SameSite=Lax',
  'Secure',
  'HttpOnly'
].join('; ');

const getCount = async () => {
  const stored = await store.get('count');
  const parsed = parseInt(stored, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
};

const setCount = (value) => store.set('count', String(value));

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const cookies = parseCookies(event.headers.cookie || event.headers.Cookie || '');
  const existingId = cookies[COOKIE_NAME];
  let count = await getCount();
  const headers = { 'Content-Type': 'application/json' };

  if (!existingId) {
    const newId = randomUUID();
    count += 1;
    await setCount(count);
    headers['Set-Cookie'] = buildCookie(newId);
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ count }),
  };
};
