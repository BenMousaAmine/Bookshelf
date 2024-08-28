import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const CardLoader = (
  props: React.JSX.IntrinsicAttributes & IContentLoaderProps
) => (
  <ContentLoader
    viewBox="0 0 500 280"
height={280}
width={500}
{...props}
speed={2}
backgroundColor={'#c1c0c0'}
foregroundColor={'#999'}
>
<rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
<rect x="4" y="190" rx="0" ry="0" width="295" height="20" />
<rect x="4" y="215" rx="0" ry="0" width="295" height="20" />
<rect x="4" y="242" rx="0" ry="0" width="295" height="20" />
<rect x="4" y="242" rx="0" ry="0" width="295" height="20" />
  </ContentLoader>
);

export default CardLoader;
