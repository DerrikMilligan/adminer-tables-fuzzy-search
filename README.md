
# Adminer Tables Fuzzy Search

A new fuzzy table search plugin for [Adminer](http://www.adminer.org/#download).

Was previously using the plugin [here](https://github.com/brunetton/adminer-tables_fuzzy_search) by [brunetton](https://github.com/brunetton/) but felt like it could be updated to function a bit better.

## Features

- No longer has a popup to filter the tables.
- Tables are sorted in place without creating/deleting elements thanks to [appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) being able to just move elements around.
- Utilizes [Fuse.js](https://fusejs.io/getting-started/installation.html) for the fuzzy searching with an external dependency so it can be cached potentially from other sites.


# Installation

- Install Adminer
- Follow the [documentation](https://www.adminer.org/plugins/#use) for setting up plugins
- Download the two files to the `/plugins` folder
- Add an entry to the `$plugins` array `new AdminerTablesFuzzySearch()`


## Color Customization

By default there is a border color set in the php file. If you would like a different color you can change it in the php file or in your template file.

```css
#menu #tables li.selected-table-entry {
  border-color: rgb(76, 113, 166);
}
```

