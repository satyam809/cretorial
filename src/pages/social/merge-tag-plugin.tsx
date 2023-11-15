

const mergeTag = {
  // @Required
  // plugin name
  name: 'merge_tag',

  // @Required
  // data display
  display: 'dialog',

  // @Required
  // add function - It is called only once when the plugin is first run.
  // This function generates HTML to append and register the event.
  // arguments - (core : core object, targetElement : clicked button element)
  add: function (core: any, targetElement: any) {
    alert("call 1=" + core.getSelection().toString())
    // Generate submenu HTML
    // Always bind "core" when calling a plugin function
    //let listDiv = this.setSubmenu.call(core);

    // You must bind "core" object when registering an event.
    /** add event listeners */
    //var self = this;
    // listDiv.querySelectorAll('.se-btn-list').forEach(function (btn: any) {
    //   btn.addEventListener('click', self.onClick.bind(core));
    // });

    // @Required
    // You must add the "submenu" element using the "core.initMenuTarget" method.
    /** append target button menu */
    //core.initMenuTarget(this.name, targetElement, listDiv);
  },

  setDialog: function (core: any) {
    alert("call 2=" + core.getSelection().toString())
    // const listDiv = this.util.createElement('DIV');
    // // @Required
    // // A "se-submenu" class is required for the top level element.
    // listDiv.className = 'se-submenu se-list-layer';
    // listDiv.innerHTML = '<div class="se-list-inner se-list-font-size"><ul class="se-list-basic"><li><button type="button" class="se-btn-list" value="{firstName}">{firstName}</button></li><li><button type="button" class="se-btn-list" value="{lastName}">{lastName}</button></li></ul></div>'


  },
  onClick: function (e: any) {
    alert("call 3=")
    /* const value = e.target.value;
     const node = this.util.createElement('span');
     this.util.addClass(node, 'se-custom-tag');
     node.textContent = value;
 
     this.insertNode(node);
     const zeroWidthSpace = this.util.createTextNode(this.util.zeroWidthSpace);
     node.parentNode.insertBefore(zeroWidthSpace, node.nextSibling);
 
     this.submenuOff();*/
  },

  setController_LinkButton: function (core: any) {
    alert("call 4=" + core.getSelection().toString())
  },
  open: function () {
    // console.log("call 5=" + core.getSelection().toString())


  },
  submit: function (e: any) {

  },
  // active: function (element: any) {

  // },
  on: function (update: any) {

  },
  call_controller: function (selectionATag: any) {
    alert("call 6=" + selectionATag.getSelection().toString())
  },
  onClick_linkController: function (e: any) {

  },
  // init: function () {

  // }
};

export default mergeTag