
const path = require('path');
// This is the main module of the plugin where you define
// add, remove, move method to manage elements.

// rekitCore is the one that is dependent by the project using the plugin.
// You may need it to perform common tasks such as use refactor to rename variables in a module.

function handleElement(rekitCore) {
  const { action, refactor, utils, test } = rekitCore;
  function add(feature, name, args) {

    args = args || {};
    if (!args.async) {
      // Use default behavior if it's a sync action
      rekitCore.addAction(feature, name, args);
      return;
    }

    // Action is similar with async action except the template.
    action.addAsync(feature, name, {
      templateFile: path.join(__dirname, 'templates/async_action.js'),
    });

    // Add test
    test.addAction(feature, name, {
      templateFile: path.join(__dirname, 'templates/async_action.test.js'),
      isAsync: true,
    });
  }

  return {
    add,
  };
}

module.exports = handleElement;
