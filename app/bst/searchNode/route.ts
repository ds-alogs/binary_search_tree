import BinarySearchTree from '@/lib/BinarySearchTree';

export async function POST(request: Request) {
  const { number } = await request.json();

  let node = BinarySearchTree.search(number);
  return new Response(JSON.stringify({ status: 'success', node: node }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
