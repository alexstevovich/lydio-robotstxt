import { RobotsTxt } from '../src/index.mjs';

const robots = new RobotsTxt();

// ✅ Define user-agent rules
robots.agent('*')
    .allow('/')
    .disallow('/private')
    .disallow('/secret');

// ✅ Add multiple sitemaps
robots.sitemap('https://example.com/sitemap.xml');
robots.sitemap('https://example.com/blog-sitemap.xml');

// ✅ Generate robots.txt output
const generated = robots.toRobotsTxt();
const expected = `User-agent: *\nAllow: /\nDisallow: /private\nDisallow: /secret\n\nSitemap: https://example.com/sitemap.xml\nSitemap: https://example.com/blog-sitemap.xml`;

console.log("Generated robots.txt:\n" + generated);
console.log("\nExpected robots.txt:\n" + expected);

// ✅ Check if output matches expected result
if (generated === expected) {
    console.log("\n✅ Lydio: RobotsTxt Test Passed!");
    process.exit(0);
} else {
    console.error("\n❌ Lydio: RobotsTxt Test Failed!");
    process.exit(1);
}
