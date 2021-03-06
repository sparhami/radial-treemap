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

function attachRadialContainer(el) {
  let dirty = false;

  new MutationObserver(update).observe(el, {
    childList: true,
    attributes: true,
    subtree: true
  });

  function getValue(child) {
    return Number(child.getAttribute('value'));
  }

  function update() {
    if (dirty) {
      return;
    }

    dirty = true;
    requestAnimationFrame(() => {
      dirty = false;
      update_(el);
    });
  }

  function update_(el) {
    if (el.update) {
      el.update();
    }

    const children = Array.from(el.children);
    const sum = children
      .map(getValue)
      .reduce((p, c) => p + c, 0);

    children.reduce((runningSum, child) => {
      const value = getValue(child);
      const percentage = ((value / sum) * el.percentage) || 0;

      child.level = el.level + 1;
      child.percentage = percentage;
      child.offset = runningSum;
      update_(child);

      return runningSum + percentage;
    }, el.offset);
  }
}

export {
  attachRadialContainer,
}
