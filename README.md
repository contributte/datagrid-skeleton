![](https://heatbadger.now.sh/github/readme/contributte/datagrid-skeleton/)

<p align=center>
  <a href="https://github.com/contributte/datagrid-skeleton/actions"><img src="https://badgen.net/github/checks/contributte/datagrid-skeleton/master"></a>
  <a href="https://coveralls.io/r/contributte/datagrid-skeleton"><img src="https://badgen.net/coveralls/c/github/contributte/datagrid-skeleton"></a>
  <a href="https://packagist.org/packages/contributte/datagrid-skeleton"><img src="https://badgen.net/packagist/dm/contributte/datagrid-skeleton"></a>
  <a href="https://packagist.org/packages/contributte/datagrid-skeleton"><img src="https://badgen.net/packagist/v/contributte/datagrid-skeleton"></a>
</p>
<p align=center>
  <a href="https://packagist.org/packages/contributte/datagrid-skeleton"><img src="https://badgen.net/packagist/php/contributte/datagrid-skeleton"></a>
  <a href="https://github.com/contributte/datagrid-skeleton"><img src="https://badgen.net/github/license/contributte/datagrid-skeleton"></a>
  <a href="https://bit.ly/ctteg"><img src="https://badgen.net/badge/support/gitter/cyan"></a>
  <a href="https://bit.ly/cttfo"><img src="https://badgen.net/badge/support/forum/yellow"></a>
  <a href="https://contributte.org/partners.html"><img src="https://badgen.net/badge/sponsor/donations/F96854"></a>
</p>

<p align=center>
Website 🚀 <a href="https://contributte.org">contributte.org</a> | Contact 👨🏻‍💻 <a href="https://f3l1x.io">f3l1x.io</a> | Twitter 🐦 <a href="https://twitter.com/contributte">@contributte</a>
</p>

<p align=center>
    <img src="https://api.microlink.io?url=https%3A%2F%2Fexamples.contributte.org%2Fdatagrid-skeleton%2F&overlay.browser=light&screenshot=true&meta=false&embed=screenshot.url"></img>
</p>

-----

This project is here for super-simple demonstration how to create a project with `contributte/datagrid`. People are mailing me "This thing is broken - can you fix it please?" and I am responding: "Sure. Please create a sandbox-like repository where I can reproduce you issue and I will have a look at it". Well that's the purpose of this repository. I prepared you a database, presenter and a template. Use it. 🙌

## Demo

https://examples.contributte.org/datagrid-skeleton/

## Screenshots

| Page | Static | Interactive |
|------|--------|-------------|
| Home | <a href="screenshots/00-home.png"><img src="screenshots/00-home.png" width="240"></a> | |
| Filters | <a href="screenshots/01-filters.png"><img src="screenshots/01-filters.png" width="240"></a> | |
| Outer Filters | <a href="screenshots/02-outer-filters.png"><img src="screenshots/02-outer-filters.png" width="240"></a> | <a href="screenshots/02-outer-filters-expanded.png"><img src="screenshots/02-outer-filters-expanded.png" width="240"></a> |
| Columns | <a href="screenshots/03-columns.png"><img src="screenshots/03-columns.png" width="240"></a> | <a href="screenshots/03-columns-hideable.png"><img src="screenshots/03-columns-hideable.png" width="240"></a> |
| Actions | <a href="screenshots/04-actions.png"><img src="screenshots/04-actions.png" width="240"></a> | <a href="screenshots/04-actions-multiaction.png"><img src="screenshots/04-actions-multiaction.png" width="240"></a> |
| Group Actions | <a href="screenshots/05-group-actions.png"><img src="screenshots/05-group-actions.png" width="240"></a> | <a href="screenshots/05-group-actions-selected.png"><img src="screenshots/05-group-actions-selected.png" width="240"></a> |
| Row | <a href="screenshots/06-row.png"><img src="screenshots/06-row.png" width="240"></a> | |
| ItemDetail | <a href="screenshots/07-item-detail.png"><img src="screenshots/07-item-detail.png" width="240"></a> | <a href="screenshots/07-item-detail-expanded.png"><img src="screenshots/07-item-detail-expanded.png" width="240"></a> |
| Export | <a href="screenshots/08-export.png"><img src="screenshots/08-export.png" width="240"></a> | |
| TreeView | <a href="screenshots/09-tree-view.png"><img src="screenshots/09-tree-view.png" width="240"></a> | <a href="screenshots/09-tree-view-expanded.png"><img src="screenshots/09-tree-view-expanded.png" width="240"></a> |
| Edit | <a href="screenshots/10-edit.png"><img src="screenshots/10-edit.png" width="240"></a> | <a href="screenshots/10-edit-inline.png"><img src="screenshots/10-edit-inline.png" width="240"></a> |
| Add | <a href="screenshots/11-add.png"><img src="screenshots/11-add.png" width="240"></a> | <a href="screenshots/11-add-inline.png"><img src="screenshots/11-add-inline.png" width="240"></a> |
| Localization | <a href="screenshots/12-localization.png"><img src="screenshots/12-localization.png" width="240"></a> | |
| CDN | <a href="screenshots/13-cdn.png"><img src="screenshots/13-cdn.png" width="240"></a> | |
| No Pagination | <a href="screenshots/14-no-pagination.png"><img src="screenshots/14-no-pagination.png" width="240"></a> | |
| Sorting | <a href="screenshots/15-sorting.png"><img src="screenshots/15-sorting.png" width="240"></a> | |
| Columns Summary | <a href="screenshots/16-columns-summary.png"><img src="screenshots/16-columns-summary.png" width="240"></a> | |
| Array Datasource | <a href="screenshots/17-array-datasource.png"><img src="screenshots/17-array-datasource.png" width="240"></a> | |
| State Storage | <a href="screenshots/18-state-storage.png"><img src="screenshots/18-state-storage.png" width="240"></a> | |
| Events | <a href="screenshots/19-events.png"><img src="screenshots/19-events.png" width="240"></a> | |

## Installation

To install latest version of `contributte/datagrid-skeleton` use [Composer](https://getcomposer.org).

```
composer create-project -s dev contributte/datagrid-skeleton acme
```

### Install using [docker](https://github.com/docker/docker/)

1) At first, use Git to download this project.

   ```
   git clone https://github.com/contributte/datagrid-skeleton.git
   ```

2) Setup project.

   ```
   make install
   ```

3) Build assets.

   ```
   npm run build
   ```

4) Run docker stack.

   ```
   make docker-up
   ```

5) Open http://localhost and enjoy!

### Composer packages

Take a detailed look :eyes: at [contributte/datagrid](https://contributte.org/packages/contributte/datagrid/)

## Development

See [how to contribute](https://contributte.org/contributing.html) to this package.

This package is currently maintaining by these authors.

<a href="https://github.com/f3l1x">
    <img width="80" height="80" src="https://avatars2.githubusercontent.com/u/538058?v=3&s=80">
</a>
<a href="https://github.com/petrparolek">
  <img width="80" height="80" src="https://avatars2.githubusercontent.com/u/6066243?v=3&s=80">
</a>

-----

Consider to [support](https://contributte.org/partners.html) **contributte** development team. Also thank you for using this project.
