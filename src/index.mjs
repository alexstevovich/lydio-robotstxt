import fs from 'fs';

export class RobotsTxt {
    constructor() {
        this.userAgents = new Map();
        this.sitemaps = new Set(); 
    }

    sitemap(url) {
        this.sitemaps.add(`Sitemap: ${url}`);
        return this;
    }

    agent(name) {
        if (!this.userAgents.has(name)) {
            this.userAgents.set(name, new RobotsTxtUserAgent(name));
        }
        return this.userAgents.get(name);
    }

    toRobotsTxt(options = { force: false }) {
        if (this.userAgents.size === 0 && !options.force) {
            throw new Error(
                ` No User-agent defined in robots.txt. Add one with:\n\n`
                + `    robots.agent('*').allow('/');\n`
                + `\nOr use { force: true } to suppress this error.`
            );
        }

        let output = "";
        for (const agent of this.userAgents.values()) {
            output += agent.toRobotsTxt() + "\n\n";
        }
        output += [...this.sitemaps].join("\n");
        return output.trim();
    }

    async writeRobotsTxt(filePath, options = { force: false }) {
        const content = this.toRobotsTxt(options);
        await fs.promises.writeFile(filePath, content, 'utf8');
    }
}

export class RobotsTxtUserAgent {
    constructor(name) {
        this.name = name;
        this.rules = [];
    }

    allow(path) {
        this.rules.push(`Allow: ${path}`);
        return this;
    }

    disallow(path) {
        this.rules.push(`Disallow: ${path}`);
        return this;
    }

    delay(seconds) {
        this.rules.push(`Crawl-delay: ${seconds}`);
        return this;
    }

    toRobotsTxt() {
        return `User-agent: ${this.name}\n` + this.rules.join("\n");
    }
}
