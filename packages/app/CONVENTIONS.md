# Conventions

This file describes conventions that should be applied in the project.
It's not a law, and it's okay to break them if it makes sense.
Though please make an effort not to.

## CLI scripts

Scripts should be in the `bin` directory.

When calling scripts with parameters e.g. in `package.json` you **MUST** use long parameters names.
It's confusing when shorthands are used, if a developer is not familiar with the binary options.
