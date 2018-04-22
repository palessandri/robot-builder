## Getting Started

* [Download the installer](https://nodejs.org/) for Node.js 6 or greater.
* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository: `git clone https://github.com/palessandri/robot-builder.git`.
* Run `npm install` from the project root.
* Run `ionic serve` in a terminal from the project root.

## Proxy Setup
 - update `ionic.config.json`
  ```
  "integrations": {
    ...
  },
  "proxies": [
    {
      "path": "/api",
      "proxyUrl": "https://robot-builder.herokuapp.com/api"
    }
  ]
  ```
  - update baseUrl to proxy url [here](https://github.com/palessandri/robot-builder/blob/dev/src/providers/api.ts#L5).
  ```
  const baseUrl = 'http://localhost:8100/api';
  ```
