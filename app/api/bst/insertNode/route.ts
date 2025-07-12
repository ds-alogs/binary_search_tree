import BinarySearchTree from '@/lib/BinarySearchTree';

export async function POST(request: Request) {
  const { name, number } = await request.json();
  let result = BinarySearchTree.insert({ name, mobile: number });
  console.log('Inserted:', result);
  return new Response(
    JSON.stringify({
      status: 'success',
      message: 'Node inserted successfully',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
