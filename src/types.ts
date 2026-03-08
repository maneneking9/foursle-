export interface Service {
  id: string;
  title: string;
  time: string;
  description: string;
  icon: string;
}

export interface BibleStudy {
  id: string;
  title: string;
  day: string;
  time: string;
  location: string;
  description: string;
}

export interface Devotional {
  verse: string;
  reference: string;
  reflection: string;
  prayer: string;
}
