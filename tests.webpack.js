const context = require.context('./static/js/tests', true, /-test\.jsx$/);
context.keys().forEach(context);
