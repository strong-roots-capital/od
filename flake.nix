{
  description = "od";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    git-hooks = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    git-hooks,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
        checks = {
          pre-commit-check = git-hooks.lib.${system}.run {
            src = ./.;
            hooks = {
              actionlint.enable = true;
              alejandra.enable = true;
              prettier.enable = true;
            };
          };
        };
      in {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
          ];
          shellHook = ''
            export PATH="$PWD/node_modules/.bin:$PATH"
            ${checks.pre-commit-check.shellHook}
          '';
        };
      }
    );
}
