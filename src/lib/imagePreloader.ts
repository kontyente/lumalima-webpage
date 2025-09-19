// Comprehensive image preloading system for the entire site

export interface ImageConfig {
  url: string;
  priority: 'high' | 'medium' | 'low';
  category?: string;
}

export class ImagePreloaderManager {
  private static instance: ImagePreloaderManager;
  private loadedImages = new Set<string>();
  private loadingImages = new Map<string, Promise<void>>();
  private observers: Array<(url: string) => void> = [];

  private constructor() {}

  public static getInstance(): ImagePreloaderManager {
    if (!ImagePreloaderManager.instance) {
      ImagePreloaderManager.instance = new ImagePreloaderManager();
    }
    return ImagePreloaderManager.instance;
  }

  public preloadImage(url: string): Promise<void> {
    if (this.loadedImages.has(url)) {
      return Promise.resolve();
    }

    if (this.loadingImages.has(url)) {
      return this.loadingImages.get(url)!;
    }

    const loadPromise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loadedImages.add(url);
        this.loadingImages.delete(url);
        this.notifyObservers(url);
        resolve();
      };
      img.onerror = () => {
        this.loadingImages.delete(url);
        reject(new Error(`Failed to load image: ${url}`));
      };
      img.src = url;
    });

    this.loadingImages.set(url, loadPromise);
    return loadPromise;
  }

  public preloadImages(configs: ImageConfig[]): Promise<void[]> {
    // Sort by priority
    const sortedConfigs = configs.sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    });

    return Promise.all(
      sortedConfigs.map(config => this.preloadImage(config.url))
    );
  }

  public isLoaded(url: string): boolean {
    return this.loadedImages.has(url);
  }

  public onImageLoaded(callback: (url: string) => void): () => void {
    this.observers.push(callback);
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  private notifyObservers(url: string) {
    this.observers.forEach(callback => callback(url));
  }

  public getProgress(urls: string[]): number {
    const loaded = urls.filter(url => this.loadedImages.has(url)).length;
    return urls.length > 0 ? (loaded / urls.length) * 100 : 100;
  }
}

// Site-wide image configuration
export const siteImages: ImageConfig[] = [
  // Main category images (high priority)
  { url: '/assets/housing_main.jpg', priority: 'high', category: 'main' },
  { url: '/assets/comercial_main.jpg', priority: 'high', category: 'main' },
  { url: '/assets/public_main.png', priority: 'high', category: 'main' },
  { url: '/assets/urban_main.jpg', priority: 'high', category: 'main' },
  
  // Add more images here as they are added to the site
  // { url: '/assets/gallery/image1.jpg', priority: 'medium', category: 'gallery' },
  // { url: '/assets/portfolio/project1.jpg', priority: 'low', category: 'portfolio' },
];

export const preloaderManager = ImagePreloaderManager.getInstance();