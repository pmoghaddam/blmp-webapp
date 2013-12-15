# Install everything
npm install
bower install

# Test and Build
grunt

# Deploy
git submodule init
git submodule update

# Commit Heroku entry
rm -rf server/dist
cp -R dist server/dist
cd server

# Push to Heroku
git add -A
git commit -m "Another build"
git push origin master --force