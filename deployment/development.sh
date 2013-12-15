echo ">> Install everything"
npm install
bower install

echo ">> Test and build"
grunt

echo ">> Update submodules"
git submodule init
git submodule update
cd server
git checkout master

echo ">> Commit Heroku Entry"
rm -rf dist
cp -R ../dist dist

echo ">> Pushing to Heroku"
git add -A
git commit -m "Another build"
git push origin master --force