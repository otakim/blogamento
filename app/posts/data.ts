export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const apiUrl = "https://jsonplaceholder.typicode.com/posts";

function isPost(value: unknown): value is Post {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const post = value as Record<string, unknown>;

  return (
    typeof post.userId === "number" &&
    typeof post.id === "number" &&
    typeof post.title === "string" &&
    typeof post.body === "string"
  );
}

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`A API respondeu com o status ${response.status}.`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isPost)) {
    throw new Error("A resposta da API não contém uma lista válida de posts.");
  }

  return data;
}

export async function getPostById(id: number): Promise<Post | null> {
  const response = await fetch(`${apiUrl}/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`A API respondeu com o status ${response.status}.`);
  }

  const data: unknown = await response.json();

  if (!isPost(data)) {
    throw new Error("A resposta da API não contém um post válido.");
  }

  return data;
}
