import { v4 as uuid4 } from 'uuid';

export function generateShareCode() {
  return uuid4().replace(/-/g, '').substring(0, 10);
}

