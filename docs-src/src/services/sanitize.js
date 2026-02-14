import DOMPurify from 'dompurify';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

/**
 * Wraps lit-html's unsafeHTML directive with DOMPurify sanitization
 * to prevent stored XSS from user-controlled or markdown-derived content.
 */
export function sanitizedHTML(content) {
  return unsafeHTML(DOMPurify.sanitize(content));
}
