import ReadPageView from '@/views/ReadPageView';

type tParams = Promise<{ slug: string }>;

export default async function ReadPage({ params }: { params: tParams }) {
  return <ReadPageView slug={(await params).slug} />;
};
