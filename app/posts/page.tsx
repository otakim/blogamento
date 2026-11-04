import Link from "next/link";
import { getPosts, type Post } from "./data";

export default async function PostsPage() {
  let posts: Post[] = [];
  let loadError: string | null = null;

  try {
    posts = await getPosts();
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Não foi possível carregar os posts da API.";
  }

  return (
    <main>
      <h1>Posts</h1>
      {loadError ? (
        <p role="alert">Erro ao carregar os posts: {loadError}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
