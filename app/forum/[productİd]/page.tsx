interface Props {
  params: {
    productİd: any;
  };
}

export default function ForumId({ params }: Props) {
  return (
    <>
     <h1>forum stranica</h1>
     <p>{params.productİd}</p>
    </>
  )
}