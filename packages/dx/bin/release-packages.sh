#!/usr/bin/env bash

changed_paths=$1;

if [ "$changed_paths" = "" ];then
    echo '
    Usage:
      ./release-packages.sh "packages/casl-ability"
      ./release-packages.sh "packages/casl-ability packages/casl-angular"
    ';
    exit;
fi

changed_packages="$(echo "$changed_paths" | grep 'packages/')";

if [ "$changed_packages" = "" ]; then
    echo "No packages to release" >> $GITHUB_STEP_SUMMARY;
    echo "Changed files:\n${changed_paths}" >> $GITHUB_STEP_SUMMARY
    exit 0;
fi

pnpm_options=''
for path in $changed_packages; do
    pnpm_options="${pnpm_options} --filter ./${path}"
done

echo "running: pnpm run -r $pnpm_options release" >> $GITHUB_STEP_SUMMARY
pnpm run -r $pnpm_options release

released_packages=();
for path in $changed_packages; do
    package_name=$(grep '"name":' $path/package.json | cut -d : -f 2 | cut -d '"' -f 2);
    package_version=$(grep '"version":' $path/package.json | cut -d : -f 2 | cut -d '"' -f 2);
    released_packages[${#released_packages[@]}]="${package_name}@${package_version}";
done

echo "🚀 Released in ${released_packages[@]}" >> $GITHUB_STEP_SUMMARY
