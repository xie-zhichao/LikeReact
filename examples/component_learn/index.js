function createDOMFromString (DOMstr) {
  const div = document.createElement('div');
  div.innerHTML = DOMstr;
  return div;
}

class Component {

  constructor (props) {
    this.props = props || {};
  }

  setState (state) {
    const oldEl =  this.el;
    this.state = state;
    this._renderDOM();
    if (this.onChangeState) this.onChangeState(oldEl, this.el);
  }

  _renderDOM () {
    this.el = createDOMFromString(this.render());
    if (this.onClick) {
      this.el.addEventListener('click', this.onClick.bind(this), false);
    }

    return this.el;
  }
}

class LikeButton extends Component {

  constructor (props) {
    super(props);
    this.state = {
      likeIt: true 
    };
  }

  onClick () {
    const { likeIt } = this.state;
    this.setState({
      likeIt: !likeIt
    });
  }

  render () {
    const { bkColor } = this.props;
    const { likeIt } = this.state;
    return `
      <button class='like-btn' style="background-color:${bkColor}">
        <span>${likeIt ? '点赞' : '取消'}</span>
        <span>👍</span>
      </button>
    `;
  }
}

function mountDOM (component, container) {
  container.appendChild(component._renderDOM());
  component.onChangeState = (oldEl, newEl) => {
    container.replaceChild(newEl, oldEl);
  };
}