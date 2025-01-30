async function getNews() {
    const query = document.getElementById('query').value;
    if (!query) {
        alert('Please enter a keyword!');
        return;
    }

    const apiKey = '4a0184d9215f444b9ab1a513acac8128';
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        const data = await response.json();

        const newsList = document.getElementById('news-list');
        newsList.innerHTML = '';

        if (data.articles.length === 0) {
            newsList.innerHTML = '<p>No news articles found for this keyword.</p>';
            return;
        }

        data.articles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.description || 'No description available.'}</p>
            `;
            newsList.appendChild(newsItem);
        });
    } catch (error) {
        alert(error.message);
    }
}
