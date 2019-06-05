/**
 * events, listening on document, and dispatch the events
 */
import { ExtendElement } from './component';

// event type supported
export enum SupportedEventType {
  keydown = 'keydown',
  keypress = 'keypress',
  keyup = 'keyup',
  click = 'click',
  mouseenter = 'mouseenter',
  mouseover = 'mouseover',
  mousemove = 'mousemove',
  change = 'change',
}

/**
 * events class of this lib
 */
export interface ComponentEvent extends Event {
  type: SupportedEventType;
  path?: Array<ExtendElement>;
  deepPath?: Array<ExtendElement>;
  __notup: boolean;
}

export function getSyntheticEvent(e: ComponentEvent): ComponentEvent {
  e.stopPropagation = () => {
    e.__notup = true;
  };
  return e;
}

export function getRelatedDOMList(e: ComponentEvent): Array<Node> {
  const path = e.path || e.deepPath;
  if (path) {
    return path;
  }

  const result = [];

  let node = e.target as Node;
  while (node !== window.document) {
    result.push(node);
    node = <Node>node.parentNode;
  }

  return result;
}

export function superHandle(e: ComponentEvent): void {
  const syntheticEvent = getSyntheticEvent(e);
  const domList = getRelatedDOMList(e);
  const eventType = e.type;

  const len = domList.length;

  // capture
  for (let i = len - 1; i >= 0; i--) {
    const dom = <ExtendElement>domList[i];
    if (!dom.__events) break;

    const handle = dom.__events[eventType + 'Capture'];
    handle && handle(syntheticEvent);
  }

  // bubble
  for (let i = 0; i < len; i++) {
    const dom = <ExtendElement>domList[i];
    if (!dom.__events) break;

    const handle = dom.__events[eventType];
    handle && handle(syntheticEvent);
    if (syntheticEvent.__notup) {
      break;
    }
  }
}

/**
 * init listeners on document
 */
export function init() {
  for (const item in SupportedEventType) {
    document.addEventListener(item, superHandle);
  }
}
