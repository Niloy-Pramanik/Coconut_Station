import { expect, test, describe } from 'vitest';

describe('Environment Variables', () => {
  test('should pass with valid minimal env', async () => {
    // Reset process.env and provide minimal valid mock
    const originalEnv = process.env;
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
    };
    
    // We isolate the module to force re-evaluation of Zod schema
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { env } = await import('@/lib/env?mockValid' as any);
    
    expect(env.NEXT_PUBLIC_SITE_URL).toBe('http://localhost:3000');
    expect(env.PAYMENTS_ENABLED_METHODS).toBe('cod'); // Default applied
    expect(env.SSLCOMMERZ_SANDBOX).toBe(true); // Default transformed
    
    // Restore env
    process.env = originalEnv;
  });

  test('should throw error for invalid env', async () => {
    const originalEnv = process.env;
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SITE_URL: 'not-a-url',
    };
    
    // Use dynamic import to catch the throw during module evaluation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect(import('@/lib/env?mockInvalid' as any)).rejects.toThrow();
    
    // Restore env
    process.env = originalEnv;
  });
});
