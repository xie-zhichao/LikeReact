/**
 * create element for jsx
 */
import { ComponentProps } from './component';

/**
 * create element result
 */
export interface CreateElementResult {
  nodeName: string;
  props: ComponentProps;
  children: Array<any>;
}

/**
 * create element for jsx
 * @param compName
 * @param props
 * @param args
 */
export default function createElement(comp: string, props: ComponentProps, ...args: any) {
  const children: Array<any> = [];
  args.forEach((element: any) => {
    if (element === undefined || element === null || typeof element === 'boolean') {
      return;
    }
    children.push(element);
  });

  return {
    nodeName: comp,
    props: props || {},
    children,
  };
}
