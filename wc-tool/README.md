# Word Count (wc) Clone

A TypeScript project that replicates the functionality of the `wc` Linux command line tool, with added options `w`, `c`, and `l`.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Examples](#examples)
- [Technologies](#technologies)
- [Contact](#contact)

## Description

This project was created by following the step-by-step instructions provided on the [Coding Challenges](https://codingchallenges.fyi/challenges/challenge-wc/) website.
The goal was to replicate the basic functionality of the `wc` command line tool in TypeScript, while also adding support for specific options: word count (`w`), character count (`c`), and line count (`l`). 


## Installation

1. Clone this repository:
```sh
    git clone https://github.com/PaulosSouza/ts-coding-challenge.git
    cd ts-coding-challenge/wc-tool
```

2. Install dependencies using [pnpm](https://pnpm.io/):
```sh
    pnpm install
```

## Usage

Run the `pnpm dev` command followed by the file you want to analyze:
```sh
    pnpm dev <filename>
```

## Options

- `-w, --word`: Display word count.
- `-c, --character`: Display character count.
- `-l, --line`: Display line count.
- `--help`: Display help.

## Examples

- Count only characters in a file:
  ```sh
  pnpm dev -c test.txt
  ```

- Count only words in a file:
  ```sh
  pnpm dev -c test.txt
  ```

## Technologies
- [yargs](https://github.com/yargs/yargs/tree/main)
- [tsx](https://github.com/esbuild-kit/tsx)
- [tsup](https://github.com/egoist/tsup)

## Contact

For any questions or suggestions, feel free to contact me at [LinkedIn](https://www.linkedin.com/in/paulo-henrique-89b148166/).