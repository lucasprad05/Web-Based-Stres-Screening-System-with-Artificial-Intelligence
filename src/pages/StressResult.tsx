import { useEffect, useState } from 'react';
import "../styles/result.css";

export default function StressResultPage() {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('/stress_result.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(html => setHtmlContent(html))
      .catch(error => {
        console.error('Failed to load HTML content:', error);
        setHtmlContent('<div class="text-red-500 text-center p-8">Failed to load stress results. Please try again.</div>');
      });
  }, []);

  return (
    <div className="result-page">
      <div className="result-container">
        {/* Render */}
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
}
