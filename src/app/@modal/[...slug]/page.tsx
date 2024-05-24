import { Options, options } from '@/lib/utils';
import Modal from '@/components/modal';

type ModalPageProps = {
  params: {
    slug: Options;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEmpty = (obj: any) => Object.keys(obj).length === 0;

export default async function ModalPage({ params }: ModalPageProps) {
  if (isEmpty(params)) return null;

  const id = params.slug[0];
  if (!options.includes(id)) return null;

  return <Modal option={id} />;
}
