
# TODO 
A to-do list using koa.js, React.js, Bootstrap, and sqlite3 configured to run on Redhat Openshift. Depends on Nodejs >= 0.12.5 and runs using the `--harmony` flag.

### sqlite3 database
To use a database file instead of in-memory anonymous database set path to the file as environment variable `TODO_DB_FILE`. Can be relative to working directory. i.e. 

    export TODO_DB_FILE=../todo.sql

### run locally

    $ git clone git@github.com:sojournerc/todo.git yourdir/
    $ cd yourdir
    $ npm install
    $ npm start

Visit [localhost:5000](http://localhost:5000)

To watch and recompile client-side source files on change, in a seperate shell run

    $ gulp

### minification

When the `NODE_ENV` environment variable is anything other than 'development' these minified files will be served.

To support minification copy the pre-commit git hook file from the repository into the git config, or add the contents of `pre-commit` if one already exists in `.git/hooks/`. i.e.

    $ cp ./pre-commit ./.git/hooks/pre-commit

And make sure it is executable

    $ chmod +x ./.git/hooks/pre-commit 

The pre-commit git hook will now minify css and js using `gulp minifyJs` and `gulpMinifyCss` and the updated files will be included in your commit. 

/////////////////////////////////

The MIT License (MIT)

Copyright (c) <2015> <Meyer Creative Enterprises, LLC>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
