import { articles } from './data.js';
import { getArticleContent } from './api.js';

const grid = document.getElementById('grid-container');

if (grid) {
    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';

        const initialContent = document.createElement('div');
        initialContent.className = 'card-preview';
        initialContent.innerHTML = `
            <h3>${article.title}</h3>
            <p class="subheading">${article.subheading}</p>
        `;
        card.appendChild(initialContent);

        const bodyContainer = document.createElement('div');
        bodyContainer.className = 'article-body';
        card.appendChild(bodyContainer);

        card.addEventListener('click', async (e) => {
            if (card.classList.contains('expanded')) return;

            card.classList.add('expanded');
            bodyContainer.textContent = "Generating article with Gemini...";
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn';
            closeBtn.textContent = "✕ Close";
            
            closeBtn.onclick = (event) => {
                event.stopPropagation(); // Stop click from re-triggering card
                card.classList.remove('expanded');
                bodyContainer.textContent = ""; // Clear content
                closeBtn.remove(); // Remove button
            };
            card.appendChild(closeBtn);

            try {
                const data = await getArticleContent(article.title, article.subheading);
                bodyContainer.textContent = data.content; // Inject text
            } catch (error) {
                bodyContainer.textContent = "Error: Could not load article.";
            }
        });

        grid.appendChild(card);
    });
}
