export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  imageUrl?: string;
}

// defunct code for fetching README preview image for repos
async function getReadmeImage(fullName: string): Promise<string | undefined> {
  try {
    const response = await fetch(`https://api.github.com/repos/${fullName}/readme`);
    if (!response.ok) return undefined;
    
    const data = await response.json();
    const content = atob(data.content);
    
    // Regex to find markdown images: ![alt](url)
    const mdImageRegex = /!\[.*?\]\((.*?\.(?:png|jpg|jpeg|gif|webp|svg))\)/i;
    // Regex to find HTML images: <img src="url" ...>
    const htmlImageRegex = /<img\s+[^>]*src=["']([^"']+\.(?:png|jpg|jpeg|gif|webp|svg))["']/i;
    
    const match = content.match(mdImageRegex) || content.match(htmlImageRegex);
    
    if (match && match[1]) {
      let url = match[1];
      // Handle relative paths
      if (!url.startsWith('http')) {
        const branch = data.url.split('?ref=')[1] || 'main';
        url = `https://raw.githubusercontent.com/${fullName}/${branch}/${url.replace(/^\.\//, '')}`;
      }
      return url;
    }
  } catch (error) {
    console.error('Error fetching README image:', error);
  }
  return undefined;
}

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/mat-mcc/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error('Failed to fetch repos');
    
    const repos: GithubRepo[] = await response.json();
    
    // Fetch README images in parallel
    const reposWithImages = await Promise.all(repos.map(async (repo) => {
      const imageUrl = await getReadmeImage(repo.full_name);
      return { ...repo, imageUrl };
    }));
    
    return reposWithImages;
  } catch (error) {
    console.error('Github API Error:', error);
    return [];
  }
}
