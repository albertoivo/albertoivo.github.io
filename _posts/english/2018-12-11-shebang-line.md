---
layout: post
title: Shebang Lines
category: Dev
tags: [python]
---

If the first line of a script file starts with `#!`, it is known as a "shebang" line. Linux and other Unix like operating systems have native support for such lines and they are commonly used on such systems to indicate how a script should be executed. This launcher allows the same facilities to be used with Python scripts on Windows.

To allow shebang lines in Python scripts to be portable between Unix and Windows, this launcher supports a number of **virtual** commands to specify which interpreter to use. The supported virtual commands are:

* `/usr/bin/env python`
* `/usr/bin/python`
* `/usr/local/bin/python`
* `python`

For example, if the first line of your script starts with:

```python
#! /usr/bin/python
```

The default Python will be located and used. As many Python scripts written to work on Unix will already have this line, you should find these scripts can be used by the launcher without modification. If you are writing a new script on Windows which you hope will be useful on Unix, you should use one of the shebang lines starting with `/usr`.

## Using with the Python Version

Any of the above virtual commands can be suffixed with an explicit version (either just the major version, or the major and minor version) - for example:

```python
/usr/bin/python2.7
```

which will cause that specific version to be located and used.

The `/usr/bin/env` form of shebang line has one further special property. Before looking for installed Python interpreters, this form will search the executable `PATH` for a Python executable. This corresponds to the behaviour of the Unix `env` program, which performs a `PATH` search - for exemaple:

```python
#!/usr/bin/env python3.5
```

## Summarizing

1. It consists of a number sign and an exclamation point character `#!`, followed by the full path to the interpreter.
1. All scripts under Linux execute using the interpreter specified on a first line
1. It is nothing but the absolute path to the Bash interpreter.
1. This ensures that Bash will be used to interpret the script, even if it is executed under another shell.