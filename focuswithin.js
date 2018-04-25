function updateFocus(el, enable) {
  if (enable) {
    el.setAttribute('focus-within', '');
  } else {
    el.removeAttribute('focus-within');
  }
}

function handleFocus(e) {
  updateFocus(this, e.target !== this);
}

function handleBlur(e) {
  updateFocus(this, this.contains(e.relatedTarget));
}

function attachFocusWithin(el) {
  el.addEventListener('focus', handleFocus, true);
  el.addEventListener('blur', handleBlur, true);
};

export {
  attachFocusWithin,
};
