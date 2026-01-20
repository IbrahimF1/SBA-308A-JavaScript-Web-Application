import { articles } from './data.js';

const grid = document.getElementById('grid-container');

if (grid) {
    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h3');
        title.textContent = article.title;

        const sub = document.createElement('p');
        sub.className = 'subheading';
        sub.textContent = article.subheading;

        card.appendChild(title);
        card.appendChild(sub);
        grid.appendChild(card);
    });
}