export class Video {
    _id: string;
    title: string;
    description: string;
    duration: number;
    url: string;
    reproductions: number;
    owner: string;
  
    constructor(
      id?: string,
      title?: string,
      description?: string,
      duration?: number,
      url?: string,
      reproductions?: number,
      owner?: string
    ) {
      this._id = id || '';
      this.title = title || '';
      this.description = description || '';
      this.duration = duration || 0;
      this.url = url || '';
      this.reproductions = reproductions || 0;
      this.owner = owner || '';
    }
  }
  
