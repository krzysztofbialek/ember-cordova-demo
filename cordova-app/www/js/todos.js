"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('todos/adapters/application', ['exports', 'ember-data-fixture-adapter'], function (exports, ember_data_fixture_adapter) {

	'use strict';



	exports['default'] = ember_data_fixture_adapter['default'];

});
define('todos/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'todos/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('todos/application/controller', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  // controllers/todos.js
  exports['default'] = Ember['default'].Controller.extend({
    state: 'all',
    queryParams: ['state']
  });

});
define('todos/application/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  // routes/todos.js
  exports['default'] = Ember['default'].Route.extend({

    queryParams: {
      state: { refreshModel: true }
    },

    model: function model(params) {
      return this.store.findAll('todo').then(function (todos) {
        return {
          all: todos,
          filter: params.state
        };
      });
    }

  });

});
define('todos/application/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "todos/application/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","todos-route",[],["todos",["subexpr","@mut",[["get","model.all",["loc",[null,[1,20],[1,29]]],0,0,0,0]],[],[],0,0],"filter",["subexpr","@mut",[["get","model.filter",["loc",[null,[2,21],[2,33]]],0,0,0,0]],[],[],0,0]],["loc",[null,[1,0],[2,35]]],0,0]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('todos/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'todos/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var name = config['default'].APP.name;
  var version = config['default'].APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('todos/components/edit-todo/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].TextField.extend({
    didInsertElement: function didInsertElement() {
      this.$().focus();
      this.$().addClass('focus'); // headless testing is brittle
    }
  });

});
define('todos/components/todo-item/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'li',
    classNameBindings: ['todo.isCompleted:completed', 'isEditing:editing'],

    init: function init() {
      this._super.apply(this, arguments);
      this.set('isEditing', false);
    },

    actions: {
      editTodo: function editTodo() {
        this.set('isEditing', true);
      },

      save: function save(todo, title) {
        this.set('isEditing', false);

        todo.set('title', title);
        todo.save();
      },

      removeTodo: function removeTodo(todo) {
        todo.destroyRecord();
      },

      toggleCompleteTodo: function toggleCompleteTodo(todo) {
        todo.toggleProperty('isCompleted');
        todo.save();
      }
    }
  });

});
define('todos/components/todo-item/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "todos/components/todo-item/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","edit-todo",[],["class","edit","value",["subexpr","@mut",[["get","todo.title",["loc",[null,[2,33],[2,43]]],0,0,0,0]],[],[],0,0],"focus-out",["subexpr","action",["save",["get","todo",["loc",[null,[3,52],[3,56]]],0,0,0,0]],[],["loc",[null,[3,37],[3,57]]],0,0],"insert-newline",["subexpr","action",["save",["get","todo",["loc",[null,[4,57],[4,61]]],0,0,0,0]],[],["loc",[null,[4,42],[4,62]]],0,0]],["loc",[null,[2,2],[4,64]]],0,0]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "todos/components/todo-item/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("input");
          dom.setAttribute(el1,"type","checkbox");
          dom.setAttribute(el1,"class","toggle");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","destroy");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          if (this.cachedFragment) { dom.repairClonedNode(element0,[],true); }
          var element1 = dom.childAt(fragment, [3]);
          var element2 = dom.childAt(fragment, [5]);
          var morphs = new Array(5);
          morphs[0] = dom.createAttrMorph(element0, 'checked');
          morphs[1] = dom.createAttrMorph(element0, 'onchange');
          morphs[2] = dom.createElementMorph(element1);
          morphs[3] = dom.createMorphAt(element1,0,0);
          morphs[4] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [
          ["attribute","checked",["get","todo.isCompleted",["loc",[null,[6,35],[6,51]]],0,0,0,0],0,0,0,0],
          ["attribute","onchange",["subexpr","action",["toggleCompleteTodo",["get","todo",["loc",[null,[6,108],[6,112]]],0,0,0,0]],[],["loc",[null,[null,null],[6,114]]],0,0],0,0,0,0],
          ["element","action",["editTodo"],["on","doubleClick"],["loc",[null,[7,9],[7,47]]],0,0],
          ["content","todo.title",["loc",[null,[7,48],[7,62]]],0,0,0,0],
          ["element","action",["removeTodo",["get","todo",["loc",[null,[8,32],[8,36]]],0,0,0,0]],[],["loc",[null,[8,10],[8,38]]],0,0]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "todos/components/todo-item/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","isEditing",["loc",[null,[1,6],[1,15]]],0,0,0,0]],[],0,1,["loc",[null,[1,0],[9,7]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('todos/components/todos-list/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'ul'
  });

});
define('todos/components/todos-list/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "todos/components/todos-list/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","todo-item",[],["todo",["subexpr","@mut",[["get","todo",["loc",[null,[2,19],[2,23]]],0,0,0,0]],[],[],0,0]],["loc",[null,[2,2],[2,25]]],0,0]
        ],
        locals: ["todo"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "todos/components/todos-list/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","each",[["get","todos",["loc",[null,[1,8],[1,13]]],0,0,0,0]],[],0,null,["loc",[null,[1,0],[3,9]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('todos/components/todos-route/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var Component = Ember['default'].Component;
  var computed = Ember['default'].computed;
  var filterBy = Ember['default'].computed.filterBy;
  var service = Ember['default'].inject.service;

  exports['default'] = Component.extend({
    store: service(),

    filtered: computed('todos.@each.isCompleted', 'filter', function () {
      switch (this.get('filter')) {
        case 'active':
          return this.get('active');
        case 'completed':
          return this.get('completed');
        default:
          return this.get('todos');
      }
    }),

    completed: filterBy('todos', 'isCompleted', true),
    active: filterBy('todos', 'isCompleted', false),
    allAreDone: computed.empty('active'),

    inflection: computed('active.length', function () {
      var active = this.get('active.length');
      return active === 1 ? 'item' : 'items';
    }).readOnly(),

    actions: {
      createTodo: function createTodo(title) {
        var store = this.get('store');

        if (title && !title.trim()) {
          this.set('newTitle', '');
          return;
        }

        // Create the new Todo model
        var todo = store.createRecord('todo', {
          title: title
        });

        // Clear the "New Todo" text field
        this.set('newTitle', '');

        // Save the new model
        todo.save();
      },

      completeAll: function completeAll() {
        var todos = this.get('todos');
        var allAreDone = this.get('allAreDone');

        todos.setEach('isCompleted', !allAreDone);
        todos.invoke('save');
      },

      clearCompleted: function clearCompleted() {
        var completed = this.get('completed');

        completed.toArray() // clone the array, so it is not bound while we iterate over and delete.
        .invoke('destroyRecord');
      }
    }
  });

});
define('todos/components/todos-route/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 11
            },
            "end": {
              "line": 26,
              "column": 98
            }
          },
          "moduleName": "todos/components/todos-route/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("All");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 27,
              "column": 11
            },
            "end": {
              "line": 27,
              "column": 98
            }
          },
          "moduleName": "todos/components/todos-route/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Active");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 28,
              "column": 11
            },
            "end": {
              "line": 28,
              "column": 98
            }
          },
          "moduleName": "todos/components/todos-route/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Completed");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 31,
              "column": 4
            },
            "end": {
              "line": 35,
              "column": 4
            }
          },
          "moduleName": "todos/components/todos-route/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","clear-completed");
          var el2 = dom.createTextNode("\n        Clear completed (");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(")\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0,1,1);
          return morphs;
        },
        statements: [
          ["element","action",["clearCompleted"],[],["loc",[null,[32,38],[32,65]]],0,0],
          ["content","completed.length",["loc",[null,[33,25],[33,45]]],0,0,0,0]
        ],
        locals: [],
        templates: []
      };
    }());
    var child4 = (function() {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 40,
              "column": 2
            },
            "end": {
              "line": 40,
              "column": 27
            }
          },
          "moduleName": "todos/components/todos-route/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Hodor");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 44,
            "column": 0
          }
        },
        "moduleName": "todos/components/todos-route/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"class","todoapp");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("header");
        dom.setAttribute(el2,"id","header");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        var el4 = dom.createTextNode("todos");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2,"class","main");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("input");
        dom.setAttribute(el3,"type","checkbox");
        dom.setAttribute(el3,"class","toggle-all");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("footer");
        dom.setAttribute(el2,"class","footer");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3,"class","todo-count");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("strong");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" left\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","filters");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("footer");
        dom.setAttribute(el1,"class","info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Double-click to edit a todo");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  }\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(element1, [3]);
        var element3 = dom.childAt(element2, [3]);
        if (this.cachedFragment) { dom.repairClonedNode(element3,[],true); }
        var element4 = dom.childAt(element1, [5]);
        var element5 = dom.childAt(element4, [1]);
        var element6 = dom.childAt(element4, [3]);
        var morphs = new Array(11);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]),3,3);
        morphs[1] = dom.createMorphAt(element2,1,1);
        morphs[2] = dom.createAttrMorph(element3, 'checked');
        morphs[3] = dom.createAttrMorph(element3, 'onchange');
        morphs[4] = dom.createMorphAt(dom.childAt(element5, [1]),0,0);
        morphs[5] = dom.createMorphAt(element5,3,3);
        morphs[6] = dom.createMorphAt(dom.childAt(element6, [1]),1,1);
        morphs[7] = dom.createMorphAt(dom.childAt(element6, [3]),1,1);
        morphs[8] = dom.createMorphAt(dom.childAt(element6, [5]),1,1);
        morphs[9] = dom.createMorphAt(element4,5,5);
        morphs[10] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        return morphs;
      },
      statements: [
        ["inline","input",[],["type","text","class","new-todo","placeholder","What needs to be done?","value",["subexpr","@mut",[["get","newTitle",["loc",[null,[7,18],[7,26]]],0,0,0,0]],[],[],0,0],"enter","createTodo"],["loc",[null,[4,4],[8,32]]],0,0],
        ["inline","todos-list",[],["todos",["subexpr","@mut",[["get","filtered",["loc",[null,[12,23],[12,31]]],0,0,0,0]],[],[],0,0],"class","todo-list"],["loc",[null,[12,4],[12,51]]],0,0],
        ["attribute","checked",["get","allAreDone",["loc",[null,[16,22],[16,32]]],0,0,0,0],0,0,0,0],
        ["attribute","onchange",["subexpr","action",["completeAll"],[],["loc",[null,[null,null],[17,45]]],0,0],0,0,0,0],
        ["content","active.length",["loc",[null,[22,14],[22,31]]],0,0,0,0],
        ["content","inflection",["loc",[null,[22,41],[22,55]]],0,0,0,0],
        ["block","link-to",["index",["subexpr","query-params",[],["state","all"],["loc",[null,[26,41],[26,67]]],0,0]],["activeClass","selected"],0,null,["loc",[null,[26,11],[26,98]]]],
        ["block","link-to",["index",["subexpr","query-params",[],["state","active"],["loc",[null,[27,41],[27,70]]],0,0]],["activeClass","selected"],1,null,["loc",[null,[27,11],[27,98]]]],
        ["block","link-to",["index",["subexpr","query-params",[],["state","completed"],["loc",[null,[28,41],[28,73]]],0,0]],["activeClass","selected"],2,null,["loc",[null,[28,11],[28,98]]]],
        ["block","if",[["get","completed",["loc",[null,[31,10],[31,19]]],0,0,0,0]],[],3,null,["loc",[null,[31,4],[35,11]]]],
        ["block","link-to",["hodor"],[],4,null,["loc",[null,[40,2],[40,39]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  }()));

});
define('todos/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('todos/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('todos/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, pluralize) {

	'use strict';

	exports['default'] = pluralize['default'];

});
define('todos/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, singularize) {

	'use strict';

	exports['default'] = singularize['default'];

});
define('todos/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'todos/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](config['default'].APP.name, config['default'].APP.version)
  };

});
define('todos/initializers/data-adapter', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: Ember['default'].K
  };

});
define('todos/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, setupContainer) {

  'use strict';

  exports['default'] = {
    name: 'ember-data',
    initialize: setupContainer['default']
  };

});
define('todos/initializers/export-application-global', ['exports', 'ember', 'todos/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('todos/initializers/injectStore', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: Ember['default'].K
  };

});
define('todos/initializers/store', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: Ember['default'].K
  };

});
define('todos/initializers/transforms', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: Ember['default'].K
  };

});
define('todos/instance-initializers/ember-data', ['exports', 'ember-data/-private/instance-initializers/initialize-store-service'], function (exports, initializeStoreService) {

  'use strict';

  exports['default'] = {
    name: "ember-data",
    initialize: initializeStoreService['default']
  };

});
define('todos/models/todo', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Todo = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    isCompleted: DS['default'].attr('boolean', { defaultValue: false })
  });

  Todo.reopenClass({
    FIXTURES: [{
      id: '1',
      title: 'install ember-cli',
      isCompleted: true
    }, {
      id: '2',
      title: 'install additional dependencies',
      isCompleted: true
    }, {
      id: '3',
      title: 'develop amazing things',
      isCompleted: false
    }]
  });

  exports['default'] = Todo;

});
define('todos/router', ['exports', 'ember', 'todos/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('hodor');
  });

  exports['default'] = Router;

});
define('todos/routes/hodor', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  // routes/todos.js
  exports['default'] = Ember['default'].Route.extend({

    queryParams: {
      hodor: { refreshModel: true }
    },

    model: function model(params) {
      return [];
    }

  });

});
define('todos/tests/acceptance/todos-test', ['todos/tests/helpers/start-app', 'todos/tests/helpers/resolver', 'ember', 'qunit'], function (startApp, Resolver, Ember, qunit) {

  'use strict';

  var App;

  qunit.module('Acceptances - Todos', {
    beforeEach: function beforeEach() {
      var todo = Resolver['default'].resolve('model:todo');

      todo.reopenClass({
        FIXTURES: [{
          id: '1',
          title: 'install ember-cli',
          isCompleted: true
        }, {
          id: '2',
          title: 'install additional dependencies',
          isCompleted: true
        }, {
          id: '3',
          title: 'develop amazing things',
          isCompleted: false
        }] });

      App = startApp['default']();
    },

    afterEach: function afterEach() {
      Ember['default'].run(App, 'destroy');
    }
  });

  function exists(selector) {
    return !!window.find(selector).length;
  }

  function remainingCountText() {
    return Number($('.todo-count strong').text());
  }

  var notCompletedSelector = ".todo-list li:not('.completed') input";
  var completedSelector = '.todo-list li.completed input';

  function notCompleted() {
    return $(notCompletedSelector);
  }

  function completed() {
    return $(completedSelector);
  }

  function mock(options) {
    return Ember['default'].$.extend(true, {}, options);
  }

  qunit.test('todos renders', function (assert) {
    assert.expect(7);

    visit('/').then(function () {
      assert.ok(exists('.new-todo'));
      assert.ok(exists('.toggle-all'));

      var list = find('.todo-list li');
      assert.equal(list.length, 3);

      assert.ok(exists('.todo-count'));

      var linkList = find('.filters li');
      assert.equal(linkList.length, 3);

      assert.ok(exists('.clear-completed'));
      assert.ok(exists('.info'));
    });
  });

  qunit.test('todos mark last completed', function (assert) {
    assert.expect(6);

    return visit('/').then(function () {
      assert.equal(1, notCompleted().length, 'expected 1 uncompleted');
      assert.equal(1, remainingCountText());
      assert.equal(2, completed().length);

      return click(notCompletedSelector).then(function () {
        assert.equal(0, notCompleted().length, 'expected 0 uncompleted');
        assert.equal(0, remainingCountText());
        assert.equal(3, completed().length);
      });
    });
  });

  qunit.test('todos mark one uncompleted', function (assert) {
    assert.expect(6);

    return visit('/').then(function () {
      assert.equal(1, notCompleted().length, 'expected 1 uncompleted');
      assert.equal(1, remainingCountText());
      assert.equal(2, completed().length);

      return click(completedSelector + ':first').then(function () {
        assert.equal(2, notCompleted().length, 'expected 0 uncompleted');
        assert.equal(2, remainingCountText());
        assert.equal(1, completed().length);
      });
    });
  });

  qunit.test('clear completed', function (assert) {
    assert.expect(6);

    return visit('/').then(function () {
      assert.equal(1, notCompleted().length, 'expected 1 uncompleted');
      assert.equal(1, remainingCountText());
      assert.equal(2, completed().length);

      return click('.clear-completed').then(function () {
        assert.equal(1, notCompleted().length, 'expected 3 uncompleted');
        assert.equal(1, remainingCountText());
        assert.equal(0, completed().length);
      });
    });
  });

  qunit.test('create todo', function (assert) {
    assert.expect(4);

    return visit('/').then(function () {
      fillIn('.new-todo', 'bro');

      // insert a newline
      keyEvent('.new-todo', 'keyup', 13).then(function () {
        assert.equal(2, notCompleted().length, 'expected 1 uncompleted');
        assert.equal(2, remainingCountText());
        assert.equal(2, completed().length);
        assert.equal('bro', $('ul.todo-list li label:last').text());
      });
    });
  });

  qunit.test('remove todo', function (assert) {
    assert.expect(3);

    return visit('/').then(function () {
      return click('.todo-list li.completed button.destroy').then(function () {
        assert.equal(1, notCompleted().length, 'expected 1 uncompleted');
        assert.equal(1, remainingCountText());
        assert.equal(0, completed().length);
      });
    });
  });

  qunit.test('edit todo', function (assert) {
    assert.expect(2);

    return visit('/').then(function () {
      var todo = $('.todo-list li:first');

      triggerEvent(todo.find('label'), 'dblclick').then(function () {
        var input = todo.find('input.edit');
        assert.equal(input.length, 1, 'label should have become transformed into input');

        fillIn(input, 'new task description');
        keyEvent(input.selector, 'keyup', 13).then(function () {
          assert.equal(todo.find('label').text(), 'new task description');
        });
      });
    });
  });

});
define('todos/tests/acceptance/todos-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - acceptance/todos-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/todos-test.js should pass jshint.');
  });

});
define('todos/tests/adapters/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters/application.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });

});
define('todos/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });

});
define('todos/tests/application/controller.jshint', function () {

  'use strict';

  QUnit.module('JSHint - application/controller.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'application/controller.js should pass jshint.');
  });

});
define('todos/tests/application/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - application/route.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'application/route.js should pass jshint.');
  });

});
define('todos/tests/components/edit-todo/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/edit-todo/component.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-todo/component.js should pass jshint.');
  });

});
define('todos/tests/components/todo-item/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/todo-item/component.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'components/todo-item/component.js should pass jshint.');
  });

});
define('todos/tests/components/todos-list/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/todos-list/component.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'components/todos-list/component.js should pass jshint.');
  });

});
define('todos/tests/components/todos-route/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/todos-route/component.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'components/todos-route/component.js should pass jshint.');
  });

});
define('todos/tests/helpers/resolver', ['exports', 'ember/resolver', 'todos/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('todos/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });

});
define('todos/tests/helpers/start-app', ['exports', 'ember', 'todos/app', 'todos/router', 'todos/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('todos/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });

});
define('todos/tests/integration/components/todo-item-test', ['ember-qunit', 'ember'], function (ember_qunit, Ember) {

  'use strict';

  ember_qunit.moduleForComponent('todo-item', 'Integration - Component - Todo Item', {
    integration: true
  });

  ember_qunit.test('completed checkbox triggers a save', function (assert) {
    var _this = this;

    var store = this.container.lookup('service:store');
    var todo;

    Ember['default'].run(function () {
      todo = store.createRecord('todo', {
        title: 'Confirm save',
        isCompleted: false
      });
    });

    this.set('todo', todo);
    this.render(Ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.9.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 23
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'todo-item', [], ['todo', ['subexpr', '@mut', [['get', 'todo', ['loc', [null, [1, 17], [1, 21]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 23]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.notOk(todo.get('isSaving'), 'todo is not saving before click');

    Ember['default'].run(function () {
      _this.$('input[type=checkbox]').click();
    });

    assert.ok(todo.get('isCompleted'), 'todo is completed after click');
    assert.ok(todo.get('isSaving'), 'todo is saving after click');

    // Return a promise that ensures the test will wait until the todo is saved
    // before trying to unload it (otherwise an error will be raised):
    return Ember['default'].run(function () {
      return todo.save();
    });
  });

});
define('todos/tests/integration/components/todo-item-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/todo-item-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/todo-item-test.js should pass jshint.');
  });

});
define('todos/tests/integration/models/todo-test', ['ember-qunit', 'ember'], function (ember_qunit, Ember) {

  'use strict';

  ember_qunit.moduleForModel('todo', 'Integration - Model', {
    needs: ['adapter:application']
  });

  ember_qunit.test('contrived example, loading an additional todo', function (assert) {
    assert.expect(4);

    var store = this.store();

    // he user interacts with the application (via click or something)
    // so lets simulate that via an programmatic run-loop (normally the eventDispatcher does this for us)
    return Ember['default'].run(function () {
      return store.findAll('todo').then(function (todos) {

        // ensure new length
        var numberOfTodos = todos.get('length');

        // lets pretend another Todo was added
        store.push({
          data: {
            type: 'todo',
            id: '9999',
            attributes: {
              title: 'install EAK',
              isCompleted: true
            }
          }
        });

        // // lets do another findAll
        return store.findAll('todo').then(function (todos) {
          assert.equal(numberOfTodos + 1, todos.get('length'), 'expect an additional todo');

          var todo = todos.get('lastObject');

          // some what trivial but still a good test
          assert.equal('9999', todo.get('id'));
          assert.equal('install EAK', todo.get('title'));
          assert.equal(true, todo.get('isCompleted'));
        });
      });
    });
  });

});
define('todos/tests/integration/models/todo-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/models/todo-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'integration/models/todo-test.js should pass jshint.');
  });

});
define('todos/tests/models/todo.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/todo.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'models/todo.js should pass jshint.');
  });

});
define('todos/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });

});
define('todos/tests/routes/hodor.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/hodor.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'routes/hodor.js should pass jshint.\nroutes/hodor.js: line 10, col 9, \'params\' is defined but never used.\n\n1 error');
  });

});
define('todos/tests/test-helper', ['todos/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('todos/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });

});
define('todos/tests/unit/components/edit-todo-test', ['ember-qunit', 'ember'], function (ember_qunit, Ember) {

  'use strict';

  ember_qunit.moduleForComponent('edit-todo');

  ember_qunit.test('renders and autofocuses', function (assert) {
    assert.ok(this.subject() instanceof Ember['default'].Component);
    assert.ok(this.$().is('input'), 'is an input');
    assert.ok(this.$().is('.focus'), 'is in focus');
  });

});
define('todos/tests/unit/components/edit-todo-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/components/edit-todo-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/components/edit-todo-test.js should pass jshint.');
  });

});
define('todos/tests/unit/components/todo-item/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('todo-item', {
    // specify the other units that are required for this test
    // needs: ['component:foo', 'helper:bar']
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

});
define('todos/tests/unit/components/todo-item/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/components/todo-item/component-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/components/todo-item/component-test.js should pass jshint.');
  });

});
define('todos/tests/unit/components/todos-list/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('todos-list', {
    // specify the other units that are required for this test
    // needs: ['component:foo', 'helper:bar']
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

});
define('todos/tests/unit/components/todos-list/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/components/todos-list/component-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/components/todos-list/component-test.js should pass jshint.');
  });

});
define('todos/tests/unit/models/todo-test', ['ember-qunit', 'ember'], function (ember_qunit, Ember) {

  'use strict';

  ember_qunit.moduleForModel('todo', 'Unit - Todo');

  ember_qunit.test("it exists", function (assert) {
    assert.ok(this.subject());
  });

});
define('todos/tests/unit/models/todo-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models/todo-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/todo-test.js should pass jshint.');
  });

});
define('todos/tests/unit/routes/application-test', ['ember-qunit', 'ember'], function (ember_qunit, Ember) {

  'use strict';

  ember_qunit.moduleFor('route:application');

  ember_qunit.test('it exists', function (assert) {
    assert.expect(2);
    var route = this.subject();

    assert.ok(route);
    assert.ok(route instanceof Ember['default'].Route);
  });

  ember_qunit.test('#model state:all', function (assert) {
    assert.expect(3);

    var expectedModel = {
      id: '1',
      title: 'install EAK',
      isCompleted: true
    };

    var route = this.subject({
      store: {
        findAll: function findAll(type) {
          assert.equal(type, 'todo');

          return Ember['default'].RSVP.Promise.resolve(expectedModel);
        }
      }
    });

    return route.model({ state: 'all' }).then(function (model) {
      assert.equal(model.filter, 'all');
      assert.equal(model.all, expectedModel);
    });
  });

});
define('todos/tests/unit/routes/application-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/application-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.');
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('todos/config/environment', ['ember'], function(Ember) {
  var prefix = 'todos';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("todos/tests/test-helper");
} else {
  require("todos/app")["default"].create({"name":"todos","version":"1.13.0+f7e6fce5"});
}

/* jshint ignore:end */
//# sourceMappingURL=todos.map