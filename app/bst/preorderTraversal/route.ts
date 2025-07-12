import BinarySearchTree from '@/lib/BinarySearchTree';

export async function GET(request: Request) {
  console.log('Starting preorder traversal');
  console.log('----------------------------');
  let result = BinarySearchTree.preOrderTraversal();
  console.log('Completed preorder traversal: ', result);
  return new Response(
    JSON.stringify({
      message: 'Preorder traversal completed successfully',
      data: result,
      count: result.length,
    })
  );
}
