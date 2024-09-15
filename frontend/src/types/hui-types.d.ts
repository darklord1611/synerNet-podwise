export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface RoutesType {
    name: string;
    layout: string;
    component: ReactNode;
    icon?: JSX.Element | string;
    path: string;
    secondary?: boolean;
  }

  interface Collection {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
  }

  interface Espisode {
    id: number;
    title: string;
    description?: string;
    publishedDate: string;
    duration: string;
    podcastName: string;
    podcastId: number;
    audio_url: string;
    thumbnailUrl: string;
  }

  interface Podcast {
    id: number;
    title: string;
    description: string;
    author_name: string;
    image_url: string;
  }
}
