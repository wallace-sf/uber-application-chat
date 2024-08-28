type ImgProps = JSX.IntrinsicElements['img'];

export interface ImageRootProps extends Omit<ImgProps, 'onError'> {
  defaultSrc: string;
}
