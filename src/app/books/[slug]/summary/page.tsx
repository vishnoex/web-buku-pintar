import ReadPDFView from '@/views/ReadPDFView';

type tParams = Promise<{ slug: string }>;

export default async function Page({ params }: {params : tParams}) {
  return <ReadPDFView slug={(await params).slug} />;
}