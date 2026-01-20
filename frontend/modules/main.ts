import { articles } from './data.js';
import { getArticleContent } from './api.js';


declare const marked: any; // Tells TypeScript that 'marked' exists globally

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

            bodyContainer.innerHTML = "<p>Generating article with Gemini...</p>";
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn';
            closeBtn.textContent = "✕ Close";
            
            closeBtn.onclick = (event) => {
                event.stopPropagation();
                card.classList.remove('expanded');
                bodyContainer.innerHTML = "";
                closeBtn.remove();
            };
            card.appendChild(closeBtn);

            try {
                const data = await getArticleContent(article.title, article.subheading);
                
                // Convert Markdown string to HTML using the library
                const htmlContent = marked.parse(data.content);
                bodyContainer.innerHTML = htmlContent;

            } catch (error) {
                bodyContainer.textContent = "Error: Could not load article.";
                console.error(error);
            }
        });

        grid.appendChild(card);
    });
}
