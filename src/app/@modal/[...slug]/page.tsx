import { Options, options } from '@/lib/utils';
import Modal from '@/components/modal';

type ModalPageProps = {
  params: {
    slug: Options;
  };
};

const ModalPage = async ({ params }: ModalPageProps) => {
  const id = params.slug[0];
  if (!options.includes(id)) return null;

  return <Modal option={id} />;
};

export default ModalPage;
