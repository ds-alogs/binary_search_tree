import BinarySearchTree from '@/lib/BinarySearchTree';

export async function GET(request: Request) {
  console.log('Starting postorder traversal');
  console.log('----------------------------');
  let result = BinarySearchTree.postOrderTraversal();
  console.log('Completed postorder traversal: ', result);
  return new Response(
    JSON.stringify({
      message: 'Postorder traversal completed successfully',
      data: result,
      count: result.length,
    })
  );
}
