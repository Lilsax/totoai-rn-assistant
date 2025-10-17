import appStructure from './appStructure.json';

class SimpleAppGuide {
    constructor() {
        this.pages = appStructure.navigation.screens;
    }

    search(userQuery) {
        const query = userQuery.toLowerCase();

        const matches = this.pages.filter(page => {
            return page.keywords.some(keyword =>
                query.includes(keyword.toLowerCase()),
            );
        });

        return matches;
    }

    getContext(userQuery) {
        const matches = this.search(userQuery);

        if (matches.length === 0) {
            return "I couldn't find any relevant pages in the app.";
        }

        const _matches = matches.map(page =>
            `Page: ${page.name}\nDescription: ${page.description}\nRoute: ${page.route}`,
        ).join('\n\n');

        console.log(_matches);
        return _matches;
    }
}

export default SimpleAppGuide;
