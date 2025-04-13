nix
{
  description = "A Django development environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      pkgs = nixpkgs.legacyPackages."x86_64-linux";
      python = pkgs.python311;
      venvDir = ./venv;
    in
    {
      devShells.x86_64-linux.default = pkgs.mkShell {
        packages = with pkgs; [
          python
          python3Packages.pip
          python3Packages.django
          sqlite
        ];
        shellHook = ''
          export PIP_USER=0
          if [ ! -d "${venvDir}" ]; then
            echo "Creating virtual environment..."
            ${python}/bin/python3 -m venv ${venvDir}
          fi
          source ${venvDir}/bin/activate
          if ! ${python}/bin/pip show django &> /dev/null; then
            echo "Installing requirements..."
            pip install django
          fi
          echo "Django Environment Ready"
        '';
      };
    };
}