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

import {attachTreeSelection} from './bower_components/x-treeview/treeselection.js';
import {attachFocusWithin} from './focuswithin.js';
import {attachRadialContainer} from './radialcontainer.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: none;
      position: relative;  
      outline: none;
    }

    :host([ready]) {
      display: inline-block;
    }

    :host([focus-within]) ::content > radial-treeitem {
      opacity: var(--inactive-opacity, 0.3);
    }
  </style>

  <content></content>
`;

class RadialTreemap extends HTMLElement {
  constructor() {
    super();

    const sr = this.createShadowRoot();
    sr.appendChild(template.content.cloneNode(true));

    this.offset = 0;
    this.percentage = 1;
    this.level = -1;

    attachTreeSelection(this, {
      wrap: true,
      trap: true 
    });
    attachFocusWithin(this);
    attachRadialContainer(this);
  }

  connectedCallback() {
    this.tabIndex = 0;
    this.setAttribute('role', 'tree');

    setTimeout(() => this.setAttribute('ready', ''));
  }
}

customElements.define('radial-treemap', RadialTreemap);

export default RadialTreemap;
