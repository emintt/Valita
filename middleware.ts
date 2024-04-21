import { updateSession } from '@/lib/authFunctions';
import {NextRequest} from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('req', request);
  return updateSession(request);
}
