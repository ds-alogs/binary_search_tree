import BinarySearchTree from '@/lib/BinarySearchTree';

export async function GET(request: Request) {
  let result = BinarySearchTree.getFullTree();
  return new Response(
    result
      ? JSON.stringify({ message: 'Tree retrieved successfully', tree: result })
      : JSON.stringify({ message: 'No contacts yet' })
  );
}
