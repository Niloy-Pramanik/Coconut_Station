import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Design System Tokens', () => {
  it('should define required CSS variables in globals.css', () => {
    const cssPath = join(process.cwd(), 'src/app/globals.css');
    const cssContent = readFileSync(cssPath, 'utf-8');

    // Canvas & surfaces
    expect(cssContent).toContain('--color-canvas:');
    expect(cssContent).toContain('--color-surface:');
    
    // Brand colors
    expect(cssContent).toContain('--color-leaf-700:');
    
    // Typography
    expect(cssContent).toContain('--font-sans:');
    expect(cssContent).toContain('--font-script:');
    expect(cssContent).toContain('--font-bn:');
    
    // Fonts variables from next/font
    expect(cssContent).toContain('var(--font-fira)');
    expect(cssContent).toContain('var(--font-marck)');
    expect(cssContent).toContain('var(--font-hind)');

    // Bangla specific rules
    expect(cssContent).toContain(':lang(bn) body');
    expect(cssContent).toContain(':lang(bn) .uppercase');
  });
});
