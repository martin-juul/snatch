///<reference path="../node_modules/@types/react/index.d.ts"/>

declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
