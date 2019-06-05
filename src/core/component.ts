/**
 * @description component class define
 * @author xzc
 * 2019/05/24
 */

/**
 * Component props
 */
export interface ComponentProps {
  [propName: string]: any;
}

/**
 * Component dom events
 */
export interface ExtendElementEvents {
  [eventName: string]: any;
}

/**
 * Component dom, extends from HTMLElement
 */
export interface ExtendElement extends HTMLElement {
  __rendered: Array<Component>;
  __vnode: Component;
  /**
   * 方便 getDOMIndex 方法
   */
  __myIndex: number;
  __events: ExtendElementEvents;
}

export default class Component {
  /**
   * Component Props
   */
  props: ComponentProps;

  /**
   * Dom or Component rendered before
   */
  // tslint:disable-next-line:variable-name
  __rendered: undefined | Component | ExtendElement;

  constructor(props: ComponentProps) {
    this.props = props;
  }
}
