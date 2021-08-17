{
  "kind": "pipeline",
  "type": "docker",
  "name": "default",

  "steps": [
    {
      "name": "install",
      "image": "node:current-alpine",
      "commands": [
        "npm ci"
      ]
    },
    {
      "name": "build",
      "image": "node:current-alpine",
      "depends_on": ["install"],
      "commands": [
        "npm run compile"
      ]
    },
    {
      "name": "lint",
      "image": "node:current-alpine",
      "depends_on": ["build"],
      "commands": [
        "npm run lint"
      ]
    },
    {
      "name": "test-12",
      "image": "node:12-alpine",
      "depends_on": ["lint"],
      "commands": [
        "npm run test",
	"npm run coverage"
      ]
    },
    {
      "name": "test-14",
      "image": "node:14-alpine",
      "depends_on": ["lint"],
      "commands": [
        "npm run test",
	"npm run coverage"
      ]
    },
    {
      "name": "test-16",
      "image": "node:16-alpine",
      "depends_on": ["lint"],
      "commands": [
        "npm run test",
	"npm run coverage"
      ]
    },
    {
      "name": "test-current",
      "image": "node:current-alpine",
      "depends_on": ["lint"],
      "commands": [
        "npm run test",
	"npm run coverage"
      ]
    },
  ]
}
