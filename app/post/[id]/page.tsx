import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById, type Post } from "../../posts/data";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const postId = Number(id);

  if (!Number.isSafeInteger(postId) || postId < 1) {
    notFound();
  }

  let post: Post | null = null;
  let loadError: string | null = null;

  try {
    post = await getPostById(postId);
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Não foi possível carregar este post.";
  }

  if (loadError) {
    return (
      <main>
        <Link href="/posts">Voltar para os posts</Link>
        <p role="alert">Erro ao carregar o post: {loadError}</p>
      </main>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Link href="/posts">Voltar para os posts</Link>
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>
    </main>
  );
}
