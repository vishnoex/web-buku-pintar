import ReadPageView from '@/views/ReadPageView';

type tParams = Promise<{ slug: string }>;

export default async function Page({ params }: {params : tParams}) {
  return <ReadPageView slug={(await params).slug} />;
}