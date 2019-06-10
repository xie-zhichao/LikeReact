enum SupportedEventType {
  keydown = 'keydown',
  keypress = 'keypress',
  keyup = 'keyup',
  click = 'click',
  mouseenter = 'mouseenter',
  mouseover = 'mouseover',
  mousemove = 'mousemove',
  change = 'change',
}

for (const item in SupportedEventType) {
  console.log(item);
}
