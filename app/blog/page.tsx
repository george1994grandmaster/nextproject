

import Link from 'next/link';

export default function Blog() {
 
  const id = 'jjjhhh';

  return (
    <Link href={`/forum/${id}`}>
      Forum
    </Link>
  );
}