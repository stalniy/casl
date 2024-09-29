#!/usr/bin/env bash

release_packages() {
  changed_paths=$1;
  preview_branch=$2;

  echo "Releasing packages with the next args (branch: ${preview_branch:-master}): $changed_paths"

  if [ "$changed_paths" = "" ];then
    cat <<______HERE__
      Usage:
        release-packages "packages/casl-ability"
        release-packages '
          packages/casl-ability
          packages/casl-angular
        '
______HERE__
      return 1;
  fi

  changed_packages="$(echo "$changed_paths" | grep 'packages/' | grep -v packages/dx)";

  if [ "$changed_packages" = "" ]; then
      echo "No packages to release" >> $GITHUB_STEP_SUMMARY;
      echo -e "Changed files:\n${changed_paths}" >> $GITHUB_STEP_SUMMARY
      return 0;
  fi

  pnpm_options=''
  for path in $changed_packages; do
      pnpm_options="${pnpm_options} --filter ./${path}"
  done

  release_options=""
  if [ "$preview_branch" != "" ]; then
    release_options="  --dry-run --no-ci --branches master,$preview_branch"
  fi
  echo "running: pnpm run -r $pnpm_options release $release_options" >> $GITHUB_STEP_SUMMARY
  pnpm run -r $pnpm_options release $release_options
}

extract_package_versions() {
  changed_paths=$1;
  changed_packages="$(echo "$changed_paths" | grep 'packages/' | grep -v packages/dx)";

  released_packages=();
  for path in $changed_packages; do
      package_name=$(grep '"name":' $path/package.json | cut -d : -f 2 | cut -d '"' -f 2);
      package_version=$(grep '"version":' $path/package.json | cut -d : -f 2 | cut -d '"' -f 2);
      released_packages[${#released_packages[@]}]="${package_name}@${package_version}";
  done

  echo "🚀 Released in ${released_packages[@]}" >> $GITHUB_STEP_SUMMARY
  echo "${released_packages[@]}"
}
