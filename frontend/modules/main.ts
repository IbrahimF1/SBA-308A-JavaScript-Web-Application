import { articles } from './data.js';
import { getArticleContent } from './api.js';

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

        card.addEventListener('click', async () => {
            console.log(`Clicked: ${article.title}`);
            
            card.style.opacity = "0.5"; 
            document.body.style.cursor = "wait";

            try {
                const data = await getArticleContent(article.title, article.subheading);
                
                console.log("Received from Gemini:", data.content);
                alert("Content generated! Check the Console (F12) to see the text.");
            } catch (error) {
                console.error(error);
                alert("Error fetching article.");
            } finally {
                card.style.opacity = "1";
                document.body.style.cursor = "default";
            }
        });

        card.appendChild(title);
        card.appendChild(sub);
        grid.appendChild(card);
    });
}
