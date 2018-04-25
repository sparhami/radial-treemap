/*
@license
Copyright 2016 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


import {attachFocusWithin} from './focuswithin.js';
import {attachRadialContainer} from './radialcontainer.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      pointer-events: none;

      stroke-width: var(--arc-width, 15px);
      fill: none;
      outline: none;
    }

    svg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    circle {
      pointer-events: auto;
      transition-property: stroke-dasharray, stroke-dashoffset;
      transition-duration: var(--arc-transition-duration, 250ms);
      transition-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    :host(:focus),
    :host([focus-within]) {
      opacity: 1 !important;
    }

    :host([focus-within]) ::content > radial-treeitem {
      opacity: var(--inactive-opacity, 0.3);
    }
  </style>

  <svg viewBox="0 0 200 200">
    <circle cx="100" cy="100" class="arc" />
  </svg>
  <content></content>
`;

class RadialTreeitem extends HTMLElement {
  constructor() {
    super();

    const sr = this.createShadowRoot();
    sr.appendChild(template.content.cloneNode(true));

    this.arc_ = sr.querySelector('.arc');
    this.addEventListener('focus', this.handleFocus_);

    attachFocusWithin(this);
  }

  connectedCallback() {
    this.tabIndex = -1;
    this.setAttribute('role', 'treeitem');
  }

  update() {
    const arc = this.arc_;
    const style = getComputedStyle(this);
    const radius = parseInt(style.getPropertyValue('--circle-radius') || 50);
    const spacing = parseInt(style.getPropertyValue('--spacing')) || 2;
    const levelSpacing = parseInt(style.getPropertyValue('--level-spacing')) || 4;  
    const strokeWidth = parseInt(style.getPropertyValue('stroke-width')) || 15;

    const overlap = -spacing;
    const r = radius + ((strokeWidth + levelSpacing) * this.level);
    const c = 2 * Math.PI * r;
    // Cap dash at 2πr to prevent flicker during transition.
    const visibleDash = Math.max(0, Math.min(c, (c * this.percentage) + overlap));
    const invisibleDash = c - visibleDash;
    const dashOffset = -(c * this.offset) + (overlap / 2);

    arc.setAttribute('stroke-dasharray', `${visibleDash} ${invisibleDash}`);
    arc.setAttribute('stroke-dashoffset', dashOffset);
    arc.style.r = r;
  }
}

customElements.define('radial-treeitem', RadialTreeitem);

export default RadialTreeitem;
