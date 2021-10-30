import { ValueOf } from 'lib/types';

const TAG_SLUGS = {
  All: 'all',
  Fun: 'fun',
  Code: 'coding',
  Learn: 'learning',
  Link: 'link'
} as const;

export type TagSlug = ValueOf<typeof TAG_SLUGS>;

type TagData = {
  slug: string;
  name: string;
  emoji: string;
};

const TAG_DATA: Record<TagSlug, TagData> = {
  [TAG_SLUGS.Fun]: {
    name: 'Fun',
    emoji: '🛠️',
    slug: TAG_SLUGS.Fun,
  },
  [TAG_SLUGS.Code]: {
    name: 'Coding',
    emoji: '💻',
    slug: TAG_SLUGS.Code,
  },
  [TAG_SLUGS.Learn]: {
    name: 'Learning',
    emoji: '📝',
    slug: TAG_SLUGS.Learn,
  },
  [TAG_SLUGS.Link]: {
    name: 'Links',
    emoji: '🔗',
    slug: TAG_SLUGS.Link,
  },
  [TAG_SLUGS.All]: {
    name: 'All',
    emoji: '🌴',
    slug: TAG_SLUGS.All,
  },
} as const;

export const getTagDataBySlug = (slug: TagSlug): TagData => TAG_DATA[slug];
