import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * Verifies the authentication token from cookies.
 * 
 * Retrieves the admin token from cookies and validates it using JWT verification.
 * If the token is missing or invalid, returns an unauthorized response.
 * 
 * @returns {Promise<{authorized: true} | {authorized: false, response: NextResponse}>} 
 * An object containing authorization status. If authorized is true, no response is included.
 * If authorized is false, includes a NextResponse with appropriate error message and status code.
 * 
 * @throws {Error} Does not throw errors directly - captures JWT verification errors and returns unauthorized response
 * 
 * @example
 * ```typescript
 * const authResult = await verifyAuth();
 * if (!authResult.authorized) {
 *   return authResult.response;
 * }
 * // User is authenticated, proceed with protected operation
 * ```
 */
export async function verifyAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (!token) {
    return { authorized: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'default_secret_key_change_me'
    )
    await jwtVerify(token, secret)
    return { authorized: true }
  } catch {
    return { authorized: false, response: NextResponse.json({ error: 'Invalid token' }, { status: 401 }) }
  }
}
