# TaskTracker

A command-line interface (CLI) tool for efficient task prioritization and management.

![welcome screen of TaskTracker](image.png)

## Table of contents
- [Introduction] (#intro)
- [Installation] (#install)
- [Usage] (#usage)
- [Examples] (#example)
- [Contributing] (#contribute)

<a id='intro'></a>
### Introduction

TaskTracker is a task prioritization CLI tool that ensures you work on the right tasks at the right time. It helps you organize your project tasks and provides a clear path to tackle them efficiently. With its intuitive command-line interface, you can quickly prioritize and manage your project workload.

<a id='install></a>
### Installation

```
    npm install tasktracker
```

<a id='usage'></a>
### Usage
#### Add Command

Add command can be used to add a new task in the ToDo list.
```
 npx tasktracker add
```
You'll have to provide the following details
- Title
> This is the title of the task, it can be edited later on using the task ID.

- priority
> This input is to set the priority of the task, namely three - High, Medium, Low
1. High - This priority flag can be used for the tasks that are important and requires imediate attention.
2. Medium - This priority flag for the tasks that are important but don't require immediate attention.
3. Low - This is used for tasks that can be ignored for the present time being, but needs to be done later on.