import { companies } from '@/data/companies';
import { posts } from '@/data/posts';
import { Company } from '@/types/company';
import { Post } from '@/types/post';

let _companies = [...companies];
let _posts = [...posts];
let _countries = Array.from(new Set(_companies.map((c) => c.country)));

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;

export async function fetchCountries() {
  await delay(jitter());
  return _countries;
}

export async function fetchCompanies(): Promise<Company[]> {
  await delay(jitter());
  return _companies;
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(jitter());
  return _posts;
}

export async function createOrUpdatePost(
  p: Omit<Post, 'id'> & { id?: string },
): Promise<Post> {
  await delay(jitter());
  if (maybeFail()) throw new Error('Save failed');

  if (p.id) {
    _posts = _posts.map((x) => (x.id === p.id ? (p as Post) : x));
    return p as Post;
  }

  const created = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];

  return created;
}
