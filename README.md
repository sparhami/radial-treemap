`<radial-treemap>` A component that renders a radial tree map that can be
navigated via the keyboard or mouse. 

Example:

    <radial-treemap>
      <radial-treeitem value="100" title="first"></radial-treeitem>
      <radial-treeitem value="200" title="second"></radial-treeitem>
    </radial-treemap>

    <radial-treemap>
      <radial-treeitem value="100" title="first" aria-expanded="true">
        <radial-treeitem value="10" title="f1"></radial-treeitem>
        <radial-treeitem value="30" title="f2"></radial-treeitem>
      </radial-treeitem>
      <radial-treeitem value="200" title="second"></radial-treeitem>
    </radial-treemap>

The first example will render a ring with 1/3 taken by the first item and 2/3
by the second. Labels are not yet supported.

The second example shows grouping. Currently, groups must have the
aria-expanded attribute specified (either true or false) to show or work with
keyboard navigation.

This is not an official Google product.
