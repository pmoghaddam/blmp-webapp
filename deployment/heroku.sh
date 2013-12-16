# Execute once ready to deploy (useful for CI)
echo ">> Update submodules"
git submodule init
git submodule update

echo ">> Ensure submodule is on 'master'"
cd server
git checkout master

echo ">> Commit Heroku Entry"
rm -rf dist
cp -R ../dist dist
git add -A
git commit -m "Another build"

echo ">> Pushing to Heroku"
git push origin master --force