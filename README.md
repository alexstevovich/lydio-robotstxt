# Lydio: RobotsTxt

Lydio: RobotsTxt is a structured generator for `robots.txt` files in JavaScript, providing a fluent and efficient way to define crawler rules programmatically. It ensures compliance with the Robots Exclusion Standard while maintaining an expressive and minimal API.

## Features
- **Fluent API** for defining user-agent rules.
- **Supports multiple user-agents and sitemaps.**
- **Explicit structure with predictable behavior.**
- **No dependencies, minimalistic and unopinionated.**

## Installation
```sh
npm install @lydio/robotstxt
```

## Usage
```js
import { RobotsTxt } from "@lydio/robotstxt";

const robots = new RobotsTxt();
robots.agent("*").allow("/");
robots.sitemap("https://example.com/sitemap.xml");

console.log(robots.toRobotsTxt());
/* Output:
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
*/
```

## API

### Creating a RobotsTxt Object
```js
const robots = new RobotsTxt();
```

### Defining User-Agents
- `.agent(name)`: Creates a new user-agent block (returns a `RobotsTxtUserAgent` instance).

Example:
```js
robots.agent("Googlebot").disallow("/private");
```

### Allowing and Disallowing Paths
- `.allow(path)`: Allows crawling of a specific path.
- `.disallow(path)`: Blocks crawling of a specific path.

Example:
```js
robots.agent("*")
    .allow("/")
    .disallow("/admin");
```

### Setting Crawl Delay
- `.delay(seconds)`: Sets a crawl delay for the user-agent.

Example:
```js
robots.agent("Bingbot").delay(10);
```

### Adding Sitemaps
- `.sitemap(url)`: Adds a sitemap reference.

Example:
```js
robots.sitemap("https://example.com/sitemap.xml");
```

### Generating the robots.txt Output
- `.toRobotsTxt(options = {})`: Converts the object to a valid `robots.txt` string.
    - `{ force: true }` – Prevents errors if no user-agents are defined.

Example:
```js
console.log(robots.toRobotsTxt());
```

### Writing Directly to File
- `.writeRobotsTxt(filePath, options = {})`: Saves the `robots.txt` file.

Example:
```js
robots.writeRobotsTxt("./robots.txt");
```

## Example Usage
```js
const robots = new RobotsTxt();
robots.agent("*")
    .allow("/")
    .disallow("/private");

robots.agent("Googlebot")
    .allow("/")
    .disallow("/sensitive");

robots.sitemap("https://example.com/sitemap.xml");

console.log(robots.toRobotsTxt());
```

## License
MIT

## Branding & Authenticity
**Lydio is a project by Alex Stevovich.** The Lydio name, branding, and identity belong to its creator.