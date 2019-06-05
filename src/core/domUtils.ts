/**
 * @description utils about dom
 * @author xzc
 * 2019/05/24
 */
import Component, { ComponentProps, ExtendElement } from './component';

/**
 * props differences result
 */
export type DiffPropsRet = {
  onlyLeft: ComponentProps;
  onlyRight: ComponentProps;
  both: {
    bothLeft: ComponentProps;
    bothRight: ComponentProps;
  };
};

/**
 * find the props differences
 * @param leftProps
 * @param rightProps
 */
export function diffProps(leftProps: ComponentProps = {}, rightProps: ComponentProps = {}): object {
  const ret: DiffPropsRet = {
    onlyLeft: {},
    onlyRight: {},
    both: {
      bothLeft: {},
      bothRight: {},
    },
  };

  for (const key in leftProps) {
    if (rightProps[key] === undefined) {
      ret.onlyLeft[key] = leftProps[key];
    } else {
      ret.both.bothLeft[key] = leftProps[key];
      ret.both.bothRight[key] = leftProps[key];
    }
  }

  for (const key in rightProps) {
    if (leftProps[key] === undefined) {
      ret.onlyRight[key] = rightProps[key];
    }
  }

  return ret;
}

/**
 * get the rendered dom of component
 * @param comp
 */
export function getRenderedDom(comp: Component) {
  let rendered = comp.__rendered;
  while (rendered instanceof Component) {
    rendered = rendered.__rendered;
  }

  return rendered;
}

/**
 * get component dom index
 * @param dom
 */
export function getDomIndex(dom: ExtendElement) {
  return dom.__myIndex;
}
